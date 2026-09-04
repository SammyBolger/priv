# Application Reference Architecture Template

**Responsible: Functional Domain Leader**

**MLD - need the decision log section based on the EA definition**

> **Purpose:** A blueprint for the desired state of your application domain that supports the business strategy and business outcomes per the capabilities that are needed. Application teams will use this to define what applications should exist, how they communicate, and how they align with company standards.

> **Completion:** [DATE] | **Owner:** [TEAM/DEPARTMENT NAME] | **Status:** Draft / Approved

---

## 1. Introduction & Scope

**What problem does this architecture solve?**

Describe the business purpose of this application domain and what are the process boundaries in plain language. What capabilities does it enable? Who relies on it?

**Example:**
> Our Customer Relationship Management (CRM) domain manages all customer interactions, sales pipelines, and account data. It enables sales, marketing, and customer success teams to collaborate effectively and make data-driven decisions. Without this domain, we cannot track customer touchpoints or manage pipeline accurately.

**Fill in your domain:**
- Domain name: [e.g., "Order Management," "Financial Reporting," "Supply Chain"]
- Primary users: [e.g., "Sales team, Finance, Operations"]
- Key business capability: [What does this domain enable the company to do?]
- Geographic scope: [e.g., "Global," "North America only," "US + Europe"]

