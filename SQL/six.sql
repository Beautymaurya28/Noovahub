WITH months AS (
  SELECT generate_series(
    date_trunc('month', CURRENT_DATE) - INTERVAL '23 months',
    date_trunc('month', CURRENT_DATE),
    INTERVAL '1 month'
  ) AS month_start
),
-- active subscriptions expanded to months they cover
subs_monthly AS (
  SELECT
    m.month_start,
    s.customer_id,
    s.subscription_id,
    -- assume monthly_price is available on plans or subscription; else compute prorated
    COALESCE(p.monthly_price, 0) AS monthly_revenue
  FROM months m
  JOIN subscriptions s
    ON s.start_date <= (m.month_start + INTERVAL '1 month - 1 day')
   AND (s.end_date IS NULL OR s.end_date >= m.month_start)
  LEFT JOIN plans p ON s.plan_id = p.plan_id
),
-- customers active in month and next month
active_flags AS (
  SELECT
    sm.month_start,
    sm.customer_id,
    SUM(sm.monthly_revenue) AS revenue_this_month,
    CASE WHEN EXISTS (
      SELECT 1 FROM subs_monthly sm2
      WHERE sm2.customer_id = sm.customer_id
        AND sm2.month_start = (sm.month_start + INTERVAL '1 month')
    ) THEN 1 ELSE 0 END AS active_next_month
  FROM subs_monthly sm
  GROUP BY sm.month_start, sm.customer_id
),
-- churners in month = active this month and not active next month
churners AS (
  SELECT month_start, customer_id, revenue_this_month
  FROM active_flags
  WHERE active_next_month = 0
),
-- churn metrics by segment & region
customer_meta AS (
  SELECT customer_id, region, segment FROM customers
),
churn_by_seg AS (
  SELECT
    DATE_TRUNC('month', c.month_start)::date AS year_month,
    cm.region,
    cm.segment,
    COUNT(DISTINCT c.customer_id) AS churn_customers,
    SUM(c.revenue_this_month) AS revenue_lost
  FROM churners c
  JOIN customer_meta cm ON c.customer_id = cm.customer_id
  GROUP BY 1,2,3
),
-- totals for rates
active_counts AS (
  SELECT
    DATE_TRUNC('month', month_start)::date AS year_month,
    cm.region,
    cm.segment,
    COUNT(DISTINCT sm.customer_id) AS active_customers
  FROM subs_monthly sm
  JOIN customer_meta cm ON sm.customer_id = cm.customer_id
  GROUP BY 1,2,3
),
-- final join + rolling 3-month avg of revenue_lost
final AS (
  SELECT
    a.year_month,
    a.region,
    a.segment,
    COALESCE(cb.churn_customers,0) AS churn_customers,
    COALESCE(cb.revenue_lost,0) AS revenue_lost,
    a.active_customers,
    CASE WHEN a.active_customers = 0 THEN NULL
         ELSE ROUND(100.0 * COALESCE(cb.churn_customers,0) / a.active_customers, 4)
    END AS churn_rate_pct
  FROM active_counts a
  LEFT JOIN churn_by_seg cb
    ON a.year_month = cb.year_month
   AND a.region = cb.region
   AND a.segment = cb.segment
)
SELECT
  f.*,
  -- rolling 3-month average revenue_lost
  ROUND(AVG(f.revenue_lost) OVER (PARTITION BY f.region, f.segment ORDER BY f.year_month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW),2) AS revenue_lost_3mo_avg
FROM final f
ORDER BY f.year_month, f.region, f.segment;
