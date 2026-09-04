# Architecture Position: AI Coding Agents and Custom Code Deployment

| | |
|---|---|
| **Title** | AI Coding Agents and Custom Code Deployment |
| **Type** | Architecture Position |
| **Owner** | Enterprise Architecture |
| **Date** | 2026-07-15 |
| **Status** | Draft — Pending ARB Ratification |
| **Scope** | Entegris-wide; applies to all business, IT, and engineering colleagues operating within the Entegris network |

---

## Overview

An architecture position is a detailed point of view on a complex topic. Positions articulate when to use — or when not to use — certain technologies or approaches.

This position defines Entegris's stance on the use of AI coding agents, the deployment of custom code to GCP, and the internal sharing of executables. It exists so that Enterprise Architecture, ARB, IT, and business colleagues can align on a single, consistent message to the business as demand for these capabilities grows.

---

## Executive Summary

### Statement of Position

**Entegris supports the use of AI coding agents, custom code deployment to GCP, and internal executable sharing — provided the activity takes place inside a secure, sandboxed environment, and provided the user has completed required training and accepted the Entegris Secure Development Policy.** Until these sandboxed capabilities are in place, Entegris does not support coding-agent execution on user laptops, ad-hoc deployment of custom code to GCP outside established data platforms, or internal executable distribution outside sanctioned channels.

This is a "yes with guardrails" position, not a prohibition. We are actively building the required capabilities.

### Basis

Demand across the business for coding agents, custom deployment, and code sharing is real and growing. Blocking that demand is not a viable long-term option: historical experience shows that unmet capability demand routes around IT into unmanaged adoption, which is a worse security outcome than a supported path would be.

However, the current default state — coding agents running on user laptops with unmanaged network egress and unmanaged access to Entegris data — introduces material security risks that we cannot accept as ongoing exposure. These include supply-chain compromise, prompt-injection attacks, data exfiltration, and ransomware exposure. In effect, a coding agent on a user laptop executes untrusted code inside the Entegris network boundary.

The correct response is neither blanket prohibition nor unrestricted use. It is to deliver a supported capability quickly: sandboxed execution environments, tool-agnostic integration with a preference for open-source and existing provider agreements, and mandatory training. The implementation path is judged low-friction. The primary constraint is organizational prioritization, not technology or skill.

### Implications

- **Two sandboxed environments will be delivered:** a code sandbox first, an artifact-sharing sandbox second.
- **A training program and the Entegris Secure Development Policy** are prerequisites for user access.
- **Interim business message (until sandboxes are available):** Entegris supports coding agents that operate within its Secure Development Policy, is actively building secure sandboxed environments to enable this capability, and does not support unmanaged deployments or access outside established data platforms in the meantime.
- **Enterprise Architecture** owns the communication of this position to the business.
- **ARB** provides ratification and standing air cover for consistent messaging when this position is challenged.
- **A published target date for Phase 1 (code sandbox) availability** should accompany ratification so the interim posture has a defined endpoint.

---

## Position Detail

### Background / Motivation

Multiple business teams have requested the ability to run AI coding agents on user laptops, deploy custom code to GCP, and share executables internally. In some cases, teams have begun exploring approaches outside existing access controls. This position was requested by EA leadership to establish a single, consistent message across IT and the business, and to give ARB the standard justification it needs when the resulting decisions are pushed back on.

The choice is not between "AI coding agents" and "no AI coding agents." That choice has effectively already been made by the market and by the business — the demand is here, and if EA does not provide a supported path, adoption will happen anyway with worse risk exposure. The real choice is between **supported enablement with guardrails** and **unsupported adoption without them**. This position takes the first path.

### Subject Area Overview

**AI coding agents** are tools that combine a large language model with the ability to read, write, and execute code on behalf of a user. Current examples include IDE-integrated agents (GitHub Copilot Agent Mode, Cursor Agent, Claude Code) and self-hosted equivalents. Their productivity value is well-established. So are the security implications of running them without controls inside a corporate network.

**Custom code deployment to GCP** refers to the deployment of executable artifacts to GCP resources by users outside of the sanctioned IT/DevOps deployment pipeline — for example, via personal accounts, direct-to-service uploads, or unmanaged buckets.

