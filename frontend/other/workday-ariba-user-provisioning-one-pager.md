# One Pager: Workday → Ariba User Provisioning Integration

**Use Case:** Assess the proposed integration architecture for provisioning user identity data from Workday (HR source) into Ariba (SAP procurement target) at Entegris, via Boomi middleware and SAP CIG (Cloud Integration Gateway).
**Prepared by:** Sam Bolger, EA Intern | AI-assisted analysis | **Date:** 2026-07-09 | **Status:** Draft

---

## The Question

> *"The proposed architecture routes Workday user data through Boomi middleware, then through SAP CIG, and into Ariba via the User Import API. The Workday↔Boomi and CIG↔Ariba connections already exist; the Boomi↔CIG connection is the new build. Does this design align with Entegris architecture principles?"*

---

## AI Assessment: Boomi + SAP CIG Architecture Aligns with Entegris Principles — Subject to Specific Implementation Requirements

**Verdict: The proposed architecture is defensible under Entegris integration standards. Boomi as the middleware, SAP CIG as the vendor-native bridge to Ariba, and standard published APIs on both endpoints all align with our principles. The overall shape should be approved, provided the implementation resolves specific gaps around authentication, idempotency, observability, and data protection identified below. The Boomi ↔ CIG connection, which is the new build, should follow the Asynchronous or Batch API pattern from the SAP Integration Patterns depending on the trigger style.**

> *Note: Ariba is an SAP product (SAP Ariba). The SAP Integration Patterns documented in the EA knowledge base apply directly to Ariba integrations and are the reference patterns used in this assessment.*

---

## What the Principles Say About the Proposed Approach

### ✅ Integration Through Standard Middleware *(Architecture Principle)*

*"Application-to-application integration should use the enterprise integration platform (Boomi) rather than direct point-to-point connections or file-based transfers."*

The proposed architecture places Boomi as the middleware layer between Workday and SAP CIG, aligning directly with the Entegris standard. All flow is governed through the enterprise integration platform rather than a point-to-point HR-to-procurement connection.

### ✅ Internet and API First *(Architecture Principle)*

*"New integration designs must use published APIs, not internal network dependencies."*

Both endpoints use published APIs — Workday's REST/SOAP interfaces on the source side and Ariba's User Import API on the target side. SAP CIG is likewise API-based. No internal network dependency is introduced.

### ✅ Single ERP, Minimal Customization *(Architecture Principle)*

By routing through SAP CIG rather than building a custom Boomi-to-Ariba adapter, the proposal favors the vendor-native integration path. This reduces custom SAP integration surface area and aligns with the "single ERP, minimal customization" direction.

### ✅ Loosely Coupled and Interoperable Solutions *(Enterprise Principle)*

Boomi mediation preserves loose coupling between Workday and Ariba. Neither system depends on the other's schema, availability, or release cycle. Interface changes on either side can be managed through Boomi mapping updates rather than coordinated releases.

### ✅ Observability and Reliability by Design *(Technology Principle)*

*"All technology systems should be designed with observability built in from the start — including logging, metrics, tracing, and alerting."*

Boomi-mediated integration provides the operational surface (correlation IDs, structured error handling, retry logic, dashboards) required by this principle — provided the design uses those capabilities. See implementation requirements below.

### ✅ Reuse Shared Application Services First *(Application Principle)*

Reusing the existing Workday↔Boomi and CIG↔Ariba connections rather than rebuilding them appropriately narrows the build scope to the one leg that does not yet exist. This aligns with the reuse-first principle.

---

## What the Principles Require for Implementation

The overall shape is aligned. The following implementation requirements must be resolved before build to fully honor the principles:

### Authentication and Secrets Management

*Governed by: Identity & Access Management Policy; Architecture Assurance Guardrails.*

Every hop (Workday↔Boomi, Boomi↔CIG, CIG↔Ariba) must use managed identity where available, or credentials retrieved from a centralized secret manager. **No hardcoded credentials in Boomi configuration.** The diagram does not specify the authentication approach at any hop.

### Data Classification and Transport Encryption

*Governed by: Data Classification Standard; Security and Privacy by Design (Security Principle).*

Employee/HR data typically includes PII. TLS in transit must be confirmed at every hop, and no payload should be persisted unencrypted in Boomi or CIG staging. Data classification of the specific fields exchanged should be confirmed with HR IT before build.

### Idempotency and Safe Retry

*Governed by: SAP Integration Patterns — "Keep retries idempotent to avoid duplicate writes."*

A correlation ID (or Workday employee ID) must propagate end-to-end and be used as the idempotency key for the Ariba User Import API. Retries must not create duplicate users, and stale retries must not overwrite legitimate later updates.

### Audit and Observability

*Governed by: Observability and Reliability by Design.*

Provisioning success and failure events must be logged to enterprise-standard tooling (GCP Cloud Operations / Cloud Monitoring) with correlation IDs and outcome codes, without sensitive-payload leakage. Failure alerting and reconciliation ownership must be defined before production deployment.

### Failure Handling and Dead-Letter Behavior

When Ariba rejects a payload (schema mismatch, duplicate user, downstream outage), the design must specify dead-letter storage, retry policy, and support escalation — not silent drop.

---

## Interaction Style Options for the Boomi ↔ CIG Leg

The diagram does not specify whether the integration is event-triggered, scheduled, or on-demand. The correct canonical pattern from the SAP Integration Patterns depends on this:

