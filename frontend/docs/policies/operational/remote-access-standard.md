---
title: Remote Access Standard
sidebar_label: Remote Access
description: Minimum technical requirements for secure remote access to Entegris networks and systems across IT and OT.
tags: [policy, operational]
---

# Remote Access Standard

| Field | Detail |
| --- | --- |
| **Document number** | 52616 |
| **Type** | Standard |
| **Domain** | Information Security (EQOS-21: Intellectual Property (IP) & Information Security) |
| **Revision** | 2 |
| **Owner** | Not stated in source |
| **Source file** | `52616 Entegris_RemoteAccessStd_V2.PDF` |

## 1. Purpose

The purpose of the remote access standard is to establish the minimum technical requirements for secure remote access to Entegris networks & systems, ensuring security, reliability, and productivity across all IT and operational technology assets.

## 2. Scope

- **2.1** This remote access standard is applicable to all Entegris employees, contractors, consultants, and 3rd parties (vendors, partners, etc.) who need to access Entegris networks and technology systems from remote locations.
- **2.2** This standard applies to all business divisions, engineering, maintenance, operations, lab, Research and Development, information technology (IT), and that require access to Entegris networks and technology systems.
- **2.3** Remote access standard is applicable to the below systems:
  - Corporate IT and Manufacturing/OT networks
  - All Applications, networks and systems

## 3. Roles & Responsibilities

- **Infrastructure and Operations Team** — Implementing and monitoring.

## 4. Related Documents

1. Entegris Identity Access Management Policy
2. OT Logical Access Control Standard
3. Entegris Cybersecurity Policy
4. GSM – Indirect Procurement Policies and Procedures

## 5. Terms and Definitions

| Term | Definition |
| --- | --- |
| Entegris BYOD | Entegris BYOD policy allows the employee to connect to company data and applications using personal mobile device with prior approval and activation from Entegris |
| Entegris Managed device | Devices procured/leased/maintained and provided by Entegris to its employees, contractors or other 3rd parties. |
| Multi-factor Authentication (MFA) | Authentication using two or more factors to achieve authentication. Factors include: (i) something you know (e.g., password/personal identification number [PIN]); (ii) something you have (e.g., cryptographic identification device, token); or (iii) something you are (e.g., biometric). |
| Privileged Access Management (PAM) | Privileged access management (PAM) is an identity security solution that helps protect against cyberthreats by monitoring, detecting, and preventing unauthorized privileged access to critical resources. |
| Remote access | Access to an organizational information system by a user (or a process acting on behalf of a user, or an information system) communicating through an external, non-organization-controlled network. |
| Ushered Access | Local user to allow all access related actions from the remote system. Applicable for continuously manned control room or when contact personnel available in proximity. |
| Virtual Private Network (VPN) | A virtual network built on top of existing networks that can provide a secure communications mechanism for the data transmitted between networks. |

## 6. Requirements

### 6.1 General Requirements

- **6.1.1** Entegris must manage all remote access to its networks, and systems.
- **6.1.2** All Remote maintenance of organizational assets must be pre-approved, and access events are logged and periodically reviewed, and remote maintenance performed in a manner that prevents unauthorized access (PR.MA-1).
- **6.1.3** Protect information about remote access mechanisms from unauthorized use and disclosure.
- **6.1.4** Establish detection techniques and systems to identify and prevent unauthorized remote connections.
- **6.1.5** Entegris shall provision different types of Remote access types, based on the least privileges to be given to the user, as given below:
  - **6.1.5.1** Published Application (e.g., VDI) – for M&A engagements, Consultants, and 3rd parties
  - **6.1.5.2** Remote Access - IT/OT Vendors remote access support
  - **6.1.5.3** Restricted/Full VDI – Contractors and MSPs, where 6.5.2 cannot be used
  - **6.1.5.4** Entegris issued laptop with VPN – only for Entegris contractors and Employees
- **6.1.6** Supplier and 3rd parties shall meet Entegris security and personal background check requirements, as per Third Party Tracker (TPT) process, outlined in GSM – Indirect Procurement Policies and Procedures.
- **6.1.7** All remote users must agree to Entegris terms and Legal disclaimers, for accessing Entegris networks.
- **6.1.8** All Entegris applications, including but not limited to, Outlook, Teams, SharePoint, Office, SAP systems, etc., must be accessed only using Entegris managed devices and/or approved devices including devices covered under Entegris BYOD.

### 6.2 Remote access to Corporate networks

- **6.2.1** Entegris employees accessing OT Network from enterprise network shall use the approved remote access solution, where we have network segmentation.
- **6.2.2** Hosted remote access session shall be preferred way to allow access, ushered access shall be considered.
- **6.2.3** Remote access connectivity shall be enforced for a pre-defined duration with conditions access policy (e.g., authorized location, IP address range, restricted countries, etc.).
- **6.2.4** Compliance check shall be performed on all Entegris managed devices prior to providing remote access to Entegris networks.

