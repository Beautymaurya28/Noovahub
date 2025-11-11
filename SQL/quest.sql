WITH ordered AS (
  SELECT
    user_id,
    event_time,
    page,
    demographic,
    LAG(event_time) OVER (PARTITION BY user_id ORDER BY event_time) AS prev_time
  FROM web_events
),
sessioned AS (
  SELECT
    *,
    SUM(CASE WHEN prev_time IS NULL OR event_time - prev_time > INTERVAL '30 minutes' THEN 1 ELSE 0 END)
      OVER (PARTITION BY user_id ORDER BY event_time) AS session_id
  FROM ordered
),
funnel AS (
  SELECT
    user_id, session_id, demographic,
    MIN(CASE WHEN page='landing' THEN event_time END) AS landing_time,
    MIN(CASE WHEN page='product' THEN event_time END) AS product_time,
    MIN(CASE WHEN page='add_to_cart' THEN event_time END) AS cart_time,
    MIN(CASE WHEN page='checkout' THEN event_time END) AS checkout_time
  FROM sessioned
  GROUP BY user_id, session_id, demographic
)
SELECT
  demographic,
  COUNT(DISTINCT CASE WHEN landing_time IS NOT NULL THEN session_id END) AS landings,
  COUNT(DISTINCT CASE WHEN product_time IS NOT NULL THEN session_id END) AS product_views,
  COUNT(DISTINCT CASE WHEN cart_time IS NOT NULL THEN session_id END) AS carts,
  COUNT(DISTINCT CASE WHEN checkout_time IS NOT NULL THEN session_id END) AS checkouts,
  AVG(EXTRACT(EPOCH FROM (product_time-landing_time))/60) AS min_to_product,
  AVG(EXTRACT(EPOCH FROM (cart_time-product_time))/60) AS min_to_cart,
  AVG(EXTRACT(EPOCH FROM (checkout_time-cart_time))/60) AS min_to_checkout
FROM funnel
GROUP BY demographic;
