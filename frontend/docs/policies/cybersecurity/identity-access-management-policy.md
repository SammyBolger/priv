---
title: ENTG Identity and Access Management Policy
sidebar_label: Identity & Access Management Policy
description: Entegris policy governing authorization, documentation, and control of access and security privileges to Entegris information, software, and systems.
tags: [policy, cybersecurity]
---

# ENTG Identity and Access Management Policy

| Field | Detail |
| --- | --- |
| **Document number** | 48755 (EtQ) |
| **Type** | Policy — Entegris Global |
| **Domain** | Cybersecurity / Information Security (EQOS-21: Intellectual Property & Information Security) |
| **Revision** | 1 |
| **Owner** | Not stated in source |
| **Source file** | `EtQ_IAM Policy_Entegris_CS_Policy_Document_Template - 29518_1 (1).PDF` |

## 1.0 Purpose

The purpose of this policy is to dictate the process for appropriately authorizing, documenting, and controlling access / security privileges to Entegris’ information, software, and systems.

The objectives of this policy are to:

- Establish requirements to manage user access and prevent unauthorized access to Entegris information and information assets, systems, and applications.
- Establish requirements for network access management, including remote and wireless access.
- Establish and define user responsibilities for protecting authentication information.

**1.1** This policy defines requirements for ensuring access to Entegris technology systems, applications, information data assets, and infrastructure components are granted based on the concepts of:

- a. Least privilege
- b. Business need
- c. Role-based access
- d. Prevention of unauthorized access

## 2.0 Scope

**2.1** The scope of the policy is global, covering access management requirements for all Entegris Technology systems, (including IT and OT servers, databases, applications, network infrastructure, and all components related to OT Manufacturing systems [PLCs, Networks, CNC, etc.]), and all Entegris information assets.

**2.2** This policy applies to all technologies and information assets regardless of ownership or management; whether managed or administered by Entegris or owned and/or operated by a third-party on behalf of Entegris. This policy is applicable to all business and production facilities across the globe.

**2.3** This policy is applicable to all Entegris Employees, Contractors, Consultants 3rd party service providers, and Entegris Customers that need to access Entegris technology systems.

## 3. Roles & Responsibilities

**Business Sponsor/ Leader**

- Responsible to approve access requests coming from their divisions

**Chief Information Security Officer (CISO)**

- Ensure Access Management program is operational and effective
- Follows-up with Business Leaders to ensure Access management process is followed and unauthorized access is not restricted.
- Communicate access management risks and overall effectiveness of access management program to executive leadership
- Responsible for developing access management control practices, and guiding technology teams in implementing identity and access management controls and operationalizing them.
- Establish process to communicate policy non-compliance instances to the relevant asset owners, and monitor & report on remediation status,

**Cybersecurity Council**

The Cyber Security Council is a cross-functional technology and business leadership forum responsible to:

- Ensure that the technology teams are working on appropriately prioritized security initiatives and in line with business requirements.
- Assign adequate resources for successful operation of access management program

**System Owner and Application Owners**

- Responsible to ensure the system/s and/or applications they own are meeting the requirements of this policy, and related standards.
- Person or organization responsible for the development, procurement, integration, modification, operation and maintenance, and/or final disposition of an information system, and ensure.

**Infrastructure, Network & Operations team**

- Establish required access provisioning and deprovisioning processes, tools and manage operations

## 4.0 Terms & Definitions

