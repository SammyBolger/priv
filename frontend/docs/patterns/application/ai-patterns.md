---
description: "This document defines approved patterns for AI and LLM-enabled solutions at Entegris."
---

# AI Architecture Patterns

## AI Architecture Patterns

**Version:** 0.1
**Status:** Draft – Pending Architecture Review
**Audience:** Solution Architects, Integration Engineers, Security and Operations Teams

---

## Document Introduction

### Purpose of Document

This document defines approved patterns for AI and LLM-enabled solutions at Entegris. It helps teams use the enterprise AI gateway, grounded retrieval, and controlled agent behaviors without bypassing governance.

- The value of the pattern is speed to execution — leveraging what others have done before and quickly achieving business outcomes
- A pattern is best expressed as: When to use, When Not to use certain technologies/approaches
- This document is for designers and architects who need to design AI solutions that are grounded, auditable, and aligned to Entegris platform standards
- If implemented properly, these patterns enable you to get to production as fast as possible and have the most stable, scalable, and maintenance-free set of applications possible

### Scope and Applicability

These patterns cover LLM gateway usage, retrieval-augmented generation, and tool-calling agents for enterprise AI solutions.

- Application and service integration with LLM capabilities through the enterprise LiteLLM gateway
- Grounded retrieval and agentic patterns that require tool access and governance

**Environments:**

- Cloud

### Intended Audience

- Solution Architects
- Application Developers
- Data Engineers
- Security and Operations Teams

---

## Context

- All AI and LLM API calls must route through LiteLLM; direct model provider calls are not approved
- Google Gemini is the primary model family and is accessed through the LiteLLM gateway
- Grounding, citations, and output validation are mandatory when responses influence business or compliance decisions
- Prompt templates and agent configurations must be version-controlled in GitHub rather than hardcoded in application logic

### Why Use These Patterns

- Reduce cost through consolidation of functionality
- Agility through solutions based on a set of services that supports restructuring and reconfiguration of business processes
- Time-to-market through business-aligned solutions
- Alignment between IT and business goals, enabling re-use over time

---

## Architecture Principles

### Enterprise Principles

- Demonstrate Trustworthiness and Stewardship
- Keep It Simple
- Think Big and Execute Rapidly

### Domain-Specific Principles

- Human Accountability for AI Decisions
- Trusted Data for Trusted AI
- Responsible and Fair AI Use

### Security Principles

- Security and Privacy by Design for AI
- Trust Through Data Stewardship
- Security Assurance Through Least Privilege

---

## High-Level Solution Patterns

| Solution | When to Use | When Not to Use |
|---|---|---|
| RAG Pattern |• Need answers grounded in Entegris documents or enterprise knowledge<br>• Retrieved evidence must shape the model response|• The use case does not depend on enterprise knowledge retrieval<br>• Teams cannot maintain document chunking, embedding, and freshness pipelines|
| LLM API Gateway Pattern |• Need any application or service to call an LLM<br>• Cost tracking, rate limiting, and audit logging are required|• Teams intend to call model providers directly<br>• The solution does not require LLM capabilities at all|
| AI Agent with Tool-Calling Pattern |• Need the model to perform bounded actions through approved tools<br>• Workflows require orchestration across systems or data sources|• A simple retrieval or text generation pattern is sufficient<br>• Tool scope cannot be constrained or validated safely|

---

## Pattern Selection Matrix

| Scenario Cue | Knowledge Source | Risk Level | Direction | Recommended Pattern | Notes |
| --- | --- | --- | --- | --- | --- |
| Question answering over enterprise documents | Curated internal content | Moderate to high | User → AI service | RAG Pattern | Use Qdrant for vector retrieval with DLP scanning on ingested documents; log all queries and responses to BigQuery for audit |
| New app feature needs model inference | Prompt only or external context | Moderate | App → LiteLLM → Model | LLM API Gateway Pattern | Route through LiteLLM to enforce rate limits, content filtering, and PII redaction policies |
| Workflow assistant needs approved actions | Enterprise data plus tool access | High | User → Agent → MCP tools | AI Agent with Tool-Calling Pattern | Implement human-in-the-loop approval for write operations; log all tool calls to Cloud Logging |

---

## Canonical Patterns

### RAG Pattern

| Area | Description |
|---|---|
| **Context** | Users need AI-generated answers grounded in enterprise documents rather than unsupported model memory. Source content changes over time and must be cited back to the user. |
| **Problem** | How do we generate useful answers from enterprise knowledge while reducing hallucination risk and preserving traceability? |
| **Solution** | • Chunk approved documents, create embeddings, and store them in Qdrant as the vector retrieval layer<br>• At query time retrieve relevant passages, pass them through LiteLLM to Google Gemini, and instruct the model to synthesize only from grounded context<br>• Return citations to the source documents and validate outputs before presenting them to the user |
| **Benefits** | • Improves answer relevance by grounding responses in enterprise content<br>• Supports explainability through citations and retained source context<br>• Separates knowledge refresh from prompt or application deployment cycles |
| **Considerations** | • Document chunking, metadata, and refresh processes are critical to retrieval quality<br>• Sensitive sources need access control and classification-aware retrieval filters |

