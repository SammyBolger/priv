---
title: Entegris Incident and Major Incident Response Management Policy
sidebar_label: Incident & Major Incident Response
description: Framework for detecting, classifying, prioritizing, and resolving incidents and major incidents across Entegris systems.
tags: [policy, operational]
---

# Entegris Incident and Major Incident Response Management Policy

| Field | Detail |
| --- | --- |
| **Document number** | 53335 (EtQ) |
| **Type** | Policy (Entegris Global) |
| **Domain** | Operational / Information Security (EQOS-21: Intellectual Property (IP) & Information Security) |
| **Revision** | 1 |
| **Owner** | Not stated in source |
| **Source file** | `53335 Entegris_Incident_MajorIncident_Mgmt_Policy.PDF` |

## 1. Purpose

**1.1** To provide a framework of incident control and approved incident management for our systems environments. Entegris is a global organization that has systems deployed in North America, Europe, and Asia. Due to the geographical impact of our shared systems and their criticality to continued business operations, IT requires formal incident management policies and procedures in order to effectively and efficiently handle and resolve incidents that disrupt or degrade the normal functioning of IT services.

**1.2** The goal of incident management is to restore service as quickly as possible, after an incident. The process includes the methods and actions for monitoring, discovering, reporting, and resolving incidents. The process also aims to reduce downtime and minimize impact on employee productivity from incidents.

**1.3** A major incident (Priority 1) is the highest-impact, highest-urgency incident. Given the urgency of the situation, a well-coordinated response process is required to accelerate the resolution and minimize the business impact. This includes:

- **1.3.1** Minimize the impact of service interruptions.
- **1.3.2** Ensure that an appropriate Incident Manager/Major Incident Team/Management Group are in place to manage a major incident.
- **1.3.3** Ensure that stakeholders are well-informed of service interruptions, degradations, and resolutions.
- **1.3.4** Conduct a review of each major incident once service is restored. Its purpose is to analyze the incident and understand what can be done to prevent a similar incident in the future. This review also provides an opportunity to evaluate the incident response process and identify areas for improvement.
- **1.3.5** Create a problem for root cause analysis.

## 2. Scope

**2.1** The scope of this policy is Global.

**2.2** All production systems - corporate-wide used applications and infrastructure resources owned and maintained by IT, OT (when they require IT), and the business.

Out-of-scope: Assets managed/maintained by Control Systems Engineering

## 3. Roles & Responsibilities

**Caller**

- Bringing incidents to the attention of the Service Desk
- Participating in the implementation of a solution or workaround
- Confirming successful resolution

**Global Service Desk (Level 1)**

- Recording, ownership, monitoring, tracking, and communication about incidents
- Investigating and diagnosing incidents
- Providing resolutions and workarounds from standard operating procedures and existing known errors
- Escalating incidents to IT support
- Communicating with the caller/end users
- Status updates on resolution times

**Major Incident Coordinator/Manager**

- Assigned to a major incident to co-ordinate the investigation and resolution
- Assigns tasks to other teams to investigate and resolve the major incident
- Manage communications during the major incident to both business and IT stakeholders
- Creates ad hoc communication plans and tasks.
- Conducts a review of the major incident once resolved

**IT Support Teams (Level 2 / 3)**

- Investigate and diagnose incidents escalated from the Service Desk
- Developing workarounds
- Resolution and recovery of assigned incidents
- Create incidents after detecting a service failure or quality degradation or a situation that may result in one

## 4. Terms & Definitions

| Term | Definition |
| --- | --- |
| **Impact** | Measure of business criticality |
| **Incident** | An unplanned interruption in service |
| **ITIL** | Information Technology Infrastructure Library |
| **Major Incident** | An unplanned interruption in service of the highest priority (priority 1) |
| **Priority** | Product of Impact and Urgency |
| **SLA** | Service level agreement |
| **Urgency** | The extent to which resolution of the incident can bear delay |

## 5. References

1. Entegris Cybersecurity Policy

## 6. Policy Requirements

**6.1** Detect, classify, prioritize, assign, communicate and resolve incidents. All incidents are reviewed by the Global Service Desk and/or support teams. Once the candidate is assigned, teams shall track SLAs to ensure resolution within the agreed timeframes.

**6.2** Suggest, promote, classify, communicate, resolve, and analyze root cause for major incidents. All proposed candidates are reviewed primarily by the Major Incident Coordinator and Incident Manager. They can be accepted or rejected by choosing the relevant option in the context menu. Once the candidate is promoted to a major incident, the Major incident state field is automatically updated to Accepted and the major incident process begins.

