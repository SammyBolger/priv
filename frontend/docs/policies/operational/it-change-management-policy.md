---
title: IT Change Management Policy
sidebar_label: IT Change Management
description: Framework for change control and approved change management of Entegris production applications and infrastructure.
tags: [policy, operational]
---

# IT Change Management Policy

| Field | Detail |
| --- | --- |
| **Document number** | 53289 |
| **Type** | Policy |
| **Domain** | Information Security (EQOS-21: Intellectual Property (IP) & Information Security) |
| **Revision** | 1 |
| **Owner** | Not stated in source |
| **Source file** | `53289 - IT Change Management_Policy.PDF` |

## 1. Purpose

1.1 To provide a framework of change control and approved change management for our systems environments. Entegris is a global organization that has systems deployed in North America, Europe, and Asia. Due to the geographical impact of our shared systems and their criticality to continued business operations, it requires formal change management policies and procedures in order provide reasonable assurance that system changes are risk assessed, authorized, tested, and approved before being moved to production. This process also ensures that existing security and control procedures are not compromised, that IT staff are given access only to those parts of the system necessary for their work, and that formal approval for qualifying changes is obtained. Change managers need to be change enablers and organizations need to enable high velocity changes with clear assessment of risk and impact and with clear lines of communication.

## 2. Scope

- **2.1** Globally all production corporate-wide used applications and infrastructure resources owned and maintained by IT.
- **2.2 Out-of-Scope:** Assets managed/maintained by Control Systems Engineering.

## 3. Roles & Responsibilities

- **Change Requestor** — Submit changes and describe at CAB if the change qualifies for CAB review.
- **Assignment Group / Assigned To** — Overall responsibility for implementation of the change and/or the change tasks (as assigned).
- **Infrastructure Non-ERP CAB** — Requires attendance from Global Service Desk, Desktop, Cloud/Directory Services, Endpoint/DSM Services, Network Services, Cybersecurity, Tenant Administration, Non-ERP Applications, and Engineering Apps. Reviews proposed changes for approval. Makes recommendations to CAB Manager to approve or reject.
- **Enterprise Business Applications/SAP CAB** — Requires attendance from SAP BAs, Developers, Integration and Basis teams. Reviews proposed changes for approval. Makes recommendations to CAB Manager to approve or reject.
- **CAB Manager** — Schedule and facilitate CAB meetings. Approves or rejects changes based on CAB input. Sends reports of approved changes following CAB meetings.

## 4. Terms & Definitions

| Term | Definition |
| --- | --- |
| CAB | Change Advisory Board |
| CI | Configuration Item |
| eCAB | Electronic Change Advisory Board |
| Impact | Measure of the business criticality of the affected service |
| Priority | Product of Impact and Urgency |
| Risk | The factors which can negatively affect achieving desired change outcome |
| SAP | German multinational software company that develops a suite of enterprise software to manage business operations and customer relations |

## 5. References

1. Entegris Cybersecurity Policy

## 6. Policy Requirements

- **6.1** All production applications and infrastructure changes must be documented in ServiceNow change tickets.
- **6.2** All qualifying changes must be tied to a Configuration Item (CI) discussed (details and schedule) at the appropriate CAB meeting.
- **6.3** All changes must be risk assessed and shall abide by applicable security policies.
- **6.4** Program changes will be moved from Development to the QA environment for integration and user acceptance testing prior to implementation in the production environment, where these Dev and QA environments exist.
- **6.5** Documentation must be available for all Emergency and Infrastructure or Non-ERP Application change requests. Documentation must include justification, implementation plans, risk and impact analysis, backout plans, test plans, and communication plans, impact assessments, test results, and back out procedures, assigned change tasks (required for CAB approval and only if others are needed to implement or communicate the change), and appropriate approvals.
- **6.6** Documentation must be available for all SAP Data Maintenance, SAP Expedited and SAP Normal changes and may include justification, implementation plans, risk and impact analysis, backout plans, test plans, and communication plans, impact assessments, test plans and results, and/or back out procedures, and appropriate approvals. They must include SAP Transport Numbers. Assigned change tasks may be used if others are needed to implement or communicate the change.

