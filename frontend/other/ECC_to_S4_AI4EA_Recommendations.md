# One Pager: ECC → S/4 (RISE) Integration Pattern Recommendations

**Use Case:** For each of the 36 ECC↔Boomi integration patterns inventoried in the working view, apply Entegris architecture principles, policies, standards, and guardrails to produce a specific recommendation for the S/4 (RISE) future state.
**Prepared by:** Sam Bolger, EA Intern | AI-assisted analysis using the Entegris AI4EA knowledge base | **Date:** 2026-07-13 | **Status:** Draft — For EA and Integration Review

---

## The Question

> *"36 ECC↔Boomi integration patterns have been inventoried in preparation for S/4 (RISE) readiness. For each pattern, what does the Entegris knowledge base — principles, policies, standards, patterns, guardrails — recommend for the future-state placement decision?"*

---

## AI4EA Assessment: Pattern-by-Pattern Recommendation, Anchored to the Existing Entegris Integration Standards

**Verdict: The pattern-based assessment approach adopted in the working view is directly consistent with the Entegris knowledge base — specifically the SAP Integration Patterns document, which already codifies canonical treatments (Synchronous API, Batch SFTP, Batch API, SAP-native IDoc/RFC/OData, Asynchronous). The 32 non-critical patterns can be classified against those canonical treatments and against the Boomi-as-middleware principle. The 4 patterns tagged Very High clean-core risk (P05 custom Z RFC, P17 direct table extraction, P30 RPA/screen automation, P31 custom Z-table read/write) fail one or more Entegris principles at design time and should be treated as retire/replace candidates before S/4 design freeze, not carried forward on the assumption that they can be repointed. The single most consequential cross-cutting requirement — applicable to every one of the 36 patterns — is the guardrail set on authentication, secrets management, TLS in transit, least-privilege IAM, and structured audit logging, all of which must be validated per-pattern before build.**

> *Note: Ariba, SuccessFactors, and related SAP cloud apps referenced in the working view (P25) fall under the SAP Integration Patterns' guidance on standard SAP-native interfaces. The SAP Integration Patterns document (`docs/patterns/integration/sap-integration-pattern.md`) is the primary Entegris reference for every SAP-adjacent recommendation below.*

---

## What the Knowledge Base Says About the Exercise

### ✅ Integration Through Standard Middleware *(Architecture Principle)*

*"Application-to-application integration should use the enterprise integration platform (Boomi) rather than direct point-to-point connections or file-based transfers. File-based integration is a legacy pattern and should not be introduced in new solutions."*

This principle directly supports keeping Boomi as the enterprise integration platform through the S/4 transition. It does not prescribe Boomi vs. SAP Integration Suite for every scenario — it prescribes governed middleware over point-to-point. The working view's placement rules (Boomi for B2B/orchestration/non-SAP, SAP-native for SAP-to-SAP) are consistent with this principle.

### ✅ Internet and API First *(Architecture Principle)*

*"New integration designs must use published APIs, not internal network dependencies. Solutions requiring VPN or internal network access by design should be escalated for architectural review."*

This principle is the load-bearing rationale for retiring direct table extraction (P17), custom Z-table reads (P31), and any pattern that relies on ECC internal network access surviving the move to RISE (P21). It also frames the RISE connectivity redesign as mandatory rather than optional.

### ✅ Single ERP, Minimal Customization *(Architecture Principle)*

*"Entegris maintains a single SAP instance with minimal customization to reduce upgrade debt and integration complexity."*

This is the principle every "clean core" concern in the working view maps to. Custom Z RFCs (P05), custom Z-tables (P31), custom ABAP triggers on ECC (P04), and RPA workarounds for missing APIs (P30) all violate this principle. It is also why the SAP Integration Patterns document explicitly says "prefer standard SAP-native interfaces before custom Z endpoints."

### ✅ Loosely Coupled and Interoperable Solutions *(Enterprise Principle)*

*"Solutions should be designed with loose coupling, clear interfaces, and interoperability standards so they can evolve independently and integrate cleanly. Synchronous dependencies should be minimized where practical; asynchronous patterns preferred for resilience."*

