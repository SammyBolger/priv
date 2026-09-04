# Technology Architecture Domain Overview
## Purpose:
- Bridge between strategy and execution
- Architecture assurance and governance
   - **Establish the architecture patterns, standards and guidelines** and bring them to the TRB for formal approval
  - Conduct design reviews: Participate in architecture review boards to present and defend solution designs. Review designs from other teams to ensure consistency and adherence to enterprise standards.
  - Ensure compliance: Verify that the solution's architecture complies with the organization's architectural standards, patterns, and principles. Help define and implement governance processes within the functional domain.
  - Identify and mitigate risk: Evaluate design choices to identify and mitigate technical risks, such as potential issues with scalability, integration, or security. Document all risks and mitigation plans.
  - Validate technology selection: Participate in the evaluation and selection of technologies and vendors for the solution. Ensure that choices are compatible with the existing enterprise architecture.
- Design and planning
   - Translate requirements: Convert specific business requirements for the functional area into a comprehensive technical design and solution architecture
   - Design solutions: Create architecture definitions and blueprints that detail the components, interactions, and dependencies of the solution. This includes designing for non-functional requirements like performance, security, and scalability.

## Technology Architecture Domains - Architecture Artifacts

## Technology Architecture Domains

- **AI:** Danny Hagaman <dan.hagaman@entegris.com>, Mark Milbrandt <Mark.Milbrandt@entegris.com>
- **Master Data Management (MDM)** Arjun Ghattamneni <arjun.ghattamneni@entegris.com>
- **On-premise Infrastructure Architecture & Engineering** VMs, Storage, Networking, & Compute) Chris Ebright <Chris.Ebright@entegris.com>; Pritish Doshi <pritish.doshi@entegris.com>
- **Knowledge Graph/ Graph Analytics (data and ontology designs):** Sandeep Nagar <sandeep.nagar@entegris.com>
- **Connect & Collect:** Beygan Sundaramurthy <beygan.sundaramurthy@entegris.com>; Andrew DiNatale <andrew.dinatale@entegris.com>; Blake Benner <Blake.Benner@entegris.com>
- **ERP Technical:** Lalit Sharma <Lalit.sharma@entegris.com>

