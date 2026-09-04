# Integration Reference Architecture — SAP Integration Patterns

## SAP Integration Patterns

**Version:** 0.1
**Status:** Draft – Pending Architecture Review
**Audience:** Solution Architects, Integration Engineers, Security and Operations Teams

---

## Document Introduction

### Purpose of Document

This document defines approved patterns for integrating Entegris applications and platforms with SAP systems. It helps teams choose the right SAP interaction style based on transactionality, volume, latency, and SAP-native interface options.

- The value of the pattern is speed to execution — leveraging what others have done before and quickly achieving business outcomes
- A pattern is best expressed as: When to use, When Not to use certain technologies/approaches
- This document is for designers and architects who need to integrate with SAP using the right middleware, protocol, and operational model for each business scenario
- If implemented properly, these patterns enable you to get to production as fast as possible and have the most stable, scalable, and maintenance-free set of applications possible

### Scope and Applicability

These patterns cover synchronous, batch, SAP-native, and asynchronous integration approaches between SAP and the broader Entegris estate.

- SAP request/reply, batch, and event-style integrations mediated through approved middleware
- Use of SAP-native interfaces such as IDoc, RFC/BAPI, and OData for standardized connectivity

**Environments:**

- Cloud
- Hybrid

### Intended Audience

- Solution Architects
- Integration Engineers
- SAP Engineers
- Security and Operations Teams

---

## Context

- Boomi is the standard middleware for SAP integration across most scenarios
- Aecorsoft is approved only for large-volume SAP data loads where Boomi is not appropriate
- Boomi SAP adapters should be preferred over custom connectivity when a standard interface is available
- BTP may be used for more complex custom interfaces that cannot be met with standard adapter patterns

### Why Use These Patterns

- Reduce cost through consolidation of functionality
- Agility through solutions based on a set of services that supports restructuring and reconfiguration of business processes
- Time-to-market through business-aligned solutions
- Alignment between IT and business goals, enabling re-use over time

---

## Architecture Principles

### Enterprise Principles

- Loosely Coupled and Interoperable Solutions
- Platform Over Point Solutions
- Keep It Simple

### Domain-Specific Principles

- Single ERP, Minimal Customization
- Integration Through Standard Middleware
- Single Source of Truth

### Security Principles

- Security and Privacy by Design
- Security Assurance Through Least Privilege
- Defense in Depth

---

## High-Level Solution Patterns

| Solution | When to Use | When Not to Use |
|---|---|---|
| Synchronous API (Request/Reply) |• Need immediate business response from SAP<br>• Volume is moderate and user or process flow is latency-sensitive|• The use case is high-volume batch extraction<br>• Long-running processing would cause timeouts or poor user experience|
| Batch SFTP (File-based Extract/Load) |• Need scheduled large-file exchange with SAP or adjacent systems<br>• Payloads are naturally file-oriented|• The use case requires immediate interactive response<br>• The data volume is so large that Aecorsoft should be used instead|
| Batch API (Scheduled Extract/Load) |• Need scheduled integration through API-style calls<br>• Business latency is measured in batch windows|• Real-time transactional interaction is required<br>• Repeated polling would create unnecessary load or poor fit|
| SAP IDoc / RFC / OData (SAP-native) |• Need a standard SAP-native interface for document, function, or REST-style integration<br>• A Boomi SAP adapter or approved SAP capability exists|• Teams want to build custom Z endpoints without exhausting standard options<br>• The interface style is mismatched to the SAP business object behavior|
| Asynchronous Pattern (Fire-and-forget / event-triggered) |• Need decoupled processing with eventual consistency<br>• SAP does not need to respond in-line to the caller|• The business operation requires immediate synchronous confirmation<br>• Consumers cannot handle eventual consistency or delayed failure handling|

---

## Pattern Selection Matrix

| Scenario Cue | Interaction Type | Volume | Direction | Recommended Pattern | Notes |
| --- | --- | --- | --- | --- | --- |
| Customer lookup during order entry | Synchronous request/reply | Low to moderate | App ↔ SAP | Synchronous API (Request/Reply) | Use Boomi SAP adapter with 30-second timeout; implement fallback to cached data for resilience |
| Large nightly material master extract | Batch file transfer | Very high | SAP → GCP | Batch SFTP (File-based Extract/Load) | Use Aecorsoft (not Boomi) when volume exceeds 100K records or 1GB file size |
| Scheduled pull of standard SAP dataset | Batch API polling | Moderate | SAP → GCP | Batch API (Scheduled Extract/Load) | Run during SAP batch windows (8pm-6am PST) to avoid peak production load |
| Standard order document exchange | SAP-native async or function call | Moderate | SAP ↔ Enterprise | SAP IDoc / RFC / OData (SAP-native) | Use standard IDoc types (ORDERS05, MATMAS05) before creating custom Z interfaces |
| Event-driven outbound notification | Asynchronous fire-and-forget | Moderate | SAP → Consumer | Asynchronous Pattern (Fire-and-forget / event-triggered) | Publish SAP events to Pub/Sub with message deduplication enabled to handle retries |