**Process Boundaries (what's IN scope / OUT of scope):**

| In Scope | Out of Scope |
|---|---|
| [E.g., customer data, sales pipeline] | [E.g., marketing campaigns, external analytics] |
| [E.g., North American operations] | [E.g., European subsidiary systems] |
| | |

---

## 2. Architecture Vision

**How does your application domain look today vs. interim and the target future state?**

### 2.1 Baseline (Current State)

Describe the reality today:
- What applications exist?
- What works well?
- What problems or gaps exist?
- Who manages it?

**Example:**
> *Today, we use 3 disparate CRM systems: Salesforce (US sales), a legacy on-prem CRM (EMEA), and custom-built pipeline tracker (finance). This creates data silos, inconsistent forecasts, and manual reconciliation. Sales team spends 4 hours/week on data entry across systems.*

**Fill in your baseline:**
- Existing systems: [List them]
- Pain points: [What's broken or inefficient?]
- Manual processes: [What requires human intervention?]
- Data silos: [Where is data trapped?]

### 2.2 OPTIONAL: Interim (Interim before Future State)

Describe the reality today:
- What applications exist?
- What works well?
- What problems or gaps exist?
- Who manages it?

**Example:**
> *Today, we use 3 disparate CRM systems: Salesforce (US sales), a legacy on-prem CRM (EMEA), and custom-built pipeline tracker (finance). This creates data silos, inconsistent forecasts, and manual reconciliation. Sales team spends 4 hours/week on data entry across systems.*

**Fill in your baseline:**
- Existing systems: [List them]
- Pain points: [What's broken or inefficient?]
- Manual processes: [What requires human intervention?]
- Data silos: [Where is data trapped?]

### 2.3 Target Vision (Future State)

Describe where you want to be in 12–24 months:
- Unified data?
- Consolidated apps?
- Automated processes?
- Better reporting?

**Example:**
> *Target: One unified CRM system (Salesforce) spanning all regions. All customer and pipeline data flows through a single golden record system. Sales team enters data once; it's available to finance, marketing, and operations automatically. We achieve single forecast of truth and eliminate manual reconciliation. Time spent on data entry drops to <30 min/week.*

**Fill in your vision:**
- Desired end state: [Describe the unified, ideal state]
- Key improvements: [What will be better?]
- Timeline: [12 months? 24 months? Phased approach?]
- Success metrics: [How will we know we've succeeded?]

---

## 3. Business Drivers & Principles

**What drives your architecture decisions?**

### 3.1 Business Drivers

List the top 3–5 business needs that shape this architecture:

| Driver | Why It Matters | Constraint/Target |
|---|---|---|
| **Single Source of Truth** | Sales team needs to trust one forecast; eliminates conflicting data | All customer/pipeline data in one system by Q2 2027 |
| **Real-Time Visibility** | Finance needs up-to-date pipeline to forecast accurately | <1 hour data lag between sales data entry and finance reports |
| **Scalability** | Support 10x transaction volume as company grows | System must handle 100K daily transactions by 2028 |
| **[Driver]** | [Why?] | [Target/Constraint] |
| | | |

### 3.2 Guiding Principles

**MLD - USE THE PRINCIPLES PATTERN**

Simple statements of what matters most to this domain (non-technical):

| Principle | What It Means | Example |
|---|---|---|
| **One customer, one record** | If the same customer exists in multiple systems, we actively unify them into one profile | Sales calls customer "Acme Corp"; Finance calls them "Acme Corporation Inc." → System treats as one entity |
| **Teams use the tools they know** | We don't force a wholesale technology change; we integrate with tools people already use | Sales prefers Salesforce; Finance uses SAP → We connect both systems so data syncs automatically |
| **Automate repetitive work** | If humans are doing the same task repeatedly (data entry, reconciliation), we build automation | Instead of finance manually reconciling sales pipeline to accounting records, a daily job does it |
| **[Principle]** | [What matters?] | [Example of how it plays out] |

---

## 4. Application Architecture

**What applications exist, how do they talk to each other, and what technology do they use?**

### 4.1 Process Boundaries

**Which business processes does each application handle?**

Describe the logical boundaries between applications. Don't list every field—focus on *what each application is responsible for*.

| Application | Core Responsibility | Process Boundary | Owners |
|---|---|---|---|
| **Salesforce CRM** | Manage sales pipeline, customer interactions, account data | "Everything from lead creation through deal close" | Sales Ops, Sales Directors |
| **SAP ERP** | Financial accounting, revenue recognition | "Everything from deal close through invoicing and revenue reporting" | Finance, Accounting |
| **Data Warehouse (Snowflake)** | Historical reporting, analytics, forecasting | "Read-only copy of all data for analysis; no operational decisions made here" | Analytics, BI team |
| **[Application Name]** | [What does it own?] | [Clear boundary statement] | [Who manages it?] |

### 4.2 Application Interaction Matrix

**How do applications communicate? What data flows between them?**

| From | To | Data Transferred | Frequency | Purpose |
|---|---|---|---|---|
| **Salesforce** | SAP | Deal close events, customer PO, revenue amount | Real-time (within 1 hour) | Finance can recognize revenue and invoice customers immediately |
| **SAP** | Data Warehouse | All GL transactions, invoices, payments | Daily at 2 AM UTC | Finance team can report on revenue, margins, customer profitability |
| **Salesforce** | Data Warehouse | Customer records, pipeline opportunities, forecast | Daily at 2 AM UTC | Sales leadership sees pipeline trends; marketing can target high-value accounts |
| **[App A]** | [App B] | [What data?] | [How often?] | [Why?] |

### 4.3 Technology Dependencies

**How do these applications connect? What technology do they use?**

| Connection | Protocol | Data Format | Latency Requirement | Notes |
|---|---|---|---|---|
| Salesforce → SAP | REST API (Salesforce) | JSON | <1 hour | Real-time is too strict; 1-hour batch is acceptable |
| SAP → Data Warehouse | SFTP (secure file transfer) | CSV/Parquet | 24 hours | Standard BI tool; no strict latency requirement |
| Salesforce → Data Warehouse | Salesforce native connector | Parquet | 24 hours | Salesforce has built-in connector to Snowflake; simplest approach |
| [App A] ↔ [App B] | [API/File/Message?] | [JSON/XML/CSV?] | [How strict?] | [Any constraints?] |

---

## 5. Application Portfolio Catalog

**What applications exist today and what's planned?**

### 5.1 Existing Applications

| Application | Vendor | Purpose | Owner | Users | Current Status |
|---|---|---|---|---|---|
| **Salesforce** | Salesforce | CRM, sales pipeline | VP Sales | 120 sales reps, 20 sales ops | Production, healthy |
| **SAP ERP** | SAP | Financial accounting, invoicing | CFO | Finance team (15 people) | Production, 20-year-old system |
| **Snowflake** | Snowflake | Data warehouse, BI | VP Analytics | Finance, Sales leadership (50 people) | New (6 months old) |
| **[App Name]** | [Vendor] | [Purpose] | [Owner] | [# of users] | [Status] |

### 5.2 Planned / Proposed Applications

| Application | Why We Need It | Expected Launch | Owner | Investment |
|---|---|---|---|---|
| **Customer Data Platform (CDP)** | Unify customer data from all touchpoints (web, mobile, email, sales, support) for marketing | Q2 2027 | CMO | $500K |
| **Supply Chain Visibility Tool** | Real-time tracking of orders and inventory across manufacturing and fulfillment | Q1 2027 | COO | $800K |
| **[Application]** | [Why?] | [When?] | [Who sponsors?] | [Budget?] |

### 5.3 Applications to Retire / Replace

| Current Application | Reason | Replacement | Timeline | Owner |
|---|---|---|---|---|
| **Legacy on-prem CRM (EMEA)** | Duplicate of Salesforce; costs $200K/year to maintain; EMEA sales team ready to migrate to Salesforce | Salesforce (main system) | Migrate by Dec 2026 | VP Sales |
| **[App Name]** | [Why retire?] | [Replace with?] | [When?] | [Who owns?] |

---

## 6. Application Communication Diagram

**Visual map of how applications connect and where data flows.**

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

---

## 7. Standards Mapping

**MLD USE THE APPLICATION LIFECYCLE LANGUAGE from the Application Data Dictionary from the EA site**

**Which company or industry standards does each application follow? Where are deviations?**

### 7.1 Technology Standards

| Standard | Company Mandate | Salesforce Compliance | SAP Compliance | Data Warehouse Compliance |
|---|---|---|---|---|
| **Cloud Infrastructure** | Prefer AWS (no on-prem unless exception) | ✅ Salesforce is cloud-native | ⚠️ Exception: On-prem SAP (being moved to AWS) | ✅ Snowflake is cloud-native |
| **Data Encryption** | All data at rest & in transit must use AES-256 or TLS 1.3+ | ✅ Compliant | ✅ Compliant | ✅ Compliant |
| **API Security** | All APIs require authentication; rate-limiting enforced | ✅ OAuth 2.0 on all Salesforce APIs | ✅ Compliant | ✅ Compliant |
| **Data Residency** | Customer PII must remain in US (GDPR-compliant) | ✅ US data centers only | ✅ US data centers | ✅ US regions only |
| **[Standard]** | [Requirement] | [Compliance?] | [Compliance?] | [Compliance?] |

### 7.2 Data Standards

| Standard | Rule | Salesforce | SAP | Data Warehouse |
|---|---|---|---|---|
| **Customer ID Format** | All customer records use global "CustomerID" field (never local IDs) | ✅ Implemented | ⚠️ Partial (legacy systems have different IDs; being unified) | ✅ Uses global CustomerID for joins |
| **Date/Time Format** | All dates stored as ISO 8601 (YYYY-MM-DD) in UTC timezone | ✅ Compliant | ✅ Compliant | ✅ Compliant |
| **Currency** | All financial amounts stored in two fields: Amount + Currency Code (not hardcoded USD) | ✅ Compliant | ✅ Compliant | ✅ Compliant |
| **[Standard]** | [Rule] | [Status] | [Status] | [Status] |

---

## 8. Gaps & Migration Assessment

**What's missing? How do we get from today's state to the target?**

### 8.1 Capability Gaps

**What can we NOT do today that we need to do?**

| Gap | Business Impact | Severity | Solution | Timeline |
|---|---|---|---|---|
| **Unified customer view** | Sales reps spend time looking across 3 CRM systems to find one customer's data | High | Migrate EMEA to Salesforce; sync data in real-time | Q4 2026 |
| **Real-time financial forecasting** | Finance team can't close books in real-time; forecasting is 1 week behind | Medium | Implement hourly data sync from Salesforce to SAP to Data Warehouse | Q1 2027 |
| **Customer data privacy reporting** | No easy way to answer "what data do we have on customer X?" for GDPR requests | High | Implement data catalog / customer data lineage tool | Q2 2027 |
| **[Gap]** | [Why does it matter?] | [High/Medium/Low] | [How to fix?] | [When?] |

### 8.2 Migration Roadmap

**How do we close these gaps step by step?**

| Phase | Timeline | Objective | Actions | Owner | Investment |
|---|---|---|---|---|---|
| **Phase 1: Consolidate** | Q3–Q4 2026 | Unify all customer data into one CRM | Migrate EMEA legacy CRM to Salesforce; deduplicate customer records | VP Sales | $300K |
| **Phase 2: Automate** | Q4 2026–Q1 2027 | Automate data flows between systems | Implement real-time API sync from Salesforce to SAP; hourly load to Data Warehouse | IT Operations | $150K |
| **Phase 3: Enhance** | Q1–Q2 2027 | Add new capabilities (CDP, data privacy reporting) | Implement CDP platform; build data lineage tool | VP Marketing, VP Engineering | $700K |
| **Phase 4: Optimize** | Q2+ 2027 | Ongoing improvements based on usage | Monitor system performance, cost, user satisfaction; optimize connectors | Continuous | Ongoing |

### 8.3 Key Risks & Mitigation

| Risk | Impact | Mitigation |
|---|---|---|
| **Data loss during EMEA-to-Salesforce migration** | Sales team loses customer history; relationships damaged | Full backup before migration; parallel run (old + new system) for 2 weeks; validation checklist |
| **API connection failures between Salesforce and SAP** | Finance can't recognize revenue; invoicing delayed | Implement fallback to daily batch sync; alerting if real-time sync fails |
| **Cost overrun on CDP platform** | Budget exceeds $500K target | Phased rollout: start with top 100 customers; scale gradually; measure ROI at each phase |

---

## Document Metadata

| Field | Value |
|---|---|
| **Created By** | [Name, title] |
| **Created Date** | [Date] |
| **Last Updated** | [Date] |
| **Approval Status** | Draft / Pending Review / Approved |
| **Version** | 1.0 |
| **Related Documents** | [Links to supporting docs] |

### Approval Sign-Off

| Role | Name | Date | Status |
|---|---|---|---|
| **Domain Owner** | [Name] | [Date] | ⬜ Pending |
| **Application Directors** | [Names] | [Date] | ⬜ Pending |
| **IT Operations Lead** | [Name] | [Date] | ⬜ Pending |
| **Finance/Budget Owner** | [Name] | [Date] | ⬜ Pending |

---

**Questions?** Contact [Domain Owner] or [IT Lead].