This principle biases every future-state decision toward event-driven / asynchronous patterns over synchronous polling and toward released APIs over direct database coupling. It supports the treatment of P19 (event-driven), P20 (polling → events), and P17 (direct DB → CDS/API).

### ✅ Observability and Reliability by Design *(Technology Principle)*

*"All technology systems should be designed with observability built in from the start — including logging, metrics, tracing, and alerting. Logging, metrics, and distributed tracing should be implemented using enterprise-standard tooling (GCP Cloud Operations / Cloud Monitoring)."*

This principle is directly violated by P23 (Boomi-only technical monitoring, no end-to-end business visibility) and P33 (manual reprocessing without runbooks). It also underwrites the correlation-ID requirement in every canonical pattern in the SAP Integration Patterns document.

### ✅ Security Assurance Through Least Privilege *(Security Principle)*

*"People and systems should only have access to information and resources necessary for their legitimate purpose."*

Applies to P22 (technical users / basic auth), P05 and P31 (direct code / table access bypassing SAP authorization checks), and to every hop where authentication design is unspecified.

### ✅ Architecture Assurance Guardrails *(Governance)*

The guardrails document mandates the following secure-by-design constraints for **every** integration pattern regardless of type: no custom authentication schemes for humans (enterprise SSO), service-to-service auth via managed identity or workload identity federation, no hardcoded secrets (centralized secret manager), TLS in transit and encryption at rest, least-privilege IAM (no wildcard permissions), input validation at trust boundaries, and structured audit logging without sensitive-payload leakage. Every one of the 36 patterns must be re-certified against this list before S/4 build.

---

## Per-Pattern AI4EA Recommendations (All 36)

Each row applies Entegris principles and the SAP Integration Patterns canonical treatments to the specific pattern from the working view. Principle names are quoted verbatim from the AI4EA knowledge base. The **Escalate** column flags patterns that require EA / SAP Custom Code / Security decisions before S/4 design freeze.

