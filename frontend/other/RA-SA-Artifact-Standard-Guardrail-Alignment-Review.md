# Structural Alignment Review

## Reference & Solution Architecture Artifact Standard vs. the Architecture Assurance Guardrail Framework

**Prepared for:** Enterprise Architecture review
**Subject:** Does the RA/SA Artefact Standard align — structurally — with the guardrail framework?
**Scope of this review:** Structure only (not a compliance/assurance assessment)
**Date:** 7 August 2026

---

## Summary

The Architecture Assurance Guardrail Framework defines guardrails as **five coordinated instruments**: Policies, Principles, Positions, Practices, and Standards.

Assessed against those five, the RA/SA Artefact Standard is **largely aligned**. Three of the five instruments are explicit in the document structure, a fourth (Practices) is fully present in substance, and one (Policies) is a genuine structural gap. The standard consistently treats guardrails the way the framework intends — as something a Reference Architecture *encodes* and a Solution Architecture must *conform to, with named deviations*.

Two structural adjustments would take it from "largely aligned" to "fully aligned."

---

## Alignment by guardrail instrument

| Guardrail instrument | Represented in the standard's structure? | Where in the standard |
|---|---|---|
| **Principles** | Yes — explicit | RA §4 "Drivers & principles"; via RAs cited in SA §6 "Conformance & deviations" |
| **Positions** | Yes — explicit | RA §4 and SA §6 both name "Architecture Positions"; the standard is billed as a companion to the Architecture Position template |
| **Standards** | Yes — explicit | RA §7 "Patterns & standards" (technology standards, preferred products); §6.4 naming & classification |
| **Practices** | Present, but not labelled as a guardrail | §6 Governance / RACI / workflow / versioning; §7 "Best Practices & Anti-Patterns"; SA §7 architecture decision records (ADRs) |
| **Policies** | Gap — no dedicated element | Only touched indirectly via RA §8 "compliance," SA §10 "regulatory obligations," and §6.4 "per corporate policy" |

---

## Verdict

**Structurally, the document is sound and consistent with the guardrail framework.** It repeatedly frames guardrails as inputs that artefacts must conform to, and it enforces named, justified, logged deviations — which is exactly the framework's intent.

Two structural gaps prevent a clean, one-to-one fit:

1. **Policies has no explicit home.** The framework's leading instrument — non-negotiable statements of compliance — is not a traceable element in either the RA or SA document definition. It appears only implicitly under "compliance" and "regulatory obligations."

2. **The five instruments are scattered, not unified.** The framework treats guardrails as a single coordinated set. The standard references them piecemeal (principles in §4, standards in §7, positions in §4/§6), so a reviewer cannot see guardrail conformance in one place.

---

## Recommendation

Add a single **"Architecture Guardrails conformance" block** as a subsection in both the Reference Architecture and Solution Architecture document definitions, and include a **Policies** row. This surfaces all five instruments together and makes guardrail conformance visible in one location — without changing anything else about the standard.

A suggested form of that block, in the standard's own house style (keep every heading; mark non-applicable rows "Not applicable" with a one-line reason):

| # | Guardrail type | What it is | What the artefact must state |
|---|----------------|------------|------------------------------|
| 1 | **Policies** | Non-negotiable statements of compliance the enterprise must uniformly adhere to. | Which policies bind this design (cybersecurity, operational, application & system). Any exception is named and routed to the ARB as architecture debt. |
| 2 | **Principles** | Simple statements of value/belief that guide capability and solution decisions. | Which principles the design conforms to, and any principle it trades off, with justification. |
| 3 | **Positions** | An agreed point of view on a complex topic (when to use / when not). | Which Architecture Positions apply, and confirmation the design stays on the "when to use" side — or a named, time-bound deviation. |
| 4 | **Practices** | The procedural "how we operate" for building, partnering, acquiring, and running. | Which standard practices the delivery/run approach follows (ARB gates, ADR logging, change control). |
| 5 | **Standards** | Areas with a mandated common solution or preferred product. | Which technology standards and preferred products are adopted, and any bespoke choice with rationale. |

---

## One-line message

The structure is consistent with the guardrail framework; it needs only the five guardrails surfaced together as a single element, plus an explicit Policies hook, to match the framework one-to-one.
