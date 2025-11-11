SQL (Postgres-ish)
WITH monthly AS (
  SELECT
    date_trunc('month', txn_date)::date AS month_start,
    SUM(revenue) AS rev,
    SUM(expenses) AS exp
  FROM financials
  GROUP BY 1
),
trend AS (
  SELECT
    month_start,
    rev,
    exp,
    rev - exp AS profit,
    LAG(rev) OVER (ORDER BY month_start) AS prev_rev,
    LAG(exp) OVER (ORDER BY month_start) AS prev_exp
  FROM monthly
),
growth AS (
  SELECT
    month_start,
    rev, exp, profit,
    (rev - prev_rev)::numeric / NULLIF(prev_rev,0) AS rev_growth,
    (exp - prev_exp)::numeric / NULLIF(prev_exp,0) AS exp_growth
  FROM trend
  WHERE prev_rev IS NOT NULL
),
stats AS (
  SELECT
    AVG(rev_growth) AS avg_rev_growth,
    STDDEV_POP(rev_growth) AS std_rev_growth,
    AVG(exp_growth) AS avg_exp_growth,
    STDDEV_POP(exp_growth) AS std_exp_growth
  FROM growth
),
quarters AS (
  SELECT generate_series(
    date_trunc('quarter', CURRENT_DATE),
    date_trunc('quarter', CURRENT_DATE) + INTERVAL '9 months',
    INTERVAL '3 months'
  ) AS quarter_start
),
scenarios AS (
  SELECT 'optimistic' AS scenario, 1.1 AS adj_factor
  UNION ALL SELECT 'baseline', 1.0
  UNION ALL SELECT 'pessimistic', 0.9
),
forecast AS (
  SELECT
    q.quarter_start,
    s.scenario,
    LAG(m.rev) OVER () * POWER(1 + st.avg_rev_growth * s.adj_factor, rn) AS proj_rev,
    LAG(m.exp) OVER () * POWER(1 + st.avg_exp_growth * s.adj_factor, rn) AS proj_exp,
    st.std_rev_growth, st.std_exp_growth
  FROM quarters q
  CROSS JOIN scenarios s
  CROSS JOIN stats st
  CROSS JOIN (SELECT rev, exp FROM monthly ORDER BY month_start DESC LIMIT 1) m
  CROSS JOIN LATERAL (SELECT ROW_NUMBER() OVER () - 1 AS rn) x
)
SELECT
  quarter_start,
  scenario,
  proj_rev,
  proj_exp,
  proj_rev - proj_exp AS proj_profit,
  proj_rev * (1 - 2*std_rev_growth) AS ci_lower_rev,
  proj_rev * (1 + 2*std_rev_growth) AS ci_upper_rev
FROM forecast
ORDER BY quarter_start, scenario;