### LLM API Gateway Pattern

| Area | Description |
|---|---|
| **Context** | Multiple applications need model access, but Entegris requires common controls for routing, spend, and observability. The organization wants one enterprise point of policy enforcement. |
| **Problem** | How do we let teams use LLMs without creating uncontrolled direct dependencies on model providers? |
| **Solution** | • Send every inference request through the LiteLLM gateway rather than direct model provider SDKs or APIs<br>• Use LiteLLM capabilities for unified API shape, rate limiting, cost tracking, fallback routing, and audit logging<br>• Connect the gateway to approved upstream models such as Google Gemini and keep application code provider-agnostic |
| **Benefits** | • Centralizes AI policy enforcement and provider management<br>• Reduces application coupling to a single model vendor or API shape<br>• Improves visibility into spend, usage, and operational issues |
| **Considerations** | • Gateway availability and configuration become a shared platform dependency<br>• Application teams still need prompt and output design discipline even with a managed gateway |

### AI Agent with Tool-Calling Pattern

| Area | Description |
|---|---|
| **Context** | An AI solution needs to do more than answer text questions and must invoke tools to gather data or take approved actions. The workflow carries higher operational and compliance risk than plain generation. |
| **Problem** | How do we enable agentic behavior while keeping tool use bounded, reviewable, and safe? |
| **Solution** | • Define tool access through MCP with an explicit allow-list of operations the agent is permitted to call<br>• Route model requests through LiteLLM and validate outputs before any user-facing response or action is completed<br>• Insert human review checkpoints for high-stakes outputs such as architecture advice, compliance guidance, or irreversible actions |
| **Benefits** | • Enables richer automation while preserving control over what the agent can access<br>• Improves supportability through explicit tool scopes and audit logs<br>• Allows human oversight where risk or ambiguity is high |
| **Considerations** | • Tool schemas, permissions, and side effects must be designed carefully before production use<br>• Agents should not be given broader scope than the narrow business workflow requires |

## Sequence Diagrams

### RAG Pattern Flow

```mermaid
sequenceDiagram
    participant User as User
    participant App as AI Application
    participant Vec as Qdrant
    participant Gate as LiteLLM Gateway
    participant LLM as Google Gemini
    participant Src as Source Document Store

    User->>App: Ask enterprise question
    App->>Vec: Retrieve relevant document chunks
    Note right of Vec: Approved documents are chunked and embedded during refresh jobs
    Vec-->>App: Ranked passages with source metadata
    App->>Gate: Send prompt with grounded context
    Gate->>LLM: Forward standardized inference request
    LLM-->>Gate: Draft answer from supplied context
    Gate-->>App: Response with citations
    App-->>User: Grounded answer referencing source documents
```

### LLM API Gateway Pattern Flow

```mermaid
sequenceDiagram
    participant Client as Application Client
    participant Gate as LiteLLM Gateway
    participant Secret as Secret Manager
    participant LLM as Google Gemini
    participant Audit as Audit Logs

    Client->>Gate: Submit model inference request
    Gate->>Secret: Resolve provider credentials and policy config
    Secret-->>Gate: Approved secrets and limits
    Note right of Gate: Enforce rate limits, cost tracking, and fallback routing centrally
    Gate->>LLM: Forward normalized request
    LLM-->>Gate: Model response
    Gate->>Audit: Record usage, spend, and request outcome
    Gate-->>Client: Provider-agnostic response
```

### AI Agent with Tool-Calling Pattern Flow

```mermaid
sequenceDiagram
    participant User as User
    participant App as Agent Application
    participant Gate as LiteLLM Gateway
    participant MCP as MCP Server
    participant Tool as Approved Tool
    participant Rev as Human Reviewer

    User->>App: Submit task requiring data or action
    App->>Gate: Ask model to plan next step
    Gate-->>App: Return tool call decision
    App->>MCP: Invoke allow-listed tool operation
    Note right of MCP: Only explicitly approved tools are exposed to the agent
    MCP->>Tool: Execute bounded action or data lookup
    Tool-->>MCP: Tool result
    MCP-->>App: Structured tool response
    App->>Rev: Request review for high-stakes output when needed
    Rev-->>App: Approval or correction
    App-->>User: Final reviewed response or action result
```

---

## Tips and Best Practices

- Store AI model artifacts in GCS with versioning enabled and DLP scanning for PII leakage
- Use Vertex AI Model Registry for all production models with approval workflow before deployment
- Log all model predictions to BigQuery with model_version, input_features, and prediction_confidence
- Implement A/B testing for new model versions using Cloud Run traffic splitting
- Monitor model drift weekly using Vertex AI Model Monitoring; retrain when accuracy drops >5%