### 6.3 Remote access to OT networks/ systems

- **6.3.1** Remote access of OT networks/systems includes, access to:
  - Automation systems (i.e., PLCs, sensors, etc.)
  - MES, supervisory applications
- **6.3.2** Access to the OT network shall follow attribute-based access control (i.e., limited to minimum required roles, minimum required periods of time, Geolocation capability, and equipment or device).
- **6.3.3** Remote access connectivity options to the OT network are mentioned below:
  - Entegris employees (e.g., engineers) accessing from a remote location shall be connected to VPN and use the approved remote access solution
  - Entegris employees within the OT network shall use the approved remote access solution (e.g., RDP or similar tool)
- **6.3.4** OT Suppliers requiring access to Entegris networks shall use only Entegris approved remote access solution.

### 6.4 Encryption

- **6.4.1** Entegris must implement cryptographic mechanisms to protect the confidentiality and integrity of remote access sessions.

### 6.5 Authorization

- **6.5.1** Managed access control points shall route remote accesses through authorized and managed network access control points.
- **6.5.2** Establish and document usage restrictions, configuration/connection requirements, and implementation guidance for each type of remote access allowed; and
- **6.5.3** Authorize each type of remote access to the system prior to allowing such connections.
- **6.5.4** Authorization of each remote access type addresses authorization prior to allowing remote access without specifying the specific formats for such authorization.
- **6.5.5** All 3rd parties and vendors must submit authorization request form (Third party use of Entegris resources contract (TPC form), and must be approved by Business Sponsor, prior to giving access to Entegris networks.

### 6.6 Session Termination

- **6.6.1** Remote network connection must automatically terminate after 12 hours of usage and requires the user to reconnect to the network, upon authentication.

### 6.7 Logging & Monitoring

- **6.7.1** Deploy automated mechanisms to monitor and control remote access.
- **6.7.2** All remote connections events should be logged, and logs must be maintained for a minimum of 90 days.
- **6.7.3** The logging must include, at a minimum, the following data points:
  - User account details (User ID)
  - Location or IP address from where remote connection initiated
  - Authentication details
  - Date and time of remote connection
  - Failed login details, if any
  - Duration of the remote session
  - Applications or systems accessed
- **6.7.4** Remote access logs must be kept immutable. All logs must be reviewed periodically for anomalies and shall be investigated for further action.

## 7. Metrics & Reporting

| Requirement | Metric Owner | What metric? | Type of report/ frequency |
| --- | --- | --- | --- |
| 6.5.1 | Standard Owner | # of users on Published Apps | Monthly |
| 6.5.2 | Standard Owner | # of IT/OT vendors using remote access for support | Monthly |
| 6.5.3 | Standard Owner | # of Contractors, MSPs using restricted/Full VDI solution | Monthly |
| 6.5.4 | Standard Owner | # of users using VPN access | Monthly |
| 6.7.2 | Standard Owner | Review access logs for anomalies and report # of anomalies | Quarterly |

## 8. Exceptions Management

1. Exceptions must be documented and reviewed with relevant IT and Business leaders.
2. All exceptions must be documented and submitted by the designated Business Leader stating the compelling reasons as to why the requirements cannot be met, and what other compensating controls are there to mitigate the risk to Entegris.
3. Any exception must be given for a limited period, a maximum of 1 year. Approved exceptions must be shared with the Cybersecurity team.

## 9. Standard Training & Distribution

The owner of this Standard will be responsible to ensure that the standard is distributed to all stakeholders, and where necessary appropriate level of training is provided to them.

- Global communication will be send through Ensider informing everyone about key requirements about remote access, and what they should be doing.
- Relevant technical support teams will be informed on the key requirements for provisioning and deprovisioning of remote access for users.

## 10. Sustainability

This Standard Owner must conduct periodical review of this document with all stakeholders, to ensure that all the requirements are, a) relevant and applicable to current business and operating environments, and b) meet applicable regulatory requirements, and then make necessary changes.

## 11. Standard Enforcement

The Policy Owner will gather and publish remote access related metrics, as defined in Section # 7 of this Standard to demonstrate compliance with the Standard requirements. Internal Audit may perform periodic audits to ensure all requirements are being implemented and the process is working effectively.

## 12. Revision

| New Rev | Description of Change | Reason for Change |
| --- | --- | --- |
| 1 | New Release | New Standard |
| 2 | 1. Definitions for Entegris BYOD, and Entegris managed devices included. 2. Requirements for remote accessing some of Enterprise applications included. | Not having these requirements spelled-out, some people trying to connect personal devices to Entegris networks. |
