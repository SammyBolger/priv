---
title: Endpoint Device Protection Policy
sidebar_label: Endpoint Device Protection Policy
description: Entegris policy defining the security controls applied to endpoint devices such as PCs, laptops, smartphones, and tablets.
tags: [policy, cybersecurity]
---

# Endpoint Device Protection Policy

| Field | Detail |
| --- | --- |
| **Document number** | 13822 (EtQ) |
| **Type** | Policy — Entegris Global |
| **Domain** | Cybersecurity / Information Security (EQOS-21: Intellectual Property & Information Security) |
| **Revision** | 5 |
| **Owner** | Not stated in source (PDF author metadata: Mahmoud Abu-Alaydeh) |
| **Source file** | `13822_EndPointDeviceProtection_Policy_v5.PDF` |

## 1. Purpose

**1.1** The number and type of mobile devices entering the enterprise grows monthly, and the challenge for the IT security team gets ever more complex. The exploding number of devices significantly increases our risk to the different types of systems (with vulnerabilities) that authenticate to our network and transact data for business operations. This policy provides guidelines on how to meet the challenges that mobility brings into the enterprise.

**1.2** The increased use of smartphones and tablets at Entegris requires IT to set controls on all those mobile endpoints. This policy provides an overview of controls that are deployed to protect these end points from being compromised and inappropriate use.

## 2. Scope

Endpoint devices can include PCs, laptops, smartphones and tablets globally.

## 3. Responsibilities

IT provides the security configuration guidance to the end-user. With BYOD, every end user has the choice to enable the security configuration recommendations. All corporate devices will be managed globally by the IT team.

## 4. References

Reference Documents:

- 13823 - Enterprise System Password Standard

Special Notes: Policy # DSS05.03.501

## 5. Definitions

| Term | Definition |
| --- | --- |
| Global Service Desk | Entegris Help Desk Team |
| MFA | Multi-Factor Authentication |
| SCCM | Systems Center Configuration Manager |

## 6. Policy

### 6.1 Password Controls

All mobile devices (laptops, tablets, iPads, smartphones, etc.) must have MFA enabled, and also mandate use of password, every time the device is powered-on/ restored from sleep mode to perform any functions.

- **6.1.1** All passwords should follow the Entegris password attributes as defined in the Enterprise Systems Password standard.
- **6.1.2** Users are encouraged to never share their passwords with co-workers/ friends to avoid potential inappropriate use.
- **6.1.3** The mobile device management software deployed on all smart phones and tablets that connect to Entegris internal data enforces the use of passwords.
- **6.1.4** Additional password protection controls
  - Password used in automated logons (service accounts) must be encrypted.
  - Transmission of passwords must be encrypted in transit.
  - Passwords should not be stored in plain text on workstations or servers. Any password stored at rest must be encrypted.
  - In the case where there is an indication of a possible system or password compromise, the password must be changed immediately.

### 6.2 Smart Phones and Tablets

Mobile devices running the iOS, Android, or Windows Mobile operating system will be installed with Microsoft Enterprise Mobility Management software. All Entegris company data and applications will be contained in the Microsoft Intune/ EMM container. Policy controls prevent integration between data in the Intune App and data elsewhere on the device. This applies to all smart phones and tablets, whether those are company provided or personal devices (BYOD).

### 6.3 Anti-virus/ Anti-malware Controls

- **6.3.1** All computers (clients and servers) connected physically or remotely to the Entegris network shall have antivirus software correctly installed, configured, activated, and updated with the latest version of virus definitions before or immediately upon connecting to the network.
- **6.3.2** If deemed necessary to prevent viral propagation to other networked devices or harmful effects to the network, computers infected with viruses, worms or other forms of malicious code (collectively referred to as "virus" or "viruses") shall be disconnected from the network until the infection has been removed. Entegris IT will install the standard Anti-virus software on all company computers. This software performs a weekly full scan of the hard drive to check for infection. The virus definition is updated real time, dynamically by the antivirus software vendor.
- **6.3.3** When an enterprise-wide virus attack is in progress, Entegris IT shall notify the computing community via the best available method, and all files on all hard drives should be scanned (automatically) immediately using the newest virus definitions available.

### 6.4 Encryption Controls

- **6.4.1** All Windows laptop computers are configured with the default Windows Bit-Locker encryption. This feature allows for data to be secure if the device is lost/ stolen and somebody attempts to compromise data from the internal hard-drive.
- **6.4.2** All data on Smart Phones and tablets that are encapsulated in the mobile device management (MDM) application is encrypted on the mobile device by the application. Deleting the application deletes all data that is associated with the application.

### 6.5 Remote Administration Controls

During regular business operations, Entegris IT support may need control over the employee’s PC to assist in configurations, bug fixing, etc. All PCs are installed with necessary software (utilize screen-share feature) to enable IT Support Team to connect remotely to the employee’s PC, to perform maintenance activities. Employees are expected to never tamper with the configuration settings of the software application.

### 6.6 Application Installation Controls

Only Entegris certified approved applications can be installed on Entegris deployed PCs. All users don’t have administrator rights to their laptops and will need both appropriate manager approvals and assistance from Entegris IT Support Team to install non-standard applications. Updates to installed applications will require assistance from the IT Support Team to minimize down-stream installation and configuration problems.

### 6.7 Patch Management Controls

The Entegris Service Desk team manages the roll-out of Microsoft patches on a periodic basis using a centralized Microsoft System Center Configuration Manager (SCCM) application, and also other cloud-based applications. Based on vendor releases, patches are evaluated and deployed to all Windows computers. Logging onto the Entegris network is needed to download and apply the patches. As some patches require system reboots, it is recommended to reboot all PCs every 2 weeks.

### 6.8 Local Admin Rights

Local admin rights have been disabled on all enterprise PCs. PCs that require tooling and service engineers to install and test codes/ programs are managed as exceptions. No user is to tamper with these settings on any enterprise provided end point.

## 7. Revision History

| New Rev | Description of Change | Reason for Change |
| --- | --- | --- |
| V1 | Original version | New document 08/31/2015 |
| V1.1 | No major changes | Annual Review 12/02/2016 |
| V1.2 | No changes | Annual Review 12/27/2017 |
| V1.3 | Minor updates | Annual Review 10/25/2018 |
| ETQ 1 | Updated format to Rev 3 Global template 10/19/2018 | Moved to EtQ |
| V 1.4 | No Changes | Annual Review 7/2/2019 |
| V 1.5 | No major update | Annual Review 1/14/2019 |
| 2 | Minor updates | Annual Review 1/21/2020 |
| 3 | Password updates | Review 12/7/2021 |
| 4 | Added local admin rights section 6.8 | Nov 2022 |
| 5 | Removed references tools no longer used, added MFA requirement, and clarified certain requirements.. | Periodic review to ensure policy and current practices are synched. |
