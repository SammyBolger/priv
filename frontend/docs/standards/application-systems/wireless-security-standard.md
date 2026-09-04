---
title: Wireless Security Standard
sidebar_label: Wireless Security
description: Security methods and protocols for configuring wireless devices to securely connect to Entegris wireless networks.
tags: [standard, security]
---

# Wireless Security Standard

| Field | Detail |
| --- | --- |
| **Document number** | 29552 |
| **Type** | Standard |
| **Domain** | Software (EQOS-20: Software); Procedure/Process |
| **Revision** | 1 |
| **Owner** | Not stated in source |
| **Source file** | `29552 Wireless Security Standard_V1 (1) (1).PDF` |

## 1. Purpose

The purpose of these Wireless Security Standard is to document the security methods and protocols to use when configuring wireless devices to securely connect to the various Entegris wireless networks.

Wireless is heavily used and is an integral component of the Entegris environment. Wireless networks and devices are often targeted based on the ability to connect to them remotely or outside the physical controls of the organization. There is a large array of attacks designed to gain access to an enterprise network. An attacker could gain access to an organization’s network through a wireless access point to conduct malicious activities—including packet sniffing, creating rogue access points, password theft, and man-in-the-middle attacks. These attacks could hinder network connectivity, slow processes, or even crash Entegris systems.

## 2. Scope

All Entegris Business Units, vendors, partners, FTE, and contractors must adhere to these requirements. Any device attempting to connect to the Entegris Wireless network must also adhere to these written requirements. There are portions of this document that will be specific to the current solutions used by Entegris, however, there are portions that will speak to the process and function rather than a specific solution as changes occur and this document should be able to be adhered to according on the functions provided here.

Entegris wireless networks are currently supported by network manufacturer Cisco Meraki and many of the controls detailed here were established based on this solution and adhere to CIS Wireless Controls.

## 3. Responsibilities

- **Information Security** — Create the wireless policy. Has solutions in place to assist in the enforcement of listed controls.
- **Entegris Employee/Contractor** — Know and adhere to the wireless control standard.
- **Entegris Vendor / Partner** — Know and adhere to the wireless control standard.
- **IT Infrastructure** — Development of Wireless Standards.
- **CIO** — Annually review and approve the Wireless Security Standard.
- **Audit** — Annually or according to risk level assess the controls listed within this standard to ensure controls are being enforced.

## 4. References

- **4.1** This section is optional.
- **4.2** Reference documents must be used in the context of the document.

## 5. Definitions

