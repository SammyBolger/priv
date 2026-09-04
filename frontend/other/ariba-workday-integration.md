# One Pager: Ariba ↔ Workday Integration

**Use Case:** Determine the correct integration pattern for connecting Ariba (SAP procurement) with Workday (HR/Finance) at Entegris.
**Prepared by:** Sam Bolger, EA Intern | AI-assisted analysis | **Date:** 2026-05-29 | **Status:** Draft

---

## The Question

> *"How should Entegris integrate Ariba and Workday? The current proposal uses SFTP file-based exchange — is this the right approach?"*

---

## AI Assessment: SFTP Requires Exception Approval — API-First Integration via Boomi Is the Default

**Verdict: SFTP is not the default approach under Entegris architecture standards. API-based integration via Boomi is required unless an explicit exception has been approved. The specific integration pattern (synchronous, batch API, or asynchronous) should be selected per use case.**

> *Note: Ariba is an SAP product (SAP Ariba). The SAP Integration Patterns documented in the EA knowledge base apply directly to Ariba integrations and are the reference patterns used in this assessment.*

---

## What the Principles Say About SFTP

The **Integration Through Standard Middleware** principle states:

*"Application-to-application integration should use the enterprise integration platform (Boomi) rather than direct point-to-point connections or file-based transfers. File-based integration is a legacy pattern and should not be introduced in new solutions."*

The **API-First Integration Position** states:

*"SFTP and other file-based exchanges are treated as exception patterns that require explicit approval and a managed sunset plan."*

These are not edge-case guidelines — they reflect Entegris's deliberate architectural direction away from file-based integration. Any SFTP-based design for Ariba ↔ Workday must go through an exception process and include a migration plan to API-based integration.

---

## What the Principles Say About the Right Approach

### ✅ Integration Through Standard Middleware *(Technology Principle)*

Boomi is the documented enterprise integration platform. All integration between Ariba and Workday should be mediated through Boomi — providing governance, logging, retry handling, and a consistent operational model.

### ✅ Internet and API First *(Technology Principle)*

*"New integration designs must use published APIs, not internal network dependencies."*

Where Ariba and Workday offer published APIs that meet the business requirement, those APIs are the correct integration interface. File-based transfers should not substitute for API access where an API is available.

### ✅ Loosely Coupled and Interoperable Solutions *(Enterprise Principle)*

*"Solutions should be designed with loose coupling, clear interfaces, and interoperability standards so they can evolve independently and integrate cleanly."*

File-based integration creates tight coupling at the schema and schedule level. Changes to file formats require coordinated releases across both systems. API contracts, when versioned correctly, allow each system to evolve independently.

### ✅ Observability and Reliability by Design *(Technology Principle)*

File transfers can fail silently — errors are discovered hours later during reconciliation. Boomi-mediated API integration provides correlation IDs, structured error handling, retry logic, and operational dashboards that make failures visible immediately.

---

## Illustrative Integration Patterns by Scenario

*These are example use cases based on documented EA patterns. Actual flows for Entegris should be confirmed with the integration and business owners.*

| Illustrative Scenario | Recommended Pattern | Why |
|---|---|---|
| Real-time vendor/supplier data lookup | **Synchronous API (Request/Reply)** via Boomi | Requires immediate confirmation before process continues; low-to-moderate volume |
| Scheduled org hierarchy or cost center sync | **Batch API (Scheduled Extract/Load)** via Boomi | Business process tolerates batch cadence; data changes infrequently |
| Procurement event notifications | **Asynchronous (Event-Driven)** via Boomi | Decoupled processing; downstream does not need an inline response |

> **On volume:** If a scenario genuinely requires very high-volume data movement (100K+ records or >1GB), Aecorsoft is the documented alternative for large SAP loads. This is still not SFTP — it is a separate approved tool for a specific scale threshold.

---

## What Good Looks Like

```
System A → Boomi (mediation layer) → System B API
              ↓
         Correlation ID + structured error handling
              ↓
         Cloud Logging (audit trail)
              ↓
         Cloud Monitoring alert on failure
```

- Integration failures are detected at the point of failure, not the next morning
- Each transaction is traceable with a correlation ID
- Both systems remain loosely coupled — interface changes are managed through versioned APIs

---

## What Should NOT Be Done

| Anti-Pattern | Why It Violates Principles |
|---|---|
| New SFTP file drop from Ariba to Workday | Violates **Integration Through Standard Middleware** and **API-First Integration Position** — requires explicit exception and sunset plan |
| Direct database-to-database sync | Violates **Loosely Coupled** principle — bypasses middleware governance, creates hidden dependencies |
| Custom scripts outside Boomi | Violates **Integration Through Standard Middleware** — unmanaged, unobservable, and not supportable at scale |
| No correlation IDs, error handling, or retry logic | Violates **Observability and Reliability by Design** |

---

## Recommendation

**Do not approve SFTP as the integration mechanism for Ariba ↔ Workday without explicit exception approval and a documented sunset plan.**

Use **Boomi as the integration middleware** with the appropriate pattern selected per use case, based on:
- Latency requirement (real-time vs. batch window)
- Data volume (standard Boomi vs. Aecorsoft for very high volume)
- Transactional requirement (synchronous confirmation needed or eventual consistency acceptable)

If an SFTP-based design is already in flight, it should be treated as a time-limited exception with an agreed migration path — not a permanent integration pattern.

**Before finalizing any integration design, the following should be confirmed:**
1. Which specific data flows exist between Ariba and Workday (vendor sync, org data, approvals, worker data, etc.)
2. Whether Ariba and Workday's available APIs meet the latency and volume requirements for each flow
3. Who owns the integration operationally (monitoring, error response, data reconciliation)

---

## Governing Principles Referenced
- API-First Integration *(Position — explicitly treats SFTP as exception pattern)*
- Integration Through Standard Middleware *(Technology Principle — explicitly names file-based integration as legacy)*
- Internet and API First *(Technology Principle)*
- Loosely Coupled and Interoperable Solutions *(Enterprise Principle)*
- Observability and Reliability by Design *(Technology Principle)*
- SAP Integration Patterns — Synchronous API, Batch API, Asynchronous, Aecorsoft *(Architecture Pattern)*