**Internal executable sharing** refers to the distribution of compiled binaries, containers, or scripts across the organization outside of governed channels (approved package repositories, sanctioned artifact stores, IT-managed distribution).

### Detailed Statement of Position

Entegris supports coding-agent use, custom code deployment to GCP, and internal executable sharing when **all three** of the following conditions are met:

1. **Sandboxed environment.** The agent or code executes inside an Entegris-approved sandbox with network egress controls, isolation from production data, monitored resource use, and structured audit logging.
2. **Training.** The user has completed the Entegris coding-agent training program, comprising both synchronous live modules and asynchronous interactive labs.
3. **Policy acceptance.** The user has read and accepted the Entegris Secure Development Policy.

Access to any of these capabilities without all three conditions being met is **not** supported. Access requests that cannot be routed through the supported path should be escalated for individual review; they are not automatically permitted.

The position is deliberately **tool-agnostic**. Specific vendor choices (agent, IDE, model provider, sandbox platform) are implementation decisions made *under* this position, not *by* it. Preference is given to open-source tooling and to AI providers with existing Entegris agreements, but the position does not lock in specific products, so it remains valid as the tool landscape evolves.

### Options / Variants

Three alternatives were considered and rejected before arriving at the position above:

**Option A — Blanket prohibition (rejected).** Prohibiting coding-agent use would remove the visible surface area but would not remove the underlying demand. It would drive shadow adoption, which is harder to observe, control, and respond to than sanctioned adoption. It would also position IT and EA as the "department of No," eroding trust and reducing IT's ability to shape adjacent decisions.

**Option B — Unrestricted use (rejected).** Permitting laptop-based coding agents and ad-hoc GCP deployment without controls would accept the enumerated security risks (supply-chain compromise, prompt-injection, data exfiltration, ransomware) as ongoing, unbounded exposure. This is not defensible under existing Entegris security principles or standards.

**Option C — Case-by-case exception approval (rejected).** Reviewing each request individually would consume EA and Security bandwidth linearly with demand, produce inconsistent outcomes, and defer rather than resolve the underlying capability gap. It also does not scale as demand grows.

**Option D — Supported enablement via sandbox + training + policy (chosen).** Scales cleanly, produces consistent outcomes, addresses the underlying risks directly, and gives the business a supported path within a bounded timeline. It converts an open-ended risk exposure into a delivery program with a defined end date.

### Detailed Basis

**Security risks of the current unmanaged state.** A coding agent running on a user laptop is, in security terms, a process that reads, writes, and executes code inside the corporate network boundary, often with access to source repositories, credentials in the developer environment, and outbound network egress. The specific risk classes are:

- **Supply-chain compromise.** Coding agents pull and execute code from external sources (packages, plug-ins, generated snippets). Without sandboxing, a compromised dependency runs with the user's privileges.
- **Prompt-injection attacks.** Adversarial content in files, documentation, or web pages the agent processes can cause the agent to take unintended actions — including data movement or code execution — under the user's identity.
- **Data exfiltration.** Coding agents routinely send file contents to external model providers. Without controlled providers and controlled network egress, this creates an uncontrolled data-egress path.
- **Ransomware exposure.** Any process capable of writing files under user privilege is a potential ransomware vector. Coding agents amplify this because they are designed to modify code and configuration.

These risks apply regardless of the specific agent or vendor chosen. They are properties of the unmanaged-execution pattern, not properties of any specific product.

**Why sandboxing addresses the risks.** A sandboxed environment scopes the agent's execution to a controlled context with limited network egress, no direct access to production data, and full audit logging. This does not eliminate the risks, but it bounds them — a compromised dependency or prompt-injection attack inside a sandbox does not automatically reach production data or the broader corporate network.

**Why training and policy acceptance are non-negotiable.** Technical controls alone do not cover the full risk surface. The user has to understand what the tool will and will not do on their behalf, what data they can and cannot expose to it, and what the escalation path is when something goes wrong. Training makes those expectations explicit. Policy acceptance makes them enforceable.

### Assumptions