### 6.7 Emergency Changes

- **6.7.1** Emergency changes are required for critical business operations and may not necessarily follow the weekly change management review/ application process due to their criticality/need.
- **6.7.2** Emergency changes could be both in the application or the infrastructure domains and must be classified/ recorded as “emergency.”
- **6.7.3** Emergency changes require a high priority incident ticket to be logged in the Related Records field.
- **6.7.4** eCAB approval will be needed for all emergency changes. Approval can happen after the change is implemented only for major incidents where a business service is down/broken, or for Cybersecurity zero-day vulnerabilities and critical exposure risks. All other emergency changes must be approved prior to implementation.
- **6.7.5** All emergency changes must be reviewed, checked for appropriate authorization, and documented after the application of the change.

### 6.8 Track and Report Change Status

- **6.8.1** The CAB must discuss all in-process changes, and a decision (approve/ reject) shall be made/ documented for all qualifying changes.
- **6.8.2** Ensure that Change Status Reports form an audit trial so that changes can subsequently be tracked from inception to eventual disposition.

### 6.9 Close and Document Changes

- **6.9.1** Appropriate controls should ensure that the approved changes are closed in a timely fashion - within fourteen business days of the planned end date. Change tickets that are open 14 days past the planned end date will be closed as unsuccessful by the CAB Manager.
- **6.9.2** Ensure appropriate updates to all relevant documentation (SOPs, configuration, etc.).
- **6.9.3** All relevant document updates shall be mapped to relevant changes and retained up to 1 year from application of the change.

### 6.1 Change types

6.1.1 Change types table:

| Change Type | Definition |
| --- | --- |
| Normal Change | Follows proper lead time and approval processes based on risk, etc. |
| Emergency Change | Changes that must be implemented immediately to resolve a major incident or restore a service – tend to be high risk. |
| Standard Change | Pre-authorized, low-risk, well-tested, and repetitive changes that follow a well-known procedure. This will be added in the future. |

### 6.2 Change Approvals

6.2.1 Change type and approval requirements:

| Model | Risk | Approver 1 | Approver 2 | Approver 3 |
| --- | --- | --- | --- | --- |
| SAP Data Maintenance | All | Approval Group | Managed By Group | |
| SAP Expedited | All | Approval Group | Managed By Group | |
| SAP Normal | All | Approval Group | Managed By Group | CAB |
| Infrastructure | Low | Assignment Group Manager | | |
| Infrastructure | Medium | Assignment Group Manager | CAB | |
| Infrastructure | High | Assignment Group Manager | CI Owner | CAB |
| Emergency | All | eCAB | | |

## 7. Exceptions Management

<!-- Standard section: do not edit. -->

It is expected that all information technology and operational technology teams in Entegris will follow this policy requirements. Any exceptions to this policy, either partial or full, must be submitted by the designated Business/Technology Sponsor stating the compelling reasons as to why the requirements cannot be met, and what other compensating controls are there to mitigate the risk to Entegris.

- All exceptions must be given for a limited period, a maximum of 1 year.
- All exceptions must be documented per Entegris Exception Management Process.

## 8. Policy Distribution and Training

<!-- Standard section: do not edit. -->

All security related policies must be clearly communicated to all employees and third parties. IT/OT Management will coordinate with Human Resources as needed to determine appropriate new employee orientation, security training and awareness content areas. All Suppliers and contractors shall be required to abide by these security related policies.

## 9. Policy Enforcement

<!-- Standard section: do not edit. -->

All security related policies will be enforced using either system automated or manual controls. All users are expected to comply with these policies and promote secure computing practices. Any user found to have violated this policy may be subject to disciplinary action, up to and including termination of employment and legal prosecution.

## 10. Revision History

| New Rev | Description of Change | Reason for Change |
| --- | --- | --- |
| 1.0 | This is a new IT Change Management policy | New policy document. |
