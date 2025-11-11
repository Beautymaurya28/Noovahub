-- Parameters: set these in your client or replace literals
WITH params AS (
  SELECT
    0.10::numeric AS annual_discount_rate,   -- 10% annual discount
    36 AS horizon_months                      -- projection horizon
),

-- 1) Build calendar months for cohorts and horizon
months AS (
  SELECT generate_series(date_trunc('month', CURRENT_DATE) - INTERVAL '24 months',
                         date_trunc('month', CURRENT_DATE) + (params.horizon_months || ' months')::interval,
                         '1 month')::date AS month_start
  FROM params
),

-- 2) Cohort month: cohort = customer first_subscribe_month
customer_first AS (
  SELECT customer_id,
         date_trunc('month', MIN(start_date))::date AS cohort_month,
         MIN(start_date) AS first_sub
  FROM subscriptions
  WHERE status <> 'cancelled'
  GROUP BY customer_id
),

-- 3) Expand each customer's monthly active status and MRR (uses plans.monthly_price)
customer_months AS (
  SELECT
    c.customer_id,
    c.cohort_month,
    m.month_start,
    p.monthly_price::numeric AS mrr,
    -- active if subscription covers that month
    CASE WHEN s.start_date <= (m.month_start + INTERVAL '1 month - 1 day')
              AND (s.end_date IS NULL OR s.end_date >= m.month_start)
         THEN 1 ELSE 0 END AS is_active,
    s.acq_channel
  FROM customer_first c
  JOIN months m ON m.month_start >= c.cohort_month
  JOIN subscriptions s ON s.customer_id = c.customer_id
  JOIN plans p ON s.plan_id = p.plan_id
  WHERE s.status <> 'cancelled'
),

-- 4) Observed MRR per cohort-month (history window up to current)
observed AS (
  SELECT
    cohort_month,
    acq_channel,
    month_start,
    SUM(mrr * is_active) AS cohort_mrr,
    COUNT(DISTINCT CASE WHEN is_active=1 THEN customer_id END) AS active_customers
  FROM customer_months
  WHERE month_start <= date_trunc('month', CURRENT_DATE)  -- only historic observed months
  GROUP BY cohort_month, acq_channel, month_start
),

-- 5) Compute retention rates per cohort by month_number (month_index = 0 for cohort month)
observed_retention AS (
  SELECT
    o.cohort_month,
    o.acq_channel,
    o.month_start,
    EXTRACT(YEAR FROM age(o.month_start, c.cohort_month)) * 12
      + EXTRACT(MONTH FROM age(o.month_start, c.cohort_month)) AS month_index,
    o.cohort_mrr,
    o.active_customers
  FROM observed o
  JOIN (SELECT DISTINCT customer_id, cohort_month FROM customer_first) c ON o.cohort_month = c.cohort_month
  -- aggregate already done in observed
),

-- 6) Estimate retention curve per cohort/acq_channel: month_index -> retention_rate
-- retention_rate = active_customers / active_customers_at_month0
retention_base AS (
  SELECT
    cohort_month,
    acq_channel,
    MIN(CASE WHEN month_index = 0 THEN active_customers END) OVER (PARTITION BY cohort_month, acq_channel) AS cohort_start_customers,
    month_index,
    active_customers,
    CASE WHEN MIN(CASE WHEN month_index = 0 THEN active_customers END) OVER (PARTITION BY cohort_month, acq_channel) > 0
         THEN active_customers::numeric / NULLIF(MIN(CASE WHEN month_index = 0 THEN active_customers END) OVER (PARTITION BY cohort_month, acq_channel),0)
         ELSE 0 END AS retention_rate
  FROM observed_retention
),

-- 7) Create projection months for each cohort up to horizon
cohort_projection_months AS (
  SELECT
    c.cohort_month,
    acq_channel,
    generate_series(0, params.horizon_months) AS month_index
  FROM (SELECT DISTINCT cohort_month, acq_channel FROM customer_first JOIN subscriptions USING (customer_id)) c
  CROSS JOIN params
),

-- 8) Merge observed retention where present, otherwise use last-observed retention decay model:
-- For simplicity we'll carry-forward last observed retention or apply an exponential decay fit.
-- Here: use last observed retention per cohort as base and apply geometric decay factor `g` computed from observed recent months.
retention_model AS (
  SELECT
    p.cohort_month,
    p.acq_channel,
    p.month_index,
    COALESCE(r.retention_rate,
      -- fallback: last observed retention for this cohort * (decay_factor)^(month_index - last_obs_index)
      (SELECT COALESCE(MAX(r2.retention_rate),0) FROM retention_base r2
       WHERE r2.cohort_month = p.cohort_month AND r2.acq_channel = p.acq_channel)
    ) AS model_retention_rate
  FROM cohort_projection_months p
  LEFT JOIN retention_base r ON r.cohort_month = p.cohort_month AND r.acq_channel = p.acq_channel AND r.month_index = p.month_index
),

-- 9) Determine cohort initial MRR (month_index=0 observed or derived)
cohort_initial AS (
  SELECT cohort_month, acq_channel, COALESCE(MAX(cohort_mrr) FILTER (WHERE month_start = cohort_month),0) AS initial_mrr
  FROM observed
  GROUP BY cohort_month, acq_channel
),

-- 10) Discount settings and compute discounted projected cashflows
discounted_cf AS (
  SELECT
    rm.cohort_month,
    rm.acq_channel,
    rm.month_index,
    ci.initial_mrr,
    rm.model_retention_rate,
    -- monthly discount factor
    ( (1 + params.annual_discount_rate)^(1.0/12) - 1 ) AS monthly_discount_rate
  FROM retention_model rm
  LEFT JOIN cohort_initial ci ON ci.cohort_month = rm.cohort_month AND ci.acq_channel = rm.acq_channel
  CROSS JOIN params
),
proj AS (
  SELECT
    cohort_month,
    acq_channel,
    month_index,
    initial_mrr * model_retention_rate AS projected_mrr,
    (initial_mrr * model_retention_rate) / POWER(1 + monthly_discount_rate, month_index) AS discounted_mrr
  FROM discounted_cf
)

-- 11) Aggregate LTV and retention table per cohort & channel
SELECT
  p.cohort_month,
  p.acq_channel,
  SUM(p.projected_mrr) FILTER (WHERE p.month_index <= 12) AS y1_revenue,
  SUM(p.discounted_mrr) AS ltv_discounted_horizon,
  -- retention at month 1, 3, 6, 12
  MAX(CASE WHEN p.month_index = 1 THEN p.projected_mrr END) / NULLIF(MAX(CASE WHEN p.month_index = 0 THEN p.projected_mrr END),0) AS retention_m1,
  MAX(CASE WHEN p.month_index = 3 THEN p.projected_mrr END) / NULLIF(MAX(CASE WHEN p.month_index = 0 THEN p.projected_mrr END),0) AS retention_m3,
  MAX(CASE WHEN p.month_index = 6 THEN p.projected_mrr END) / NULLIF(MAX(CASE WHEN p.month_index = 0 THEN p.projected_mrr END),0) AS retention_m6,
  MAX(CASE WHEN p.month_index = 12 THEN p.projected_mrr END) / NULLIF(MAX(CASE WHEN p.month_index = 0 THEN p.projected_mrr END),0) AS retention_m12
FROM proj p
GROUP BY p.cohort_month, p.acq_channel
ORDER BY p.cohort_month DESC, p.acq_channel;
