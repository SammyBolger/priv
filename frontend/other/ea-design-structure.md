# EA design structure

## Additional Inputs
### Reference Architecture
- By Domain
- Decision Log

### Project Related
- [BRD](https://entegris.sharepoint.com/:w:/s/Enterprise_Architecture/EX50vsst_wBNj8aEjzGJPY4BSpc3Yrrbz5jHuX8RE5HzDA?e=6uId4n) - not an architecture artifact - its an input
- [Solution Architecture - can't be SAD Entegris Architecture Document](https://entegris.sharepoint.com/:w:/s/Enterprise_Architecture/EUR43xRht4ZLix0McrCDQpEBhRmEVpIlGmkhc86x4Is9xw?e=WdnUXV)-
- Key Design Decisions - need a template


Captured from the whiteboard session on 2026-08-12. Two views:

1. **Toolchain** — where artifacts live and how work moves from intake to published documentation.
2. **Content model** — what belongs in Ardoq vs. Confluence, and which architect role consumes it.

---

## 1. Toolchain: intake to published documentation

```mermaid
flowchart TD
    SNOW["ServiceNow<br/>Intake"]
    SS["Smartsheet<br/>Project portfolio"]
    JIRA["Jira<br/>Delivery execution"]
    CONF["Confluence<br/>FA + ops app support"]

    SNOW --> SS
    SS --> JIRA
    JIRA --> CONF

    subgraph GH["GitHub: EA template set"]
        direction TB
        RA["RA - reference architecture"]
        SA["SA - solution architecture"]
        TA["TA - technical architecture"]
        FA["FA - Functional Architecture"]
        KDD["KDD + decision log"]
    end

    GH -- "templates and decisions" --> CONF

    classDef flow fill:#E1F5EE,stroke:#0F6E56,color:#04342C
    classDef repo fill:#EEEDFE,stroke:#534AB7,color:#26215C
    class SNOW,SS,JIRA,CONF flow
    class RA,SA,TA,ADD repo
```

**Reading it**

- ServiceNow is the front door for demand; Smartsheet carries the project portfolio; Jira carries delivery.
- GitHub is the source of truth for the template set and the decision record. Templates are authored and versioned there.
- Confluence is the published, human-readable layer — functional architecture pages and operations / application support content.

---

## 2. Content model: Ardoq, Confluence, and the architect roles

```mermaid
flowchart TD
    subgraph ARDOQ["Ardoq: structured repository"]
        direction TB
        OBJ["Business objectives + OKRs"]
        CAP["Capabilities"]
        INIT["Initiatives"]
        PROC["Processes - SCOR"]
        OBJ --> CAP
        CAP --> INIT
        INIT --> PROC
    end

    subgraph CONFL["Confluence: narrative knowledge base"]
        direction TB
        PAT["Patterns - reference and target"]
        DOM["Domains: planning and fulfillment, I4.0, quality<br/>application and data views"]
        REF["Reference architectures"]
        ENG["Engineering + cybersecurity"]
    end

    SAR["SA<br/>Solution architecture"]
    FAR["FA<br/>Functional architecture"]
    TAR["TA<br/>Technical architecture"]
    OPS["Ops<br/>Service requests"]

    ARDOQ --> SAR
    ARDOQ --> FAR
    ARDOQ --> TAR
    ARDOQ --> OPS

    CONFL --> SAR
    CONFL --> FAR
    CONFL --> TAR
    CONFL --> OPS

    classDef ardoq fill:#EEEDFE,stroke:#534AB7,color:#26215C
    classDef confl fill:#E1F5EE,stroke:#0F6E56,color:#04342C
    classDef role fill:#FAECE7,stroke:#993C1D,color:#4A1B0C
    class OBJ,CAP,INIT,PROC ardoq
    class PAT,DOM,REF,ENG confl
    class SAR,FAR,TAR,OPS role
```

**Reading it**

- Ardoq holds the structured, queryable model. The arrows inside it are the traceability chain — objectives to capabilities to initiatives to processes — not a workflow sequence.
- Confluence holds the narrative that structure cannot carry: patterns with explicit reference and target states, domain pages, reference architectures, engineering and cybersecurity guidance.
- All four roles consume both. The distinction is that Ardoq answers "what exists and how does it connect," Confluence answers "how do we build it."

---

## Open items from the board

| Item | Interpretation used | Needs confirmation |
| --- | --- | --- |
| `hDD` under the decision log | Read as **ADD** — architecture decision document | If the intent was ADR, the label changes but not the placement |
| `Jeff` next to business objectives / OKRs | Treated as an ownership annotation, not a structural element | Whether ownership should be modeled explicitly in Ardoq |
| `Printing` above patterns | Omitted — appears to be a domain example rather than a layer | Whether it belongs alongside planning / I4.0 / quality |
| `SR` below Ops | Modeled as service requests inside the Ops role | Whether service requests need a feedback edge back to intake |
