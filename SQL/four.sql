WITH RECURSIVE emp_tree AS (
  SELECT
    e.employee_id,
    e.manager_id,
    e.department_id,
    e.salary
  FROM employees e
  WHERE e.status = 'active'
    AND e.hire_date <= CURRENT_DATE
  UNION ALL
  SELECT
    c.employee_id,
    p.manager_id,
    c.department_id,
    c.salary
  FROM employees c
  JOIN emp_tree p ON c.manager_id = p.employee_id
  WHERE c.status = 'active'
),
last_year AS (
  SELECT * FROM emp_tree
  WHERE hire_date >= date_trunc('year', CURRENT_DATE) - INTERVAL '1 year'
)
SELECT
  manager_id,
  department_id,
  COUNT(employee_id) AS total_reports,
  SUM(salary) AS total_salary,
  AVG(salary) AS avg_salary
FROM last_year
GROUP BY manager_id, department_id;