| Term | Definition |
| --- | --- |
| 802.11 | A set of Wireless LAN/WLAN standards developed by the IEEE LAN/MAN standards committee (IEEE 802). Also commonly referred to as “Wi-Fi.” |
| 802.11i | An amendment to the IEEE 802.11 standard specifying security mechanisms for wireless networks. |
| 802.1x | A framework for link-layer authentication specified by the IEEE. |
| AES-CCMP | Advanced Encryption Standard-Counter with CBC-MAC Protocol. A wireless encryption protocol specified by IEEE 802.11i. Currently regarded as the strongest form of wireless encryption. |
| EAP | Extensible Authentication Protocol. A series of authentication methods used inside 802.1x to achieve wireless authentication. |
| BYOD | Bring Your Own Device – Non-Entegris communications device that may be permitted to connect to an Entegris environment. |
| IEEE | Institute of Electrical and Electronics Engineers. It is an international professional organization dedicated to the advancement of technology related to electricity. The IEEE is one of the main standards bodies associated with networking technology. |
| IETF | Internet Engineering Task Force. Develops and promotes Internet standards, those of the TCP/IP protocol suite. |
| IPSEC | IP Security. An IETF standard for protecting IP communication by encrypting or authenticating all packets. |
| LEAP | Lightweight Extensible Authentication Protocol. A proprietary protocol supported by Cisco Systems that acts as an EAP method within 802.1x. LEAP was proven insecure in 2003 and does not comply with current security standards. |
| PEAP | Protected Extensible Authentication Protocol. A tunneled EAP method that uses a server-side digital certificate for server authentication and a username/password for client authentication. |
| NAC | Network Access Control – Network solution used to force all devices that connect to a specific network to be preauthorized to enable communications on the defined network. Without being authorized the device would not be able to communicate on the network. |
| SSID | Service Set Identifier – Sequence of characters that uniquely names a wireless local area network. |
| Stateful Packet Inspection | A filtering or firewall technology that keeps track of the state of network connections, such as TCP streams, traveling across it. Only packets which match a known connection state will be allowed, while others are rejected. |
| VPN | Virtual Private Network. A method of building private networks on top of public networks such that the private network is protected and separate. |
| WEP | Wired Equivalent Privacy. This is the encryption protocol specified in the original version of IEEE 802.11. It is now deprecated and does not meet current security standards. |
| WIDS / WIPS | Wireless Intrusion Detection and Prevention System – Wireless automated protection system designed to identify attacks, unusual wireless devices and defend against them. |
| Wi-Fi | A set of product compatibility standards for wireless LANs based on IEEE 802.11. The Wi-Fi term is managed by the Wi-Fi Alliance. Products carrying Wi-Fi certification have passed a series of compatibility tests. |
| WLAN/Wireless LAN | A type of wireless system based on the IEEE 802.11 series of protocols. |
| WPA | Wi-Fi Protected Access. WPA implements the majority of the IEEE 802.11i standard and was intended as an intermediate measure to take the place of WEP while 802.11i was prepared. WPA is designed to work with all wireless network interface cards. Products displaying the WPA logo have passed a certification program run by the Wi-Fi Alliance. |
| WPA2 | Wi-Fi Protected Access version 2. WPA2 implements the full IEEE 802.11i standard but will not work with some older network cards. Products displaying the WPA2 logo have passed a certification program run by the Wi-Fi Alliance. |
| WPA3 | Wi-Fi Protected Access version 3. WPA3 implements the full IEEE 802.11i standard but will not work with some older wireless network cards. Products displaying the WPA3 logo have passed a certification program run by the Wi-Fi Alliance. |

## 6. Procedure/Process

### 6.1 Approved equipment

- **6.1.1** All wireless LAN access must use corporate-approved products and security configurations.

### 6.2 Monitoring of uncontrolled wireless devices

- **6.2.1** All company locations where permanent data networks are installed will be equipped with sensors and systems to automatically detect, classify, and disrupt communication with unapproved wireless access points.
- **6.2.2** All company locations where permanent data networks are installed will be equipped with sensors and systems to automatically detect the presence of wireless devices forming a connection between the network and any wireless network. This would include laptops that are serving as a bridge between wired and wireless networks.
- **6.2.3** In company locations where wireless LAN access has been deployed, a wireless intrusion detection system shall be integrated with the wireless LAN access system wherever possible.

### 6.3 Authentication of wireless clients

- **6.3.1** All access to wireless networks must be authenticated.
- **6.3.2** The Company’s existing strong password policy must be followed for access to wireless networks.
- **6.3.3** The minimum form of wireless authentication permitted by the client is WPA 2. For the majority of devices and operating systems, WPA2, WPA2 with 802.1x/EAP-PEAP/ or WPA3 must be used. WPA2 is currently preferred wherever possible.
- **6.3.4** Where 802.1x authentication is used, mutual authentication must be performed. Client devices must validate that the digital certificate presented by the authentication server is trusted and valid. Under no circumstances may clients disable validation of server certificates and blindly trust any certificate presented. EAP methods that do not support certificate-based mutual authentication may not be used.
- **6.3.5** EAP methods that exchange authentication credentials outside of encrypted tunnels may not be used. These methods include EAP-MD5 and LEAP.
- **6.3.6** When legacy devices that do not support WPA or WPA2 must be used on a wireless network, they will be isolated from all other wireless devices and will be restricted to the minimum required network access. Violations of the configured rules, indicating that an intrusion has taken place, must cause the device to be immediately disconnected and blocked from the network.
- **6.3.7** WPA 2/3 TLS certificated based 802.1x will be a requirement in the near future to join internal Entegris networks (see 6.6).