---

## Canonical Patterns

### Synchronous API (Request/Reply)

| Area | Description |
|---|---|
| **Context** | A business process or user interaction needs an immediate response from SAP before it can continue. The integration must be reliable enough for in-line execution. |
| **Problem** | How do we call SAP synchronously without bypassing middleware, losing observability, or creating duplicate transactional side effects? |
| **Solution** | • Use Boomi as the mediation layer for synchronous request/reply interactions between the caller and SAP<br>• Prefer standard SAP interfaces exposed through approved adapters or APIs that match the required business function<br>• Propagate correlation IDs and design retries carefully so transient failures do not create duplicate writes |
| **Benefits** | • Supports business flows that need immediate confirmation from SAP<br>• Keeps middleware governance, logging, and policy enforcement in the path<br>• Allows consistent operational support with traceable transaction context |
| **Considerations** | • Long-running SAP operations may not fit synchronous user or API timeout limits<br>• Write operations must account for atomic commit behavior and safe retry design |

### Batch SFTP (File-based Extract/Load)

| Area | Description |
|---|---|
| **Context** | A SAP integration exchanges large datasets on a scheduled basis and file-oriented transfer is the natural contract. Operations teams need clear handoff points and reconciliation. |
| **Problem** | How do we move scheduled SAP files safely and at scale without forcing interactive or chatty API patterns onto a batch workload? |
| **Solution** | • Use a managed file exchange pattern mediated through the approved integration platform and secure transport such as SFTP<br>• Select Aecorsoft only for large-volume SAP loads where Boomi is not the right operational or performance fit<br>• Track file receipt, processing status, and replay metadata so batch support teams can reconcile each transfer |
| **Benefits** | • Fits large scheduled extracts and loads cleanly<br>• Provides explicit operational checkpoints for reconciliation and reprocessing<br>• Avoids forcing high-volume workloads through inappropriate synchronous designs |
| **Considerations** | • File contracts and encryption practices must be governed carefully with SAP and downstream owners<br>• Very high-volume interfaces should be justified explicitly when selecting Aecorsoft over Boomi |

### Batch API (Scheduled Extract/Load)

| Area | Description |
|---|---|
| **Context** | A SAP dataset can be retrieved or loaded on a schedule through API-oriented interaction rather than file exchange. The business process tolerates batch latency. |
| **Problem** | How do we use scheduled SAP APIs efficiently without creating needless polling load or hiding failures in custom scripts? |
| **Solution** | • Use Boomi and the SAP adapter to execute scheduled extract or load operations against approved SAP APIs<br>• Align schedules to business windows and API capacity so loads are predictable and supportable<br>• Persist run state, correlation IDs, and response outcomes for replay and operational troubleshooting |
| **Benefits** | • Supports batch semantics while retaining API-level structure and middleware governance<br>• Reduces the operational overhead of bespoke scripts<br>• Improves consistency of logging, retry, and error routing |
| **Considerations** | • Polling schedules should be reviewed to ensure a true event or native SAP interface would not be a better fit<br>• Large dataset pagination and timeout handling require careful design |

### SAP IDoc / RFC / OData (SAP-native)

| Area | Description |
|---|---|
| **Context** | The business object or process maps naturally to a standard SAP-native integration interface. Entegris wants to maximize supportability and minimize unnecessary custom SAP endpoints. |
| **Problem** | How do we choose and use the right SAP-native interface while preserving standardization and avoiding unnecessary custom development? |
| **Solution** | • Use Boomi SAP adapters with standard SAP-native interfaces such as IDoc for document exchange, RFC/BAPI for function calls, or OData for RESTful access<br>• Select the interface style that best matches the business semantic and processing pattern rather than forcing one style everywhere<br>• Avoid custom Z endpoints unless a documented business need remains after evaluating the standard SAP options and BTP alternatives |
| **Benefits** | • Improves compatibility with standard SAP capabilities and support models<br>• Reduces custom integration maintenance over time<br>• Helps align interface choice to native SAP business semantics |
| **Considerations** | • Teams need SAP-specific expertise to choose the right interface for each business object and transaction<br>• Custom extensions should go through stronger architecture review because they increase lifecycle cost |

### Asynchronous Pattern (Fire-and-forget / event-triggered)

