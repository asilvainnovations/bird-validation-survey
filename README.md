# BIRD 2026–2035 Validation Survey

<div align="center">

**Official 16-Section Stakeholder Validation Instrument for the Bangsamoro Investment Roadmap Development (BIRD) 2026–2035**

[![React 18](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-022c22)](LICENSE)

<p align="center">
  <img src="https://img.shields.io/badge/Sections-16-C9A84C" alt="16 Sections">
  <img src="https://img.shields.io/badge/Fields-260%2B-1B4D3E" alt="260+ Fields">
  <img src="https://img.shields.io/badge/Privacy-DPA%202012-065f46" alt="DPA 2012">
</p>

</div>

---

## Overview

This repository contains the **standalone BIRD Validation Survey** — separated from the main [BIRD 2026–2035 platform](https://github.com/asilvainnovations/BIRD-2026-2035) so it can be deployed, iterated, and analyzed independently.

The survey validates the Bangsamoro Economic and Investment Ecosystem (BEIE) Framework with stakeholders across government, private sector, academe, civil society, and development partners. Responses feed the MEL Dashboard and the investment planning pipeline on the main platform.

### The 16 Sections

| Step | Section | Focus |
|------|---------|-------|
| 0 | Welcome & Orientation | Readiness, ecosystem understanding |
| 1 | Privacy & Consent | DPA 2012 consent (only required field) |
| 2 | Respondent Profile | Stakeholder category, province, expertise |
| 3 | BEIE & Systems Thinking | Framework legitimacy, archetypes |
| 4 | Cluster 1: Foundations | Agri-fishery, halal industry priorities |
| 5 | Cluster 2: Transformers | Value-chain upgrading, HEDS |
| 6 | Cluster 3: Enablers | Infrastructure, connectivity, education |
| 7 | Cluster 4: Connectors | BIMP-EAGA, trade, logistics |
| 8 | Cluster 5: Financiers | Islamic finance, inclusion |
| 9 | Operating Systems | Governance & delivery mechanisms |
| 10 | IEDS & 3-Phase Plan | Sequencing priorities |
| 11 | Metrics & KPIs | KPI importance ratings |
| 12 | Balanced Scorecard | Four-perspective alignment |
| 13 | Priority Actions & Budget | 10 actions, ₱ budget realism |
| 14 | Resources & Engagement | Participation preferences |
| 15 | Review & Submission | Accuracy confirmation, final consent |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 · TypeScript · Vite 5 · Tailwind CSS 3 |
| Validation | Zod (pilot mode: all fields optional except consent) |
| Backend | Supabase (Auth + Postgres + Edge Functions) |
| Deployment | Vercel (static build, `dist/`) |
| Toasts | sonner |
| Monitoring | Sentry (optional, via `VITE_SENTRY_DSN`) |

---

## Project Structure

```
bird-validation-survey/
├── index.html                        # App entry (survey-branded meta/OG/JSON-LD)
├── package.json
├── vite.config.ts
├── vercel.json                       # Static deploy config + CSP headers
├── tailwind.config.ts
├── public/
│   ├── manifest.json                 # PWA manifest (survey branding)
│   ├── validation-survey.html        # Static standalone survey variant
│   ├── survey-orientation.html       # Respondent briefing page
│   ├── survey-dashboard.html         # Live results dashboard (reads stats view)
│   ├── resources.html                # Documents & references hub
│   ├── privacy-policy.html           # DPA 2012 privacy notice
│   └── cookie-policy.html
├── src/
│   ├── main.tsx                      # Entry (optional Sentry init)
│   ├── App.tsx                       # Routes: / → survey
│   ├── index.css
│   ├── components/
│   │   ├── AppLayout.tsx             # Survey shell (header/wizard/footer)
│   │   ├── theme-provider.tsx
│   │   ├── auth/                     # AuthModal, UserProfileModal (optional sign-in)
│   │   ├── branding/                 # StratLogo, PlatformBadge
│   │   └── strategic/
│   │       ├── SurveyWizard.tsx      # 16-step wizard orchestrator
│   │       └── Section0…15_*.tsx     # One component per survey section
│   ├── contexts/AppContext.tsx
│   ├── hooks/useAuth.ts              # Supabase auth (anonymous-friendly)
│   └── lib/
│       ├── api.ts                    # Submission client (+ offline queue)
│       ├── survey-schema.ts          # Zod schema — 260+ optional fields
│       ├── formulas.ts               # BIRD scoring (RI / Risk / VI)
│       ├── supabase.ts               # Client + edge function endpoints
│       └── utils.ts
└── supabase/
    ├── functions/
    │   ├── survey-submit/            # Stores submissions (service role)
    │   └── email-notifications/      # Welcome/notification emails
    └── migrations/
        └── 20260716000000_survey_responses.sql
```

---

## Data Flow

```
SurveyWizard (React)
      │  Partial<SurveySchemaType> (all 16 sections)
      ▼
src/lib/api.ts ──offline?──► localStorage queue (auto-flush on reconnect)
      │
      ▼ POST (Bearer token optional)
survey-submit Edge Function
      │  validates consent, links auth user when present
      ▼
survey_responses table (RLS)
      │
      ▼ PII-stripped view (survey_response_stats)
survey-dashboard.html (live analytics, anon-safe)
```

- **Consent is the only required field** (pilot mode). All other fields are optional.
- **PII** (name/email) is stored only when explicitly provided (opt-in, DPA 2012).
- The public dashboard reads only the **PII-stripped view** — never the base table.

---

## Getting Started

```bash
# 1. Install
npm install

# 2. Run dev server (http://localhost:8080)
npm run dev

# 3. Production build
npm run build

# 4. Checks
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm run preview     # serve the production build
```

### Environment Variables (optional — fallbacks are baked in)

| Variable | Purpose |
|----------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon (public) key |
| `VITE_SENTRY_DSN` | Enable Sentry monitoring when set |

### Backend Setup (one time)

```bash
# Apply the database migration
supabase db push

# Deploy the edge functions
supabase functions deploy survey-submit
supabase functions deploy email-notifications
```

---

## Deployment (Vercel)

`vercel.json` is preconfigured: `npm install` → `npm run build` → serves `dist/`, with SPA rewrites and a Content-Security-Policy for the static survey page. The `public/*.html` companion pages (orientation, dashboard, policies) deploy alongside the React app automatically.

---

## Related

- **Main platform**: [BIRD-2026-2035](https://github.com/asilvainnovations/BIRD-2026-2035) — Strat Planner Pro engine, MEL Dashboard, AI strategist
- **Survey guide**: [SURVEY_GUIDE.md](SURVEY_GUIDE.md) — question architecture & methodology
- **User manual**: [USER_MANUAL.md](USER_MANUAL.md) — respondent & administrator guide

## License

MIT © BOI-MTIT, BARMM · Developed by [ASilva Innovations](https://asilvainnovations.com)
