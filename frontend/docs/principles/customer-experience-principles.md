# Customer Digital Experience Principles

## Simple

**Principle Name:** Simple

**Statement:** Customer digital experiences should be designed for speed, effortlessness, and effectiveness — minimizing the steps, decisions, and effort required to accomplish any goal.

**Rationale:** Customers engaging with Entegris digitally are technical professionals with high expectations and limited patience for complex interfaces. Simple experiences drive adoption, reduce errors, and lower support costs.

**Implications:**

- Customer journeys should be mapped and tested end-to-end for clarity and ease before release.
- Interfaces should eliminate unnecessary steps, decisions, and data entry wherever possible.
- Onboarding should be minimized — customers should be able to self-serve without extensive training.

## Engaging

**Principle Name:** Engaging

**Statement:** Customer digital experiences should be designed for relevance and value — presenting information and functionality that is contextually useful, not generically complete.

**Rationale:** Relevant, personalized experiences create stronger customer engagement, increase return usage, and differentiate Entegris from competitors offering generic portals.

**Implications:**

- Content and functionality should be curated based on the customer's product line, role, and history.
- Experiences should be measured for engagement and continuously improved based on usage data.
- Irrelevant or unused features should be de-emphasized or removed to reduce noise.

## Transparent

**Principle Name:** Transparent

**Statement:** Customer digital experiences should build trust by proactively providing the data, status, terms, and context customers need to make informed decisions — without requiring them to ask.

**Rationale:** Transparency is a key driver of customer trust and satisfaction in B2B relationships. Customers who can see order status, quality data, and material traceability in real time are less likely to escalate issues and more likely to deepen their relationship with Entegris.

**Implications:**

- Order status, shipment tracking, and quality event data should be surfaced proactively, not reactively.
- Customer-facing decisions (pricing, availability, specifications) should be explainable and verifiable.
- Communication around issues, delays, or changes should be honest, timely, and specific.

## Collaborative

**Principle Name:** Collaborative

**Statement:** Customer digital experiences should enable open collaboration — allowing customers and Entegris teams to connect, communicate, share data, and transact within a secure, structured framework.

**Rationale:** Deep collaboration with key customers is a source of innovation, loyalty, and competitive differentiation. Digital tools that facilitate that collaboration amplify the value of the relationship.

**Implications:**

- Collaboration features (data sharing, sample tracking, joint development workflows) should be designed with security and access control as first-class requirements.
- Customer feedback mechanisms should be embedded in the experience, not bolted on afterward.
- Interaction patterns should support async and synchronous collaboration to fit customer workflows.

## Customer-Centric

**Principle Name:** Customer-Centric

**Statement:** Every decision in customer digital experience design should prioritize the customer's needs, workflows, and outcomes — not internal convenience or legacy system constraints.

**Rationale:** Customer-centric design produces stronger adoption, higher satisfaction, and competitive differentiation. Internal constraints should be resolved internally, not exposed to the customer as their problem to work around.

**Implications:**

- Customer impact should be the primary evaluation criterion for digital experience design decisions.
- Customer feedback and usage data should directly influence roadmap and design priorities.
- Support and service design should be aligned to the customer journey, not the organizational structure.

---

# AI Principles

## Human Accountability for AI Decisions

**Principle Name:** Human Accountability for AI Decisions

**Statement:** Humans remain accountable for decisions that are informed by or automated through AI. Accountability cannot be delegated to a model.

**Rationale:** Accountability for business outcomes, ethics, and compliance is a human responsibility. AI systems can inform and accelerate decisions, but they cannot be named as responsible parties.

**Implications:**

- A named human owner should be assigned for each production AI use case.
- Decision rights and escalation paths should identify accountable roles, not AI systems.
- Human oversight mechanisms should be defined and enforced for all high-impact AI decisions.

## Business Outcome First

**Principle Name:** Business Outcome First

**Statement:** AI initiatives should begin with a defined, measurable business outcome — not a technology-first experiment or a model capability demonstration.

**Rationale:** Outcome-first prioritization ensures AI investments are tied to measurable value and prevents the organization from funding AI for its own sake.

**Implications:**

- Each AI use case should define measurable success criteria before funding is approved.
- Prioritization should be based on expected business value and risk, not novelty or vendor preference.
- Pilots should include explicit go/no-go thresholds tied to business metrics.

## Trusted Data for Trusted AI

**Principle Name:** Trusted Data for Trusted AI

**Statement:** AI solutions should use governed, high-quality, and context-appropriate data. AI is only as trustworthy as the data it reasons over.

