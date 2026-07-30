# BIRD 2026–2035 Validation Survey

<div align="center">

**Official 16-Section Stakeholder Validation Instrument for the Bangsamoro Investment Roadmap Development (BIRD) 2026–2035**

[![React 18](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
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

The survey validates the Bangsamoro Economic and Investment Ecosystem (BEIE) Framework with stakeholders across government, private sector, academe, civil society, and development partners: SWOT factor ratings (Impact × Likelihood), systems-archetype/causal-loop validation, an IEDS strategy matrix, KPI and Balanced Scorecard alignment, and budget/priority-action feedback. Responses feed a live, PII-stripped analytics dashboard and the wider investment-planning pipeline on the main platform.

For the full question-by-question walkthrough (respondent and administrator facing), see **[SURVEY_GUIDE.md](SURVEY_GUIDE.md)**.

### The 16 Sections

| Step | Section | Focus |
|------|---------|-------|
| 0 | Welcome & Orientation | Readiness, systems-thinking intro |
| 1 | Privacy & Consent | DPA 2012 consent (the one *required* section) |
| 2 | Respondent Profile | Stakeholder category, province, expertise |
| 3 | BEIE & Systems Thinking | Framework legitimacy, causal-loop validation |
| 4 | Cluster 1: Foundations | Agri-fishery, energy, forestry, land tenure |
| 5 | Cluster 2: Transformers | Halal industry, value-chain upgrading |
| 6 | Cluster 3: Enablers | Infrastructure, connectivity, human capital |
| 7 | Cluster 4: Connectors | BIMP-EAGA, trade corridors, logistics |
| 8 | Cluster 5: Financiers | Islamic finance, capital access |
| 9 | Operating Systems | Moral Governance, regulatory coordination |
| 10 | IEDS & 3-Phase Plan | 7-criteria strategic-option scoring |
| 11 | Metrics & KPIs | KPI importance ratings, "Drifting Goals" archetype |
| 12 | Balanced Scorecard | Four-perspective alignment |
| 13 | Priority Actions & Budget | Budget realism, risk concerns, phasing |
| 14 | Resources & Engagement | Participation preferences |
| 15 | Review & Submission | Accuracy confirmation, final consent |

Every SWOT factor and every systems-archetype/CLD question asked across these sections is defined exactly once, in `src/lib/swot-content.ts` — that file is the canonical source `survey-schema.ts` (validation), `SurveyWizard.tsx` (state), and `supabase/functions/survey-analytics` (aggregation) all read from, specifically to prevent the same factor being hand-typed with different field names in multiple places.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18.3 · TypeScript 5.6 · Vite 6 · Tailwind CSS 3.4 |
| Routing | React Router 7 (Declarative Mode — `BrowserRouter`/`Routes`/`Route` only; see [Security & Privacy](#security--privacy) re: the react-router advisory) |
| UI primitives | Radix UI / shadcn-style components (`src/components/ui`), `lucide-react` icons, `framer-motion` |
| Data & forms | `@tanstack/react-query`, `react-hook-form`, `zod` (all 260+ survey fields optional except consent) |
| Charts | `recharts` (live analytics dashboard) |
| Backend | Supabase (Auth + Postgres + 5 Edge Functions) |
| Monitoring | Sentry (optional, via `VITE_SENTRY_DSN` — session replay is masked by default, see below) |
| Toasts | `sonner` |
| Deployment | Static build (`dist/`) — `vercel.json` is provided for Vercel; the build also supports Netlify/bolt.host equivalents since it's a plain Vite SPA output |

---

## Project Structure

```
bird-validation-survey/
├── index.html                        # App entry (%VITE_CANONICAL_DOMAIN% substituted at build time)
├── package.json
├── vite.config.ts                    # Path aliases (@, @components, @lib, @pages, @contexts, …)
├── vercel.json                       # Static deploy config + clean-URL rewrites
├── tailwind.config.ts
├── scripts/
│   ├── generate-manifest.mjs         # Renders public/manifest.json from manifest.template.json (runs pre-dev/pre-build)
│   └── check-edge-functions.mjs      # CI check: EDGE_FUNCTIONS registry ↔ supabase/functions/ on disk
├── public/
│   ├── manifest.json / manifest.template.json   # PWA manifest
│   ├── service-worker.js             # Cache-first for JS/CSS bundles, network-first fallback elsewhere
│   ├── privacy-policy.html           # DPA 2012 privacy notice (static)
│   ├── cookie-policy.html            # Static
│   ├── resources.html                # Documents & references hub (static)
│   └── user-manual.html              # Static
├── src/
│   ├── main.tsx                      # Entry: Sentry init (optional), SW registration, chunk-load recovery
│   ├── App.tsx                       # Routes + ErrorBoundary + providers
│   ├── contexts/
│   │   ├── AppContext.tsx            # Sidebar UI state
│   │   └── AuthContext.tsx           # Single shared Supabase auth subscription
│   ├── hooks/
│   │   └── useAuth.ts                # Supabase auth (optional sign-in; survey does not require it)
│   ├── pages/
│   │   ├── Index.tsx                 # "/" — renders SurveyWizard inside the shared AppLayout
│   │   └── NotFound.tsx
│   ├── components/
│   │   ├── AppLayout.tsx             # Shared header/nav/footer for every route
│   │   ├── theme-provider.tsx
│   │   ├── ui/                       # Radix/shadcn-style primitives (button, card, sheet, slider, …)
│   │   ├── auth/                     # AuthModal, UserProfileModal, RequireAuth (optional sign-in)
│   │   ├── branding/                 # StratLogo, PlatformBadge
│   │   ├── dashboard/                # SurveyDashboard (live public analytics view)
│   │   └── strategic/
│   │       ├── SurveyWizard.tsx      # 16-step wizard orchestrator (state + submission mapping)
│   │       ├── Section0…15_*.tsx     # One component per survey section
│   │       ├── ContextPanel.tsx      # Reference-material side panel
│   │       └── FloatingAIAssistant.tsx  # Calls the ai-strategy-assistant Edge Function
│   └── lib/
│       ├── api.ts                    # submitSurvey() — timeout-bounded POST to survey-submit
│       ├── survey-schema.ts          # Zod schema, generated from swot-content.ts (single source of truth)
│       ├── swot-content.ts           # Canonical SWOT items + archetype/CLD questions, per section
│       ├── bird-urls.ts              # BIRD_IMAGES / BIRD_SITES registries (image + external-link URLs)
│       ├── formulas.ts               # BIRD scoring: calculateStrengthRI / WeaknessRisk / OpportunityRI / ThreatVI
│       ├── supabase.ts               # Client + EDGE_FUNCTIONS endpoint registry
│       ├── primitives/               # Shared section UI: LikertScale, SWOTScalePair, ArchetypeCard,
│       │                             #   ImageWithFallback, SectionProgress, QuizCard
│       └── utils.ts
└── supabase/
    ├── functions/
    │   ├── survey-submit/            # Validates consent server-side, rate-limits by hashed IP, inserts
    │   ├── survey-analytics/         # Aggregates BIRD scores + archetype consensus for the dashboard
    │   ├── email-notifications/      # Respondent confirmation / notification emails
    │   ├── strategic-planner-sync/   # Syncs into the main BIRD platform's planner
    │   └── ai-strategy-assistant/    # Domain-expert AI chat, backs FloatingAIAssistant
    └── migrations/
        └── 20260723000000_survey_responses.sql   # Table, RLS policies, PII-stripped public view
```

**Note on `src/pages/api/`:** this directory (`route.js`, `server.js`, `cron/`) contains Next.js-style server-route scaffolding left over from an earlier template. Vite does not execute anything in `src/` as a server route — it's bundled like any other source file — so this code is not live and is a candidate for removal in a future cleanup pass; it's called out here so it isn't mistaken for part of the actual request-handling path (that's entirely the Supabase Edge Functions above).

---

## Data Flow

```
SurveyWizard (React)
      │  Partial<SurveySchemaType> — flat, one key per question across all 16 sections
      ▼
src/lib/api.ts  ── submitSurvey() ── 20s timeout, consent_final derived (never client-trusted)
      │
      ▼ POST
survey-submit Edge Function
      │  • Re-validates q1_consent_participate === true server-side (never trusts client consent_final)
      │  • Rate-limits by a salted hash of the submitter's IP (never the raw IP)
      │  • Inserts using the Supabase service role key (bypasses RLS by design for this write path)
      ▼
survey_responses table  (RLS enabled; consent_final NOT NULL, defaults false)
      │
      ▼ survey-analytics Edge Function aggregates BIRD scores + archetype consensus
      │
      ▼ separately, a PII-stripped view for direct anon reads:
survey_response_stats  (only rows where consent_final AND q01_consent_anonymize are both true;
                         no free-text fields — see Security & Privacy below)
      │
      ▼
SurveyDashboard (live analytics, in-app route: /dashboard)
```

- **Consent to participate is the only required field.** Every other question across all 16 sections is optional (pilot-mode `zod` schema).
- **PII** (name, email, organization, position) is stored only when the respondent explicitly provides it.
- Two separate consent questions matter here and are not interchangeable: *consent to participate* (`q1_consent_participate`, gates whether a submission is accepted at all) and *consent to anonymized aggregate use* (`q1_consent_anonymize`, gates whether that submission's data appears in the public dashboard view). A respondent can consent to one without the other.
- Sign-in is **optional** — the survey works fully anonymously; an authenticated session (via `AuthContext`/`useAuth`) is only used to prefill a returning respondent's profile and to power the account-linked features in `AppLayout`.

---

## Getting Started

```bash
# 1. Install
npm install

# 2. Run dev server (http://localhost:8080) — also regenerates public/manifest.json
npm run dev

# 3. Production build
npm run build

# 4. Checks
npm run typecheck   # tsc --noEmit -p tsconfig.app.json
npm run lint        # eslint . (CI currently allows up to 15 warnings; see ci.yml)
npm run preview     # serve the production build locally
```

### Environment Variables

Unlike some scaffold templates, **these are not optional with silent fallbacks** — `src/lib/supabase.ts` reads them with no `||` default, so an incomplete `.env` produces a build that runs but whose Supabase calls fail at runtime (this was verified directly, not assumed).

| Variable | Required? | Purpose |
|----------|-----------|---------|
| `VITE_SUPABASE_URL` | Yes | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Supabase anon (public, RLS-gated) key — safe to expose client-side |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | No | Present in some environments; not currently read by any code in `src/` |
| `VITE_CANONICAL_DOMAIN` | No | Substituted into `index.html`'s canonical/OG tags and `manifest.json`'s `related_applications`. Falls back to `https://bird-validation-survey.bolt.host` if unset — leaving it unset does **not** break the build, but does ship an inaccurate canonical URL, so set it for any real deployment. |
| `VITE_SENTRY_DSN` | No | Enables Sentry error monitoring + session replay (masked by default) when set |

### Backend Setup (one time)

```bash
# Apply the database migration
supabase db push

# Deploy all five Edge Functions
supabase functions deploy survey-submit
supabase functions deploy survey-analytics
supabase functions deploy email-notifications
supabase functions deploy strategic-planner-sync
supabase functions deploy ai-strategy-assistant
```

Required Supabase secrets (`supabase secrets set …`): `SUPABASE_SERVICE_ROLE_KEY` (used by every function), `IP_HASH_SALT` (for `survey-submit`'s rate limiter — falls back to a hardcoded value if unset, so set a real one in production), `OPENAI_API_KEY` (for `ai-strategy-assistant`), and whatever `email-notifications` uses for its email provider.

---

## Deployment

`vercel.json` is preconfigured for Vercel (`npm install` → `npm run build` → serves `dist/`, with SPA rewrites so client-side routes resolve correctly on refresh). The build output is a standard static Vite SPA, so it deploys equally well to Netlify or any static host — `VITE_CANONICAL_DOMAIN` is the one setting worth double-checking per environment (see above).

---

## Security & Privacy

This repository has been through a dedicated security/privacy audit (2026-07-30) covering consent-validation bypasses, CORS, rate limiting, and PII exposure. Highlights, all verified by direct code inspection rather than assumed:

- **Consent is re-validated server-side**, not trusted from the client — `survey-submit` derives `consent_final` solely from the actual `q1_consent_participate` answer.
- **Rate limiting** on submissions, by a salted (non-reversible) hash of the submitter's IP — never the raw IP.
- **The public analytics view never exposes free-text fields** (e.g. job title) that could be re-identifying in a small stakeholder pool, and is additionally gated on the respondent's specific consent to anonymized aggregate use.
- **Sentry session replay is masked by default** (`maskAllText`/`blockAllMedia`) — this survey collects names, emails, and free-text answers, and unmasked replay would have shipped that PII to a third party.
- A known `npm audit` finding (React Router's RSC-mode CSRF advisory) is deliberately **not** force-fixed — see [`SECURITY-EXCEPTIONS.md`](SECURITY-EXCEPTIONS.md) for why it doesn't apply to this app's actual usage and what the real remediation path looks like.
- CI (`.github/workflows/ci.yml`) runs `npm audit --audit-level=high`, typecheck, lint, an Edge-Function-registry consistency check, and builds all 5 Edge Functions.

Two things are flagged as **known, open follow-up work** rather than silently left undocumented: the `ai-strategy-assistant` Edge Function's CORS is now origin-restricted, but a non-browser caller (curl, a bot) can still reach it — closing that gap needs a product decision (require login? per-IP throttle?) beyond a security-audit pass. And `Section5_Transformers.tsx`/`Section6_Enablers.tsx` still use pre-refactor internal field names, correctly translated at submission time in `SurveyWizard.tsx` but due for the same primitives-based rewrite already applied elsewhere.

---

## Related

- **Main platform**: [BIRD-2026-2035](https://github.com/asilvainnovations/BIRD-2026-2035) — Strat Planner Pro engine, MEL Dashboard, AI strategist
- **Survey guide**: [SURVEY_GUIDE.md](SURVEY_GUIDE.md) — question-by-question walkthrough for respondents and administrators
- **Architecture notes**: [ARCHITECTURE.md](ARCHITECTURE.md) *(predates the current SPA-redirect setup for legacy `.html` paths — the routing table there is out of date; this README's Project Structure section reflects the current state)*
- **Changelog**: [CHANGELOG.md](CHANGELOG.md)
- **Security exceptions**: [SECURITY-EXCEPTIONS.md](SECURITY-EXCEPTIONS.md)

## License

MIT © BOI-MTIT, BARMM · Developed by [ASilva Innovations](https://asilvainnovations.com)
