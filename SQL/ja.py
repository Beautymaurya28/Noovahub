apiVersion: v1
kind: ResourceQuota
metadata:
  name: tenantA-quota
spec:
  hard:
    limits.cpu: "200"
    limits.memory: 512Gi
    pods: "100"