**6.3** All unplanned interruptions in service are documented in ServiceNow Incident tickets.

**6.4** Incidents are classified by Category and Subcategory (required) and configuration Item if possible.

**6.5** Incidents are prioritized based on Impact and Urgency.

**6.6** Impacted customers are notified of incidents and progress to resolution.

**6.7** Incidents are investigated and diagnosed if a resolution is not immediately available.

**6.8** Non-major Incidents are resolved when service is restored (can be via a work around) and automatically closed after 3 days.

**6.9** Major Incidents are resolved when service is restored (can be via a work around) and are not automatically closed. The Resolution code and Resolution notes must be entered. The Business impact and Probable cause must be entered. The Actual outage start date & time, and end date & time must be entered so the Business impact duration can be calculated. The Post Incident Report fields must be entered. Initial root cause analysis is considered complete when the Findings are entered within 10 business days

- **6.9.1** Note - If an incident is determined to be Cybersecurity related, the incident will be assigned to the Cybersecurity group. Cybersecurity has its own policy concerning these incidents.

**6.10** Track and Report Incident Status. Maintain a tracking and reporting system to document incidents, communicate the status of in-process incidents, and completed incidents.

**6.11** Open incidents shall be updated at least weekly with Additional comments (Customer visible) to facilitate communication. Work notes shall be used to document any part of the resolution process to the resolution team(s).

**6.12** Open major incidents status shall be updated at least hourly within the ServiceNow ticket.

**6.13** Close and document the incidents. Whenever incidents are resolved, update accordingly the solution and user documentation and the procedures affected by the resolution.

**6.14** Ensure appropriate updates to all relevant documentation (SOPs, configuration, etc.).

**6.15** Prioritization must be done based on Impact and Urgency matrix.

### 6.15.1 Incident priority matrix table:

| Priority | Definition | SLA |
| --- | --- | --- |
| 1 Critical (Major Incident) | Significant impact on business operations and require immediate attention. For example, a complete system outage affecting multiple departments. Emergency Change: Changes that must be implemented immediately to resolve a major incident or restore a service – tend to be high risk. | Response SLA 30 minutes, Resolution SLA 4 hours, Schedule 24x7 |
| 2 High | Notable impact but not as severe as critical incidents. They require swift resolutions to prevent further disruption. An example could be a software bug affecting a critical business process. | Response SLA 2 hours, Resolution SLA 8 hours, Schedule 24x7. |
| 3 Moderate | Moderate impact on business operations and can be resolved within a reasonable timeframe. For instance, a group experiencing intermittent connectivity issues. | Response SLA 1 day, Resolution SLA 3 days, Schedule Sunday 7pm to Friday 7pm CST. |
| 4 Low | Minimal impact on business operations and can be resolved without significant disruption. A minor cosmetic issue on a non-critical webpage could be an example. | Response SLA 3 days, Resolution SLA 10 days, Schedule Sunday 7pm to Friday 7pm CST. |

### 6.16 Service Level Agreements:

*No textual content was present for this section in the source document; the page contained a diagram or image that did not extract.*

<!-- Source page contained a diagram/image with no extractable text. -->

### 6.17 Impact & Urgency Guidelines

*No textual content was present for this section in the source document; the page contained a diagram or image that did not extract.*

<!-- Source page contained a diagram/image with no extractable text. -->

## 7. Exceptions Management

<!-- Standard section: do not edit. -->

- It is expected that all information technology and operational technology teams in Entegris will follow this policy requirements. Any exceptions to this policy, either partial or full, must be submitted by the designated Business/Technology Sponsor stating the compelling reasons as to why the requirements cannot be met, and what other compensating controls are there to mitigate the risk to Entegris.
- All exceptions must be given for a limited period, a maximum of 1 year.
- All exceptions must be documented, according to the Entegris Exception Management Process.

## 8. Policy Distribution and Training

<!-- Standard section: do not edit. -->

- All security related policies must be clearly communicated to all employees and third parties. IT/OT Management will coordinate with Human Resources as needed to determine appropriate new employee orientation, security training and awareness content areas. All Suppliers and contractors shall be required to abide by these security related policies.

## 9. Policy Enforcement

<!-- Standard section: do not edit. -->

- All security related policies will be enforced using either system automated or manual controls. All users are expected to comply with these policies and promote secure computing practices. Any user found to have violated this policy may be subject to disciplinary action, up to and including termination of employment and legal prosecution.

## 10. Revision History

| New Rev | Description of Change | Reason for Change |
| --- | --- | --- |
| 1.0 | New policy document | New document created to address control gaps |
