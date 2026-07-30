# BIRD 2026–2035 Validation Survey — Production Bundle

**Generated:** 2026-07-30
**Verification:** `npm run typecheck` — 0 errors. `npm run build` — succeeds end-to-end.
**Scope:** Full SWOT/archetype content reconciliation against the official PDF (55 canonical
factors), proximity/UX fixes across all image-bearing sections, and a complete rebuild of
`SurveyWizard.tsx` to match every corrected component — the first point this session where
the entire codebase compiled clean simultaneously, not just one file in isolation.

---

## ⚠️ Important note on how this bundle was assembled

While preparing this bundle, `git pull` surfaced a **separate, broken** version of
`SurveyWizard.tsx` on the remote `main` branch — pushed independently, outside this
conversation. That version assumed `Section1Data`/`Section2Data` used `q1_`/`q2_`-prefixed
field names and that Sections 3/7/8/9/11 already used canonical field names, but **none of
the actual component files were updated to match** — the exact failure mode flagged earlier
in this project (a "canonical" rewrite generated in isolation, never reconciled against the
real files it depends on). Typechecking that remote version produced 60+ errors.

**This bundle contains the verified version instead** — every field name below was checked
against the actual current `Section*Data` interface, not assumed. If you pull `main` before
applying this bundle, you'll hit that broken version; overwrite it with the files here.

---

## Files included

| File | What changed |
|---|---|
| `src/lib/swot-content.ts` | Rebuilt against the official SWOT Analysis PDF (Tables 3-1–3-4). 55/55 factors now match the PDF's `BEIE Attribution` column exactly — verified programmatically. Fixed 4 `imageKey` typos that broke archetype images in Sections 4, 6, 7, 8. |
| `src/lib/survey-schema.ts` | Fixed a syntax error (stray comment left uncommented inside the schema object, broke the whole build). Field prefixes normalized to match `swot-content.ts` generator output. |
| `src/lib/api.ts` | `consent_final` now derives from `q1_consent_participate` (canonical name); added a 20s request timeout so a stalled connection doesn't leave the submit button spinning forever. |
| `Section0_Orientation.tsx` | Restructured to put every image/video directly in the same card as its question (not just nearby) — the explicit design standard from BOI tester feedback. Wired 3 previously-disconnected "practice quiz" questions into real, saved survey fields. Removed 1 out-of-scope question per your notes. |
| `Section3_BEIE_SystemsThinking.tsx` | Same proximity rebuild — 6 questions that were bundled into a catch-all card at the bottom are now merged with their actual images (8 cards, 8 images, 1:1). All 6 previously-terse image descriptions rewritten to match your source notes' actual content. |
| `Section4_Foundations.tsx` | Archetype field names corrected to canonical (`q4_arch_tragedy_commons_*`). Proximity was already correct. |
| `Section5_Transformers.tsx` | Same catch-all-card bug as Section 3 (4 questions bundled at the top); rebuilt with each merged into its actual image's card. Archetype field names corrected. |
| `Section6_Enablers.tsx` | Proximity was already correct. SWOT content fixed: added Fragmented Data Systems + Infrastructure Cost Overruns (new canonical factors), moved Underspending out to Section 9 per the PDF's attribution. |
| `Section7_Connectors.tsx` | Full SWOT rebuild to the canonical S1/O1–O5/T1–T3 set (was showing factors that belong to 4 other sections). Archetype field names corrected. |
| `Section8_Financiers.tsx` | Same contamination as Section 7 — ~22 of ~25 SWOT fields belonged to other sections. Rebuilt to the true canonical 3 factors (S1, W1, O1). |
| `Section9_OperatingSystems.tsx` | The most-broken file found this session: two live field collisions (Climate Change + Security Incidents shared one field; Escalation + Big Man archetypes shared another — both silently overwrote each other's answers). Both fixed with distinct fields. SWOT content rebuilt to the correct 2/2/2/6 (S/W/O/T) set, including 2 previously-missing factors. |
| `Section11_Metrics.tsx` | Drifting Goals archetype used the wrong field name **and, per its own code comment, wasn't wired into `SurveyWizard.tsx` at all** — those answers were being lost entirely. Fixed. Moved an orphaned image from the dead bottom of the file to the top of the block it actually illustrates. |
| `SurveyWizard.tsx` | Full rebuild: state, live BIRD-score computation, and the submission payload for all 16 sections, verified field-by-field against the real (not assumed) `Section*Data` interfaces above. |

## Not included (unchanged, already correct)

Sections 1, 2, 10, 12, 13, 14, 15 — audited this session and found already compliant on
proximity, or (Sections 1/2) not yet given the same line-by-line pass the others received.
No changes made means no risk of introducing new drift.

## Known open items (not fixed here — flagged for your decision, not silently resolved)

- **`q9_1_moral_governance_derisk`** — you flagged this as a near-duplicate of the archetype
  question and suggested renaming to `q9_1_moral_governance_belief`. Not yet applied; still
  your call.
- **`q10_matrix`** (7-criteria HEDS/GEMS/IFES/IEDS scoring) — defined in `Section10Data` but
  never rendered as an actual input anywhere; respondents can't currently score it themselves.
- **Sections 1 & 2** — compile clean and match what `SurveyWizard.tsx` expects, but haven't
  had the same proximity/content audit as Sections 0/3–9/11.

## How to apply

Copy the `src/` folder over your project's `src/` folder (paths match exactly), then:

```bash
npm run typecheck   # should report 0 errors
npm run build        # should succeed
```