| # | Pattern (from Register) | AI4EA Recommendation | Principles / Guardrails Cited | Escalate |
|---|---|---|---|---|
| **P01** | Outbound IDoc: ECC → Boomi (ALE/tRFC/qRFC) | **Retain via Boomi with S/4 validation.** Map to the SAP Integration Patterns' *Asynchronous* and *SAP IDoc/RFC/OData (SAP-native)* canonical patterns. Validate every IDoc type against S/4 simplification items; remediate custom segments before cutover. | Integration Through Standard Middleware; Loosely Coupled and Interoperable Solutions | No |
| **P02** | Inbound IDoc: Boomi → ECC | **Retain-with-validation.** Prefer released S/4 transactional APIs where available (per SAP Integration Patterns: *"prefer standard SAP-native interfaces before custom Z endpoints"*). Use Boomi for canonical mapping and partner delivery. | Integration Through Standard Middleware; Single ERP, Minimal Customization | No |
| **P03** | Synchronous BAPI: Boomi → ECC | **Modernize.** Evaluate released S/4 OData/SOAP APIs first per the SAP Integration Patterns' *Synchronous API (Request/Reply)* canonical treatment — mediate through Boomi, propagate correlation IDs, design retries to be idempotent. Keep BAPI only where SAP explicitly supports it in S/4. | Internet and API First; Integration Through Standard Middleware; Observability and Reliability by Design | No |
| **P04** | ECC → Boomi via custom ABAP / proxy | **Modernize.** Custom ABAP triggers accumulate clean-core debt. Replace with S/4 business events, standard output management, or released outbound communication per *Single ERP, Minimal Customization*. Boomi remains the subscriber/distributor. | Single ERP, Minimal Customization; Keep It Simple; Loosely Coupled and Interoperable Solutions | No |
| **P05** | Custom Z RFC / function module called by Boomi | **RETIRE / REDESIGN.** Externalize business logic to a BTP side-by-side extension or an approved API. Preserving Z RFCs directly violates the principle. Do not carry forward on the assumption S/4 will support them. | Single ERP, Minimal Customization; Keep It Simple; Security Assurance Through Least Privilege | **YES — Very High clean-core** |
| **P06** | ECC OData via SAP Gateway consumed by Boomi | **Retain-with-validation.** Custom OData services must be re-validated against released S/4 APIs from the SAP Business Accelerator Hub. Repayload, re-authorize, verify pagination and throttling — do not just repoint. | Internet and API First; Applications Expose Stable, Documented Interfaces | No |
| **P07** | Boomi exposes ECC as a REST API to external apps | **Modernize.** Refactor the Boomi API layer to sit over released S/4 APIs rather than hiding unsupported backend calls. Add API governance per the *Applications Expose Stable, Documented Interfaces* principle. Reference the API Ingress pattern (`docs/patterns/integration/api-ingress-pattern.md`) for external exposure requirements. | Applications Expose Stable, Documented Interfaces; Platform Over Point Solutions; Internet and API First | No |
| **P08** | ECC writes flat file (AL11/SFTP) → Boomi | **Retain with controls.** Apply the SAP Integration Patterns' *Batch SFTP (File-based Extract/Load)* canonical treatment: managed file exchange through the approved integration platform, secure transport, reconciliation metadata, and replay tracking. Keep only where latency and business need justify the batch mode. | Integration Through Standard Middleware; Observability and Reliability by Design | No |
| **P09** | Boomi sends batch file → ECC for posting | **Assess pattern-by-pattern.** Move to S/4 approved import mechanisms (migration cockpit for master data, released APIs/IDocs for transactional loads). Custom loaders violate *Data Quality at the Source* — validate before posting. | Data Quality at the Source; Single ERP, Minimal Customization | No |
| **P10** | Boomi B2B/EDI → ECC IDoc (X12/EDIFACT/cXML) | **Retain-with-validation.** Boomi B2B is the enterprise pattern. Re-certify all partner flows against S/4 documents (BP model, tax/pricing changes). Schedule partner regression testing early — the Risk_SWOT specifically flags this as commonly underestimated. | Integration Through Standard Middleware; Loosely Coupled and Interoperable Solutions | No |
| **P11** | ECC → Boomi → partner (outbound EDI/cXML) | **Retain-with-validation.** Same reasoning as P10. Additionally verify S/4 output management triggers and IDoc conditions — output determination logic frequently changes across the ECC→S/4 boundary. | Integration Through Standard Middleware; Loosely Coupled and Interoperable Solutions | No |
| **P12** | MDM → Boomi → ECC (customer/vendor/material) | **Modernize.** Master data must land through S/4 Business Partner / CVI / material APIs. This is the highest-leverage master-data pattern in the inventory. Reference the MDM & Data Quality pattern (`docs/patterns/data/mdm-data-quality-pattern.md`). | Single Source of Truth; Data Quality at the Source; Data Domains and Accountability | No |
| **P13** | ECC master-data changes → Boomi → downstream | **Assess pattern-by-pattern.** Clarify system-of-record ownership per *Single Source of Truth* before selecting mechanism. Prefer S/4 business events over change pointers / custom extracts. Distribute via Boomi. | Single Source of Truth; Data Domains and Accountability; Loosely Coupled and Interoperable Solutions | No |
| **P14** | CRM / eCommerce orders → Boomi → ECC | **Modernize.** Use S/4 sales-order APIs/IDocs. Validate O2C with SD, credit, pricing, tax, and BP owners — the ECC→S/4 boundary breaks assumptions in these areas more often than most. | Applications Expose Stable, Documented Interfaces; Loosely Coupled and Interoperable Solutions | No |
| **P15** | Procurement / supplier platforms → Boomi → ECC | **Assess pattern-by-pattern.** Check SAP standard Ariba/S/4 integration content before defaulting to Boomi custom mapping. If SAP standard content covers the flow, prefer it per *Platform Over Point Solutions*. Keep Boomi for non-SAP partner variance only. | Platform Over Point Solutions; SaaS Before Custom Build | No |
| **P16** | Finance / banking / tax integrations via Boomi | **Retain with controls.** Boomi retains secure MFT/API orchestration. Every hop must be re-certified against the guardrails: TLS in transit, centralized secret manager for bank credentials, least-privilege service accounts, structured audit logging. FI functional sign-off is mandatory. | Security and Privacy by Design; Security Assurance Through Least Privilege; Architecture Assurance Guardrails; Observability and Reliability by Design | No |
| **P17** | Direct table extraction (JDBC / DB) from ECC | **RETIRE.** Replace with released CDS views, ODP, or approved change-data-capture patterns. Direct table access hard-couples to the ECC data model (which changes materially in S/4) and bypasses SAP authorization — violates the principle and the guardrails. | Single ERP, Minimal Customization; Internet and API First; Security Assurance Through Least Privilege; Architecture Assurance Guardrails | **YES — Very High clean-core** |
| **P18** | ECC / BW → data lake / warehouse | **Assess pattern-by-pattern.** Separate analytical replication from operational integration. Use S/4-approved extractors (CDS/ODP/BDC) or the SAP data platform. Reference the Data Ingestion pattern (`docs/patterns/data/data-ingestion-pattern.md`) and the Data Engineering pattern (`docs/patterns/data/data-engineering-ingestion-pattern.md`). | Data as a Strategic Asset; Data Domains and Accountability; Loosely Coupled and Interoperable Solutions | No |
| **P19** | Change pointers / IDoc trigger Boomi flows | **Event-driven candidate — requires validation.** Migrate to S/4 business events per the SAP Integration Patterns' *Asynchronous (Fire-and-forget / event-triggered)* canonical treatment. Event contracts must be business-object based and owned. | Loosely Coupled and Interoperable Solutions; Observability and Reliability by Design | No |
| **P20** | Boomi polls ECC periodically for changes | **Modernize.** Prefer event-driven or delta-capable APIs over polling. Polling on ECC tables is a common cause of hidden direct-DB dependencies. Retain polling only against S/4-approved endpoints with idempotent consumers. | Loosely Coupled and Interoperable Solutions; Single ERP, Minimal Customization | No |
| **P21** | Boomi to on-prem ECC via internal network / VPN | **Likely redesign — RISE connectivity is mandatory rework.** *"Reliance on internal network is a design red flag"* per the *Internet and API First* principle. Redesign the network path, certificate chain, and Atom placement for RISE private connectivity before design freeze. | Internet and API First; Architecture Assurance Guardrails (TLS in transit); Security Assurance Through Least Privilege | **YES — decision required before design freeze** |
| **P22** | Technical users / basic auth / certs from Boomi to ECC | **Likely redesign.** Broad technical users and basic auth violate the guardrails and *Security Assurance Through Least Privilege*. Move to managed identity, OAuth/JWT, least-privilege communication users, and centralized secret rotation. Reference the Identity & Access Management Policy (`docs/policies/cybersecurity/identity-access-management-policy.md`). | Security Assurance Through Least Privilege; Architecture Assurance Guardrails (no hardcoded secrets); Identity & Access Management Policy | **YES — security redesign required** |
| **P23** | Boomi technical monitoring only (no end-to-end) | **Likely redesign.** Directly violates *Observability and Reliability by Design*, which requires "logging, metrics, tracing, and alerting built in from the start" using enterprise-standard tooling. Define end-to-end correlation ID, business-process status, SLA dashboards, and error owners. | Observability and Reliability by Design; Architecture Assurance Guardrails (structured audit logging) | No |
| **P24** | Boomi APIs expose ECC services with limited governance | **Modernize.** Every API needs a business owner, versioned contract, SLA, security policy, and deprecation path per *Applications Expose Stable, Documented Interfaces*. Add API lifecycle governance. | Applications Expose Stable, Documented Interfaces; Platform Over Point Solutions | No |
| **P25** | Boomi connects ECC to SAP cloud apps (Ariba, SuccessFactors, Concur, IBP, SAC) | **Assess pattern-by-pattern.** SAP standard/prebuilt integration content is preferred over custom Boomi mapping for SAP-to-SAP flows per *Platform Over Point Solutions* and *SaaS Before Custom Build*. Keep Boomi as the exception only where standard content genuinely does not fit. | Platform Over Point Solutions; SaaS Before Custom Build | No |
| **P26** | MES / OT / manufacturing → ECC via Boomi | **Assess pattern-by-pattern.** OT/IT boundary orchestration. Use S/4 manufacturing APIs/IDocs/events; consider SAP Digital Manufacturing where in scope. Reference the OT Streaming pattern (`docs/patterns/infrastructure/ot-streaming-pattern.md`) for edge/gateway concerns. | OT and IT Architecture Convergence; Loosely Coupled and Interoperable Solutions | No |
| **P27** | WMS / TMS / shipping → ECC via Boomi | **Dependency-driven.** Cannot be finalized until the S/4 EWM/TM target model is decided. Align to that decision, keep Boomi for 3PL/carrier partner integration. | Loosely Coupled and Interoperable Solutions; Platform Over Point Solutions | No |
| **P28** | PLM / R&D → ECC via Boomi (BOM/material/documents) | **Assess pattern-by-pattern.** Clarify BOM/material ownership before technical mapping. Middleware should not carry business semantics. | Single Source of Truth; Data Domains and Accountability | No |
| **P29** | Boomi triggers approvals / tasks from ECC events | **Assess pattern-by-pattern.** SAP-core approvals belong in S/4 workflow / SAP Build; cross-app enterprise workflow can remain in Boomi/ServiceNow. Split by ownership. | Applications Serve a Single Clear Capability; Keep It Simple | No |
| **P30** | RPA / screen automation of SAP GUI | **RETIRE.** GUI automation is brittle (fails *Observability and Reliability by Design*) and bypasses SAP authorization (fails *Security Assurance Through Least Privilege*). Replace with released S/4 API, event, or workflow. S/4 Fiori UI changes will break these bots regardless. | Single ERP, Minimal Customization; Keep It Simple; Observability and Reliability by Design; Security Assurance Through Least Privilege | **YES — Very High clean-core** |
| **P31** | Boomi reads/writes ECC custom Z-tables (JDBC/RFC/direct writes) | **RETIRE.** Move any staging or cross-reference state to Boomi or a side-by-side data platform; write to S/4 only via approved APIs/IDocs. Direct table writes fail the guardrails and the principle unambiguously. | Single ERP, Minimal Customization; Internet and API First; Architecture Assurance Guardrails; Security Assurance Through Least Privilege | **YES — Very High clean-core** |
| **P32** | One-time ECC data migration / carve loads | **Separate migration track.** Not a steady-state integration pattern. Use SAP migration cockpit or approved migration tooling; label separately in the interface inventory to avoid confusion with run-state patterns. | Keep It Simple; Data Quality at the Source | No |
| **P33** | Manual reprocessing of failed messages | **Likely redesign.** *Observability and Reliability by Design* requires automated retry, dead-letter, correlation IDs, dashboards, and runbooks. Manual reprocessing is a symptom of missing design, not an accepted operational mode. | Observability and Reliability by Design; Architecture Assurance Guardrails (structured audit logging) | No |
| **P34** | Boomi coordinates ECC with BW / PI-PO / BTP / SaaS / non-SAP | **Govern by decision matrix.** The working view's Decision_Guide already codifies the placement rules. Apply consistently; avoid double-hop middleware unless justified. | Platform Over Point Solutions; Keep It Simple | No |
| **P35** | AI / Agent access to ECC data via Boomi | **Future-state governed pattern.** Agents/APIs must access data through governed released APIs and events, not direct tables. Explainability, data quality, and human-in-the-loop apply. Reference the AI Patterns document (`docs/patterns/application/ai-patterns.md`). | AI Decisions Must Be Explainable; Responsible AI Must Be Embedded in Design; Data Quality Is Non-Negotiable for AI; Humans in the Loop for Material Decisions; Security Assurance Through Least Privilege | No |
| **P36** | Retirement / rationalization of unused interfaces | **Retire before S/4.** Unused interfaces carry conversion effort, false dependencies, and security exposure. Business owner must prove active dependency; otherwise decommission. | Remove Friction; Keep It Simple | No |

