# Architecture Checklist

Clean, review-friendly version of the architecture checklist provided in CSV format.

## How To Use

1. Mark each item as relevant with `Y` or `N`.
2. Mark completion with `Y` or `N`.
3. Capture decisions, evidence, comments, and links during the review.

## Status Key

- Relevant: `Y / N`
- Complete: `Y / N`

## Quick Navigation

- [Application Experience & Hosting](#application-experience--hosting)
- Integration & Data
- Product, Platform & Operations
- [Security, Compliance & Identity](#security-compliance--identity)
- [AI & Networking](#ai--networking)

## Application Experience & Hosting

### Apps - End User

#### A-EU-01 · APP001

**Question**  
Does the project team understand how the end user will be able to access the application? Web, rich client, mobile, or other access methods.

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: To understand what client solutions are available and whether they are adequately supported by Entegris.
- Comments:
- Links:

### Apps - End User Requirements

#### A-EU-02 · APP002

**Question**  
Does the project team know what technology and version the end user requires to access the application? For example: latest Chrome browser, Windows 10, and similar platform requirements.

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: To understand what client solutions are available and whether they are adequately supported by Entegris.
- Comments:
- Links:

### Configurable UI

#### A-EU-03 · CON001

**Question**  
Does the project team know if the solution has configurable UI options, including support for mobile devices and a responsive web design approach?

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: Need to know what types of mobile apps are available and whether they are secure.
- Comments:
- Links:

### Managing Ops Data vs ODS vs BI

#### A-GEN-01 · MAN-01

**Question**  
Does the project team know how the solution will manage operating data versus ODS versus BI, and whether this is automated through admin screens?

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: To understand data movement, performance implications, and data retention policies.
- Comments:
- Links:

### App Management

#### A-GEN-02 · APP-03

**Question**  
Does the project team understand what is used to manage configuration, database, and report changes migrating from development to test or QA and then to production?

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: To understand the ease of migrating functionality from one environment to another.
- Comments:
- Links:

### Hosting

#### A-GEN-03 · HOS-01

**Question**  
Does the project team understand what hosting options are available? Are you aware if the application supports private cloud solutions such as VMware vxRail, containers, and similar platforms? What is the typical application footprint for a small, medium, or large plant? What required software components are not included in the software, such as databases? What software is needed to run the solution, such as supported database versions and operating systems?

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: To understand what is required to run the software.
- Comments:
- Links:

## Security, Compliance & Identity

### Security Certifications

#### SC-01

**Question**  
Are there any follow-up security items to address? Does the project team know what level of certification the solution complies with, such as ISO 27001, SOC 2, OWASP ASVS, CSA STAR, or ISO 22301, and can audited results be supplied?

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: To understand the level of compliance.
- Comments:
- Links:

## AI & Networking

### AI - General

#### AI-01 · AI-01

**Question**  
Ensure the project team has confirmation that Entegris data is not used to train AI models and that the data is managed on the platform in a way that protects the data.

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: To understand how AI data is being used.
- Comments:
- Links:

---

## TOGAF AI-Native Architecture Assessment

This section adds TOGAF-aligned questions for AI-native systems. Use for architectures that include AI/ML components, LLMs, or intelligent automation.

**Reference**: See TOGAF-Domain-Mapping.md for detailed guidance on each domain.

### Data Architecture for AI

#### DA-AI-01 · DATA-QUALITY

**Question**  
Does the data architecture include quality governance for AI? (accuracy, completeness, consistency checks)

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: Poor data quality directly impacts AI model performance, bias, and reliability.
- Reference: TOGAF Data Architecture (TOGAF-Domain-Mapping.md)
- Comments:
- Links:

#### DA-AI-02 · DATA-LINEAGE

**Question**  
Can you trace data lineage from source systems through transformations to final outputs and model training?

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: Data lineage is essential for debugging, compliance, and auditing AI decisions.
- Comments:
- Links:

#### DA-AI-03 · DATA-CATALOG

**Question**  
Is there a data catalog or metadata management system that makes enterprise data discoverable to data scientists and architects?

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: Discoverability accelerates AI/ML projects and reduces duplicate data work.
- Comments:
- Links:

#### DA-AI-04 · KNOWLEDGE-GRAPH

**Question**  
For semantic search or RAG systems: Are you using knowledge graphs or semantic data structures for context understanding?

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: Knowledge graphs enable richer semantic understanding than keyword search.
- Comments:
- Links:

#### DA-AI-05 · VECTOR-DB

**Question**  
For RAG or similarity search: Do you have vector databases (e.g., Pinecone, Weaviate, Chroma) for embedding storage?

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: Vector databases enable efficient semantic search for context retrieval.
- Comments:
- Links:

#### DA-AI-06 · PRIVACY-COMPLIANCE

**Question**  
Does the data architecture enforce privacy controls (anonymization, PII masking, access controls) for AI/ML?

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: GDPR, CCPA, and regulatory compliance are non-negotiable for AI systems.
- Comments:
- Links:

### Application Architecture for AI

#### AA-AI-01 · RAG-SYSTEM

**Question**  
For knowledge-based systems: Is the RAG (Retrieval-Augmented Generation) architecture clearly defined? (Data source → Retrieval → LLM → Output)

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: RAG systems require careful orchestration of retrieval and generation.
- Reference: [AI Patterns](../patterns/application/ai-patterns.md)
- Comments:
- Links:

#### AA-AI-02 · AGENT-FRAMEWORK

**Question**  
For autonomous systems: Are you using an agent framework with clear control flow, tool access, and human oversight?

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: Agents need guardrails to prevent unintended actions.
- Comments:
- Links:

#### AA-AI-03 · CONVERSATIONAL-UI

**Question**  
Do applications support conversational interfaces (chat/Q&A) alongside traditional UIs?

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: Conversational interfaces are a core AI-native capability.
- Comments:
- Links:

#### AA-AI-04 · API-INTEGRATION

**Question**  
Can applications seamlessly integrate with LLM APIs and external AI services?

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: Modern architectures need flexible AI service integration.
- Comments:
- Links:

### Technology Architecture for AI

#### TA-AI-01 · MLOPS-PLATFORM

**Question**  
Do you have MLOps infrastructure for model training, versioning, and deployment? (experiment tracking, registries, CI/CD for models)

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: MLOps is essential for scaling from experiments to production.
- Comments:
- Links:

#### TA-AI-02 · LLMOPS-PLATFORM

**Question**  
For LLM-based systems: Do you have LLMOps infrastructure for prompt management, deployment, monitoring, and cost control?

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: LLMs are expensive and require active monitoring.
- Comments:
- Links:

#### TA-AI-03 · MODEL-MONITORING

**Question**  
Are you monitoring models for drift, bias, performance degradation, and other anomalies?

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: Models degrade over time; active monitoring catches issues early.
- Comments:
- Links:

#### TA-AI-04 · INFERENCE-SCALING

**Question**  
Can your infrastructure scale AI inference for production workloads? (GPUs, batch processing, caching)

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: Inference at scale requires specialized infrastructure.
- Comments:
- Links:

#### TA-AI-05 · GPU-INFRASTRUCTURE

**Question**  
Do you have GPU infrastructure for model training and inference? (GCP TPUs, AWS p3 instances, Azure GPUs)

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: AI workloads typically require specialized compute.
- Comments:
- Links:

### Governance for AI

#### GOV-AI-01 · MODEL-REGISTRY

**Question**  
Is there a model registry that tracks all models in production, including versions, lineage, and ownership?

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: Model governance prevents rogue models and ensures compliance.
- Comments:
- Links:

#### GOV-AI-02 · RESPONSIBLE-AI

**Question**  
Does your AI governance framework include responsible AI principles? (transparency, fairness, bias detection, human oversight)

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: Ethical AI is increasingly a regulatory requirement.
- Reference: [Architecture Assurance Guardrails](07-architecture-assurance-guardrails.md)
- Comments:
- Links:

#### GOV-AI-03 · EXPLAINABILITY

**Question**  
Can your models explain their decisions in a way that stakeholders can understand and audit?

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: Explainability is required for high-stakes decisions (credit, hiring, healthcare).
- Comments:
- Links:

#### GOV-AI-04 · BIAS-DETECTION

**Question**  
Do you have processes to detect and mitigate bias in training data and model predictions?

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: Biased models can perpetuate discrimination and create legal liability.
- Comments:
- Links:

#### GOV-AI-05 · HUMAN-OVERSIGHT

**Question**  
For high-stakes decisions: Is there a clear human-in-the-loop process for AI recommendations?

- Relevant: `Y / N`
- Complete: `Y / N`
- Why this matters: Humans should retain authority over consequential decisions.
- Comments:
- Links:
