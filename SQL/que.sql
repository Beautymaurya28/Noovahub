WITH valid_orders AS (
  SELECT o.*
  FROM orders o
  WHERE o.status NOT IN ('void','cancelled')
),
root_orders AS (
  SELECT DISTINCT ON (order_id) root_order_id
  FROM corrections -- merge/split handling
),
converted AS (
  SELECT
    oi.*,
    p.category_id,
    (oi.price - COALESCE(di.amount,0)) * er.rate_to_usd AS net_price_usd
  FROM order_items oi
  JOIN valid_orders vo ON vo.order_id = oi.order_id
  JOIN products p ON p.product_id = oi.product_id
  JOIN exchange_rates er ON er.currency = vo.currency AND er.date = vo.order_date
  LEFT JOIN discounts di ON di.order_item_id = oi.id
),
category_hierarchy AS (
  SELECT category_id, parent_id, category_name FROM categories
  UNION ALL
  SELECT c.parent_id, p.parent_id, p.category_name
  FROM categories c
  JOIN category_hierarchy p ON c.parent_id = p.category_id
),
rollup AS (
  SELECT
    date_trunc('month', vo.order_date) AS year_month,
    ch.category_id,
    SUM(cn.net_price_usd) AS net_revenue_usd
  FROM converted cn
  JOIN category_hierarchy ch ON cn.category_id = ch.category_id
  JOIN valid_orders vo ON vo.order_id = cn.order_id
  GROUP BY 1,2
)
SELECT * FROM rollup;