---

## Escalation Set — Decide Before S/4 Design Freeze

Four patterns tagged Very High clean-core risk in the working view fail one or more Entegris principles at design time and cannot be repointed to S/4 without redesign. These need EA + SAP Custom Code Owner + Security decisions before design freeze:

1. **P05 — Custom Z RFC / function modules.** Externalize to BTP side-by-side extension or approved API.
2. **P17 — Direct table extraction (JDBC / DB).** Replace with released CDS views, ODP, or approved CDC.
3. **P30 — RPA / screen automation of SAP GUI.** Replace with released S/4 API / event / workflow.
4. **P31 — Boomi reads/writes ECC custom Z-tables.** Move staging off SAP core; write to S/4 only via approved APIs/IDocs.

Two additional patterns should be resolved on a similar timeline because they gate the entire S/4 integration landscape:

- **P21 — RISE connectivity.** Network path, certificates, communication users, Atom placement all require redesign. This gates every remaining pattern.
- **P22 — Authentication / secrets model.** Move to managed identity, OAuth, least-privilege communication users, and centralized secret rotation. This gates the security review for every remaining pattern.

---

## Cross-Cutting Requirements That Apply to Every One of the 36 Patterns

Per the Architecture Assurance Guardrails, the following must be validated for every interface before build begins, regardless of pattern type. These are the "table stakes" the guardrails document identifies:

