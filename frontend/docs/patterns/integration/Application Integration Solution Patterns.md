---
description: "Reference architecture pattern."
---

## High-Level Integration Solution Patterns

| Integration Category | Strategic Platform | When to Use | When Not to Use | Approved Pattern |
|---------------------|-------------------|-------------|-----------------|------------------|
| **Application Integration (Process Integration)** | **Boomi** | • Real-time or near-real-time business process integration<br>• API orchestration, routing, and transformation<br>• Process synchronization across applications<br>• Business event processing<br>• System-to-system communication using APIs and connectors | • Large-scale ETL/ELT processing<br>• Data warehouse loading<br>• Analytics data movement<br>• User-driven manual activities<br>• Complex data transformations better suited to data platforms | Synchronous API (Request/Reply)<br>Asynchronous API<br>Process Orchestration |
| **SAP Integration** | **Boomi + SAP BTP** | • SAP ECC/S/4HANA integration<br>• Standard SAP APIs and adapters<br>• SAP business process integration<br>• SAP extensions exposed through BTP and consumed by Boomi | • Direct application-to-SAP integrations<br>• Point-to-point SAP connectivity bypassing Boomi | SAP Adapter Pattern<br>SAP API Integration<br>SAP Extension Pattern (BTP) |
| **Batch Integration** | **Boomi** | • Scheduled data exchange<br>• Periodic synchronization<br>• Master data distribution<br>• Report and extract delivery<br>• Partner integrations requiring scheduled processing | • Interactive transactions<br>• User-facing requests requiring immediate response | Batch API Processing<br>Batch File Processing |
| **Event-Driven Integration** | **Boomi / Approved Messaging Platform** | • Business event notification<br>• Publish-subscribe scenarios<br>• Loosely coupled integrations<br>• One-to-many event distribution | • Request-response scenarios<br>• Scenarios requiring immediate acknowledgement | Event-Driven Integration<br>Publish-Subscribe |
| **File Transfer** | **Boomi / Approved Secure File Transfer Platform** | • Secure file exchange between applications and partners<br>• Manufacturing and OT data movement<br>• Cloud file ingestion and delivery<br>• Large file transfers where APIs are unavailable | • Real-time transactional integrations<br>• Process orchestration requirements | Secure File Transfer (SFTP)<br>Managed File Transfer |
| **Data Pipelining / ELT / Analytics Integration** | **Acersoft, Qlik, SAP Data Services** | • Change Data Capture (CDC)<br>• Analytics feeds<br>• Data lake ingestion<br>• Data warehouse loading<br>• Large-volume extraction and transformation workloads | • Transactional integrations<br>• Application orchestration<br>• Business process synchronization | ELT / ETL<br>CDC<br>Data Pipeline |
| **Data Synchronization** | **Acersoft, Qlik, SAP Data Services** | • Bulk data movement<br>• Incremental data loads<br>• Historical loads<br>• Reporting and analytics synchronization | • Real-time application communication<br>• User-facing business transactions | Incremental Load<br>Batch Synchronization<br>CDC |

---

## Integration Technology Selection Guide

| Requirement | Preferred Pattern |
|------------|-------------------|
| Immediate response required | Synchronous API via Boomi |
| Business process spanning multiple applications | Boomi Process Integration |
| SAP integration | Boomi + SAP Adapter |
| SAP extension or custom service | SAP BTP + Boomi |
| Scheduled data exchange | Batch Processing |
| Secure partner file exchange | SFTP via Boomi |
| Event notification to multiple consumers | Event-Driven Integration |
| Change Data Capture (CDC) | Acersoft / Qlik |
| Analytics or reporting feed | Data Pipeline / ELT |
| Data Lake or Data Warehouse ingestion | Acersoft / Qlik / SAP Data Services |
| Large data transformation workload | Acersoft / Qlik / SAP Data Services |

---

## Architecture Principles

| Principle | Statement |
|-----------|-----------|
| Integration Platform Standard | Boomi is the strategic enterprise integration platform and the preferred mediation layer for application integrations. |
| Point-to-Point Integrations | Direct application-to-application and application-to-SAP integrations should be avoided unless approved through the TRB exception process. |
| SAP Integration Standard | SAP integrations must leverage approved SAP APIs, SAP adapters, or SAP services exposed through SAP BTP and consumed through Boomi. |
| Data Movement Standard | Data platforms (Acersoft, Qlik, SAP Data Services) should be used for CDC, analytics, warehousing, and large-scale data movement. |
| File Transfer Standard | File-based integrations must use approved secure transfer mechanisms with encryption, monitoring, and recovery capabilities. |
| Security & Governance | All integrations must comply with Entegris security, monitoring, audit logging, and operational support standards. |
| Reusability First | Existing APIs, integrations, and canonical patterns should be reused before implementing new interfaces. |
| Observability | Integration solutions must provide monitoring, alerting, error handling, and recovery mechanisms. |

---

## Integration Decision Tree

| If the Requirement Is... | Then Use... |
|-------------------------|-------------|
| User requires an immediate response | Synchronous API |
| Application must trigger another application process | Boomi Process Integration |
| SAP transaction or business process integration | SAP Adapter / SAP API via Boomi |
| Periodic data exchange | Batch Integration |
| Large file exchange | Secure File Transfer |
| Business event broadcast to multiple consumers | Event-Driven Integration |
| Reporting, analytics, or warehousing | Data Pipeline / ELT |
| Change Data Capture | Acersoft / Qlik |
| Large-scale data transformation | Data Platform (not Boomi) |
