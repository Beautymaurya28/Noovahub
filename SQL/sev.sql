INSERT INTO control_runs (entity_key, input_checksum, run_id, status)
SELECT :entity_key, :input_checksum, :run_id, 'processing'
WHERE NOT EXISTS(
  SELECT 1 FROM control_runs WHERE entity_key=:entity_key AND input_checksum=:input_checksum AND status='done'
);
