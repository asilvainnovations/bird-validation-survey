# BIRD Validation Survey — Architecture Documentation
## Dual HTML / SPA Architecture

### Current State

The repository contains **two co-existing delivery mechanisms:**

| Layer | Technology | Purpose | Files |
|-------|-----------|---------|-------|
| **Static HTML** | Vanilla HTML + Tailwind CDN | Landing pages, policy docs, orientation | `public/*.html` |
| **React SPA** | Vite + React + TypeScript | Interactive 16-section survey wizard | `src/` → `dist/` |

### Why This Exists

1. **SEO & Speed**: Static HTML pages (orientation, privacy policy, dashboard) load instantly and are indexable by search engines.
2. **Interactivity**: The survey wizard requires React state management, routing, and real-time scoring — impossible in static HTML.
3. **Progressive Enhancement**: Users can browse static content without JavaScript; the SPA loads only when they start the survey.

### Routing Map

```
/                           → SPA (Index.tsx / SurveyWizard)
/validation-survey          → SPA (same as /)
/survey-orientation.html    → Static HTML (public/)
/survey-dashboard.html      → Static HTML (public/)
/privacy-policy.html        → Static HTML (public/)
/resources.html            → Static HTML (public/)
```

### Build Output

```
dist/
├── index.html              ← SPA entry (Vite injects scripts)
├── assets/                 ← JS/CSS chunks
│   ├── index-[hash].js
│   ├── vendor-[hash].js
│   └── index-[hash].css
└── [copied from public/]
    ├── survey-orientation.html
    ├── survey-dashboard.html
    ├── privacy-policy.html
    └── resources.html
```

### Migration Path (Future)

If you want to eliminate the dual architecture:

**Option A: Full SPA (Recommended for survey-heavy apps)**
- Convert all `public/*.html` pages to React routes
- Use `react-helmet-async` for SEO meta tags
- Implement SSR with Vite SSR or migrate to Next.js

**Option B: Static Site Generation (Recommended for content-heavy apps)**
- Migrate from Vite to Next.js or Astro
- Use `getStaticProps` / `getServerSideProps` for dynamic content
- Keep the survey as an embedded React island

**Option C: Keep Hybrid (Current — lowest risk)**
- Maintain static HTML for SEO pages
- Keep SPA for the survey wizard
- Use shared CSS variables for consistent branding

### Environment Variables

| Variable | Required | Description | Set In |
|----------|----------|-------------|--------|
| `VITE_SUPABASE_URL` | ✅ | Supabase project URL | Vercel/Netlify env |
| `VITE_SUPABASE_ANON_KEY` | ✅ | Supabase anon/public key | Vercel/Netlify env |
| `VITE_SENTRY_DSN` | ❌ | Sentry error tracking DSN | Vercel/Netlify env |

### Import Standardization

All new code MUST use path aliases:

```typescript
// ✅ CORRECT
import { Button } from "@components/ui/button";
import { useAuth } from "@hooks/useAuth";
import { BIRD_IMAGES } from "@lib/bird-urls";

// ❌ INCORRECT — do not use deep relative paths
import { Button } from "../../../components/ui/button";
import { useAuth } from "../../hooks/useAuth";
```

Path aliases are defined in `vite.config.ts` and `tsconfig.json`.