- **Authentication:** managed identity or workload identity federation for service-to-service; enterprise SSO for human users; **no custom authentication schemes.**
- **Secrets:** retrieved from a centralized secret manager. **No hardcoded credentials.**
- **Transport encryption:** TLS in transit at every hop; encryption at rest for any staging store.
- **Authorization:** least-privilege IAM at every hop. **No wildcard permissions.**
- **Input validation:** enforced at trust boundaries.
- **Audit logging:** structured, correlation-ID-tagged, no sensitive-payload leakage. Landed in enterprise-standard tooling (GCP Cloud Operations / Cloud Monitoring) per *Observability and Reliability by Design*.

Any pattern that cannot satisfy all six is a design gap, not an implementation gap.

---

## What Should NOT Be Done

| Anti-Pattern | Why It Violates the Knowledge Base |
|---|---|
| Treating S/4 as a repoint of ECC and letting existing Boomi flows carry over unchanged | Violates *Integration Through Standard Middleware*'s requirement that each pattern follow documented enterprise standards, and the working view's stated EA stance against blanket assumptions. |
| Preserving custom Z RFCs / Z-tables into S/4 by assumption | Violates *Single ERP, Minimal Customization* and *Keep It Simple*. |
| Direct database extraction from S/4 | Violates *Single ERP, Minimal Customization*, *Internet and API First*, and the guardrails on least-privilege IAM. |
| RPA / screen automation surviving into S/4 UX | Violates *Observability and Reliability by Design* (brittle, opaque) and *Security Assurance Through Least Privilege* (bypasses SAP authorization). |
| Hardcoded credentials or basic-auth technical users in Boomi | Violates the Architecture Assurance Guardrails (*"no hardcoded secrets"*) and the Identity & Access Management Policy. |
| Boomi monitoring only, with no end-to-end business-level visibility | Violates *Observability and Reliability by Design*. |
| SAP-to-SAP flows built as Boomi custom mappings when SAP standard content covers them | Violates *Platform Over Point Solutions* and *SaaS Before Custom Build*. |
| Skipping environment progression (Sandbox → Dev → Prod) to save time | Contrary to SAP Integration Patterns guidance and to standard governance. |

