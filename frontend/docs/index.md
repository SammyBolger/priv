# Entegris AI4EA Architecture Index

This index provides a quick reference to all patterns, positions, and principles in the Entegris Architecture Model. Use this as a retrieval tool to identify relevant documents for your architecture scenario.

:::tip Generate a pattern from this knowledge base
Describe a business scenario and AI4EA will draft a complete Entegris architecture pattern, grounded in the documents listed below.

[Open the generator →](/generate/)
:::

---

## Patterns

### Analytics Patterns

| Pattern | Description |
|---------|-------------|
| [Event-Driven Time-Series](patterns/analytics/event-driven-timeseries-pattern.md) | Pub/Sub, Dataflow, and BigQuery patterns for streaming telemetry and IoT analytics on GCP |
| [GCP Egress](patterns/analytics/gcp-egress-pattern.md) | Controlled outbound integration patterns for data and APIs leaving GCP workloads |

### Application Patterns

| Pattern | Description |
|---------|-------------|
| [Access & Authorization](patterns/application/access-authorization-pattern.md) | Entra ID-based identity, authentication, and authorization patterns for users, services, and privileged access |
| [AI Architecture](patterns/application/ai-patterns.md) | LiteLLM gateway and grounded retrieval patterns for enterprise AI/LLM solutions |
| [CI/CD Pipelines](patterns/application/cicd-pipeline-pattern.md) | GitHub Actions-based patterns for application build, test, and deployment with security scanning |
| [Web Application Deployment](patterns/application/web-app-deployment-pattern.md) | Cloud Run, GKE, and static hosting deployment patterns for Entegris web workloads |

### Data Patterns

| Pattern | Description |
|---------|-------------|
| [Data Engineering & Medallion Architecture](patterns/data/data-engineering-ingestion-pattern.md) | Bronze/Silver/Gold medallion promotion patterns using dbt and BigQuery |
| [Data Ingestion](patterns/data/data-ingestion-pattern.md) | Batch, streaming, and CDC ingestion patterns for landing raw data in GCS Bronze |
| [Master Data Management & Quality](patterns/data/mdm-data-quality-pattern.md) | Informatica-based golden record creation, quality scoring, and stewardship patterns |

### Infrastructure Patterns

| Pattern | Description |
|---------|-------------|
| [Cloud Armor](patterns/infrastructure/cloud-armor-pattern.md) | WAF, DDoS, and geographic access control patterns for internet-facing applications |
| [OT Data Streaming](patterns/infrastructure/ot-streaming-pattern.md) | Edge gateway, MQTT/OPC-UA, and telemetry patterns for plant-floor data ingestion |
| [Terraform Infrastructure](patterns/infrastructure/terraform-infrastructure-pattern.md) | Infrastructure as Code patterns for reusable modules, environment isolation, and pipeline-driven changes |

### Integration Patterns

| Pattern | Description |
|---------|-------------|
| [API Ingress](patterns/integration/api-ingress-pattern.md) | Protected inbound API exposure with Cloud Armor, authentication, and API management |
| [SAP Integration](patterns/integration/sap-integration-pattern.md) | Boomi-mediated patterns for SAP request/reply, batch, IDoc, RFC, and event integration |
| [SharePoint Ingestion](patterns/integration/sharepoint-ingestion-pattern.md) | Microsoft Graph API and Boomi-based patterns for SharePoint Online content extraction |

---

## Positions

_No architecture positions are currently published. Positions will be added here as they are ratified._

---

## Principles

### AI Principles

| Principle | Description |
|-----------|-------------|
| AI Decisions Must Be Explainable | All AI/ML model outputs driving material business decisions must have clear explanations for validation and debugging |
| Responsible AI Must Be Embedded in Design | Fairness, transparency, and accountability must be built into AI systems from inception, not post-deployment |
| Data Quality Is Non-Negotiable for AI | AI depends entirely on data quality; data assurance must precede model development |
| Humans in the Loop for Material Decisions | Human oversight and decision authority must be maintained for decisions impacting commitments, safety, compliance, or reliability |

### Application Principles

