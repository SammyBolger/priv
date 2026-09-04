---
title: IT Backup Policy
sidebar_label: IT Backup
description: Backup and recovery requirements to protect the integrity and availability of critical Entegris IT systems and data.
tags: [policy, operational]
---

# IT Backup Policy

| Field | Detail |
| --- | --- |
| **Document number** | 13830 (EtQ) |
| **Type** | Policy |
| **Domain** | Operational / Information Security (EQOS-21: Intellectual Property (IP) & Information Security) |
| **Revision** | 3 |
| **Owner** | Not stated in source |
| **Source file** | `13830.PDF` |

## 1. Purpose

**1.1** This policy deals with the backup guidelines for critical IT systems at Entegris.

**1.2** This policy is required because all systems that are critical to Entegris need to follow a reliable and regular backup schedule that is managed by either automated/ manual processes. This policy would also serve the purpose to provide guidelines for developing tape and tapeless/ disk backup procedures for all sites/ locations where backups are essential.

**1.3** This policy establishes requirements related to the backup and recovery activities to protect the integrity and availability of all electronic assets.

## 2. Scope

**2.1** Global.

**2.2** IT understands that all systems over the entire worldwide operations do not maintain the same level of business criticality. Hence it is not essential for all sites to follow this policy on a strict basis as they may not have the resources, support and the hardware to support the needed procedures. Any deviation to the list must be approved by the business heads, according to the critical systems/ application list.

## 3. Responsibilities

For internally hosted applications and systems, all business owners must work with IT to ensure that all critical data is appropriately backed up to ensure appropriate options in the event of an availability outage. For all applications and systems that are hosted in the cloud, the vendor relationship managers need to ensure that appropriate contract terms ensure for this. SaaS vendors are expected to assist with any disaster recovery solutions and annual tests to verify appropriate response procedures.

## 4. References

- **Reference Documents:**
  - 08569 – Creating Backup Status Report
  - 08580 – Entegris Standard Backup Policy
  - 08572 - Remote Backup Reports
  - 09955 – How to Restore File from Backup (File Share Only)
- **Special Notes:** Policy # DSS04.07.501

## 5. Policy

### 5.1 Backups

- **5.1.1** All server-based production information systems (application servers, file servers and network infrastructure servers) must be backed up according to an approved backup schedule. The resource owner is responsible for the review and approval of the backup schedule.
- **5.1.2** The backup schedule must include the extent (full or differential) of backup, the frequency, and retention period. The backup schedule should reflect the business requirements of the organization and the security regulations of the information.
  - **5.1.2.1** Daily Disk based Backups
  - **5.1.2.2** Weekly Disk based Backups
  - **5.1.2.3** Monthly Tape Backups – stored offsite
- **5.1.3** Backup procedures must cover all production systems, applications, and data necessary to cover the entire system in the event of disaster.
- **5.1.4** Invariable of backup technology (Disk based/ Tape based) all backups must be stored in a secure site at a sufficient distance away to escape any damage from disaster at the main site.
- **5.1.5** Backup infrastructure should be given an appropriate level of physical and environmental protection consistent with the standard applied at the main site.
- **5.1.6** All backup data stored offsite must be documented that shows the date when the information was most recently modified as well as the nature of the information.
- **5.1.7** The backup log should be reviewed and evidenced on a daily basis to confirm the success of each backup job.
- **5.1.8** All backup failures must be investigated and resolved within the next backup cycle. Resolution of failed backups must be documented in a IT Service Request.
- **5.1.9** With a few exceptions, Entegris does not provide backup of applications or data stored on personal computer hard drives or portable hard drives. Thus, data of this nature should be stored on a network group drive or other source covered by this policy.

### 5.2 Recovery

- **5.2.1** File and system restoration requests and results are documented in the IT Service Management Application.
- **5.2.2** File and system restoration procedures should be periodically tested to validate that they are effective and that they can be completed within the time allotted in the operational procedures for recovery.
- **5.2.3** All files are restored back to the original/ temporary location of the data. All other requests must be approved by the resource owner. The security requirements of the data must not be compromised by providing unauthorized access to restored data.

### 5.3 Externally Hosted Systems

- **5.3.1** In the event that Entegris contracts with a third party to host infrastructure and/or data related to a particular system, the third party must have backup and recovery procedures either equivalent to or more rigorous than Entegris’ internal procedures.
  - **5.3.1.1** Disk Based Backups are sent to Exagrid at local site and then replicated to another Exagrid at a different site

## 6. Revision History

| New Rev | Description of Change | Reason for Change |
| --- | --- | --- |
| V1 | Original version 02/20/2015 | New document |
| V1.1 | No Changes 12/02/2016 | Annual review |
| V1.2 | No Changes 12/27/2017 | Annual review |
| V1.3 | Minor Updates | Annual Review 10/29/18 |
| 1 | Updated format to Rev 3 Global template 10/19/2018 | Moved to EtQ |
| V1.4 | Updated with reference to SOP 317 | |
| V1.5 | No changes | Annual Review 7/2/2019 |
| V1.6 | Minor updates | Annual Review 2/4/2020 |
| V2 | Minor updates | 5/13/2020 |
| V3 | Minor update | 9/2/2020 |
