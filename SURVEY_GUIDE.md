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

The roadmap is structured around the **BEIE Framework** (Bangsamoro Economic and Investment Ecosystem), organizing investment clusters into Foundations, Transformers, Enablers, Connectors, and Financiers, all anchored by Moral Governance.

### Why Your Feedback Matters
Your participation ensures that the BIRD 2026-2035 reflects ground-level realities, diverse provincial perspectives, and technical rigor. Your feedback directly shapes policy priorities, resource allocation, and implementation sequencing over the next decade.

### Anonymity and Data Protection
The survey is fully compliant with the **Data Privacy Act of 2012 (RA 10173)**. 
* **Voluntary Participation:** All questions are optional unless explicitly marked.
* **Anonymity Option:** You may complete the survey without providing PII.
* **Secure Storage:** Data is transmitted via HTTPS and stored in encrypted Supabase PostgreSQL databases.
* **Privacy Policy:** `https://asilvainnovations.github.io/BIRD-2026-2035/public/privacy-policy.html`

---

## 2. Before You Start

### System Requirements
* **Browser:** Chrome 90+, Firefox 88+, Edge 90+, Safari 14+
* **Screen:** 1024x768 minimum (1366x768+ recommended)
* **Connection:** Stable broadband (3 Mbps+ recommended for multimedia)

### Estimated Completion Time
* **Full survey:** 45–60 minutes
* **Partial survey:** 20–30 minutes
* **Save & Resume:** Supported automatically via browser `localStorage`.

---

## 3. Survey Navigation

### How the Wizard Works
The survey uses a 16-step wizard interface (Steps 0–15). You progress sequentially but can navigate freely.

### Progress Indicator & Step Jumper
A sticky progress bar at the top shows your completion percentage. The **Step Jumper** allows you to click any step label to navigate directly to it without losing your saved progress.

### Offline Resilience
If your internet connection drops, your responses are automatically queued in your browser's `localStorage`. When connectivity is restored, the survey will attempt to sync your data to the secure backend.

---

## 4. Current 16-Step Survey Structure

| Step | Title | Focus Area | Interactive Elements |
| :--- | :--- | :--- | :--- |
| **0** | Welcome & Orientation | Readiness, Systems Thinking intro | Video, CLD/Archetype images, Quick-start scales |
| **1** | Privacy & Consent | DPA 2012 consent | Checkboxes (Required) |
| **2** | Your Profile | Demographics, Province, Expertise | Dropdowns, Text inputs |
| **3** | BEIE & Systems Thinking | Framework legitimacy, 3 Strengths | Video, SWOT Scales (Impact × Likelihood) |
| **4** | Cluster 1: Foundations | Agri-fishery, Energy, Forestry | SWOT Scales, Archetype Validation (Tragedy/Limits) |
| **5** | Cluster 2: Transformers | Halal industry, Value chains | SWOT Scales, Archetype Validation (Fixes/Success) |
| **6** | Cluster 3: Enablers | Infrastructure, Human capital | SWOT Scales, Archetype Validation (Shifting/Growth) |
| **7** | Cluster 4: Connectors | BIMP-EAGA, Trade, Logistics | SWOT Scales, Archetype Validation (Escalation) |
| **8** | Cluster 5: Financiers | Islamic finance, Capital access | SWOT Scales, Archetype Validation (Big Man) |
| **9** | Operating Systems | Moral Governance, Regulatory | SWOT Scales, Archetype Validation (Loops) |
| **10** | IEDS & 3-Phase Plan | Sequencing, Strategic Options | IEDS Matrix (7-criteria scoring) |
| **11** | Metrics Architecture | KPI importance ratings | 1-5 Likert scales |
| **12** | Balanced Scorecard | 4-perspective alignment | Pathway selection, Vision clarity |
| **13** | Priority Actions & Budget | Budget realism, Phasing | Risk concern scales, Phase priority |
| **14** | Resources & Engagements | Participation preferences | Multi-select, Open text |
| **15** | Review & Submit | Accuracy confirmation | Final consent, Submission |

---

## 5. Step-by-Step Guide

### Step 0: Welcome & Orientation
**Purpose:** Introduce the survey and foundational systems thinking concepts.
**What to do:** Watch the introductory video on Systems Thinking. Review the Causal Loop Diagram (CLD) and Systems Archetypes images. Answer 3 quick-start questions about your readiness and understanding.

### Step 1: Privacy & Consent
**Purpose:** Legal compliance.
**What to do:** Read the privacy notice. Check the consent boxes. *Note: This is the only strictly required step to proceed.*

### Step 2: Your Profile
**Purpose:** Segmentation for analysis.
**What to do:** Select your province, organization type, and sector. Name and email are optional.

### Steps 3–9: Cluster Assessments & Systems Archetypes
**Purpose:** Validate SWOT factors and systems dynamics.
**What to do:** For each cluster, you will rate specific factors using **Impact (1-5)** and **Likelihood (1-5)** scales. You will also validate Systems Archetypes (e.g., "Tragedy of the Commons") by selecting how accurately they describe BARMM's reality.

### Steps 10–13: Strategy, Metrics & Budget
**Purpose:** Validate the IEDS strategy, KPIs, and budget phases.
**What to do:** Rate the clarity of the 3-phase plan, select your preferred strategic pathway, and assess budget realism.

### Steps 14–15: Resources & Submission
**Purpose:** Finalize engagement and submit.
**What to do:** Indicate your preferred engagement format, review your summary, and click **Submit Survey**.

---

## 6. Integration Architecture