| Trigger Style | Recommended Pattern | When to Use |
|---|---|---|
| Workday lifecycle events (hire, termination, transfer) | **Asynchronous (Fire-and-forget / Event-Triggered)** via Boomi | Provisioning does not need synchronous confirmation from Ariba; async decouples from Ariba availability; idempotency is required by the pattern |
| Scheduled sync (nightly / hourly) | **Batch API (Scheduled Extract/Load)** via Boomi | HR changes tolerate batch cadence; run-state persistence enables safe resume after failure |
| On-demand admin request | **Synchronous API (Request/Reply)** via Boomi | Rare edge case; not recommended for the primary flow — synchronous coupling weakens resilience against Ariba availability |

> **Preferred:** If Workday can publish user lifecycle events, the **Asynchronous** pattern is preferred — it best decouples the systems and forces idempotent design. Otherwise, use the **Batch API** pattern with clearly defined run windows.

---

## What Good Looks Like

```
Workday (source)
    ↓  published API (REST/SOAP), TLS, managed identity
Boomi (mediation, mapping, validation)
    ↓  correlation ID + idempotency key
SAP CIG (validation & routing)
    ↓  standard SAP-native interface (no custom Z endpoints)
Ariba User Import API
    ↓  acknowledgement + outcome code
Boomi
    ↓
Cloud Logging (audit trail with correlation ID, no sensitive payload)
    ↓
Cloud Monitoring alert on failure + dead-letter for unrecoverable events
```

- Every failure is detected at the point of failure, not the next morning
- Every provisioning event is end-to-end traceable via a single correlation ID
- Idempotency prevents duplicate users on retry
- Both systems remain loosely coupled — schema and lifecycle changes are managed through Boomi

---

## What Should NOT Be Done

| Anti-Pattern | Why It Violates Principles |
|---|---|
| Hardcoded credentials in Boomi configuration | Violates **Architecture Assurance Guardrails** and **Identity & Access Management Policy** — secrets must come from a centralized secret manager |
| Custom Z endpoints in CIG when standard SAP-native interfaces exist | Violates **Single ERP, Minimal Customization** — SAP integration should use standard interfaces first |
| No correlation IDs, no structured error handling, no idempotency keys | Violates **Observability and Reliability by Design** and SAP Integration Pattern guidance |
| Direct Boomi → Ariba adapter that bypasses CIG | Adds custom SAP integration surface area; violates **Single ERP, Minimal Customization** |
| Synchronous coupling of Workday to Ariba availability | Violates **Loosely Coupled and Interoperable Solutions** — provisioning should not fail because Ariba is briefly unavailable |
| Skipping environment progression (Sandbox → Dev → Prod) | Violates SAP Integration Patterns guidance on integration test discipline |

---

## Recommendation

**Approve the overall Boomi + SAP CIG architecture as the reference approach for Workday → Ariba user provisioning.** The proposal aligns with Entegris integration principles — Boomi as the mediation layer, SAP CIG as the vendor-native bridge to Ariba, published APIs on both ends, existing connections reused rather than rebuilt.

**Approval should be conditional on the following being specified before build begins:**

1. Authentication and secrets management at every hop — managed identity or centralized secret manager; no hardcoded credentials.
2. Data classification of the payload and confirmation of TLS in transit at every hop.
3. Idempotency design — end-to-end correlation ID and Ariba idempotency key.
4. Audit-log destinations and monitoring for both success and failure paths.
5. Failure handling — dead-letter storage, retry policy, alerting, and reconciliation ownership.
6. Interaction style decision (event-driven vs scheduled batch), which determines the canonical Boomi ↔ CIG pattern.

**Before finalizing the design, the following should be confirmed:**

1. Whether Workday can publish user lifecycle events, or whether Boomi will pull on a schedule.
2. The SLA for latency between a Workday change and the Ariba user update.
3. Whether Boomi's transformation stage and CIG's mapping stage overlap — transformations should live in one place to avoid divergence.
4. The specific PII fields exchanged, so a data-privacy review can be scoped if needed.

---

## Governing Principles Referenced

- **Integration Through Standard Middleware** *(Architecture Principle — Boomi is the standard integration platform)*
- **Internet and API First** *(Architecture Principle — published APIs, not internal network dependencies)*
- **Single ERP, Minimal Customization** *(Architecture Principle — vendor-native SAP integration, not custom adapters)*
- **Loosely Coupled and Interoperable Solutions** *(Enterprise Principle — no schema or lifecycle coupling between HR and procurement)*
- **Observability and Reliability by Design** *(Technology Principle — logging, metrics, tracing, alerting required)*
- **Security and Privacy by Design** *(Security Principle — auth, encryption, secrets management)*
- **Data Quality at the Source** *(Data Principle — Boomi validation stage aligns)*
- **Applications Expose Stable, Documented Interfaces** *(Application Principle — Workday and Ariba published APIs)*
- **Reuse Shared Application Services First** *(Application Principle — existing connections reused, not rebuilt)*
- **Identity & Access Management Policy** *(Cybersecurity Policy — governs secrets and authentication)*
- **Architecture Assurance Guardrails** *(governs the "no hardcoded secrets" requirement)*
- **Data Classification Standard** *(governs PII handling)*
- **SAP Integration Patterns** *(Architecture Pattern — Async, Batch API, Sync patterns referenced for the Boomi ↔ CIG leg)*