| Principle | Description |
|-----------|-------------|
| Applications Serve a Single Clear Capability | Applications should align to a single business capability to ease governance and change |
| Applications Expose Stable, Documented Interfaces | Clear, versioned APIs and integration contracts enable interoperability and loose coupling |
| Reuse Shared Application Services First | Common functions should be reused through shared services before creating duplicate capabilities |
| Application User Experience Should Be Simple and Consistent | Experiences should minimize user effort, reduce training, and be consistent across channels |

### Architecture Principles

| Principle | Description |
|-----------|-------------|
| Cloud-Smart by Default | Cloud services are the default for all new investments; on-premises is reserved for regulatory/security exceptions |
| Internet and API First | Solutions should be designed for internet-based connectivity and API-first integration, not internal network dependency |
| SaaS Before Custom Build | Standard SaaS applications are preferred over custom builds unless core competitive differentiation requires it |
| Single ERP, Minimal Customization | Entegris maintains a single SAP instance with minimal customization to reduce upgrade debt and integration complexity |

### Customer Digital Experience Principles

| Principle | Description |
|-----------|-------------|
| Simple | Customer experiences should minimize steps, decisions, and effort to accomplish any goal |
| Engaging | Experiences should present contextually useful and personalized information based on customer role and history |
| Transparent | Customers should proactively receive data, status, and terms needed to make informed decisions without asking |
| Collaborative | Digital tools should enable secure, structured collaboration between customers and Entegris teams |

### Data Principles

| Principle | Description |
|-----------|-------------|
| Data as a Strategic Asset | Data should be managed, governed, and invested in with the same rigor as financial or physical assets |
| Data Quality at the Source | Data quality issues should be corrected at the earliest point in the data lifecycle in the originating source system |
| Single Source of Truth | Data collected in multiple places should be mastered to create a single authoritative source before enterprise use |
| Data Domains and Accountability | All data assets should align to defined domains with assigned Information Governors and stewardship accountability |

### Digital Transformation Principles

| Principle | Description |
|-----------|-------------|
| Create Differentiated Customer Value | Digital investments must create measurable, differentiated value for customers, not internal efficiency alone |
| Focus on Business Outcomes, Not Tools | Digital initiatives must begin with defined, measurable business outcomes; technology selection follows outcome definition |
| Iterative Launch and Learn | Delivery should use evidence-based iteration, releasing early and using findings to drive next iterations |
| End-to-End Integrated Experience | Solutions should be designed for connected experiences eliminating fragmentation across process and system boundaries |

### Enterprise Architecture Principles

| Principle | Description |
|-----------|-------------|
| Design for Customer Centricity | Focus on customer and user needs within their value chain; prioritize outcomes and value creation |
| Solutions Are Democratized | Technology solutions and data access should be provided through self-serve models enabling independent operation |
| Remove Friction | Solutions should eliminate unnecessary complexity, delays, and obstacles that impede productivity and adoption |
| Demonstrate Trustworthiness and Stewardship | All solutions must demonstrate trustworthiness through confidentiality, integrity, and availability appropriate to sensitivity |

### Security Principles

| Principle | Description |
|-----------|-------------|
| Security and Privacy by Design | Security should be addressed early and throughout the solution lifecycle, not added as an afterthought |
| Trust Through Transparency | Transparency around security policies, data handling, and access activity builds trust with stakeholders |
| Trust Through Data Stewardship | Data stewardship must protect confidentiality, integrity, and availability according to sensitivity and context |
| Security Assurance Through Least Privilege | People and systems should only have access to information and resources necessary for their legitimate purpose |

### Technology Principles

| Principle | Description |
|-----------|-------------|
| Easily Consumable Technology | Technology services should be easy to consume, provision, and support without specialist gatekeeping |
| Automate Where Possible | Infrastructure as Code and CI/CD pipelines should automate provisioning, updates, and operational management |
| Secure, Scalable, and Efficient Technology | Technology must be secure by design, capable of scaling with demand, and efficient in resource use |
| Self-Service Focus | Technology should enable teams to independently provision, manage, and troubleshoot common resources |

---

## How to Use This Index

1. **Identify Your Scenario**: Describe your architecture challenge or use case.
2. **Search the Index**: Look for keywords matching your domain (e.g., "API," "data," "AI," "deployment").
3. **Review Relevant Documents**: Click on pattern, position, or principle links to read the full guidance.
4. **Cross-Reference**: Patterns often reference positions and principles for the rationale and broader context.

---