| Term | Definition |
| --- | --- |
| Access control | The process of granting or denying specific requests for obtaining and using information and related information processing services; and to enter specific physical facilities (e.g., Federal buildings, military establishments, and border crossing entrances). |
| Authenticator | Something that the claimant possesses and controls (typically a cryptographic module or password) that is used to authenticate the claimant’s identity. This was previously referred to as a token. |
| Authorization | Access privileges granted to a user, program, or process or the act of granting those privileges. |
| Least privilege (principle of) | The principle that a security architecture is designed so that each entity is granted the minimum system resources and authorizations that the entity needs to perform its function. |
| Multi-factor Authentication (MFA) | An authentication system or an authenticator that requires more than one authentication factor for successful authentication. Multi-factor authentication can be performed using a single authenticator that provides more than one factor or by a combination of authenticators that provide different factors. The three authentication factors are something you know, something you have, and something you are. See authenticator. |
| Network Access | Access to a system by a user (or a process acting on behalf of a user) communicating through a network, including a local area network, a wide area network, and the Internet |
| Privileged Users | A user that is authorized (and therefore, trusted) to perform security-relevant functions that ordinary users are not authorized to perform. |
| Role-based Access Control (RBAC) | Access control based on user roles (i.e., a collection of access authorizations that a user receives based on an explicit or implicit assumption of a given role). Role permissions may be inherited through a role hierarchy and typically reflect the permissions needed to perform defined functions within an organization. A given role may apply to a single individual or to several individuals |
| Service Accounts | Specialized non-human privileged accounts typically used within operating systems to execute applications or other services so they can access data and network resources to perform specific tasks. |
| User | Individual, or (system) process acting on behalf of an individual, authorized to access a system. |
| User Account types | Employee: Users directly hired by Entegris, either as full-time or part-time employees. Contractor/Consultant: Users who are not Entegris employees, but are hired through third party companies or as independent service providers, for short-term resources augmentation to meet business needs. Third Party users: Typically, Entegris partners or Customers, who may be given access to Entegris systems, for specific activities related to their engagement. |
| Segregation of Duties (SoD) | The concept of having more than one person required to complete a task. It is an administrative control used by organizations to prevent fraud, sabotage, theft, misuse of information, and other security compromises. |

## 5.0 References

1. Document # 10784 Entegris Cybersecurity Policy
2. Document # 13831 Entegris Logical Access Management Standard
3. Document # 13823 Enterprise Systems Password Management Standard
4. Document # Entegris User Account Management Standard
5. Document # 29552 Entegris Wireless Security Standard
6. Entegris Network Security Standard (To be developed)
7. Entegris Physical Security Standard (To be developed)
8. OT logical access management standard (Draft)
9. Document # 33531 Entegris Exceptions Management Policy

## 6.0 Policy Requirements

### 6.1 User Account Management

- **6.1.1** All user accounts to access Entegris systems must be granted through a formal documented approval process. All user access approvals shall conform to segregation of duties requirements.
- **6.1.2** All the Third-party, Customer, and contractor resource access-accounts shall be requested/approved by the concerned Entegris Business Sponsor, and access shall be given only on as-needed basis with least privileges and must be revoked as soon as the access is no longer required.
- **6.1.3** All user access must be revoked immediately upon termination of employment or completion of contact engagement.
  - **6.1.3.1** User access to specific Entegris systems or applications shall be disabled, if the user is no longer required to have that access, either due to job transfer, change of role/ responsibilities, extended leave (if applicable) and at the request of competent authority (Security Operations, CISO, CIO or executive management).
  - **6.1.3.2** All user access must be logged, and access logs must be audited on a periodic basis to confirm that granting access and revocation is performed in accordance with this policy and applicable standards.

### 6.2 Physical access

- **6.2.1** Entegris must ensure that all physical access to its information systems, operational technology assets, other digital assets, and access to facilities containing physical assets are controlled and authorized.
- **6.2.2** All physical access events are logged, and records maintained.
- **6.2.3** Users must be responsible for protecting Entegris equipment and data in accordance with Entegris policy when left unattended within the Entegris facility or at an off-site location.

### 6.3 Remote access

- **6.3.1** Entegris must establish a Remote Access Management standard that includes remote access control requirements and process to request and grant remote access to the users.

### 6.4 Access Permissions and authorizations

- **6.4.1** Entegris shall establish process, tools, and resources to ensure access permissions and authorizations are managed, incorporating the principles of least privilege, and account for separation of duties as required.

