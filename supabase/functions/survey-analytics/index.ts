// supabase/functions/survey-analytics/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGINS = [
  "http://localhost:5173", "http://localhost:8080",
  "https://bird-validation-survey.bolt.host", "https://asilvainnovations.com",
];

// This endpoint only ever returns aggregate, already-anonymized statistics
// (see the consent_final + q1_consent_anonymize filtering below) — it never
// exposes individual responses or PII. That makes it meaningfully lower-risk
// than survey-submit or ai-strategy-assistant, and it's specifically meant to
// power a *public* dashboard. WebContainer/bolt.new preview origins rotate
// per session (e.g. https://abc123--3000--xyz.local-credentialless.
// webcontainer-api.io) and can never be added to a static allowlist, so this
// endpoint additionally accepts any *.webcontainer-api.io origin — a
// deliberately scoped exception, not a blanket wildcard, and not applied to
// any endpoint that writes data or costs money per call.
function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  try {
    const { hostname } = new URL(origin);
    return hostname.endsWith(".webcontainer-api.io");
  } catch {
    return false;
  }
}

const corsHeaders = (origin: string | null) => {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  };
  if (isAllowedOrigin(origin)) {
    headers["Access-Control-Allow-Origin"] = origin as string;
  }
  return headers;
};

// ── BIRD Formulas (Deno compatible) ────────────────────────────────────────
// Mirror src/lib/formulas.ts exactly (Deno can't import the TS module
// directly — see the archetype/SWOT key-list comment below for the same
// documented exception). Any change here MUST be mirrored there, and vice
// versa; a silent divergence here is the "Opportunity RI always zero"
// bug class described in formulas-and-invariants.md.
const calcStrengthRI = (i: number, l: number) => (i * l) / 5;
const calcOpportunityRI = (i: number, l: number) => Math.sqrt(i * l);
const calcWeaknessRisk = (i: number, l: number) => i * l;
const calcThreatVI = (i: number, l: number) => (Math.pow(i, 2) * l) / 25;

// Strategy Option Scoring (IEDS Matrix) — mirrors
// src/components/strategic/Section10_IEDS.tsx's EVALUATION_CRITERIA, which
// is itself the exact "7-Criteria Weighted Scoring Matrix" methodology
// documented in the BIRD 2026-2035 Draft Report, Chapter 4, §A.6 "Strategic
// Options Evaluation and Ranking" (source: Chapter4.html, verified
// 2026-08-13) — the chapter explicitly cites this as "the Strat Planner Pro
// architecture (Silva, 2026)."
//
// CORRECTED FINDING (2026-08-13): an earlier version of this file used
// src/lib/formulas.ts's calculateStrategyOverallScore weights instead
// (economic_impact 0.20, feasibility 0.18, risk_return 0.16, sustainability
// 0.06), on the assumption that formulas.ts was the single source of truth
// and Section10_IEDS.tsx had drifted from it. Checking the actual Chapter 4
// source document shows the opposite: Section10_IEDS.tsx's weights below are
// the canonical, documented values (matching the chapter's evaluation table
// row-for-row, including the 7.61/7.16/7.48/8.93 baseline totals and their
// 2nd/4th/3rd/1st ranks). formulas.ts's calculateStrategyOverallScore is the
// one that has drifted and needs correcting — in BOTH repos, since
// formulas.ts is documented as byte-identical between BIRD-2026-2035 (Strat
// Planner Pro) and bird-validation-survey. Not fixed here (out of scope for
// this Edge Function / this repo's survey-analytics), but flagged as a
// required follow-up for both repos' formulas.ts.
const STRATEGY_WEIGHTS: Record<string, number> = {
  economic_impact: 0.25,
  feasibility: 0.20,
  identity_alignment: 0.15,
  systems_leverage: 0.15,
  risk_return: 0.10,
  inclusivity: 0.10,
  sustainability: 0.05,
};
function calcStrategyScore(scores: Record<string, number> | undefined | null): number | null {
  if (!scores || typeof scores !== "object") return null;
  let sum = 0;
  for (const [key, weight] of Object.entries(STRATEGY_WEIGHTS)) {
    const v = scores[key];
    if (typeof v !== "number") return null;
    sum += v * weight;
  }
  return sum;
}
// Reference: BIRD 2026-2035 Draft Report, Chapter 4, §A.6's "Strategic
// Option Evaluation Matrix — 7-Criteria Weighted Scoring" table (TOTAL
// WEIGHTED SCORE row), verified directly against source 2026-08-13. Ranks:
// IEDS 1st, HEDS 2nd, IFES 3rd, GEMS 4th.
const BASELINE_SCORES: Record<string, number> = { heds: 7.61, gems: 7.16, ifes: 7.48, ieds: 8.93 };
const STRATEGIC_OPTION_KEYS = ["heds", "gems", "ifes", "ieds"] as const;