### 6.4 Encryption

- **6.4.1** All wireless communication between Company devices and Company networks must be encrypted. Wireless networks providing only Internet access for guest users are exempted from this requirement.
- **6.4.2** The strongest form of wireless encryption permitted by the client device must be used. For most devices and operating systems, WPA using TKIP encryption or WPA2 using AES-CCM encryption must be used. WPA2 with AES-CCM is preferred wherever possible.
- **6.4.3** Client devices that do not support WPA2 or higher should be secured using VPN technology such as IPSEC where permitted by the client device.
- **6.4.4** The use of WEP/WPA requires a waiver from Information Security. Client devices that require the use of WEP/WPA must be isolated from all other wireless devices and will be restricted to the minimum required network access. Violations of the configured rules, indicating that an intrusion has taken place, must cause the device to be immediately disconnected and blocked from the network.

### 6.5 Access Control Policies

- **6.5.1** Access to corporate network resources through wireless networks should be restricted based on the business role of the user. Unnecessary protocols should be blocked, as should access to portions of the network with which the user has no need to communicate. Only Entegris corporate owned devices will be allowed to join the Entegris wireless internal network.
- **6.5.2** Access control enforcement shall be based on the user’s authenticated identity, rather than a generic IP address block. This is also known as “identity-based security.”
- **6.5.3** The access control system must be implemented in such a way that a malicious inside user is unable to bypass or circumvent access control rules.
- **6.5.4** Access control rules must use stateful packet inspection as the underlying technology.
- **6.5.5** Non -Entegris Wireless Access Points must be approved and scanned by Tenable before being added to any part of the Entegris Network.
- **6.5.6** Only Entegris approved devices can access the appropriate wireless network. Enforcement for the internal Entergris network is covered in 6.6.
- **6.5.7** Wireless Network segmentation must be enforced by network firewalls or Wireless Controller-based access-lists.

### 6.6 Client Security Standards (Near Future)

- **6.6.1 Client Posture Check:** Where supported by the client operating system, the wireless network will perform checks for minimum client security standards (client integrity checking) before granting access to the Company network. Specifically:
- **6.6.2** All wireless clients must run Company approved anti-virus/anti-malware software that has been updated and maintained in accordance with the Company’s anti-virus software policy.
- **6.6.3** All wireless clients must run host-based firewall software in accordance with the Company’s host security policy.
- **6.6.4** All wireless clients must have security-related operating system patches applied that have been deemed “critical” in accordance with the Company’s host security policy.
- **6.6.5** All wireless clients must be installed with Company-standard wireless driver software.
- **6.6.6** Clients not conforming to minimum security standards will be placed into a quarantine condition and automatically remediated.
- **6.6.7** Client operating systems that do not support client integrity checking will be given restricted access to the network according to business requirements.
- **6.6.8** Clients must have the Entegris domain certificate installed on the system before it will allowed on the Entegris Internal wireless network which will be enforced with WPA 2 Enterprise EAP-TLS Certificate—based authentication (Certificate required).

### 6.7 Wireless Guest Access

- **6.7.1** Wireless guest access will be available at all facilities where wireless access has been deployed.
- **6.7.2** All wireless guest access will be authenticated through a web-based authentication system.
- **6.7.3** A user will register on the guest portal for internet access.
- **6.7.4** Wireless guest access is available from the hours of 7 AM until 9 PM local time.
- **6.7.5** Wireless guest access is bandwidth limited to 1Mb/s per user.
- **6.7.6** Guest access will be restricted to the following network protocols:
  - HTTP (TCP port 80)
  - HTTPS (TCP port 443)
  - POP3 (TCP port 110)
  - IKE (UDP port 500)
  - IPSEC ESP (IP protocol 50)
  - PPTP (TCP port 1723)
  - GRE (IP protocol 47)
  - DHCP (UDP ports 67-68)
  - DNS (UDP port 53)
  - ICMP (IP protocol 1)