### 6.5 Identities are proofed and bound to credentials and asserted in interactions

#### 6.5.1 Unique Identity

- **6.5.1.1** Entegris must ensure that all its Users are assigned a unique identifier (User ID), and their access is controlled through a combination of User ID and password combination.
- **6.5.1.2** Entegris must establish a standard format for creating userIDs.

#### 6.5.2 Passwords

Entegris shall maintain a password standard that provides guidelines for users to create passwords to use on Entegris systems and will review that standard on a regular basis.

- **6.5.2.1** Passwords for unique User IDs shall not be shared in any form except as noted below:
  - **6.5.2.1.1** During the initial User Provisioning process, the first password for a new employee is shared by the IT provisioning team, with the manager, and to the employee to enable their access. All new employees will be forced to change the password at the first login.

### 6.6 Shared Accounts

Shared accounts are to be eliminated, wherever possible. Where shared accounts are required, then the following controls shall be implemented to limit the access of the User IDs:

- **6.6.1** Shared accounts are to be isolated to specific machines and must not be domain-level accounts.
- **6.6.2** Shared account passwords must be changed periodically, at least once annually.

### 6.7 Authenticate Users, devices, and other assets

- **6.7.1** All users must be authenticated, prior to allowing access to any Entegris technology resource.
- **6.7.2** For all high-risk resource access, multi-factor authentication (MFA) techniques must be deployed.
- **6.7.3** Where technically feasible, user sessions will timeout after extended periods of inactivity and users must reauthenticate to resume access.

### 6.8 Service Accounts

- **6.8.1** Each service account must have an account owner.
- **6.8.2** Static Service accounts are to be avoided. Applications that only support static Service Accounts will require manual procedures to rotate the password.
- **6.8.3** Service Accounts must be named per a standard so they are identifiable in audit logs and can be incorporated into rules for alerting.

### 6.9 Privileged User Access Management

- **6.9.1** Entegris shall incorporate the principle of least functionality by configuring systems to provide only essential capabilities.
- **6.9.2** All privileged user roles and functions shall be defined and documented, and all privileged users are listed, and their access logs are captured. Privileged user access logs must be reviewed on a periodic basis, for anomalies.

### 6.10 Failed Login Attempts

- **6.10.1** Entegris must establish controls to prevent repeated failed in logins.

### 6.11 Management review of Access Rights

- **6.11.1** All User access events shall be logged, and records maintained for audit purposes.
- **6.11.2** User accounts and access privileges must be reviewed on a periodic basis, and any anomalies must be addressed.

## 7. Exceptions Management

<!-- Standard section: do not edit. -->

- It is expected that all Entegris technology will follow this policy requirements.
- Any exceptions to this policy, either partial or full, must be submitted by the designated Business/Technology Sponsor stating the compelling reasons as to why the requirements cannot be met, and what other compensating controls are there to mitigate the risk to Entegris.
- All exceptions must be given for a limited period, a maximum of 1 year.
- All exceptions must be documented per Entegris Exception Management Process.

## 8. Policy Distribution and Training

<!-- Standard section: do not edit. -->

- All cybersecurity related policies must be clearly communicated to all employees and third parties.
- Entegris Management will coordinate with Human Resources as needed to determine appropriate new employee orientation, security training and awareness content areas.
- All Suppliers, Third parties, Customers, and contractors who will be accessing Entegris Technology systems shall be required to abide by this identity and access management policy.

## 9. Policy Enforcement

<!-- Standard section: do not edit. -->

- All security related policies must be enforced using either system automated or manual controls.
- All users are expected to comply with these policies and promote secure computing practices.
- Any user found to have violated this policy may be subject to disciplinary action, up to and including termination of employment and legal prosecution.

## 10. Revision History

| Date | Reason for change | Description of Change | Approved by |
| --- | --- | --- | --- |
| Oct ‘23 | To address control gaps identified. | New policy developed to address control gaps | Entegris Technology Policy Governance Council |