const getPair = (d: any, prefix: string) => {
  const i = d[`${prefix}_impact`];
  const l = d[`${prefix}_likelihood`];
  if (typeof i === "number" && typeof l === "number") return { i, l };
  return null;
};

// Small accumulator helpers used throughout — kept intentionally simple
// (no external stats library) since Deno edge functions want minimal
// dependencies and this is plain mean/count/tally arithmetic.
interface NumAcc { sum: number; n: number; }
function addNum(acc: NumAcc, val: unknown) {
  if (typeof val === "number") { acc.sum += val; acc.n++; }
}
function avgOf(acc: NumAcc): number { return acc.n > 0 ? Number((acc.sum / acc.n).toFixed(2)) : 0; }

// ── Analytical metadata (v2 contract, 2026-08-12) ──────────────────────────
// WHY: avgOf() returns 0 when n === 0, which at the presentation layer is
// indistinguishable from a genuine mean of 0. Every underlying Likert / SWOT
// input is on a 1–5 scale, so a true mean can never actually be 0 — but the
// dashboard should not have to rely on that inference to tell "nobody answered
// this" apart from "everybody rated it terribly". So every scalar mean below
// is ALSO emitted as { mean: number|null, n, missing }, where mean === null
// means "no valid observations" and never "scored zero".
//
// This is purely ADDITIVE: every legacy scalar field (avgStrengthRI,
// perspectives.financial, riskConcern.high, …) is retained byte-for-byte, so
// an older frontend deploy keeps working unchanged. Consumers should prefer
// the `*Meta` objects and fall back to the legacy scalars.
interface Metric { mean: number | null; n: number; missing: number; }
function metricOf(acc: NumAcc, denominator: number): Metric {
  return {
    mean: acc.n > 0 ? Number((acc.sum / acc.n).toFixed(2)) : null,
    n: acc.n,
    missing: Math.max(0, denominator - acc.n),
  };
}
function metricsOf(accs: Record<string, NumAcc>, denominator: number): Record<string, Metric> {
  return Object.fromEntries(Object.entries(accs).map(([k, a]) => [k, metricOf(a, denominator)]));
}

// SWOT families accumulate at ITEM level (respondent × item), so `n` there is
// an observation count and `denominator - n` would be meaningless. These carry
// both: `observations` (item-level, the denominator of the mean) and
// `respondents` (how many people answered at least one item in the family,
// which is what `missing` is computed against).
interface ItemMetric { mean: number | null; observations: number; respondents: number; missing: number; }
function itemMetric(sum: number, observations: number, respondents: number, denominator: number): ItemMetric {
  return {
    mean: observations > 0 ? Number((sum / observations).toFixed(2)) : null,
    observations,
    respondents,
    missing: Math.max(0, denominator - respondents),
  };
}

function addDist(dist: Record<string, number>, val: unknown) {
  if (typeof val === "string" && val.length > 0) dist[val] = (dist[val] || 0) + 1;
}
function addMultiDist(dist: Record<string, number>, val: unknown) {
  if (Array.isArray(val)) for (const v of val) if (typeof v === "string" && v.length > 0) dist[v] = (dist[v] || 0) + 1;
}

// ── Section 0 comprehension quiz — correct answers ─────────────────────────
// Mirrors the option arrays in src/components/strategic/Section0_Orientation.tsx
// (cldPolarityOptions[0], reinforcingLoopOptions[1], leveragePointOptions[2]).
const CORRECT_CLD_POLARITY = "Same-direction relationship (both variables move together)";
const CORRECT_REINFORCING_LOOP = "A loop that amplifies change in the same direction";
const CORRECT_LEVERAGE_POINT = "Transforming the paradigm or mindset";

// ── BEIE cluster sections (4–9) — mirrors src/lib/bird-urls.ts's Section
// N: Cluster M headers and src/lib/universalQuestions.ts's
// UNIVERSAL_QUESTION_SECTIONS. Section 9 is "Operating Systems"
// (cross-cutting: Moral Governance, Peace, Resilience), not a 6th BEIE
// cluster proper, but it's scored with the same SWOT + universal-Likert
// machinery as the 5 clusters, so it's included here for consistency.
const CLUSTER_SECTIONS: { section: number; slug: string; label: string }[] = [
  { section: 4, slug: "foundations", label: "Foundations" },
  { section: 5, slug: "transformers", label: "Transformers" },
  { section: 6, slug: "enablers", label: "Enablers" },
  { section: 7, slug: "connectors", label: "Connectors" },
  { section: 8, slug: "financiers", label: "Financiers" },
  { section: 9, slug: "operatingSystems", label: "Operating Systems" },
];

