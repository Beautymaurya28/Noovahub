WITH monthly_sales AS (
  SELECT
    p.product_id,
    p.category_id,
    date_trunc('month', s.sale_date) AS year_month,
    SUM(s.amount) AS revenue
  FROM sales s
  JOIN products p ON s.product_id = p.product_id
  WHERE s.sale_date < p.discontinued_date
  GROUP BY 1,2,3
),
peak AS (
  SELECT DISTINCT ON (category_id) category_id, year_month AS peak_month, revenue AS peak_rev
  FROM monthly_sales
  ORDER BY category_id, revenue DESC
),
after3 AS (
  SELECT
    ps.category_id,
    ms.revenue AS rev_after3
  FROM peak ps
  JOIN monthly_sales ms
    ON ms.category_id = ps.category_id
   AND ms.year_month = ps.peak_month + INTERVAL '3 months'
)
SELECT
  p.category_id,
  p.peak_month,
  p.peak_rev,
  a.rev_after3,
  ROUND(100.0 * (p.peak_rev - a.rev_after3)/p.peak_rev, 2) AS pct_decline_3mo
FROM peak p
JOIN after3 a ON p.category_id = a.category_id;