This section documents the technical architecture for developers and administrators.

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
|                     [PostgreSQL: survey_responses (RLS)]                    |
+-----------------------------------------------------------------------------+
```

### 6.1 SurveyWizard.tsx & State Management
The wizard uses React `useState` hooks for each section. State is typed strictly using `Pick<SurveySchemaType, ...>` to ensure zero schema drift.

### 6.2 formulas.ts (Real-Time Scoring)
The BIRD Score Panel uses the following formulas from `src/lib/formulas.ts`:

| Formula | Purpose | Calculation |
| :--- | :--- | :--- |
| `calculateStrengthRI` | Strength Resilience | `(Impact × Likelihood) / 5` |
| `calculateOpportunityRI` | Opportunity Resilience | `√(Impact × Likelihood)` |
| `calculateWeaknessRisk` | Weakness Risk | `Impact × Likelihood` |
| `calculateThreatVI` | Threat Vulnerability | `(Impact² × Likelihood) / 25` |

### 6.3 api.ts & Edge Function Submission
The `submitSurvey()` function in `src/lib/api.ts` handles persistence via the **`survey-submit` Supabase Edge Function**.

```typescript
// Simplified flow of src/lib/api.ts
export async function submitSurvey(data: SurveySchemaType) {
  try {
    // 1. Invoke Edge Function (handles RLS and payload wrapping)
    const { data: responseData, error } = await supabase.functions.invoke("survey-submit", {
      body: data, 
    });
    if (error) throw error;
    
    // 2. Clear offline queue on success
    localStorage.removeItem("bird_survey_draft");
    return { success: true, responseId: responseData?.id };
  } catch (err) {
    // 3. Fallback to localStorage queue for offline resilience
    saveToLocalStorageQueue(data);
    return { success: false, fallback: "localStorage" };
  }
}
```

---

## 7. Question Types Explained

### SWOT Factor Scales (Impact × Likelihood)
Used in Steps 3–9. You provide two ratings (1-5) for each factor. The combined score (1-25) determines strategic priority.

### Systems Archetype Validation
Used in Steps 4–9. You select how accurately an archetype describes BARMM:
* **Very accurately** (+2)
* **Somewhat accurately** (+1)
* **Needs revision** (-1)
* **Not accurate** (-2)

### Rating Scales & Open Text
Standard 1-5 Likert scales for KPI/BSC validation. Open text fields are used for qualitative feedback and archetype follow-ups.

---

## 8. BIRD Score Interpretation

The **BIRD Live Score Panel** updates in real-time as you rate SWOT factors.

### Score Range Interpretations
| Score Range | Interpretation |
| :--- | :--- |
| **4.0 - 5.0** | **Critical Priority:** Immediate strategic attention required. |
| **3.0 - 3.9** | **High Priority:** Significant strategic relevance. |
| **2.0 - 2.9** | **Moderate:** Monitor and plan intervention. |
| **1.0 - 1.9** | **Low/Negligible:** Routine monitoring. |

### Strategic Balance Index (SBI)
The panel synthesizes all four SWOT dimensions into a single 0-100 score:
`SBI = ((Strength RI + Opportunity RI) / 2) - ((Weakness Risk + Threat VI) / 2) + 50`
* **> 60:** Favorable strategic position.
* **40 - 60:** Neutral/Balanced position.
* **< 40:** Challenging position requiring urgent intervention.

---

## 9. For Administrators

### Deployment & Monitoring
1. **Deploy:** `npm run build` → Deploy `dist/` to Vercel.
2. **Monitor:** Check the `survey_response_stats` Supabase view for real-time completion rates.
3. **Iteration Triggers:** If completion rate drops below 60%, or if an archetype scores <-0.5 net validation, consider revising the survey instrument.

### Data Export
Access the `survey_responses` table via Supabase Dashboard. Use the `survey_response_stats` view for PII-stripped analytics. Export to CSV/JSON for external MEL dashboard integration.

---

## 10. Troubleshooting

| Issue | Solution |
| :--- | :--- |
| **Survey won't load** | Clear browser cache, disable ad-blockers, ensure JS is enabled. |
| **Images not loading** | Check internet connection. Images are lazy-loaded from Supabase Storage. |
| **Lost progress** | Progress is saved in `localStorage`. Do not use Incognito mode or clear site data. |
| **Submission fails** | The survey will automatically queue your response in `localStorage` and retry when online. |

---

## 11. Frequently Asked Questions (FAQ)

**Q: Can I skip questions?**
A: Yes. In pilot mode, all fields are optional except the final consent in Step 15.

**Q: What happens if I close my browser?**
A: Your progress is saved locally. Reopen the survey link to resume exactly where you left off.

**Q: Do I need an account?**
A: No. The survey is anonymous-friendly and requires no login.

**Q: How are my responses used?**
A: They are aggregated, anonymized, and fed into the MEL Dashboard to shape the final BIRD 2026-2035 document.

---

## 12. Appendix

### Glossary of BIRD Terms
* **BEIE:** Bangsamoro Economic and Investment Ecosystem.
* **BIMP-EAGA:** Brunei-Indonesia-Malaysia-Philippines East ASEAN Growth Area.
* **CLD:** Causal Loop Diagram.
* **IEDS:** Integrated Ecosystem Development Strategy.
* **MEL:** Monitoring, Evaluation, and Learning.

### Contact Information
* **Technical Support:** `bird-team@asilvainnovations.com`
* **BOI-MTIT BARMM:** Cotabato City, Philippines
* **Survey Portal:** `https://bird-survey.asilvainnovations.com`

---
*Document Version: 2.1 | Updated: 2026-07-23 | Prepared for BOI-MTIT, BARMM*
