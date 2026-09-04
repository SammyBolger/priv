# Reference Architecture — Functional Domain **NAME**

**Responsible: Functional Domain Leader**

> **Purpose:** A blueprint for the desired state of this application domain that supports the
> business strategy and business outcomes per the capabilities that are needed. Application teams
> use this to define what applications should exist, how they communicate, and how they align with
> company standards.

> **Completion:** [DATE] · **Owner:** [TEAM / DEPARTMENT] · **Status:** Draft / Approved

- Functional Domain Template Set · Domain Charter · Capability Map · Decision Log
- Reference Architecture — EA definition and topics

**Prerequisite:** complete the Domain Charter and
Capability Map first. Sections 1–3 below are unanswerable without them.

---

## 1. Introduction & Scope

**What problem does this architecture solve?**

Describe the business purpose of this application domain and its process boundaries in plain
language. What capabilities does it enable? Who relies on it?

**Example:**
> Our Customer Relationship Management (CRM) domain manages all customer interactions, sales
> pipelines, and account data. It enables sales, marketing, and customer success teams to
> collaborate effectively and make data-driven decisions. Without this domain, we cannot track
> customer touchpoints or manage pipeline accurately.

**Fill in your domain:**

- Domain name: [e.g., Order Management, Financial Reporting, Supply Chain]
- Primary users: [e.g., Sales team, Finance, Operations]
- Key business capabilities enabled: link to the rows in [Capability Map]
- Geographic scope: [e.g., Global, North America only, US + Europe]

**Process Boundaries (what is IN scope / OUT of scope):**

Carry these over from the Domain Charter rather than re-deriving
them. If they differ, the Charter wins and this section is wrong.

| In Scope | Out of Scope | Owned instead by |
|---|---|---|
| [E.g., customer data, sales pipeline] | [E.g., marketing campaigns, external analytics] | [Domain] |
| [E.g., North American operations] | [E.g., European subsidiary systems] | [Domain] |

---

## 2. Architecture Vision

**How does this application domain look today, at the interim step, and in the target state?**

### 2.1 Baseline (Current State)

Describe the reality today:

- What applications exist?
- What works well? *(Say so explicitly — a baseline that lists only pain reads as advocacy and gets discounted at review.)*
- What problems or gaps exist?
- Who manages it?

**Example:**
> Today we use three disparate CRM systems: Salesforce (US sales), a legacy on-prem CRM (EMEA),
> and a custom-built pipeline tracker (finance). This creates data silos, inconsistent forecasts,
> and manual reconciliation. The sales team spends four hours per week on data entry across
> systems.

**Fill in your baseline:**

- Existing systems: [List them — must reconcile to §5.1]
- What works well: [Do not skip]
- Pain points: [What is broken or inefficient?]
- Manual processes: [What requires human intervention, and at what cost in hours?]
- Data silos: [Where is data trapped?]

### 2.2 Interim State — OPTIONAL

Use this section **only** when the target cannot be reached in one step and an intermediate
architecture will be operated for more than two quarters. An interim state is a real architecture
with real run cost — it is not a project milestone.

- What is live at the interim step: [Applications and integrations]
- What is deliberately *still* wrong at this point: [Named, with the reason it is tolerable]
- How long the interim state is expected to run: [Quarters]
- What triggers the move to target: [Condition, not a date, where possible]
- Interim-only assets to be thrown away: [Bridges, dual-writes, reconciliation jobs — and who removes them]

### 2.3 Target Vision (Future State)

Describe where this domain should be in 12–24 months:

**Example:**
> Target: one unified CRM (Salesforce) spanning all regions. All customer and pipeline data flows
> through a single golden-record system. Sales enters data once; it is available to finance,
> marketing and operations automatically. We achieve a single forecast of truth and eliminate
> manual reconciliation. Data-entry time drops to under 30 minutes per week.

**Fill in your vision:**

- Desired end state: [Describe the unified, ideal state]
- Key improvements: [What will be better?]
- Timeline: [12 months? 24 months? Phased?]
- Success metrics: [How will we know we succeeded? Each metric needs a current value and a target value]

| Metric | Today | Target | Measured by |
|---|---|---|---|
| [e.g., Hours/week on manual reconciliation] | 4.0 | <0.5 | [Owner / system] |
| | | | |

---

## 3. Business Drivers & Principles

### 3.1 Business Drivers