| Area | Description |
|---|---|
| **Context** | A process can continue without waiting for SAP to respond in-line and eventual consistency is acceptable. Decoupling improves resilience and throughput for the business flow. |
| **Problem** | How do we integrate with SAP asynchronously while preserving reliability, idempotency, and operational visibility? |
| **Solution** | • Publish the request or event through Boomi using an asynchronous design and let SAP process it out of band<br>• Carry correlation IDs and idempotency keys so retries or duplicate deliveries can be detected safely<br>• Monitor acknowledgements, failures, and compensating actions through structured logs and operational dashboards |
| **Benefits** | • Improves resilience by decoupling the initiating process from SAP availability and latency<br>• Supports higher throughput for non-interactive workloads<br>• Fits document-style or event-driven enterprise integration scenarios well |
| **Considerations** | • Business teams must understand and accept eventual consistency behavior<br>• Failure handling requires clear ownership when the initiating caller is no longer waiting synchronously |

## Sequence Diagrams

### Synchronous API (Request/Reply) Flow

```mermaid
sequenceDiagram
    participant Call as Calling App
    participant Boo as Boomi
    participant SAP as SAP
    participant Obs as Operational Logs

    Call->>Boo: Send business request with correlation ID
    Boo->>SAP: Invoke approved SAP API or adapter operation
    Note right of SAP: Keep retries idempotent to avoid duplicate writes
    SAP-->>Boo: Immediate business response
    Boo->>Obs: Persist request and response trace
    Boo-->>Call: Return mapped response
```

### Batch SFTP (File-based Extract/Load) Flow

```mermaid
sequenceDiagram
    participant Sch as Batch Scheduler
    participant SAP as SAP
    participant Int as Boomi or Aecorsoft
    participant SFTP as Managed SFTP Exchange
    participant Tgt as Target System
    participant Ops as Batch Support Log

    Sch->>SAP: Start scheduled file extract or load job
    SAP-->>Int: Produce or receive business file
    Note right of Int: Use Aecorsoft only for justified very high-volume SAP loads
    Int->>SFTP: Transfer encrypted file package
    SFTP-->>Tgt: Deliver file to receiving endpoint
    Tgt-->>SFTP: Acknowledge receipt
    SFTP-->>Int: Delivery status and transfer result
    Int->>Ops: Record file status, replay metadata, and reconciliation details
```

### Batch API (Scheduled Extract/Load) Flow

```mermaid
sequenceDiagram
    participant Sch as Batch Scheduler
    participant Boo as Boomi SAP Adapter
    participant SAP as SAP API
    participant State as Run State Store
    participant Ops as Operations Log

    Sch->>Boo: Start scheduled SAP batch API run
    Boo->>State: Read last run state and correlation context
    State-->>Boo: Previous checkpoint
    Note right of State: Persist checkpoints so scheduled retries resume safely after failure
    Boo->>SAP: Execute scheduled extract or load call
    SAP-->>Boo: Paginated batch response
    Boo->>Ops: Persist outcome and troubleshooting details
    Boo->>State: Save next checkpoint after successful completion
    Boo-->>Sch: Report run completion
```

### SAP IDoc / RFC / OData (SAP-native) Flow

```mermaid
sequenceDiagram
    participant App as Calling App
    participant Boo as Boomi SAP Adapter
    participant IF as SAP-native Interface
    participant SAP as SAP Core
    participant Obs as Integration Logs

    App->>Boo: Submit business request or document
    Boo->>IF: Use standard IDoc, RFC/BAPI, or OData interface
    Note over Boo,IF: Prefer standard SAP-native interfaces before custom Z endpoints
    IF->>SAP: Execute native SAP business function
    SAP-->>IF: Processing result or acknowledgement
    IF-->>Boo: Standardized SAP response
    Boo->>Obs: Capture interface type and transaction trace
    Boo-->>App: Return mapped business outcome
```

### Asynchronous Pattern (Fire-and-forget / event-triggered) Flow

```mermaid
sequenceDiagram
    participant Src as Initiating System
    participant Boo as Boomi Async Flow
    participant SAP as SAP
    participant Mon as Monitoring Dashboard

    Src->>Boo: Publish async request with idempotency key
    Boo-->>Src: Acknowledge receipt
    Note right of Boo: Caller continues without waiting for SAP completion
    Boo->>SAP: Deliver request out of band
    SAP-->>Boo: Processing acknowledgement or failure status
    Boo->>Mon: Update dashboards with correlation IDs and retries
    Mon-->>Src: Support team can trace final outcome asynchronously
```

---

## Tips and Best Practices

- Store SAP credentials in GCP Secret Manager with automatic rotation every 90 days
- Use Aecorsoft for batch extracts exceeding 100K records; use Boomi for transactional flows under 10K records
- Log all IDoc and BAPI correlation IDs to Cloud Logging for SAP troubleshooting
- Land raw SAP payloads in GCS Bronze before any transformation to preserve audit trail
- Test SAP integrations in Sandbox first, then Dev, then Prod - never skip environments
