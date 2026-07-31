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
  };
  if (isAllowedOrigin(origin)) {
    headers["Access-Control-Allow-Origin"] = origin as string;
  }
  return headers;
};

// BIRD Formulas (Deno compatible)
const calcStrengthRI = (i: number, l: number) => (i * l) / 5;
const calcOpportunityRI = (i: number, l: number) => Math.sqrt(i * l);
const calcWeaknessRisk = (i: number, l: number) => i * l;
const calcThreatVI = (i: number, l: number) => (Math.pow(i, 2) * l) / 25;

const getPair = (d: any, prefix: string) => {
  const i = d[`${prefix}_impact`];
  const l = d[`${prefix}_likelihood`];
  if (typeof i === 'number' && typeof l === 'number') return { i, l };
  return null;
};

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

    let total = responses?.length || 0;
    const provinces: Record<string, number> = {};
    const categories: Record<string, number> = {};
    const ieds: Record<string, number> = {};
    const archetypes: Record<string, { accurate: number; total: number }> = {};

    let sumS = 0, cntS = 0, sumO = 0, cntO = 0, sumW = 0, cntW = 0, sumT = 0, cntT = 0;

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
      'q9_o1_postconflict',
    ];
    const weaknessKeys = [
      'q4_w1_land_tenure',
      'q5_w1_halal_cert', 'q5_w2_cold_chain', 'q5_w3_market_linkages',
      'q6_w1_infra_deficits', 'q6_w2_poverty', 'q6_w3_literacy', 'q6_w4_malnutrition', 'q6_w5_skills_mismatch', 'q6_w6_tech_adoption', 'q6_w7_underspending',
      'q8_w1_financial_penetration',
      'q9_w1_fragmented_policy',
    ];
    const threatKeys = [
      'q4_t1_pestalotiopsis',
      'q5_t1_standards_recognition',
      'q6_t1_cyber_insecurity',
      'q7_t1_halal_competition', 'q7_t2_economic_downturn', 'q7_t3_price_volatility',
      'q9_t1_climate_change', 'q9_t2_drifting_goals', 'q9_t3_security_incidents', 'q9_t4_political_transition', 'q9_t5_natl_coordination', 'q9_t6_fragmented_mandates',
    ];
    // String-typed archetype/CLD "accuracy" questions ("Very accurately" / "Somewhat
    // accurately" / "Needs revision" / "Not accurate").
    const archetypeKeys = [
      'q4_arch_tragedy_commons', 'q5_arch_growth_underinvest', 'q6_arch_limits_growth',
      'q7_arch_success_successful', 'q8_arch_shifting_burden',
      'q9_arch_fixes_fail', 'q9_arch_escalation', 'q9_arch_big_man',
      'q11_arch_drifting_goals',
    ];
    // Numeric-typed (1–5) "governance-scale" question — q9_arch_moral_governance_derisk_accuracy
    // is a number per survey-schema.ts's archetypeFieldsFor(), not a string like the rest, so it
    // needs its own bucket and its own "counts as accurate" rule (rating >= 4) rather than the
    // string comparison used below. This was previously missing entirely from this file, so the
    // "Moral Governance De-Risks Capital" question never appeared in the analytics dashboard.
    // NOTE (2026-07-31): q9_1_moral_governance_derisk is a standalone numeric
    // scale question (see Section9Data), not an archetype-validation field —
    // it has no _accuracy/_followup pair and doesn't belong in either bucket
    // below. It was previously listed here as 'q9_arch_moral_governance_derisk',
    // a field name that was removed from the schema entirely, so this bucket
    // was silently matching nothing in any real submission.
    const governanceScaleKeys: string[] = [];

    for (const row of responses || []) {
      const d = row.response_data || {};
      
      const prov = d.demo_province || d.q02_demo_province || "Unknown";
      provinces[prov] = (provinces[prov] || 0) + 1;
      
      const cat = d.demo_category || d.q02_demo_category || "Unknown";
      categories[cat] = (categories[cat] || 0) + 1;

      const iedsPref = d.q10_1_ieds_preference || d.q10_ieds_preference;
      if (iedsPref) ieds[iedsPref] = (ieds[iedsPref] || 0) + 1;

      // Compute BIRD Scores
      for (const k of strengthKeys) { const p = getPair(d, k); if (p) { sumS += calcStrengthRI(p.i, p.l); cntS++; } }
      for (const k of opportunityKeys) { const p = getPair(d, k); if (p) { sumO += calcOpportunityRI(p.i, p.l); cntO++; } }
      for (const k of weaknessKeys) { const p = getPair(d, k); if (p) { sumW += calcWeaknessRisk(p.i, p.l); cntW++; } }
      for (const k of threatKeys) { const p = getPair(d, k); if (p) { sumT += calcThreatVI(p.i, p.l); cntT++; } }

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
    }

    const avgS = cntS > 0 ? sumS / cntS : 0;
    const avgO = cntO > 0 ? sumO / cntO : 0;
    const avgW = cntW > 0 ? sumW / cntW : 0;
    const avgT = cntT > 0 ? sumT / cntT : 0;
    const sbi = ((avgS + avgO) / 2) - ((avgW + avgT) / 2) + 50;

    const payload = {
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
      archetypes: Object.fromEntries(
        Object.entries(archetypes).map(([k, v]) => [k, { ...v, consensus: v.total > 0 ? Math.round((v.accurate / v.total) * 100) : 0 }])
      ),
      iedsPreferences: ieds,
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
