# BIRD 2026–2035 Validation Survey — Security & Data-Privacy Audit

**Repo audited:** https://github.com/asilvainnovations/bird-validation-survey.git
**Date:** 2026-07-30
**Verification:** `npm run typecheck` — 0 errors. `npm run build` — succeeds. Full log at bottom.

This package contains every file that was changed, plus `manifest.json` and
`AppContext.tsx` included unchanged (both were checked and found correct —
no fix needed, included for completeness of the requested file set).

---

## Critical severity

### 1. `supabase/functions/survey-submit/index.ts` — consent bypass
The consent check accepted the submission if **either** `q01_consent_participate`
**or** the client-supplied `consent_final` was `true`. `consent_final` is set
unconditionally by the client (`src/lib/api.ts`) and is not trustworthy input —
an attacker could `POST` `{ consent_final: true }` with no real consent answer
and pass validation. **Fixed:** server now derives consent solely from
`q01_consent_participate === true`, never from the client's derived flag.

### 2. `supabase/functions/ai-strategy-assistant/index.ts` — unauthenticated paid-API proxy with wildcard CORS
**Not in the original file list, found during the audit — severe enough to fix anyway.**
`Access-Control-Allow-Origin: '*'` on an endpoint that forwards every request to
OpenAI using this project's own `OPENAI_API_KEY`, with **no rate limiting or
auth check of any kind**. Any website could embed a call to this function and
run up unbounded OpenAI billing on this project's account — a direct financial
cost-abuse vector, not just a CORS-hygiene issue.
**Fixed:** CORS now restricted to the same origin allowlist as the other
functions (and made genuinely per-request, not a stale module-level constant).
**Not fixed — needs a product decision:** CORS only stops *browser*-based abuse;
a non-browser caller (curl, a bot) ignores CORS entirely. Closing that gap needs
either a required login or a real per-IP/per-user rate limit (same pattern now
used in `survey-submit`), which is a scoping decision beyond a security-audit
pass. Flagged prominently in-code so it isn't lost.

### 3. `src/main.tsx` — Sentry session replay recording unmasked PII
Session replay was configured `maskAllText: false, blockAllMedia: false` —
Sentry recorded the **actual on-screen text** of every input, for 5% of all
sessions and 50% of error sessions. This survey collects names, emails,
organizations, and free-text answers throughout 16 sections — unmasked replay
shipped that PII verbatim to a third party (Sentry), contradicting the app's
own DPA 2012 / anonymization claims.
**Fixed:** `maskAllText: true`, `blockAllMedia: true`, `sendDefaultPii: false`,
plus a `beforeSend` scrubber that redacts anything matching an email pattern
from error messages/exception values as a defense-in-depth backstop.

### 4. `supabase/migrations/...survey_responses.sql` — PII in a publicly-readable view
`demo_position` (free-text job title) was exposed in `survey_response_stats`,
which is `GRANT SELECT`'d to `anon` — i.e. readable by anyone on the internet,
unauthenticated. In a stakeholder survey with a small respondent pool per
province/category, a specific job title combined with province + category is
realistically re-identifying even with no name/email present.
**Fixed:** removed `demo_position` from the view entirely (no safe
generalization exists for free text without a controlled vocabulary). Also
gated the whole view on `q01_consent_anonymize = true` specifically — previously
it only checked `consent_final` (consent to *participate*), conflating that
with consent to appear in a public aggregate dashboard, which `survey-schema.ts`
treats as two distinct questions.

---

## High severity

### 5. `src/lib/swot-content.ts` — 4 broken archetype images
Cross-checked every `imageKey` in `ARCHETYPES_BY_SECTION` against the actual
keys in `bird-urls.ts` programmatically (not by eye). Found four typos, each
silently breaking an archetype's image in `ArchetypeCard` (empty `imageUrl` →
image section doesn't render, no error, no visual feedback):

| Section | Wrong key | Correct key |
|---|---|---|
| 4 | `tragedyOfCommons` | `tragedyCommons` |
| 6 | `limitsToGrowth` | `limitsGrowth` |
| 7 | `successToSuccessful` | `successSuccessful` |
| 8 | `shiftingTheBurden` | `shiftingBurden` |

All 12 `imageKey`s in the file (including the 8 that were already correct)
verified to exist in the registry after the fix.

