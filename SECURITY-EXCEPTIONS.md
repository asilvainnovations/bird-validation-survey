# Accepted `npm audit` findings

## GHSA-qwww-vcr4-c8h2 — React Router: RSC Mode CSRF Bypass

- **Affected range:** `react-router` >= 7.12.0, < 8.3.0 (pulled in transitively via `react-router-dom@^7.14.0`)
- **Fixed in:** 8.3.0 — but only under the `react-router` package. `react-router-dom` was
  discontinued at v8 (its `latest` dist-tag is frozen at `7.18.2`), so `npm audit fix --force`
  can only "fix" this by downgrading to `react-router-dom@7.11.0`, which is not a real
  remediation — it just steps back below the vulnerable range.
- **Why this app is not exploitable:** the advisory only affects apps using React Router's
  unstable RSC APIs / Framework Mode / server actions. This app is a client-only Vite SPA
  using exclusively Declarative Mode: `BrowserRouter`, `Routes`, `Route`, `Navigate`,
  `useNavigate`, `useLocation` (see `src/main.tsx`, `src/App.tsx`, `src/components/AppLayout.tsx`,
  `src/components/auth/RequireAuth.tsx`, `src/pages/NotFound.tsx`). No `createBrowserRouter`,
  `RouterProvider`, loaders, actions, or RSC APIs are used anywhere in `src/`.
- **Real remediation path:** migrate from `react-router-dom` to the `react-router` package
  (imports change: `BrowserRouter` → `react-router/dom`, everything else → `react-router`),
  which requires React >=19.2.7 (currently 18.3.1) and Vite >=7 (currently 6.2.0) as peer
  minimums. Tracked as follow-up work — not done opportunistically via an audit-fix flag,
  since it cascades into a React 18→19 and Vite 6→7 upgrade across the whole app.
- **Decision:** accepted for now. Re-evaluate when React 19 / Vite 7 migration is planned.
- **Reviewed:** 2026-07-30
- **Re-confirmed:** 2026-08-01 — this file was found deleted (lost in an external bulk
  upload that overwrote several other files the same way — see project history) and is
  restored here unchanged. `ci.yml`'s audit step now explicitly allowlists only this one
  advisory ID rather than disabling the audit gate broadly, so any *new* high/critical
  finding still blocks a PR — only this specific, reviewed exception passes silently.
