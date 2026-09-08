# Observability and Reliability by Design

**Principle Name:** Observability and Reliability by Design

**Statement:** All technology systems should be designed with observability built in from the start — including logging, metrics, tracing, and alerting — so that health, performance, and incidents can be detected and resolved quickly.

**Rationale:** In a cloud-native, distributed architecture, silent failures and performance degradation are inevitable without deliberate observability design. Reactive instrumentation added after incidents is more expensive and less effective than observability built into the system from day one.

**Implications:**

- All production systems should define and publish Service Level Objectives (SLOs) for availability and latency.
- Logging, metrics, and distributed tracing should be implemented using enterprise-standard tooling (GCP Cloud Operations / Cloud Monitoring).
- Alerting thresholds should be defined based on SLOs, not arbitrary thresholds, and reviewed regularly.
- Observability artifacts (dashboards, runbooks, alert configs) are required before a system is approved for production deployment.