---

## Recommendation

**Adopt the working view's pattern-by-pattern assessment approach and use the per-pattern recommendations above as the AI4EA-grounded input to it.** The overall shape of the exercise — Boomi as the middleware, pattern-by-pattern classification, evidence-backed placement decisions — is consistent with the Entegris knowledge base.

**Priority sequence:**

1. **Design-freeze gates (weeks 1–3):** Resolve P21 (RISE connectivity) and P22 (auth/secrets model). Every remaining decision depends on these.
2. **Clean-core escalations (weeks 1–4):** Inventory and disposition P05, P17, P30, P31. These are retire/replace, not repoint.
3. **P1 canonical mapping (weeks 4–8):** Apply the SAP Integration Patterns canonical treatments (Sync / Batch SFTP / Batch API / SAP-native / Async) to the remaining P1 patterns. Validate S/4 API/event availability via SAP Business Accelerator Hub.
4. **P2/P3 assessment (weeks 6–10):** Analytics/PLM/workflow/AI-readiness patterns follow their own governance tracks.
5. **Cross-cutting guardrail certification (throughout):** Every pattern re-certified against the guardrail six before build begins.
6. **Retirement (throughout):** P36 candidates decommissioned unless business owner proves active dependency.

**Before finalizing any pattern's future-state placement:**

