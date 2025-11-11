WITH touches AS (
  SELECT s.sale_id, s.user_id, s.sale_date, s.sale_amount,
         ui.campaign_id
  FROM sales s
  JOIN user_interactions ui
    ON s.user_id = ui.user_id
   AND ui.interaction_date BETWEEN date_sub(s.sale_date, 30) AND s.sale_date
),
credits AS (
  SELECT sale_id,
         campaign_id,
         sale_amount / COUNT(DISTINCT campaign_id) OVER (PARTITION BY sale_id) AS credit_amount
  FROM touches
),
monthly AS (
  SELECT DATE_FORMAT(s.sale_date, 'yyyy-MM') AS year_month,
         c.campaign_id,
         SUM(credit_amount) AS total_sales_usd
  FROM credits c
  JOIN sales s USING (sale_id)
  GROUP BY year_month, campaign_id
)
SELECT m.year_month,
       m.campaign_id,
       cmp.campaign_name,
       m.total_sales_usd,
       spend.spend_usd,
       m.total_sales_usd / spend.spend_usd AS roi
FROM monthly m
JOIN campaigns cmp USING (campaign_id)
JOIN campaign_spend spend
  ON m.campaign_id = spend.campaign_id AND m.year_month = spend.year_month;