- The Entegris IT organization has the tools and personnel to build the required sandboxes. This is a prioritization question, not a technology or skills gap.
- Existing Entegris AI provider agreements can be extended or leveraged to serve the sandboxed environment, avoiding the need for greenfield contracting.
- Business demand for coding agents is durable — building sandboxed capability is a durable investment, not a one-cycle response to a passing trend.
- A published target date for Phase 1 availability can be committed as part of ratification, converting the interim posture from open-ended to time-bound.
- The Entegris Secure Development Policy either exists in usable form or can be authored and published on a timeline compatible with sandbox delivery.

### Detailed Implications

**For the business.**
- In the interim: unmanaged coding-agent use on laptops, ad-hoc GCP deployment, and undocumented executable sharing are not supported. Existing sanctioned paths (approved data platforms, IT-owned deployment channels) remain the only supported routes.
- After sandbox availability: coding agents, custom code deployment, and internal artifact sharing become supported capabilities, subject to training and policy acceptance.

**For IT and Engineering.**
- Deliver the **code sandbox (Phase 1):** isolated runtime, controlled network egress, no direct production-data access, structured audit logging, integration with existing identity systems.
- Deliver the **artifact-sharing sandbox (Phase 2):** governed executable distribution with provenance, access control, and vulnerability scanning.
- Design provider-agnostic integration for AI model access, prioritizing swappable providers over vendor lock-in.

**For Enterprise Architecture.**
- Own communication of this position to the business.
- Provide standardized talking points for pushback scenarios.
- Coordinate with ARB for consistent air cover across teams.
- Maintain the position document and revise it as the threat and tooling landscape evolves.

**For Security.**
- Author or update the Entegris Secure Development Policy so it explicitly covers coding-agent usage.
- Define acceptable-use criteria and inputs the agent may not process (e.g., data classifications, credential material).
- Define an incident-response playbook for coding-agent-related incidents.

**For Training / L&D.**
- Deliver the synchronous live training modules.
- Deliver the asynchronous interactive labs.
- Define completion certification and integrate it with the access-control system for the sandbox.

**For ARB.**
- Ratify this position formally.
- Provide standing air cover when this position is challenged in individual review conversations.
- Consider a scheduled re-ratification (see Governance below) so the position remains current as the landscape evolves.

### Feasibility / Scalability

**Tooling.** Existing open-source and commercial sandbox technologies cover the required capability. No greenfield technology bet is required. Provider-agnostic AI integration is likewise a well-understood pattern.

**Providers.** Existing Entegris AI provider agreements can be leveraged. The position's preference for swappable providers preserves the ability to change vendors without re-writing the sandbox contract.

**People.** Existing IT and Engineering capability is judged sufficient for implementation. This is not a hiring-gated program.

**Timeline.** Constrained primarily by organizational prioritization against competing work. Ratification of this position should be accompanied by a committed Phase 1 target date, so the interim posture is time-bounded and the business message ("we are actively building this") is anchored to a specific delivery.

**Scalability.** The sandbox model scales with additional users through capacity provisioning, not through per-user architectural rework. Training and policy acceptance are one-time-per-user prerequisites; once completed, they do not gate ongoing use.

---

## Governance

| | |
|---|---|
| **Owner** | Enterprise Architecture |
| **Approver** | Architecture Review Board (ARB) |
| **Review cadence** | Every 6 months, or upon material change in threat landscape, tooling landscape, or provider agreements |
| **Related** | Entegris Secure Development Policy; Entegris data classification standards; existing GCP deployment governance; existing AI provider agreements |
| **Supersedes** | None (this is a new position) |

---

## Standardized Messaging (for reuse by EA, ARB, and IT leaders)

The following short-form messages are the recommended standard talking points aligned to this position. Use these verbatim or as a starting point when communicating to the business.

**Short form (one sentence):**
> Entegris supports coding agents and custom code deployment through secure sandboxed environments, mandatory training, and policy acceptance. In the interim, unmanaged use is not supported.

**Interim message (until Phase 1 delivery):**
> We support the use of coding agents which follow our Secure Development Policy, and we are actively building secure, sandboxed environments to enable this capability. In the interim, we are not supporting unmanaged deployments or access outside established data platforms.

**When pushed back on:**
> The intent of this position is enablement, not prohibition. The controls exist because a coding agent on an unmanaged laptop executes untrusted code inside our network boundary — that risk applies regardless of vendor. We are building the supported path on a committed timeline and expect the sandbox to cover the majority of business use cases.