function sectionOfField(field: string): number | null {
  const m = /^q(\d+)_/.exec(field);
  return m ? Number(m[1]) : null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders(req.headers.get("Origin")) });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Defensive cap: this endpoint aggregates in application code rather than in SQL,
    // so an unbounded table scan would get slower (and costlier) as responses grow.
    // 20,000 responses is far beyond this survey's expected scale; if it's ever hit,
    // move the aggregation into a SQL view/materialized view instead of raising this.
    const { data: responses, error } = await supabase
      .from("survey_responses")
      .select("id, demo_province, demo_category, created_at, response_data")
      .eq("consent_final", true)
      .order("created_at", { ascending: false })
      .limit(20000);

    if (error) throw error;

    const total = responses?.length || 0;
    const provinces: Record<string, number> = {};
    const categories: Record<string, number> = {};
    const ieds: Record<string, number> = {};
    const archetypes: Record<string, { accurate: number; total: number }> = {};

    let sumS = 0, cntS = 0, sumO = 0, cntO = 0, sumW = 0, cntW = 0, sumT = 0, cntT = 0;

    // Respondent-level coverage for the four SWOT families (see itemMetric()).
    // cnt* above count observations; these count *people*, which is the only
    // denominator against which "missing" is interpretable.
    const respS = { n: 0 }, respO = { n: 0 }, respW = { n: 0 }, respT = { n: 0 };

    // Keys mirror src/lib/swot-content.ts exactly — this is a Deno edge function
    // and cannot import the TS module directly, so this list MUST be kept in
    // sync by hand whenever swot-content.ts changes (this file is the one
    // documented exception to "single source of truth").
    const strengthKeys = [
      'q4_s1_aff_base', 'q4_s2_renewable_energy', 'q4_s3_lake_lanao', 'q4_s4_seaweed_dominance',
      'q5_s1_halal_legitimacy', 'q5_s2_domestic_demand', 'q5_s3_polloc_freeport', 'q5_s4_cultural_heritage',
      'q6_s1_youth_pop', 'q6_s2_lanao_growth',
      'q7_s1_bimpeaga_location',
      'q8_s1_islamic_finance_framework',
      'q9_s1_policy_recognition', 'q9_s2_peace_dividend',
    ];
    const opportunityKeys = [
      'q4_o1_renewable_invest', 'q4_o2_carbon_markets', 'q4_o3_pes', 'q4_o4_forestry_code',
      'q6_o1_tourism_recovery', 'q6_o2_digital_leapfrog',
      'q7_o1_global_halal', 'q7_o2_asean_halal', 'q7_o3_bimpeaga_integration', 'q7_o4_uae_corridor', 'q7_o5_landbridge',
      'q8_o1_islamic_ecosystem',
      'q9_o1_postconflict', 'q9_o2_climate_adaptation_finance',
    ];
    const weaknessKeys = [
      'q4_w1_land_tenure',
      'q5_w1_halal_cert', 'q5_w2_cold_chain', 'q5_w3_market_linkages',
      'q6_w1_infra_deficits', 'q6_w2_poverty', 'q6_w3_literacy', 'q6_w4_malnutrition', 'q6_w5_skills_mismatch', 'q6_w6_tech_adoption', 'q6_w7_fragmented_data',
      'q8_w1_financial_penetration',
      'q9_w1_fragmented_policy', 'q9_w2_underspending',
    ];
    const threatKeys = [
      'q4_t1_pestalotiopsis',
      'q5_t1_standards_recognition',
      'q6_t1_cyber_insecurity',
      'q7_t1_halal_competition', 'q7_t2_economic_downturn', 'q7_t3_price_volatility',
      'q9_t1_climate_change', 'q9_t2_drifting_goals', 'q9_t3_security_incidents', 'q9_t4_political_transition', 'q9_t5_natl_coordination', 'q9_t6_fragmented_mandates',
    ];
    // String-typed archetype/CLD "accuracy" questions ("Very accurately" / "Somewhat
    // accurately" / "Needs revision" / "Not accurate"). Extended (2026-08-13) to
    // include the two Section 3 CLD-loop comprehension questions
    // (q3_cld1_investment_development, q3_cld2_governance_confidence), which are
    // "cld-loop" type per ARCHETYPES_BY_SECTION[3] — same optionalString shape as
    // the "swot-archetype" questions, so they slot into the same aggregation loop.
    // Previously these two were the only ARCHETYPES_BY_SECTION entries not
    // aggregated anywhere in this endpoint.
    const archetypeKeys = [
      'q3_cld1_investment_development', 'q3_cld2_governance_confidence',
      'q4_arch_tragedy_commons', 'q5_arch_growth_underinvest', 'q6_arch_limits_growth',
      'q7_arch_success_successful', 'q8_arch_shifting_burden',
      'q9_arch_fixes_fail', 'q9_arch_escalation', 'q9_arch_big_man',
      'q11_arch_drifting_goals',
    ];
    // Numeric-typed (1–5) "governance-scale" question — q9_arch_moral_governance_derisk_accuracy
    // is a number per survey-schema.ts's archetypeFieldsFor(), not a string like the rest, so it
    // needs its own bucket and its own "counts as accurate" rule (rating >= 4) rather than the
    // string comparison used below.
    // NOTE (2026-07-31, re-verified 2026-08-13): swot-content.ts's
    // ARCHETYPES_BY_SECTION[9] still declares this question (id 8,
    // "moral_governance_derisks_capital"), but
    // src/components/strategic/Section9_OperatingSystems.tsx never actually
    // renders it — the component only renders the unrelated
    // q9_1_moral_governance_derisk numeric scale question (no _accuracy/
    // _followup pair). So this bucket is correctly empty: there is no UI
    // path that ever writes q9_arch_moral_governance_derisk_accuracy to a
    // real submission. Left empty deliberately, not a bug — but if Section 9
    // is ever extended to render this question, add
    // 'q9_arch_moral_governance_derisk' here.
    const governanceScaleKeys: string[] = [];

    // ── New (2026-08-13): per-cluster SWOT accumulators ───────────────────
    // Same formulas as the global sums above, bucketed by BEIE cluster
    // section so the dashboard can show "cluster health" instead of only a
    // single BARMM-wide average.
    const clusterAcc: Record<number, { sumS: number; cntS: number; sumO: number; cntO: number; sumW: number; cntW: number; sumT: number; cntT: number }> = {};
    for (const c of CLUSTER_SECTIONS) clusterAcc[c.section] = { sumS: 0, cntS: 0, sumO: 0, cntO: 0, sumW: 0, cntW: 0, sumT: 0, cntT: 0 };

    // Per-cluster respondent-level coverage, same rationale as respS/respO/…
    const clusterResp: Record<number, { s: number; o: number; w: number; t: number }> = {};
    for (const c of CLUSTER_SECTIONS) clusterResp[c.section] = { s: 0, o: 0, w: 0, t: 0 };

    // Universal cross-cluster Likert (confidence/readiness/urgency), one per
    // cluster section — mirrors src/lib/universalQuestions.ts's
    // universalFieldName() naming (`q${n}_universal_${id}`).
    const universalAcc: Record<number, { confidence: NumAcc; readiness: NumAcc; urgency: NumAcc }> = {};
    for (const c of CLUSTER_SECTIONS) universalAcc[c.section] = { confidence: { sum: 0, n: 0 }, readiness: { sum: 0, n: 0 }, urgency: { sum: 0, n: 0 } };

    // ── New: Systems Thinking appreciation (Section 0) ────────────────────
    const stValue: NumAcc = { sum: 0, n: 0 };
    const stReadyDist: Record<string, number> = {};
    let cldCorrect = 0, cldN = 0;
    let loopCorrect = 0, loopN = 0;
    let leverageCorrect = 0, leverageN = 0;

    // ── New: BEIE understanding (Section 3) ────────────────────────────────
    const beieFields: { field: string; label: string }[] = [
      { field: "q3_1_beie_video_understanding", label: "BEIE video explanation quality" },
      { field: "q3_2_systems_reframing_accuracy", label: "Systems-based reframing accuracy" },
      { field: "q3_3_sector_to_ecosystem_shift", label: "Sector-to-ecosystem mental model shift" },
      { field: "q3_4_beie_framework_clarity", label: "BEIE Framework diagram clarity" },
      { field: "q3_5_operating_systems_understanding", label: "Moral Governance as 'operating system'" },
      { field: "q3_6_five_clusters_understanding", label: "Understanding of the five clusters" },
    ];
    const beieAcc: Record<string, NumAcc> = {};
    for (const f of beieFields) beieAcc[f.field] = { sum: 0, n: 0 };

    // ── New: Strategic Options — Section 10 IEDS scoring matrix ───────────
    const strategyAcc: Record<string, NumAcc> = {};
    for (const k of STRATEGIC_OPTION_KEYS) strategyAcc[k] = { sum: 0, n: 0 };
    const strategicRankingDist: Record<string, number> = {};
    const leverageLikertFields = [
      "q10_leverage_points_clarity", "q10_activating_leverage", "q10_capacity_traps",
      "q10_iceberg_model", "q10_collaborative_governance",
    ];
    const leverageLikertAcc: Record<string, NumAcc> = {};
    for (const f of leverageLikertFields) leverageLikertAcc[f] = { sum: 0, n: 0 };

    // ── New: Balanced Scorecard validation (Section 12) ────────────────────
    const bscPerspectiveFields = [
      "q12_1_learning_growth_alignment", "q12_2_internal_process_alignment",
      "q12_3_stakeholder_alignment", "q12_4_financial_alignment",
    ];
    const bscVisionFields = ["q12_6_vision_clarity", "q12_7_vision_achievable", "q12_8_mission_alignment", "q12_9_bsc_useful"];
    const bscAcc: Record<string, NumAcc> = {};
    for (const f of [...bscPerspectiveFields, ...bscVisionFields]) bscAcc[f] = { sum: 0, n: 0 };
    const strongestPathwayDist: Record<string, number> = {};

    // ── New: Budget & Risk (Section 13) ────────────────────────────────────
    const budgetRiskFields = [
      "q13_1_funding_mix_fair", "q13_2_targets_realistic",
      "q13_3_high_risk_concern", "q13_4_medium_risk_concern", "q13_5_low_risk_concern",
    ];
    const budgetRiskAcc: Record<string, NumAcc> = {};
    for (const f of budgetRiskFields) budgetRiskAcc[f] = { sum: 0, n: 0 };
    const budgetPriorityClusterDist: Record<string, number> = {};
    const blendedFinanceDist: Record<string, number> = {};

    // ── New: Post-survey engagement interest (Section 14, multi-select) ───
    const engagementDist: Record<string, number> = {};

    for (const row of responses || []) {
      const d = row.response_data || {};

      const prov = d.q2_demo_province || d.demo_province || "Unknown";
      provinces[prov] = (provinces[prov] || 0) + 1;

      const cat = d.q2_demo_category || d.demo_category || "Unknown";
      categories[cat] = (categories[cat] || 0) + 1;

      const iedsPref = d.q10_1_ieds_preference || d.q10_ieds_preference;
      if (iedsPref) ieds[iedsPref] = (ieds[iedsPref] || 0) + 1;

      // Compute BIRD Scores — global (unchanged) + per-cluster (unchanged).
      // The `touched*` sets are new (v2 metadata only) and record which
      // families / clusters THIS respondent contributed at least one valid
      // item to, so respondent-level coverage can be reported alongside the
      // observation-level means. They do not affect any legacy field.
      let touchedS = false, touchedO = false, touchedW = false, touchedT = false;
      const touchedCluster: Record<number, { s: boolean; o: boolean; w: boolean; t: boolean }> = {};
      const markCluster = (sec: number | null, key: "s" | "o" | "w" | "t") => {
        if (!sec || !clusterAcc[sec]) return;
        if (!touchedCluster[sec]) touchedCluster[sec] = { s: false, o: false, w: false, t: false };
        touchedCluster[sec][key] = true;
      };

      for (const k of strengthKeys) {
        const p = getPair(d, k); if (!p) continue;
        const v = calcStrengthRI(p.i, p.l); sumS += v; cntS++; touchedS = true;
        const sec = sectionOfField(k); if (sec && clusterAcc[sec]) { clusterAcc[sec].sumS += v; clusterAcc[sec].cntS++; }
        markCluster(sec, "s");
      }
      for (const k of opportunityKeys) {
        const p = getPair(d, k); if (!p) continue;
        const v = calcOpportunityRI(p.i, p.l); sumO += v; cntO++; touchedO = true;
        const sec = sectionOfField(k); if (sec && clusterAcc[sec]) { clusterAcc[sec].sumO += v; clusterAcc[sec].cntO++; }
        markCluster(sec, "o");
      }
      for (const k of weaknessKeys) {
        const p = getPair(d, k); if (!p) continue;
        const v = calcWeaknessRisk(p.i, p.l); sumW += v; cntW++; touchedW = true;
        const sec = sectionOfField(k); if (sec && clusterAcc[sec]) { clusterAcc[sec].sumW += v; clusterAcc[sec].cntW++; }
        markCluster(sec, "w");
      }
      for (const k of threatKeys) {
        const p = getPair(d, k); if (!p) continue;
        const v = calcThreatVI(p.i, p.l); sumT += v; cntT++; touchedT = true;
        const sec = sectionOfField(k); if (sec && clusterAcc[sec]) { clusterAcc[sec].sumT += v; clusterAcc[sec].cntT++; }
        markCluster(sec, "t");
      }

      if (touchedS) respS.n++;
      if (touchedO) respO.n++;
      if (touchedW) respW.n++;
      if (touchedT) respT.n++;
      for (const [sec, flags] of Object.entries(touchedCluster)) {
        const cr = clusterResp[Number(sec)];
        if (!cr) continue;
        if (flags.s) cr.s++;
        if (flags.o) cr.o++;
        if (flags.w) cr.w++;
        if (flags.t) cr.t++;
      }

      // Archetype Consensus — string-typed ("Very/Somewhat accurately")
      for (const a of archetypeKeys) {
        const val = d[`${a}_accuracy`];
        if (val) {
          if (!archetypes[a]) archetypes[a] = { accurate: 0, total: 0 };
          archetypes[a].total++;
          if (val === "Very accurately" || val === "Somewhat accurately") archetypes[a].accurate++;
        }
      }

      // Archetype Consensus — numeric governance-scale (1–5 rating; >=4 counts as "accurate")
      for (const a of governanceScaleKeys) {
        const val = d[`${a}_accuracy`];
        if (typeof val === "number") {
          if (!archetypes[a]) archetypes[a] = { accurate: 0, total: 0 };
          archetypes[a].total++;
          if (val >= 4) archetypes[a].accurate++;
        }
      }

      // Universal cross-cluster Likert
      for (const c of CLUSTER_SECTIONS) {
        addNum(universalAcc[c.section].confidence, d[`q${c.section}_universal_confidence`]);
        addNum(universalAcc[c.section].readiness, d[`q${c.section}_universal_readiness`]);
        addNum(universalAcc[c.section].urgency, d[`q${c.section}_universal_urgency`]);
      }

      // Systems Thinking appreciation (Section 0)
      addNum(stValue, d.q0_3_systems_thinking_value);
      addDist(stReadyDist, d.q0_1_ready);
      if (typeof d.q0_4_cld_understanding === "string") { cldN++; if (d.q0_4_cld_understanding === CORRECT_CLD_POLARITY) cldCorrect++; }
      if (typeof d.q0_5_feedback_loops_understanding === "string") { loopN++; if (d.q0_5_feedback_loops_understanding === CORRECT_REINFORCING_LOOP) loopCorrect++; }
      if (typeof d.q0_6_leverage_points_understanding === "string") { leverageN++; if (d.q0_6_leverage_points_understanding === CORRECT_LEVERAGE_POINT) leverageCorrect++; }

      // BEIE understanding (Section 3)
      for (const f of beieFields) addNum(beieAcc[f.field], d[f.field]);

      // Strategic Options scoring matrix (Section 10)
      const matrix = d.q10_matrix;
      if (matrix && typeof matrix === "object") {
        for (const k of STRATEGIC_OPTION_KEYS) {
          const score = calcStrategyScore(matrix[k]);
          if (score !== null) { strategyAcc[k].sum += score; strategyAcc[k].n++; }
        }
      }
      addDist(strategicRankingDist, d.q10_strategic_ranking);
      for (const f of leverageLikertFields) addNum(leverageLikertAcc[f], d[f]);

      // Balanced Scorecard (Section 12)
      for (const f of [...bscPerspectiveFields, ...bscVisionFields]) addNum(bscAcc[f], d[f]);
      addDist(strongestPathwayDist, d.q12_5_strongest_pathway);

      // Budget & Risk (Section 13)
      for (const f of budgetRiskFields) addNum(budgetRiskAcc[f], d[f]);
      addDist(budgetPriorityClusterDist, d.q13_7_budget_priority_cluster);
      addDist(blendedFinanceDist, d.q13_8_blended_finance_opinion);

      // Post-survey engagement interest (Section 14, multi-select)
      addMultiDist(engagementDist, d.q14_1_engagement_type);
    }

    const avgS = cntS > 0 ? sumS / cntS : 0;
    const avgO = cntO > 0 ? sumO / cntO : 0;
    const avgW = cntW > 0 ? sumW / cntW : 0;
    const avgT = cntT > 0 ? sumT / cntT : 0;
    const sbi = ((avgS + avgO) / 2) - ((avgW + avgT) / 2) + 50;

    // Per-cluster Strategic Balance Index, same formula, scoped per section.
    const clusterHealth = Object.fromEntries(CLUSTER_SECTIONS.map((c) => {
      const a = clusterAcc[c.section];
      const cS = a.cntS > 0 ? a.sumS / a.cntS : 0;
      const cO = a.cntO > 0 ? a.sumO / a.cntO : 0;
      const cW = a.cntW > 0 ? a.sumW / a.cntW : 0;
      const cT = a.cntT > 0 ? a.sumT / a.cntT : 0;
      const cSbi = ((cS + cO) / 2) - ((cW + cT) / 2) + 50;
      const u = universalAcc[c.section];
      const r = clusterResp[c.section];
      const observed = a.cntS + a.cntO + a.cntW + a.cntT;
      return [c.slug, {
        section: c.section,
        label: c.label,
        // ── Legacy fields (unchanged) ──────────────────────────────────────
        avgStrengthRI: Number(cS.toFixed(2)),
        avgOpportunityRI: Number(cO.toFixed(2)),
        avgWeaknessRisk: Number(cW.toFixed(2)),
        avgThreatVI: Number(cT.toFixed(2)),
        strategicBalanceIndex: Number(cSbi.toFixed(2)),
        universal: {
          confidence: avgOf(u.confidence),
          readiness: avgOf(u.readiness),
          urgency: avgOf(u.urgency),
        },
        // ── v2 metadata ────────────────────────────────────────────────────
        // NOTE on strategicBalanceIndex: the formula has a +50 constant, so a
        // cluster with ZERO observations still yields exactly 50 — a plausible-
        // looking mid-range score computed from nothing at all. `metrics.sbi`
        // is null in that case so the dashboard can suppress it rather than
        // plot a phantom bar at 50.
        metrics: {
          strengthRI: itemMetric(a.sumS, a.cntS, r.s, total),
          opportunityRI: itemMetric(a.sumO, a.cntO, r.o, total),
          weaknessRisk: itemMetric(a.sumW, a.cntW, r.w, total),
          threatVI: itemMetric(a.sumT, a.cntT, r.t, total),
          sbi: observed > 0 ? Number(cSbi.toFixed(2)) : null,
          universal: {
            confidence: metricOf(u.confidence, total),
            readiness: metricOf(u.readiness, total),
            urgency: metricOf(u.urgency, total),
          },
        },
      }];
    }));

    const strategicOptions = {
      respondentScores: Object.fromEntries(
        STRATEGIC_OPTION_KEYS.map((k) => [k, { avg: strategyAcc[k].n > 0 ? Number((strategyAcc[k].sum / strategyAcc[k].n).toFixed(2)) : 0, n: strategyAcc[k].n }])
      ),
      baselineScores: BASELINE_SCORES,
      strategicRankingDistribution: strategicRankingDist,
      leverageLikerts: {
        leveragePointsClarity: avgOf(leverageLikertAcc.q10_leverage_points_clarity),
        activatingLeverage: avgOf(leverageLikertAcc.q10_activating_leverage),
        capacityTraps: avgOf(leverageLikertAcc.q10_capacity_traps),
        icebergModel: avgOf(leverageLikertAcc.q10_iceberg_model),
        collaborativeGovernance: avgOf(leverageLikertAcc.q10_collaborative_governance),
      },
      // v2: same five Likerts with mean/n/missing, keyed by raw field name.
      leverageLikertsMeta: metricsOf(leverageLikertAcc, total),
      // v2: respondentScores[k].avg is 0 when n === 0; mean is null instead.
      respondentScoresMeta: Object.fromEntries(
        STRATEGIC_OPTION_KEYS.map((k) => [k, metricOf(strategyAcc[k], total)])
      ),
    };

    const payload = {
      // Bumped when the analytical contract gains fields. Consumers use this
      // to decide whether the `*Meta` / `metrics` objects can be relied on, so
      // frontend and Edge Function deploys don't have to ship atomically.
      analyticsVersion: 2,
      totalResponses: total,
      lastUpdated: new Date().toISOString(),
      demographics: { provinces, categories },
      birdScores: {
        avgStrengthRI: Number(avgS.toFixed(2)),
        avgOpportunityRI: Number(avgO.toFixed(2)),
        avgWeaknessRisk: Number(avgW.toFixed(2)),
        avgThreatVI: Number(avgT.toFixed(2)),
        strategicBalanceIndex: Number(sbi.toFixed(2)),
      },
      // v2 metadata for the four BIRD families. `scale` is emitted explicitly
      // because the four formulas do NOT share a range — Strength (i·l)/5 and
      // Opportunity √(i·l) land ~0.2–5, Weakness i·l lands 1–25, and Threat
      // (i²·l)/25 lands ~0.04–5. The dashboard must not present these four as
      // directly comparable, and now has the ranges to say so.
      birdScoresMeta: {
        strengthRI: { ...itemMetric(sumS, cntS, respS.n, total), scale: { min: 0.2, max: 5, formula: "(impact × likelihood) / 5" } },
        opportunityRI: { ...itemMetric(sumO, cntO, respO.n, total), scale: { min: 1, max: 5, formula: "√(impact × likelihood)" } },
        weaknessRisk: { ...itemMetric(sumW, cntW, respW.n, total), scale: { min: 1, max: 25, formula: "impact × likelihood" } },
        threatVI: { ...itemMetric(sumT, cntT, respT.n, total), scale: { min: 0.04, max: 5, formula: "(impact² × likelihood) / 25" } },
        strategicBalanceIndex: {
          // Same +50-constant caveat as the per-cluster SBI above.
          mean: (cntS + cntO + cntW + cntT) > 0 ? Number(sbi.toFixed(2)) : null,
          formula: "((S̄ + Ō) / 2) − ((W̄ + T̄) / 2) + 50",
        },
      },
      archetypes: Object.fromEntries(
        Object.entries(archetypes).map(([k, v]) => [k, { ...v, consensus: v.total > 0 ? Math.round((v.accurate / v.total) * 100) : 0 }])
      ),
      iedsPreferences: ieds,

      // ── New sections (2026-08-13) ────────────────────────────────────────
      systemsThinking: {
        valueAvg: avgOf(stValue),
        valueN: stValue.n,
        valueMeta: metricOf(stValue, total),
        readyDistribution: stReadyDist,
        comprehension: {
          cldPolarity: { correctPct: cldN > 0 ? Math.round((cldCorrect / cldN) * 100) : 0, n: cldN },
          reinforcingLoop: { correctPct: loopN > 0 ? Math.round((loopCorrect / loopN) * 100) : 0, n: loopN },
          leveragePoint: { correctPct: leverageN > 0 ? Math.round((leverageCorrect / leverageN) * 100) : 0, n: leverageN },
        },
      },
      beieUnderstanding: Object.fromEntries(
        // `avg` retained for compatibility; `mean` is null (not 0) at n === 0.
        beieFields.map((f) => [f.field, {
          ...metricOf(beieAcc[f.field], total),
          avg: avgOf(beieAcc[f.field]),
          label: f.label,
        }])
      ),
      clusterHealth,
      strategicOptions,
      balancedScorecard: {
        perspectives: {
          learningGrowth: avgOf(bscAcc.q12_1_learning_growth_alignment),
          internalProcess: avgOf(bscAcc.q12_2_internal_process_alignment),
          stakeholder: avgOf(bscAcc.q12_3_stakeholder_alignment),
          financial: avgOf(bscAcc.q12_4_financial_alignment),
        },
        vision: {
          clarity: avgOf(bscAcc.q12_6_vision_clarity),
          achievable: avgOf(bscAcc.q12_7_vision_achievable),
          missionAlignment: avgOf(bscAcc.q12_8_mission_alignment),
          bscUseful: avgOf(bscAcc.q12_9_bsc_useful),
        },
        strongestPathwayDistribution: strongestPathwayDist,
        // v2: mean/n/missing keyed by raw field name for both groups.
        perspectivesMeta: metricsOf(Object.fromEntries(bscPerspectiveFields.map((f) => [f, bscAcc[f]])), total),
        visionMeta: metricsOf(Object.fromEntries(bscVisionFields.map((f) => [f, bscAcc[f]])), total),
      },
      budgetAndRisk: {
        fundingMixFair: avgOf(budgetRiskAcc.q13_1_funding_mix_fair),
        targetsRealistic: avgOf(budgetRiskAcc.q13_2_targets_realistic),
        // IMPORTANT: these three are Likert MEANS on a 1–5 concern scale, not
        // counts of respondents. They must never be rendered as a distribution
        // or divided by totalResponses to make a percentage — the three values
        // are independent ratings and do not sum to the sample.
        riskConcern: {
          high: avgOf(budgetRiskAcc.q13_3_high_risk_concern),
          medium: avgOf(budgetRiskAcc.q13_4_medium_risk_concern),
          low: avgOf(budgetRiskAcc.q13_5_low_risk_concern),
        },
        riskConcernKind: "likert_mean_1_5",
        meta: metricsOf(budgetRiskAcc, total),
        budgetPriorityClusterDistribution: budgetPriorityClusterDist,
        blendedFinanceDistribution: blendedFinanceDist,
      },
      engagementDistribution: engagementDist,
    };

    return new Response(JSON.stringify(payload), {
      headers: { ...corsHeaders(req.headers.get("Origin")), "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders(req.headers.get("Origin")), "Content-Type": "application/json" },
    });
  }
});
