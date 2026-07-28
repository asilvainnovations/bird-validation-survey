# BIRD 2026-2035 Validation Survey — Complete Guide
**For Respondents, Administrators, and Provincial Coordinators**

## Table of Contents
1. [Introduction](#1-introduction)
2. [Before You Start](#2-before-you-start)
3. [Survey Navigation](#3-survey-navigation)
4. [Current 16-Step Survey Structure](#4-current-16-step-survey-structure)
5. [Step-by-Step Guide](#5-step-by-step-guide)
6. [Integration Architecture](#6-integration-architecture)
7. [Question Types Explained](#7-question-types-explained)
8. [BIRD Score Interpretation](#8-bird-score-interpretation)
9. [For Administrators](#9-for-administrators)
10. [Troubleshooting](#10-troubleshooting)
11. [Frequently Asked Questions (FAQ)](#11-frequently-asked-questions-faq)
12. [Appendix](#12-appendix)

---

## 1. Introduction

### What is BIRD 2026-2035?
The **Bangsamoro Investment Roadmap (BIRD) 2026-2035** is the comprehensive, evidence-based strategic plan designed to transform the Bangsamoro Autonomous Region in Muslim Mindanao (BARMM) into a competitive, inclusive, and sustainable investment destination. Developed by the Board of Investments - Ministry of Trade, Investments and Tourism (BOI-MTIT BARMM), BIRD serves as the region's 10-year master plan.

The roadmap is structured around the **BEIE Framework** (Bangsamoro Economic and Investment Ecosystem), organizing investment clusters into **Foundations, Transformers, Enablers, Connectors,** and **Financiers**, all anchored by **Moral Governance** as the central operating system.

### Why Your Feedback Matters
Your participation ensures that the BIRD 2026-2035 reflects ground-level realities, diverse provincial perspectives, and technical rigor. Your feedback directly shapes policy priorities, resource allocation, and implementation sequencing over the next decade.

### Anonymity and Data Protection
The survey is fully compliant with the **Data Privacy Act of 2012 (RA 10173)**. 
* **Voluntary Participation:** All questions are optional unless explicitly marked as required.
* **Anonymity Option:** You may complete the survey without providing Personally Identifiable Information (PII) like your name or email.
* **Secure Storage:** Data is transmitted via HTTPS and stored in encrypted Supabase PostgreSQL databases with strict Row-Level Security (RLS).
* **Privacy Policy:** [View Full Privacy Policy](https://asilvainnovations.github.io/BIRD-2026-2035/public/privacy-policy.html)

---

## 2. Before You Start

### System Requirements
* **Browser:** Chrome 90+, Firefox 88+, Edge 90+, Safari 14+, or Opera 76+
* **Screen:** 1024x768 minimum (1366x768+ recommended for optimal chart/image viewing)
* **Connection:** Stable broadband (3 Mbps+ recommended for multimedia and lazy-loaded images)

### Estimated Completion Time
* **Full survey:** 45–60 minutes
* **Partial survey:** 20–30 minutes
* **Save & Resume:** Supported automatically via browser `localStorage`. Your progress is saved locally every time you navigate between steps.

---

## 3. Survey Navigation

### How the Wizard Works
The survey uses a 16-step wizard interface (Steps 0–15). You progress sequentially, but the interface allows flexible navigation.

### Progress Indicator & Step Jumper
A sticky progress bar at the top of the screen shows your completion percentage. The **Step Jumper** (the row of step labels below the progress bar) allows you to click any step to navigate directly to it without losing your saved progress.

### Offline Resilience
If your internet connection drops, your responses are automatically queued in your browser's `localStorage` (under the key `bird-survey-draft-v1`). When connectivity is restored, the survey will seamlessly attempt to sync your data to the secure backend via the Edge Function.

---

## 4. Current 16-Step Survey Structure

| Step | Title | Focus Area | Interactive Elements |
| :--- | :--- | :--- | :--- |
| **0** | Welcome & Orientation | Readiness, Systems Thinking intro | Introductory video, CLD/Archetype images, readiness scales |
| **1** | Privacy & Consent | DPA 2012 compliance | Checkboxes (**Required**) |
| **2** | Your Profile | Demographics, Province, Expertise | Dropdowns, Text inputs, Multi-select |
| **3** | BEIE & Systems Thinking | Framework legitimacy, Strengths | Video, SWOT Scales (Impact × Likelihood) |
| **4** | Cluster 1: Foundations | Agri-fishery, Energy, Forestry | SWOT Scales, Archetype Validation |
| **5** | Cluster 2: Transformers | Halal industry, Value chains | SWOT Scales, Archetype Validation |
| **6** | Cluster 3: Enablers | Infrastructure, Human capital | SWOT Scales, Archetype Validation |
| **7** | Cluster 4: Connectors | BIMP-EAGA, Trade, Logistics | SWOT Scales, Archetype Validation |
| **8** | Cluster 5: Financiers | Islamic finance, Capital access | SWOT Scales, Archetype Validation |
| **9** | Operating Systems | Moral Governance, Regulatory | SWOT Scales, Archetype Validation |
| **10** | IEDS & 3-Phase Plan | Sequencing, Strategic Options | IEDS Matrix (7-criteria scoring) |
| **11** | Metrics Architecture | KPI importance ratings | 1-5 Likert scales |
| **12** | Balanced Scorecard | 4-perspective alignment | Pathway selection, Vision clarity scales |
| **13** | Priority Actions & Budget | Budget realism, Phasing | Risk concern scales, Phase/Cluster priority |
| **14** | Resources & Engagements | Participation preferences | Multi-select, Open text |
| **15** | Review & Submit | Accuracy confirmation | Final consent checkbox (**Required**), Submission |

---

## 5. Step-by-Step Guide

### Step 0: Welcome & Orientation
**Purpose:** Introduce the survey and foundational systems thinking concepts.
**What to do:** Watch the introductory video on Systems Thinking. Review the Causal Loop Diagram (CLD) and Systems Archetypes reference images. Answer quick-start questions about your readiness and understanding of the ecosystem.

### Step 1: Privacy & Consent
**Purpose:** Legal compliance and data protection.
**What to do:** Read the privacy notice and check the consent boxes. *Note: Along with the final consent in Step 15, this is the only strictly required section to proceed.*

### Step 2: Your Profile
**Purpose:** Segmentation for robust, multi-dimensional analysis.
**What to do:** Select your primary province of engagement, stakeholder category, and areas of expertise. Your name, email, and organization are optional but helpful for follow-up.

### Steps 3–9: Cluster Assessments & Systems Archetypes
**Purpose:** Validate SWOT factors and systems dynamics across the BEIE framework.
**What to do:** For each cluster, you will rate specific strategic factors using paired **Impact (1-5)** and **Likelihood (1-5)** scales. You will also validate Systems Archetypes (e.g., "Tragedy of the Commons", "Fixes that Fail") by selecting how accurately they describe BARMM's reality, with optional open-text follow-ups for nuanced feedback.

### Steps 10–13: Strategy, Metrics & Budget
**Purpose:** Validate the IEDS strategy, KPI frameworks, and budget phases.
**What to do:** Rate the clarity and feasibility of the 3-phase execution plan, score strategic options using the 7-criteria IEDS matrix, assess KPI importance, and evaluate budget realism and risk concerns.

### Steps 14–15: Resources & Submission
**Purpose:** Finalize engagement preferences and submit.
**What to do:** Indicate your preferred engagement format (e.g., workshops, interviews), review your response summary, confirm data accuracy, check the final consent box, and click **Submit Survey**.

---

## 6. Integration Architecture

This section documents the technical architecture for developers, system administrators, and MEL teams.

```text
+-----------------------------------------------------------------------------+
|                         SURVEYWIZARD ARCHITECTURE                           |
+-----------------------------------------------------------------------------+
|  [16 Section Components] --> [useState per section] --> [BIRD Score Panel]  |
|         |                                                    |              |
|         v                                                    v              |
|  [bird-urls.ts] (Assets) --> [submitSurvey() in api.ts] <-- [formulas.ts]   |
|                                      |                                      |
|                                      v                                      |
|                     [Supabase Edge Function: survey-submit]                 |
|                                      |                                      |
|                                      v                                      |
|         [PostgreSQL: survey_responses (RLS) with response_data JSONB]       |
|                                      |                                      |
|                                      v                                      |
|            [Public View: survey_response_stats (PII-stripped)]              |
+-----------------------------------------------------------------------------+