1. The end-to-end authentication chain must be specified.
2. The audit-log destination and correlation-ID design must be specified.
3. The failure / dead-letter / retry model must be specified.
4. The business owner for the pattern's semantics must sign off (per the Risk_SWOT: "business ownership missing for mappings" is a Medium/High risk).
5. For clean-core-risk patterns, the SAP Custom Code Owner must approve the retire/remediate/replace decision.

---

## Questions to Confirm Before Broader Circulation

1. **Interaction-style assumptions:** For P19 (event-driven candidate), can Workday / ECC actually publish business events to Boomi in the current landscape, or is polling the operational reality? This changes the recommendation for a cluster of patterns.
2. **SAP standard content coverage:** For P15 (procurement) and P25 (SAP-to-SAP), has anyone catalogued which SAP standard integration content exists for Entegris's specific SaaS estate (Ariba, SuccessFactors, Concur, IBP, SAC)? Without that catalogue, the "check standard content first" rule has no floor.
3. **RISE hosting decision:** Public vs. private cloud RISE materially changes the P21 connectivity redesign. Has this been decided?
4. **API governance ownership:** For P07 and P24 (Boomi APIs), who owns the enterprise API catalogue and lifecycle — is it Integration, EA, or a new API governance function?
5. **Master data system of record:** For P12 and P13, is Informatica MDM (or the current MDM hub) the authoritative publisher for BP / material / supplier, or is S/4 authoritative?
6. **AI/agent readiness scope:** For P35, is there an active AI initiative that needs S/4 data access, or is this a placeholder for future governance work?

---

## Governing Principles and Documents Referenced

*All principle names and quotes below are verbatim from the AI4EA knowledge base.*

**Architecture Principles**
- Internet and API First
- Integration Through Standard Middleware
- Single ERP, Minimal Customization
- Platform Over Point Solutions
- SaaS Before Custom Build
- Cloud-Smart by Default

**Enterprise Architecture Principles**
- Loosely Coupled and Interoperable Solutions
- Keep It Simple
- Remove Friction
- Demonstrate Trustworthiness and Stewardship

**Technology Principles**
- Observability and Reliability by Design
- Automate Where Possible
- Secure, Scalable, and Efficient Technology

**Application Principles**
- Applications Expose Stable, Documented Interfaces
- Applications Serve a Single Clear Capability
- Reuse Shared Application Services First

**Data Principles**
- Data as a Strategic Asset
- Data Quality at the Source
- Single Source of Truth
- Data Domains and Accountability

**Security Principles**
- Security and Privacy by Design
- Security Assurance Through Least Privilege

**AI Principles**
- AI Decisions Must Be Explainable
- Responsible AI Must Be Embedded in Design
- Data Quality Is Non-Negotiable for AI
- Humans in the Loop for Material Decisions

**Governance / Guardrails**
- Architecture Assurance Guardrails (auth, secrets, TLS, least privilege, audit logging)
- Architecture Checklist (ARB/TRB evaluation criteria)
- Identity & Access Management Policy
- Data Classification Standard

**Reference Patterns**
- SAP Integration Patterns — Synchronous API, Batch SFTP, Batch API, SAP IDoc/RFC/OData, Asynchronous
- API Ingress Pattern
- Access & Authorization Management Pattern
- Data Ingestion Pattern
- Data Engineering & Medallion Architecture Pattern
- MDM & Data Quality Pattern
- OT Streaming Pattern
- AI Patterns

---

*Source workbook: `ECC_to_S4_Integration_Patterns_Working_View` (Dashboard, Pattern_Register, Lists, Decision_Guide, Risk_SWOT, RACI_Checklist, Sources). AI4EA inference applied per the Entegris knowledge base.*