### Subdomains
- **Data Architecture & Engineering**, e.g., data model designs: Sandeep Nagar <sandeep.nagar@entegris.com>
- **Digital Tech Engineering:** Ian Elletson <Ian.Elletson@entegris.com>, Krishna Prasad Varma <krishnaprasad.varma@entegris.com>
- **Application Integration/ API/ Event/ Message-based Architecture:** Danny Hagaman <dan.hagaman@entegris.com>, Michael Hsieh <michael.hsieh@entegris.com>, Ian Elletson <Ian.Elletson@entegris.com>
- **Identity & Access Management:** Jon Shern <jon.shern@entegris.com>
- **Cloud Infrastructure Architecture & Engineering** Containers, Storage, Access Management, Networking & Compute) Pritish Doshi <pritish.doshi@entegris.com>; Chris Ebright <Chris.Ebright@entegris.com>, 
- **Digital Workplace** Essentially O365 and associated technologies Gurujyot Jolly <gurujyot.jolly@entegris.com>
- [**End User Compute** end user devices such as laptop, mobile devices and technologies, and platforms to enable users to securely access and perform work Bhupendra Jain <bhupendra.jain@entegris.com>
- [**IT PMO** Architecture Assurance and Capabilities-based Planning roadmapping with sequencing and dependencies of solution architecture Brad Schuler <brad.schuler@entegris.com>


# PREVIOUS INPUT
### Compute

- Focus: Provisioning and managing processing resources for applications and workloads.
- Includes: Servers, virtualization, containers, cloud compute (IaaS, PaaS).
- Examples: VMware, Kubernetes, Azure VMs.
- Members:
  - Chris Ebright <Chris.Ebright@entegris.com>
  - Pritish Doshi <pritish.doshi@entegris.com>
- [**Artifacts** 


### Storage

- Focus: Reliable and scalable storage of structured and unstructured data.
- Includes: SAN/NAS, object storage, cloud storage.
- Examples: NetApp, AWS S3.
- Members:
  - TBD
- *Artifacts*

### Network

- Focus: Connectivity, performance, and secure data transfer across systems.
- Includes: LAN/WAN, SD-WAN, routing, switching, firewalls.
- Examples: Cisco, Palo Alto, Zscaler.
- Members:
  - TBD
- *Artifacts*

### Platform & Middleware

- Focus: Foundational software services enabling application integration and execution.
- Includes: Operating systems, databases, messaging, integration platforms.
- Examples: Windows Server, Linux, Oracle DB, Kafka.
- Members:
  - Sandeep Nagar <sandeep.nagar@entegris.com>
  - Danny Hagaman <dan.hagaman@entegris.com>
- **Artifacts-Middleware**
- **Artifacts-Data** 


### End-User Computing

- Focus: Devices and environments for user interaction with enterprise systems.
- Includes: Desktops, laptops, VDI, mobile devices.
- Examples: Windows 11, Intune, Citrix.
- Members:
  - TBD
- *Artifacts*

### Cloud Services

- Focus: Elastic, on-demand infrastructure and platform services.
- Includes: Public, private, hybrid cloud architecture.
- Examples: AWS, Azure, GCP.
- Members:
  - TBD
- *Artifacts*

### Security Infrastructure

- Focus: Protecting systems, data, and identities across all layers.
- Includes: IAM, PAM, PKI, encryption, firewalls.
- Examples: CyberArk, Okta, Palo Alto.
- Members:
  - Jon Shern <jon.shern@entegris.com>
  - Alex Krasheninin <alex.krasheninin@entegris.com>
  - Josh Bovee <josh.bovee@entegris.com>
  - Uday Nori <uday.nori@entegris.com>
- **Artifacts**

### Monitoring & Management

- Focus: Observability, performance optimization, and operational control.
- Includes: Monitoring, logging, configuration management.
- Examples: Splunk, ServiceNow, Nagios.
- Members:
  - TBD
- *Artifacts*

## Emerging Sub-Domains

### DevOps & Automation (CI/CD pipelines, Infrastructure as Code)

- Focus: Streamlining software delivery and infrastructure management through automation.
- Includes: CI/CD pipelines, Infrastructure as Code (IaC), automated testing, configuration management.
- Examples: Jenkins, GitHub Actions, Terraform, Ansible.
- Members:
  - Ian Elletson <Ian.Elletson@entegris.com>
- **Artifacts**

### Edge Computing & IoT

- Focus: Processing data closer to the source for low latency and real-time insights.
- Includes: Edge devices, IoT sensors, gateways, edge analytics platforms.
- Examples: AWS IoT Greengrass, Azure IoT Edge, Cisco Edge.
- Members:
  - TBD
- *Artifacts*

### AI/ML Platforms

- Focus: Enabling machine learning model development, training, and deployment.
- Includes: ML frameworks, data pipelines, GPU compute, AI services.
- Examples: TensorFlow, PyTorch, Azure Machine Learning, AWS SageMaker.
- Members:
  - Mark Milbrandt <Mark.Milbrandt@entegris.com>
- **Artifacts** 


### Backup & Disaster Recovery

- Focus: Ensuring data resilience and business continuity during failures or disasters.
- Includes: Backup solutions, replication, failover systems, DR orchestration.
- Examples: Veeam, Commvault, Azure Site Recovery.
- Members:
  - TBD
- *Artifacts*

## Other Enterprise Architecture Domains

### Data Architecture

- Focus: Describes the structure of an organization's logical and physical data assets and data management resources.
- Includes: Provides a blueprint for data storage, integration, and flow.
- Examples: Data models, metadata, master data management.
- Members:
  - Sandeep Nagar <sandeep.nagar@entegris.com>
- **Artifacts**

### Application Architecture

- Focus: Defines the individual application systems, their interactions, and their relationships to core business processes.
- Includes: Ensures applications are modular, interoperable, and scalable.
- Examples: Application portfolio, integration patterns, APIs.
- Members:
  - Beygan Sundaramurthy <beygan.sundaramurthy@entegris.com>
  - Andrew DiNatale <andrew.dinatale@entegris.com>
  - Blake Benner <Blake.Benner@entegris.com>
- **Artifacts - Connect & Collect** 


## Other Topics
- Infrastructure as Code (IaC)
- GitOps: A modern evolution of IaC, GitOps uses Git repositories as the single source of truth for both application code and infrastructure configurations. Automated agents then continuously monitor and reconcile the live cloud environment to match the state declared in the Git repository.
- Continuous Integration/Continuous Delivery (CI/CD)
- Observability (Monitoring and Logging): Teams implement comprehensive monitoring and logging across their cloud systems to gain deep visibility into application performance and infrastructure health. This provides fast feedback loops, allowing teams to quickly detect, diagnose, and resolve issues.
- Shift-left security (DevSecOps)
