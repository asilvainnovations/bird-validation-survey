# BIRD 2026–2035 Validation Survey — User Manual

> **Instrument:** 16-Section Stakeholder Validation Survey · **Publisher:** BOI-MTIT, BARMM · **Developer:** ASilva Innovations

---

## Table of Contents

1. [For Respondents: Taking the Survey](#1-for-respondents-taking-the-survey)
2. [Section-by-Section Guide](#2-section-by-section-guide)
3. [Privacy & Your Data (DPA 2012)](#3-privacy--your-data-dpa-2012)
4. [Saving, Offline Mode & Resuming](#4-saving-offline-mode--resuming)
5. [Optional Sign-In](#5-optional-sign-in)
6. [For Administrators](#6-for-administrators)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. For Respondents: Taking the Survey

The survey validates the Bangsamoro Investment Roadmap Development (BIRD) 2026–2035 with the people it serves. It takes **20–35 minutes** and can be completed in multiple sessions.

**Start here:** open the app (or `validation-survey.html` for the lightweight static version). If you are new to BIRD, read the **Orientation page** (`survey-orientation.html`) first — it explains the BEIE framework and what each cluster covers.

**Ground rules (pilot mode):**

- The **only required field is your consent** (Section 1 and the final confirmation in Section 15). Every other question is optional.
- You may **navigate freely** — use the step bar to jump back and forth; nothing is lost.
- Your answers are **saved on your device as you type** (browser localStorage), so an accidental refresh never loses work.

## 2. Section-by-Section Guide

| Step | What you'll be asked | Tips |
|------|----------------------|------|
| **0 · Welcome** | Whether you feel ready to begin and how well you understand the ecosystem | Rate honestly — this calibrates the results |
| **1 · Privacy & Consent** | Consent to participate and to data processing under DPA 2012 | Required. Anonymized by default; contact details are strictly opt-in |
| **2 · Your Profile** | Stakeholder category (government, private sector, academe, civil society, development partner), province, areas of expertise | Your category tailors later sections |
| **3 · Systems Thinking** | Legitimacy of the BEIE framework; systems archetypes you observe | Use the embedded diagrams for reference |
| **4–8 · The Five Clusters** | Impact × likelihood ratings for the strategic factors of each cluster: **Foundations**, **Transformers**, **Enablers**, **Connectors**, **Financiers** | Rate every factor you have an opinion on; skip what you can't judge |
| **9 · Operating Systems** | Governance and delivery mechanisms | — |
| **10 · IEDS & 3-Phase Plan** | Which phase sequence you prioritize | Consider readiness vs. ambition |
| **11 · Metrics & KPIs** | Importance rating of proposed KPIs | 1 = not important, 5 = critical |
| **12 · Balanced Scorecard** | Alignment across the four BSC perspectives | — |
| **13 · Priority Actions & Budget** | Rank the 10 priority actions; judge budget realism | The total envelope is shown for context |
| **14 · Resources & Engagement** | How you'd like to stay involved | Optional follow-up channel |
| **15 · Review & Submit** | Confirm accuracy, final consent, submit | You'll receive an on-screen confirmation |

## 3. Privacy & Your Data (DPA 2012)

- Responses are **anonymized by default**. Name, email, and organization are stored **only if you type them yourself** (opt-in).
- Data is stored in a secured Supabase project. The **public live dashboard reads a PII-stripped view** — names and emails are never exposed.
- Full details: [Privacy Policy](public/privacy-policy.html) · [Cookie Policy](public/cookie-policy.html).
- Questions or data requests: **boi@bangsamoro.gov.ph**.

## 4. Saving, Offline Mode & Resuming

- **Auto-save:** every keystroke is mirrored to your browser's localStorage.
- **Offline submission:** if you submit while offline, your response is queued on the device and **sent automatically the next time you open the survey online**.
- **Resume:** reopen the survey on the same browser/device and continue where you left off.
- **Static variant:** `validation-survey.html` works fully client-side with the same offline queue and background sync.

## 5. Optional Sign-In

You can answer the entire survey **without an account**. Signing in (top-right) is optional and only used to link your submission to your profile and send a confirmation email. Accounts are managed through the secure Supabase Auth service (password or magic link).

## 6. For Administrators

| Task | Where |
|------|-------|
| Live results & charts | `survey-dashboard.html` (reads the `survey_response_stats` view) |
| Raw submissions | `survey_responses` table (service role only; RLS blocks public reads) |
| Apply database changes | `supabase db push` (migrations in `supabase/migrations/`) |
| Deploy submission endpoint | `supabase functions deploy survey-submit` |
| Notification emails | `supabase functions deploy email-notifications` (requires `RESEND_API_KEY`) |

**Deployment:** the repo deploys to Vercel as a static Vite build (`npm install` → `npm run build` → `dist/`). No server is required; the submission endpoint is a Supabase Edge Function.

## 7. Troubleshooting

| Problem | Fix |
|---------|-----|
| Survey won't load | Hard-refresh (Ctrl/Cmd + Shift + R); check connection |
| "Saved on device" after submitting | You were offline — keep the browser tab data intact; it will auto-sync when online |
| Lost progress | Progress lives in localStorage of the same browser — use the same device/browser; clearing site data erases it |
| Images not loading | They are served from the Supabase CDN — check connectivity; content remains fully usable without them |
| Sign-in email not arriving | Check spam; the magic link expires in 1 hour |

---

*© BOI-MTIT, BARMM · BIRD 2026–2035 · Developed by ASilva Innovations*
