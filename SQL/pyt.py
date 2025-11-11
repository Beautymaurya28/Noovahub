from airflow.sensors.base import BaseSensorOperator

class DatasetReadySensor(BaseSensorOperator):
    def poke(self, context):
        ds = context['params']['dataset']
        return check_metadata_service(ds)  # fast check to metadata store
