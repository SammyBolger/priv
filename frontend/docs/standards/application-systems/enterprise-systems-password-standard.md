---
title: Enterprise Systems Password Standard
sidebar_label: Password Standard
description: Requirements for the creation and use of passwords across Entegris IT and OT systems and applications.
tags: [standard, security]
---

# Enterprise Systems Password Standard

| Field | Detail |
| --- | --- |
| **Document number** | 13823 |
| **Type** | Standard |
| **Domain** | Information Security (EQOS-21: IP and Information Security) |
| **Revision** | 3 |
| **Owner** | Not stated in source |
| **Source file** | `13823_ENTERPRISE SYSTEMS PASSWORD STANDARD_v3.PDF` |

## 1. Purpose

This standard establishes requirements related to the creation and use of passwords.

## 2. Scope

This is a Global standard is applicable to all Entegris IT and OT systems, globally. The scope includes the technology systems and software applications supplied by 3rd parties or Suppliers or Managed Services Providers.

The scope of the standard is currently limited to AAD ONLY.

## 3. Roles & Responsibilities

This standard is controlled by the Entegris CISO Office. The CISO Office works with IT Infrastructure to ensure that the base standard is the minimal configuration applied to all systems and applications.

- **Application Owners** — Application owners must ensure their application is meeting the password requirements, and communicate the requirements to their application users, as necessary.
- **Server and systems owners** — Server and system owners must ensure that their system configurations are set to meet the password requirements. Where there are system limitations to meet the password requirements, Owners should file for an Exception.
- **Laptop owners** — Laptop owners must create passwords meeting the requirements given in the standard.
- **Desktop Owners** — Desktop owners must create passwords meeting the requirements given in the standard.
- **End User support team** — End User support team should be aware of these password requirements, and educate the Users, as necessary.

## 4. Related Documents

- 13822 — Entegris End-Point device Protection Policy
- 48755 - Entegris Identity and Access Management policy
- 10874 – Entegris Cybersecurity Policy
- **Special Notes:** N/A

## 5. Terms and Definitions

| Term | Definition |
| --- | --- |
| Passphrase | A passphrase is a longer string of words used like a password to secure access |

## 6. Requirements

- **6.1** Entegris requires all its technology systems owners to establish access controls to restrict access to Entegris technology systems and information only to authorized users.
- **6.2** Application and systems owners must ensure that the applications and systems owned by them are configured to handle the access password requirements, as given in this Standard.
- **6.3** Application and/or systems owners must ensure to disable storing of passwords using reverse encryption.
- **6.4** All Users are required to create and store passwords (or passphrases) that meet the password requirements, as given below.
  - **6.4.1** Passwords are mandatory for accessing any Entegris technology system or application. Entegris encourages the use of Passphrases instead of passwords.
  - **6.4.2 Password Length:** Passwords are required to be a minimum of 12 characters in length, and up to 30 characters maximum.
  - **6.4.3 Password Complexity requirements:** Passwords must include:
    - **6.4.3.1** Upper-case and Lower-case letters (A through Z and a through z)
    - **6.4.3.2** Numeric characters (0 to 9)
    - **6.4.3.3** Non-alpha numeric characters (or special characters), like $, @, # or %
    - **6.4.3.4** No more than two symbols from the user’s account name or display name
  - **6.4.4 Password Age:** Passwords must expire after 90 days and are required to be changed upon the next login.
  - **6.4.5 Password History:** Password history is maintained and prohibits the re-use of the recent or last six passwords.
  - **6.4.6 Lock-out:** After five unsuccessful access attempts, account access is locked and automatically reset after 15 minutes.
  - **6.4.7 Password reset:** Passwords can be reset, anytime upon creation of a new password.
- **6.5 Default Passwords:** Default passwords should not be used. All vendor supplied or technical support team supplied passwords must be reset immediately, upon taking ownership.
- **6.6** Passwords must always be kept secret and should not be shared with others, including your manager.
- **6.7 Shared Passwords:** Use of Shared passwords is permitted only with duly approved Exception Request.
- **6.8 Additional requirements:**
  - a. Upon account recovery, a new password meeting above requirements must be selected immediately, replacing the temporary password given by Support team
  - b. All default passwords or passwords created by Development team should be changed immediately upon putting into production.
  - c. All vendor-supplied or default passwords on all Manufacturing / IT systems, must be changed upon commissioning or putting into production.

## 7. Metrics & Reporting

| Requirement | Metric Owner | What metric? | Type of report/ frequency |
| --- | --- | --- | --- |
| Password length =>12 characters, and complexity requirements | AD Team | # Of devices complying | Monthly |
| Password length =>12 characters, and complexity requirements | AD Team | # Of applications complying | Monthly |
| Passwords changed after 90 days | AD Team | # Of passwords not reset after 90 days | Monthly |
| Default passwords not changed | AD Team | # Of systems with default password | Quarterly |

## 8. Exceptions Management

- **8.1** For any exceptions to this Standard, either partial or full, a formal exception request must be submitted by the designated Business Sponsor stating the compelling reasons as to why the requirements cannot be met, and what other compensating controls are there to mitigate the risk to Entegris.
- **8.2** All exceptions must be given for a limited period, a maximum of 1 year.
- **8.3** All exceptions must be reviewed/recommended by policy owner, and then formally approved by Executive Leadership member from the specific Business unit with an associated ARB approval, if applicable.

## 9. Policy Distribution and Training

All security-related policies must be clearly communicated to all employees and 3rd parties. IT Management will coordinate with Human Resources as needed to determine appropriate new employee orientation, security training and awareness content areas. All Supplier contractors shall be required to abide by these security-related policies.

## 10. Policy Enforcement

All security related policies will be enforced using either system automated or manual controls. All users are expected to comply with these policies and promote secure computing practices. Any user found to have violated this policy may be subject to disciplinary action, up to and including termination of employment and legal prosecution.

## 11. Revision History

| Date | EtQ Revision # | Description of Change | Policy Owner | Approved by | Reason for Change |
| --- | --- | --- | --- | --- | --- |
| 10/22/2018 | 1.0 | Updated format to Rev 3 Global template | | | Moved to EtQ |
| 10/25/2018 | 1.0 | No Changes | | | Annual review |
| 07/02/2019 | 1.1 | No changes | | | Annual review |
| 01/21/2020 | 1.2 | No changes | | | Annual review |
| 07/08/2020 | 1.3 | Adapted new EtQ template | | | New template |
| 02/22/2023 | 2.0 | Updated requirements, and new CS Standard template | Rao Jammi | John Butorac | Make our passwords stronger, and included metrics to demonstrate compliance |
| 09/20/2025 | 3.0 | Periodic review with minor edits | Rao Jammi | | Periodic review with minor edits |
