// supabase/functions/survey-analytics/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGINS = [
  "http://localhost:5173", "http://localhost:8080",
  "https://bird-validation-survey.bolt.host", "https://asilvainnovations.com",
];

const corsHeaders = (origin: string | null) => ({
  "Access-Control-Allow-Origin": origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
});

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

    const { data: responses, error } = await supabase
      .from("survey_responses")
      .select("id, demo_province, demo_category, created_at, response_data");

    if (error) throw error;

    let total = responses?.length || 0;
    const provinces: Record<string, number> = {};
    const categories: Record<string, number> = {};
    const ieds: Record<string, number> = {};
    const archetypes: Record<string, { accurate: number; total: number }> = {};

    let sumS = 0, cntS = 0, sumO = 0, cntO = 0, sumW = 0, cntW = 0, sumT = 0, cntT = 0;

    // Keys mapped directly from SurveyWizard.tsx computeBIRDScores logic
    const strengthKeys = ['q_s1_halal_legitimacy', 'q_s1_bimpeaga', 'q_s1_aff_base', 'q_s6_youth_pop', 'q_s6_renewable_energy', 'q_s7_bimpeaga_loc', 'q_s7_domestic_halal', 'q_s8_islamic_finance_fw', 'q_s8_peace_dividend', 'q_s9_policy_recognition', 'q_s9_peace_dividend'];
    const opportunityKeys = ['q_s5_global_halal', 'q_s6_renewable_invest', 'q_s7_asean_halal', 'q_s7_uae_corridor', 'q_s8_islamic_ecosystem', 'q_s8_uae_corridor', 'q_s9_carbon_markets', 'q_s9_postconflict'];
    const weaknessKeys = ['q4_8_postharvest', 'q4_10_poverty', 'q5_7_halal_cert', 'q_s6_infra_deficits', 'q_s6_literacy', 'q_s7_infra_deficits', 'q_s7_market_linkages', 'q_s8_financial_penetration', 'q_s8_literacy', 'q_s9_literacy', 'q_s9_underspending'];
    const threatKeys = ['q4_4_climate', 'q4_6_pestalotiopsis', 'q5_15_competition', 'q_s6_political_transition', 'q_s7_halal_competition', 'q_s8_halal_standards', 'q_s9_security_incidents', 'q_s9_political_transition'];
    const archetypeKeys = ['q_s4_tragedy_commons', 'q_s5_growth_underinvest', 'q_s6_limits_growth', 'q_s7_escalation', 'q_s8_big_man', 'q_s9_investment_loop', 'q_s9_governance_loop', 'q_s11_drifting_goals'];

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

      // Archetype Consensus
      for (const a of archetypeKeys) {
        const val = d[a];
        if (val) {
          if (!archetypes[a]) archetypes[a] = { accurate: 0, total: 0 };
          archetypes[a].total++;
          if (val === "Very accurately" || val === "Somewhat accurately") archetypes[a].accurate++;
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