### 6. `src/components/strategic/SurveyWizard.tsx` — silent data loss, Sections 5 & 6
The submission payload still built keys from the pre-refactor `Section5Data`/
`Section6Data` field names (`q5_1_...`, `q5_5_...`, `q6_6_...`), but
`survey-schema.ts` was refactored to generate canonical names from
`swot-content.ts` (`q05_transformers_banner_understanding`,
`q5_arch_growth_underinvest_accuracy`, `q06_moral_governance_realistic`). Because
the payload is typed as `Record<string, unknown>` (deliberately, to route around
TypeScript's inability to check the dynamically-generated schema keys),
this compiled cleanly while silently submitting real respondent answers under
keys the schema doesn't recognize.
**Fixed:** payload now maps each old internal field to its correct canonical
key. **Not fixed:** `Section5_Transformers.tsx`/`Section6_Enablers.tsx` still
expose the old internal names themselves — tracked as follow-up (same pattern
already applied for Section 3/4 per the existing code comments).

### 7. `supabase/functions/survey-analytics/index.ts` — missing archetype + no consent filter
`q9_arch_moral_governance_derisk` was entirely absent from the hand-maintained
key list (the file's own header calls this "the one documented exception to
single source of truth"). It's also a **numeric** governance-scale question
(1–5), not a string-accuracy one — simply adding it to the existing list
would have silently zeroed it out, since the consensus logic does a string
comparison. Also: the aggregation query had no `consent_final` filter at all.
**Fixed:** added a separate numeric-consensus bucket (`>=4` counts as
"accurate", matching the semantics used elsewhere for scale questions), added
`.eq("consent_final", true)`, and added a defensive row cap with a comment
explaining when to replace it with a real SQL aggregation.

### 8. `supabase/functions/survey-submit/index.ts` — no rate limiting, error leak
No rate limiting existed anywhere (stateless Deno edge functions can't do
in-memory limiting reliably). Raw Postgres `error.message` was also returned
directly to the client on insert failure — a schema/column-detail leak to
anyone probing the endpoint.
**Fixed:** added a DB-backed rate limit (max 3 submissions per salted, *hashed*
— never raw — IP per 30-minute window; the migration adds the supporting
column + index). Generic error message returned to the client now; real error
still logged server-side for debugging.

### 9. `supabase/migrations/...survey_responses.sql` — unsafe default, no DB-level consent enforcement
`consent_final` defaulted to `true` — a bug or missed code path would silently
mark a row as consented. The RLS insert policy was also `with check (true)`,
meaning the database itself enforced nothing about consent.
**Fixed:** default changed to `false` (fail closed), column made `NOT NULL`
explicitly, and the RLS policy now requires `consent_final = true`. **Important
caveat documented in the file itself:** `survey-submit` inserts using the
**service role key**, which bypasses RLS entirely — so this policy is a safety
net for a hypothetical future direct-anon-write path, not today's actual
gatekeeper. The original migration's comment claiming "Frontend Edge Function
uses anon key" was factually wrong and has been corrected.

---

## Medium / low severity, hygiene, and verified non-issues

- **CORS fallback origin (`survey-submit`, `survey-analytics`):** previously
  defaulted the `Access-Control-Allow-Origin` header to a hardcoded localhost
  dev origin for any unrecognized origin. Browsers wouldn't have honored a
  mismatched header anyway (so this wasn't independently exploitable), but it
  was confusing and sloppy. Now the header is simply omitted for unknown
  origins, making the intent explicit.
- **`src/lib/api.ts`:** added a 20-second client-side timeout via
  `AbortController` — previously a hung connection would leave the submit
  button spinning indefinitely with no feedback.
- **Alias configuration (`vite.config.ts` vs `tsconfig.json`):** checked
  programmatically — the two alias/paths maps match exactly. **No drift found,
  no change made.**
- **`public/manifest.json` / `manifest.template.json`:** reviewed in full,
  including the two shortcut URLs that looked suspicious at first glance
  (`/validation-survey.html`, `/survey-dashboard.html`) — both have matching
  `<Route>` redirects in `App.tsx`. **No issue, no change made.**
- **`src/contexts/AppContext.tsx`:** small, correct, properly wired into
  `App.tsx` via `AppProvider`. **No issue, no change made.**
- **`.github/workflows/ci.yml`:** added `npm audit --audit-level=high` as a
  blocking step (tied to `SECURITY-EXCEPTIONS.md`, carried over from the
  React Router advisory discussion earlier in this session), and extended the
  Edge Function build-verification step from 3 of 5 functions to all 5.

---

## Explicitly out of scope for this pass

- `supabase/functions/email-notifications/index.ts` and
  `supabase/functions/strategic-planner-sync/index.ts` were grep-scanned for
  obvious red flags (hardcoded secrets, wildcard CORS, missing auth) and
  nothing severe surfaced, but they were **not** given the same close, line-by-line
  read as the files above. Recommend a follow-up pass if time allows —
  particularly `email-notifications`, since it's the one function that
  necessarily handles respondent PII (to send them anything).
- `ai-strategy-assistant`'s non-browser rate-limiting/auth gap (see finding #2)
  is flagged, not resolved — it needs a product decision, not just a code fix.
- `Section5_Transformers.tsx` / `Section6_Enablers.tsx` still use pre-refactor
  internal field names (see finding #6) — SurveyWizard.tsx now correctly
  translates them at submission time, but the components themselves are due
  for the same primitives-based rewrite discussed earlier in this conversation.

---

## CI/DevOps recommendations (beyond what's in `ci.yml` now)

1. **Dependabot** (`.github/dependabot.yml`) for automated dependency PRs —
   not added in this pass; low effort, recommend adding separately.
2. **Secret scanning** (GitHub's built-in secret scanning / push protection,
   or `gitleaks` in CI) — this repo's edge functions reference several
   third-party API keys (OpenAI, Resend per `email-notifications`); worth
   verifying none have ever been committed in plaintext to git history.
3. **Supabase migration dry-run in CI** — the SQL migration in this package
   was sanity-checked structurally (balanced parens, statement count) since no
   Postgres instance was available in this environment; recommend running it
   against a real Supabase staging project (or `supabase db reset` locally)
   before applying to production, standard practice for any schema change.
4. **Ratchet the lint `--max-warnings=15` down to 0** once the existing
   warnings are cleared — currently tracked as a `NOTE` comment in `ci.yml`.

---

## Verification log

```
$ npm run typecheck
> bird-validation-survey@1.0.0 typecheck
> tsc --noEmit -p tsconfig.app.json
(0 errors)

$ npm run build
> bird-validation-survey@1.0.0 build
> vite build
vite v6.4.3 building for production...
✓ 2037 modules transformed.
✓ built in 11.90s
```