The top three to five business needs that shape this architecture. Every driver must trace to a
stated business outcome — if it cannot, it is a preference, not a driver.

| Driver | Why It Matters | Constraint / Target |
|---|---|---|
| **Single Source of Truth** | Sales must trust one forecast; eliminates conflicting data | All customer and pipeline data in one system by Q2 2027 |
| **Real-Time Visibility** | Finance needs current pipeline to forecast accurately | <1 hour lag between sales entry and finance reporting |
| **Scalability** | Support 10x transaction volume as the company grows | 100K daily transactions by 2028 |
| **[Driver]** | [Why?] | [Target / Constraint] |

### 3.2 Guiding Principles

Follow the enterprise principles pattern — see
Architecture Principles Defined. A principle is
**Simple, Forward Looking, Anchored** to the value chain, and **Aspirational**.

Each principle is written as **Statement → Rationale → Implications**. Do not compress this into a
one-line table; the implications are the part that changes behaviour.

> #### Principle: One customer, one record
>
> **Statement:** Where the same customer exists in more than one system, we actively unify the
> records into a single profile with one enterprise identifier.
>
> **Rationale:** Conflicting customer identity is the root cause of forecast disputes, duplicate
> outreach, and the reconciliation effort that consumes four hours per rep per week.
>
> **Implications:**
> - Every new application in this domain must accept an externally-supplied customer identifier.
> - Someone must own the survivorship rules; this domain will fund that role.
> - Short term, migration will surface duplicate records that business teams must adjudicate.

> #### Principle: [Name]
>
> **Statement:**
>
> **Rationale:**
>
> **Implications:**

**Inherited principles** — do not restate, link:

- Principles — Enterprise Architecture (always applies)
- Domain principles

---

## 4. Application Architecture

### 4.1 Process Boundaries

Which business processes each application is responsible for. Do not list every field — state what
each application *owns*.

| Application | Core Responsibility | Process Boundary | Owner |
|---|---|---|---|
| **Salesforce CRM** | Sales pipeline, customer interactions, account data | Lead creation through deal close | Sales Ops, Sales Directors |
| **SAP ERP** | Financial accounting, revenue recognition | Deal close through invoicing and revenue reporting | Finance, Accounting |
| **Data Warehouse (Snowflake)** | Historical reporting, analytics, forecasting | Read-only copy for analysis; no operational decisions made here | Analytics / BI |
| **[Application]** | [What does it own?] | [Clear boundary statement] | [Who manages it?] |

### 4.2 Application Interaction Matrix

How applications communicate and what data flows between them.

| From | To | Data Transferred | Frequency | Purpose |
|---|---|---|---|---|
| **Salesforce** | SAP | Deal-close events, customer PO, revenue amount | Near real-time (<1 hr) | Finance recognises revenue and invoices immediately |
| **SAP** | Data Warehouse | GL transactions, invoices, payments | Daily 02:00 UTC | Revenue, margin and profitability reporting |
| **Salesforce** | Data Warehouse | Customer records, opportunities, forecast | Daily 02:00 UTC | Pipeline trends; account targeting |
| **[App A]** | [App B] | [What data?] | [How often?] | [Why?] |

### 4.3 Technology Dependencies

How these applications connect. **Every row must resolve to an approved pattern owned by a
technology domain.** Where it does not, record a deviation in §9.

| Connection | Protocol | Data Format | Latency Requirement | Approved pattern |
|---|---|---|---|---|
| Salesforce → SAP | REST API | JSON | <1 hour | Application Integration / APIs / Events |
| SAP → Data Warehouse | SFTP | CSV / Parquet | 24 hours | Data Architecture |
| Salesforce → Data Warehouse | Native connector | Parquet | 24 hours | Data Architecture |
| [App A] ↔ [App B] | [API / File / Message] | [JSON / XML / CSV] | [How strict?] | [Link — or "DEVIATION, see §9"] |

Relevant technology domains to link from this section:
AI ·
Application Integration ·
Connect & Collect ·
Data Architecture ·
Digital Tech Engineering ·
ERP Technical ·
Identity & Access Management ·
Infrastructure & Cloud ·
Knowledge Graph

---

## 5. Application Portfolio Catalog

Use the **Application Lifecycle** vocabulary from the Application Data Dictionary on the EA site —
do not invent local status words. The disposition below is the enterprise investment stance for
each application:

