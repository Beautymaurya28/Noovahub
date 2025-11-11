WITH RECURSIVE category_hierarchy AS (
  SELECT category_id, parent_category_id, category_name
  FROM categories
  UNION ALL
  SELECT c.category_id, ch.parent_category_id, c.category_name
  FROM categories c
  JOIN category_hierarchy ch
    ON c.parent_category_id = ch.category_id
),
valid_orders AS (
  SELECT root_order_id AS order_id
  FROM orders
  WHERE status NOT IN ('void','cancelled')
),
usd_orders AS (
  SELECT o.order_id,
         o.category_id,
         (item_price - item_discount - promo_discount) * er.usd_rate AS net_revenue_usd,
         DATE_FORMAT(o.order_date,'yyyy-MM') AS year_month
  FROM valid_orders vo
  JOIN order_items o ON vo.order_id = o.order_id
  JOIN exchange_rates er ON o.currency = er.currency AND o.order_date = er.date
),
rollup AS (
  SELECT ch.parent_category_id AS category_id,
         ch.category_name,
         uo.year_month,
         SUM(uo.net_revenue_usd) AS net_revenue_usd
  FROM usd_orders uo
  JOIN category_hierarchy ch ON uo.category_id = ch.category_id
  GROUP BY ch.parent_category_id, ch.category_name, uo.year_month
)
SELECT * FROM rollup;