### 6.8 Logging, Monitoring, and Alerting

- **6.8.1** Logging / Auditing of Entegris wireless solutions is required to enable the capability to know who did what when. Minimum characteristics must meet the Information Security requirements for logging and monitoring.
- **6.8.2** Logs must also be sent to a location outside of the local device to deter local manipulation of such logs.
- **6.8.3** Logs are to be part of the centralized SIEM process.
- **6.8.4** Logs should be sent to the centralized location at least once per hour if not in real-time.
- **6.8.5** Alerts should be generated by the centralized security solution based on logs acquired from the wireless solutions. These should consist of anomalous activity.
- **6.8.6** Identified anomalous activity devices should be disabled from communicating on the Entegris network.
- **6.8.7** Wireless networks shall be monitored to detect intrusions by unauthorized wireless devices. This shall be accomplished either through a wireless control system that identifies unauthorized devices in real-time or via periodic scans for rogue WAPs.
- **6.8.8** These scans shall be documented to provide evidence of the date of the scan, results of the scan, and any actions that were taken because of the scan.

### 6.9 Audit and Accountability

- **6.9.1** Entegris Information Security organization will be responsible for verifying that the requirements of this policy are adhered to and providing compliance metrics.
- **6.9.2** Entegris Internal Audit team will periodically assess compliance and provide audit reports.

### Wireless & Security Parameters – SSIDs, Usage and Wireless SSID Security Access Requirements

| SSID | Use Case | Wireless Security Access Requirement | Specific Security Controls | Notes |
| --- | --- | --- | --- | --- |
| Entegris | COH Enterprise End Points | WPA 2 Enterprise | ISE, EAP-TTLS, EAP-TLS (near future cert required) | (Near Future TLS) This can be done once all systems are domain joined. or have an Enterprise Enttegris Cert |
| ESLRF | OT | WPA 2 PSK - Static Key | ISE Mac Address, VLAN ACLs | |
| Entegris BYOD | BYOD | WPA 2 Enterprise | ISE, EAP-TTLS, | |
| Entegris Guest | Entegris Guests | Controlled by Portal - 7 day session | User info Registration | |

## 7. Attachments

*No attachments were included in the source document.*

<!-- Source section was empty. -->

## 8. Metrics & Reporting

| Requirement | Metric Owner | Type of report/ frequency |
| --- | --- | --- |
| Wireless scan performed | Network Services | Email alert/network Changes |
| Rogue detection performed and reported | Network Services | Email alert/network Changes |
| Incident identified and addressed | Network Services | Email alert/network Changes |
| Total Wireless assets | Network Services | Solution Managed/On demand |
| MAC/NAC verification | Cybersecurity | Future |
| Wireless Pen Testing (Annual) | Cybersecurity | Annual |

## 9. Exceptions Management

<!-- Standard section: do not edit. -->

- **9.1** Exceptions must be documented and reviewed with relevant IT and Business leaders.
- **9.2** All exceptions must be documented and submitted by the designated Business Leader stating the compelling reasons as to why the requirements cannot be met, and what other compensating controls are there to mitigate the risk to Entegris.
- **9.3** Any exception must be given for a limited period, a maximum of 1 year. Approved exceptions must be shared with the Cybersecurity team.

## 10. Standard Training & Distribution and Training

Wireless security control requirements that relate to the general user need to be included within the Annual Employee training for Information Security.

## 11. Sustainability

<!-- Standard section: do not edit. -->

This Standard Owner must ensure conducting a periodical review of this document with all stakeholders, to ensure that all the control requirements are relevant and applicable to current business and operating environments, and for any applicable regulatory requirements, and make necessary changes. This standard should be reviewed annually or when any material change to technology or process associated with wireless occurs.

## 12. Standard Enforcement

See requirements for enforcement of the controls listed herein. Monitoring of effectiveness will be based on the metrics and reporting derived from the table listed herein.

## 13. Revision History

| New Rev | Description of Change | Reason for Change |
| --- | --- | --- |
| 1 | New Document | To document the security methods and protocols |