**Rationale:** Model behavior and business reliability depend entirely on data quality, lineage, and governance. Poorly governed data produces AI outputs that cannot be trusted or explained.

**Implications:**

- Training and inference data should have clear ownership, lineage, and quality standards.
- Data quality checks should be defined and enforced for all AI-critical datasets.
- AI deployment should be blocked when minimum data governance standards are not met.

## Security and Privacy by Design for AI

**Principle Name:** Security and Privacy by Design for AI

**Statement:** AI systems should embed security, privacy, and access controls from design through operations — with additional scrutiny beyond standard application security.

**Rationale:** AI introduces unique risks including prompt injection, data leakage through model outputs, and unintended inference from training data. These risks require explicit design attention beyond standard application security practices.

**Implications:**

- Threat modeling specific to AI attack surfaces should be part of every AI design and architecture review.
- Least-privilege access should apply to data, models, prompts, and tool-calling surfaces.
- Privacy controls should be explicitly defined for training data, inference inputs, and output logging.

## Responsible and Fair AI Use

**Principle Name:** Responsible and Fair AI Use

**Statement:** AI outcomes should be evaluated for bias, harmful impact, and misuse risk before release and continuously throughout production operation.

**Rationale:** Responsible AI use protects employees, customers, and partners from harm, and protects Entegris's reputation and legal standing. AI systems can produce discriminatory or harmful outputs even without explicit intent.

**Implications:**

- Risk and fairness assessments should be completed before any AI system is deployed to production.
- Mitigations for identified fairness, safety, and misuse risks should be documented and implemented.
- Sensitive use cases (HR, legal, financial, safety-critical) should require enhanced governance and review.

## Transparency and Explainability

**Principle Name:** Transparency and Explainability

**Statement:** AI-assisted decisions should be explainable to the level required by the business, legal, and operational context in which they are made.

**Rationale:** Explainability supports user trust, regulatory compliance, and the ability to audit, challenge, and improve AI behavior over time.

**Implications:**

- Model purpose, known limitations, and key assumptions should be documented and accessible.
- Users should be informed when AI materially influences an outcome or recommendation.
- Decision traceability should be retained for the period required by the applicable business or regulatory context.

## Model Risk Management

**Principle Name:** Model Risk Management

**Statement:** AI models are managed assets and should follow formal risk classification, validation, and control requirements proportionate to their impact and exposure.

**Rationale:** Different AI use cases carry fundamentally different levels of business, operational, and compliance risk. A recommendation engine and a safety-critical process controller require different governance.

**Implications:**

- Models should be risk-tiered based on impact, exposure, and decision autonomy.
- Validation and approval depth should match the model's risk tier.
- Periodic review and revalidation should be required at defined intervals or upon significant change.

## Continuous Monitoring and Lifecycle Governance

**Principle Name:** Continuous Monitoring and Lifecycle Governance

**Statement:** AI behavior, quality, drift, and operational health should be continuously monitored throughout the full model lifecycle — from deployment through retirement.

**Rationale:** Model performance and risk posture can degrade silently as data distributions, business context, and user behavior evolve. Continuous monitoring is the only way to detect and respond to this degradation.

**Implications:**

- Monitoring should include performance metrics, data drift indicators, and reliability signals.
- Retraining triggers, rollback criteria, and retirement criteria should be defined before deployment.
- Production incidents and model degradation events should feed directly into governance and control improvements.

## Reuse Before Rebuild

**Principle Name:** Reuse Before Rebuild

**Statement:** Teams should evaluate and prefer approved shared AI platforms, services, and patterns before building custom AI solutions from scratch.

**Rationale:** Reuse improves speed, consistency, supportability, and cost control. Proliferation of custom AI builds creates fragmented governance, duplicated cost, and unsustainable support burden.

**Implications:**

- New AI initiatives should evaluate existing enterprise capabilities (LiteLLM, Gemini, Copilot) before proposing custom model builds.
- Exceptions to shared AI standards should require documented justification and ARB review.
- Shared AI components should have clear ownership, documented interfaces, and active lifecycle support.

## Compliance and IP Protection

**Principle Name:** Compliance and IP Protection

**Statement:** AI use must comply with all applicable legal, regulatory, contractual, and intellectual property obligations for inputs, models, and outputs.

**Rationale:** AI can create material legal and intellectual property risk through unlicensed training data, model output copyright issues, and regulatory non-compliance. These risks must be explicitly managed.

**Implications:**

- Approved model and tool usage boundaries should be defined and communicated to all AI practitioners.
- Data and content usage rights should be validated before any AI training or inference workflow is established.
- High-risk AI outputs (legal, regulatory, safety-critical) should follow documented review and approval controls.

---
