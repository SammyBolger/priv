---
title: Data Classification Standard
sidebar_label: Data Classification
description: Entegris model for classifying enterprise data by type, confidentiality category, and classification level.
tags: [standard, data, security]
---

# Data Classification Standard

| Field | Detail |
| --- | --- |
| **Document number** | 13834 (source file identifier; no document number was visible in the source) |
| **Type** | Standard |
| **Domain** | Data Classification / Information Security |
| **Owner** | Not stated in source |
| **Source file** | `13834_2 - Data Classification Model.pptx` |

## Data Classification Model

**Data Types** — Enterprise-wide data can be classified into 3 types:

- Product / Sales Related
- Financial / Support Related
- R&D Related

**Classification Categories** — Enterprise-wide data is classified into 3 categories:

- Non-confidential (< 5% of total data)
- Confidential (> 80% of total data)
- Confidential Restricted (< 15% of total data)

Except public data, all data that is shared with Customers/Vendors should have appropriate NDAs in place.

**Data Classification Level** — Category classification is applied at a collection level rather than at an individual document level:

- Folder Level (File Server)
- Site Level (SharePoint / Lotus Notes)
- Project / Product Level (Engineering Vault)

## Public Data

Information that is, has already been, or allowed to be shared, published or disclosed to non-Entegris employees or the public in general. Such publication or disclosure can be conducted without the need for a confidentiality agreement.

Examples include:

- Entegris company websites (internet, not intranet)
- Advertisements
- Certain marketing materials
- Entegris' Annual Report
- Company information released to the public for regulatory or compliance reasons
- Issued patents

## Internal Data

Information shared between Entegris employees or between Entegris employees and Entegris' third-party contractors, consultants or agents and is intended to NOT be shared with the public or non-Entegris employees.

Access to, disclosure of, distribution or publication of information in this category is limited to Entegris employees who are each under obligations of confidentiality, or to only non-Entegris employees that have proper contractual obligations to secrecy and non-disclosure of the Internal Information (for example, an executed Non-Disclosure Agreement).

Examples of Internal information include:

- Product pricing
- Certain employee data
- Consumer preferences
- Business plans
- Samples, materials
- Project related artifacts
- Manufacturing processes
- Chemical formula
- Customer lists
- Joint development partners
- Some technology
- Unpublished patent applications

## Restricted Data

Information that is accessible, shared, or disclosed to a very limited and small set of Entegris employees who have a critical need to know such information within the scope of their employment and obligations at Entegris.

Such employees must not disclose this information outside of the limited number of employees who are permitted access to this information. Information in this Restricted category shall have a designated owner, and the owner will maintain a list of the Entegris employees (and non-employees such as consultants, law firms, or auditors) that have access to the Restricted Information.

> **Note:** Restricted Information could have temporary status in this category. Business Development activities are examples, because ongoing activities and planning for acquisitions and/or mergers are restricted information until it is intentionally disclosed or reported to the public. Due to the time-sensitive nature of Restricted Information, there is an overhead to re-certify this data on a periodic basis by the data owner.

## Examples of Restricted Data

Examples of Restricted Information include but are not limited to:

- **Trade Secrets** — A Trade Secret is a type of intellectual property defined under federal and state laws. A Trade Secret is information that is unique and derives independent economic value for Entegris, and for which Entegris takes further steps to maintain the secrecy of such information. Two tiers have been established for Entegris Trade Secrets:
  - **"Orange Trade Secret":** A sub-classification of trade secret that represents the 'entry level' of trade secrets.
  - **"Red Trade Secret":** A sub-classification of trade secret that represents a higher level of trade secrets, and is considered highly restricted and highly controlled.
- **HR Related Data** — Employee information (Social Security Number, Home Address, Medical Disability) subject to Privacy and Compliance regulations.
- **Some Finance Data** — Forecasting, some Profit Center Accounting.
- **New Product Designs** that are in development stages and have not yet been released or cleared for sampling, outside testing, or commercialization.
- **Some Research or Application Data** — information that is specific to a given customer that could reveal the following: device designs and integration strategies, device and process roadmaps, process conditions or recipes, consumable selection or sourcing. This type of information would be disclosed to Entegris by a customer or obtained by an Entegris employee during evaluation of customer material, under an executed NDA. This type of information would include any information that one customer (e.g., tsmc) would not want another company or competitor (e.g., Samsung) to know about. The risk for a data breach would come from data or information shared between Entegris Tech Centers in different geographies servicing different customers.
- **Pending Litigation Matters** — information relevant to a pending lawsuit where Entegris is named as a party.

Note that not all information and data in each of these exemplary categories is Restricted. Many of these categories have data that could be classified in all 3 classifications.
