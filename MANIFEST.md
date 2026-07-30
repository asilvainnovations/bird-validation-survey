# BIRD 2026–2035 — "BBOI" → "BOI" Correction Bundle

**Generated:** 2026-07-30
**Verification:** `npm run typecheck` — 0 errors. `npm run build` — succeeds end-to-end.

Every reference to "BBOI" (a non-existent agency name — the real body is the **Board of
Investments (BOI)**, under BOI-MTIT, not "BBOI") has been corrected across the codebase.
Found and fixed in 4 files — 2 in the survey itself, 2 in shared data files that feed the
main BIRD platform's Strat Planner Pro engine (not the validation survey directly, but part
of the same repo, so included since you asked for every misplaced reference removed).

---

## Files included

| File | What changed |
|---|---|
| `Section9_OperatingSystems.tsx` | One answer option read `"Bangsamoro Government (BOI-MTIT, BBOI)"` — a straight find-replace would have produced a duplicate (`BOI-MTIT, BOI`), so this one was fixed by hand to `"Bangsamoro Government (BOI-MTIT)"` rather than mechanically. |
| `Section11_Metrics.tsx` | `"BBOI tracking, MTIT registry"` → `"BOI tracking, MTIT registry"` in the KPI calibration table. |
| `src/lib/templateData.ts` | 8 occurrences — `"Bangsamoro Board of Investments (BBOI)"` → `"Board of Investments (BOI)"`, and 6 instances of `owner: 'BBOI Chair'` → `'BOI Chair'` across KPI template records, plus one `"investment promotion agencies (BBOI, BEZA, BHB)"` reference. |
| `src/lib/strategicPlanStore.ts` | 6 occurrences across seeded strategic-plan demo data — `BBOI aftercare protocol`, `through BBOI facilitation`, `Total BBOI-approved investment value`, `benchmarkSource: 'BBOI / BEZA...'`, `leadAgency: '...  / BBOI'`, and `business registration via BBOI` — all corrected to `BOI`. |

## Verification

Checked for zero remaining occurrences of "BBOI" anywhere in `src/` after the fix (not just
in the 4 files above — a full-tree grep), and confirmed no correct references were
accidentally altered (e.g. `BOI-MTIT`, which was already correct throughout, was left
untouched).

## How to apply

Copy the `src/` folder over your project's `src/` folder (paths match exactly), then:

```bash
npm run typecheck   # should report 0 errors
npm run build        # should succeed
```
