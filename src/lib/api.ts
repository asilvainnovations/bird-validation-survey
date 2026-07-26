// src/lib/api.ts
// BIRD 2026–2035 · Survey Submission API
// Posts to Supabase Edge Function: survey-submit

import type { SurveySchemaType } from "@/lib/survey-schema";
import { EDGE_FUNCTIONS, getEdgeFunctionHeaders } from "@/lib/supabase";

export interface SubmissionResponse {
  message: string;
  path?: string;
  responseId?: string;
}

/**
 * Submits the validated survey data to the Supabase Edge Function.
 * Endpoint: POST /functions/v1/survey-submit
 */
export async function submitSurvey(data: Partial<SurveySchemaType>): Promise<SubmissionResponse> {
  const payload = {
    surveyData: {
      metadata: {
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "server",
        platform: typeof navigator !== "undefined" ? navigator.platform : "unknown",
        language: typeof navigator !== "undefined" ? navigator.language : "en",
      },
      // Full 16-section wizard responses — preserved verbatim so no answer is lost.
      raw: data,
      responses: {
        section1_beie: { understanding: data.q1_1, relevance: data.q1_2 },
        section2_mg: {
          importance: data.q2_1,
          implementation: data.q2_2,
          archetype: data.q2_3_archetype,
          peace_milestones: data.q2_4_peace,
        },
        section3_foundations: {
          priorities: data.q3_1_priorities,
          feasibility: data.q3_2_feasibility,
          el_nino_impact: data.q3_el_nino_impact,
          el_nino_likelihood: data.q3_el_nino_like,
          pestalotiopsis_impact: data.q3_pestalotiopsis_impact,
          pestalotiopsis_likelihood: data.q3_pestalotiopsis_like,
          postharvest_impact: data.q3_postharvest_impact,
          postharvest_likelihood: data.q3_postharvest_like,
          limits_growth: data.q3_limits_growth,
        },
        section4_transformers: {
          barrier: data.q4_1_barrier,
          halal_park: data.q4_2_halal_park,
          fixes_fail: data.q4_3_fixes_fail,
          commodity_impact: data.q4_4_commodity_impact,
          heds_ranking: data.q4_5_heds_ranking,
        },
        section5_enablers: {
          infra_rating: data.q5_1_infra,
          sectors: data.q5_2_sectors,
          broadband: data.q5_3_broadband,
          literacy: data.q5_4_literacy,
          stunting: data.q5_5_stunting,
          digital_divide: data.q5_6_digital_divide,
        },
        section6_connectors: {
          bimpeaga_importance: data.q6_1_bimpeaga,
          markets: data.q6_2_markets,
          export_target: data.q6_3_export_target,
          uae_feasibility: data.q6_4_uae_feasibility,
          perception: data.q6_5_perception,
        },
        section7_financiers: {
          criticality: data.q7_1_criticality,
          instruments: data.q7_2_instruments,
          inclusion_target: data.q7_3_inclusion_target,
          asset_paradox: data.q7_4_asset_paradox,
          block_grant: data.q7_5_block_grant,
        },
        section8_options: {
          strategy: data.q8_1_strategy,
          sequencing: data.q8_2_sequencing,
          ieds_confidence: data.q8_3_ieds_confidence,
          heds_confidence: data.q8_4_heds_confidence,
          gems_confidence: data.q8_5_gems_confidence,
          ifes_confidence: data.q8_6_ifes_confidence,
        },
        section9_operating: {
          governance: data.q9_1_governance,
          digital: data.q9_2_digital,
          monitoring: data.q9_3_monitoring,
          feedback: data.q9_4_feedback,
        },
        section10_ieds: {
          phase1: data.q10_1_phase1,
          phase2: data.q10_2_phase2,
          phase3: data.q10_3_phase3,
        },
        section11_metrics: {
          kpi_alignment: data.q11_1_kpi_alignment,
          metrics_clarity: data.q11_2_metrics_clarity,
        },
        section12_bsc: {
          financial: data.q12_1_financial,
          stakeholder: data.q12_2_stakeholder,
          internal: data.q12_3_internal,
          learning: data.q12_4_learning,
        },
        section13_priority: {
          top_actions: data.q13_1_top_actions,
          budget_feasibility: data.q13_2_budget_feasibility,
        },
        section14_resources: {
          resource_needs: data.q14_1_resource_needs,
          engagement: data.q14_2_engagement,
        },
      },
    },
  };

  const response = await fetch(EDGE_FUNCTIONS.SURVEY_SUBMIT, {
    method: "POST",
    headers: getEdgeFunctionHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(`Survey submission failed (${response.status}): ${errorText}`);
  }

  return (await response.json()) as SubmissionResponse;
}