| Disposition | Meaning | Consequence |
|---|---|---|
| **Invest** | Strategic; receives new functional investment | Extend here by default |
| **Tolerate** | Fit for purpose; maintain only | No new functionality; no new integrations |
| **Migrate** | Capability moves to another application | Freeze; fund the migration |
| **Eliminate** | Retire; capability no longer needed or already duplicated | Set a decommission date and an owner |

> **Confirm the exact term set against the Application Data Dictionary on the EA site before
> publishing.** If the dictionary's terms differ, the dictionary wins and this table is replaced.

### 5.1 Existing Applications

| Application | Vendor | Purpose | Owner | Users | Lifecycle status | Disposition |
|---|---|---|---|---|---|---|
| **Salesforce** | Salesforce | CRM, sales pipeline | VP Sales | 120 reps, 20 ops | Production | Invest |
| **SAP ERP** | SAP | Financial accounting, invoicing | CFO | Finance (15) | Production, 20-yr-old | Tolerate |
| **Snowflake** | Snowflake | Data warehouse, BI | VP Analytics | Finance, Sales leadership (50) | Production (new) | Invest |
| **[App]** | [Vendor] | [Purpose] | [Owner] | [# users] | [Status] | [Disposition] |

### 5.2 Planned / Proposed Applications

| Application | Why We Need It | Expected Launch | Owner | Investment |
|---|---|---|---|---|
| **Customer Data Platform (CDP)** | Unify customer data from all touchpoints (web, mobile, email, sales, support) for marketing | Q2 2027 | CMO | $500K |
| **Supply Chain Visibility Tool** | Real-time tracking of orders and inventory across manufacturing and fulfillment | Q1 2027 | COO | $800K |
| **[Application]** | [Why?] | [When?] | [Who sponsors?] | [Budget?] |

A proposed application with no capability gap behind it does not belong in this table.

### 5.3 Applications to Retire / Replace

| Current Application | Reason | Replacement | Timeline | Owner |
|---|---|---|---|---|
| **Legacy on-prem CRM (EMEA)** | Duplicate of Salesforce; costs $200K/year to maintain; EMEA sales team ready to migrate to Salesforce | Salesforce (main system) | Migrate by Dec 2026 | VP Sales |
| **[App Name]** | [Why retire?] | [Replace with?] | [When?] | [Who owns?] |

---

## 6. Application Communication Diagram

A visual map of how applications connect and where data flows.

```
┌──────────────────────┐
│   Salesforce CRM     │
│  (Sales Pipeline,    │
│   Customer Data)     │
└──────────┬───────────┘
           │
           │ REST API (hourly)
           │ Sends: Deal closures, customer PO, revenue
           │
           ▼
┌──────────────────────┐
│     SAP ERP          │
│   (Accounting,       │
│    Invoicing)        │
└──────────┬───────────┘
           │
           │ SFTP (daily)
           │ Sends: GL transactions, invoices, payments
           │
           ▼
┌──────────────────────┐
│   Snowflake Data     │
│   Warehouse (BI &    │
│   Reporting)         │
└──────────────────────┘

          ▲             ▲
          │             │
          │ SFTP (daily)│ Native Connector (daily)
          │             │
     (Salesforce)   (SAP data)
```

Every arrow must correspond to a row in §4.2.

---

## 7. Standards Mapping

Which company or industry standards each application follows, and where the deviations are.

### 7.1 Technology Standards

| Standard | Company Mandate | App A | App B | App C |
|---|---|---|---|---|
| **Cloud Infrastructure** | Prefer cloud; on-prem by exception | ✅ Cloud-native | ⚠️ Exception, migration underway | ✅ Cloud-native |
| **Data Encryption** | AES-256 at rest, TLS 1.3+ in transit | ✅ | ✅ | ✅ |
| **API Security** | Authenticated, rate-limited | ✅ OAuth 2.0 | ✅ | ✅ |
| **Identity** | Enterprise SSO, no local accounts | ✅ | ⚠️ Local admin accounts remain | ✅ |
| **Data Residency** | PII remains in region of origin | ✅ | ✅ | ✅ |
| **[Standard]** | [Requirement] | [✅ / ⚠️ / ❌] | | |

Legend: ✅ compliant · ⚠️ deviation with an approved, time-boxed exception · ❌ non-compliant, no exception (must appear in §8.1 and §9)

### 7.2 Data Standards

| Standard | Rule | App A | App B | App C |
|---|---|---|---|---|
| **Enterprise Customer ID** | All customer records carry the global identifier, never a local ID | ✅ | ⚠️ Partial | ✅ |
| **Date / Time** | ISO 8601, stored UTC | ✅ | ✅ | ✅ |
| **Currency** | Amount + ISO currency code as separate fields | ✅ | ✅ | ✅ |
| **[Standard]** | [Rule] | | | |

---

## 8. Gaps & Migration Assessment

### 8.1 Capability Gaps

What this domain cannot do today that it needs to do. Each gap must reference a capability from the
Capability Map.

| Gap | Capability | Business Impact | Severity | Solution | Timeline |
|---|---|---|---|---|---|
| **Unified customer view** | [Capability ID] | Reps search three systems to assemble one customer's history | High | Migrate EMEA to Salesforce; real-time sync | Q4 2026 |
| **Real-time forecasting** | [Capability ID] | Finance forecast runs one week behind | Medium | Hourly sync CRM → ERP → warehouse | Q1 2027 |
| **Privacy request response** | [Capability ID] | No way to answer "what data do we hold on X?" | High | Data catalogue and lineage | Q2 2027 |
| **[Gap]** | | [Why does it matter?] | [H/M/L] | [How to fix?] | [When?] |

### 8.2 Migration Roadmap

| Phase | Timeline | Objective | Actions | Owner | Investment |
|---|---|---|---|---|---|
| **1 — Consolidate** | Q3–Q4 2026 | One customer record | Migrate EMEA CRM; deduplicate | VP Sales | $300K |
| **2 — Automate** | Q4 2026–Q1 2027 | Remove manual data movement | Real-time API sync; hourly warehouse load | IT Operations | $150K |
| **3 — Enhance** | Q1–Q2 2027 | New capabilities | CDP; data lineage tooling | VP Marketing, VP Engineering | $700K |
| **4 — Optimise** | Q2 2027+ | Continuous improvement | Monitor performance, cost, satisfaction | Continuous | Ongoing |

### 8.3 Key Risks & Mitigation

| Risk | Impact | Likelihood | Mitigation | Owner |
|---|---|---|---|---|
| **Data loss during migration** | Customer history lost; relationships damaged | Medium | Full backup; two-week parallel run; validation checklist | [Name] |
| **Integration failure between core systems** | Revenue recognition and invoicing delayed | Medium | Fallback to daily batch; alerting on sync failure | [Name] |
| **Cost overrun on new platform** | Budget exceeded | High | Phased rollout; ROI gate at each phase | [Name] |

---

## 9. Architecture Decisions

Every material choice in this document — an application disposition, a deviation from a technology
standard, a rejected alternative — is recorded in the domain
Decision Log using the enterprise
Decision Log format.

This section is the **index**, not the record. Keep it to one line per decision.

| ID | Date | Decision | Status | Affects | Link |
|---|---|---|---|---|---|
| ADR-001 | [Date] | Salesforce is the single CRM of record for all regions | Approved | §2.3, §5.1 | Decision Log |
| ADR-002 | [Date] | Exception: SAP remains on-prem until FY28 | Approved, expires FY28 | §7.1 | Decision Log |
| | | | | | |

**Open deviations** — anything marked ❌ in §7 or unresolved in §4.3 must appear here with an owner
and a review date, or the Reference Architecture is not approvable.

---

## Document Metadata

| Field | Value |
|---|---|
| **Created By** | [Name, title] |
| **Created Date** | [Date] |
| **Last Updated** | [Date] |
| **Approval Status** | Draft / Pending Review / Approved |
| **Version** | 1.0 |
| **Related Documents** | Charter · Capability Map · Decision Log · Principles |

### Approval Sign-Off

| Role | Name | Date | Status |
|---|---|---|---|
| **Functional Domain Leader** | [Name] | [Date] | ⬜ Pending |
| **Business Sponsor** | [Name] | [Date] | ⬜ Pending |
| **Application Directors** | [Names] | [Date] | ⬜ Pending |
| **Enterprise Architecture** | [Name] | [Date] | ⬜ Pending |
| **Cybersecurity** | [Name] | [Date] | ⬜ Pending |
| **Finance / Budget Owner** | [Name] | [Date] | ⬜ Pending |

---

**Questions?** Contact the Functional Domain Leader.
