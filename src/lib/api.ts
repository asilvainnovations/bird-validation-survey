// src/lib/api.ts
// BIRD 2026–2035 · Survey Submission API
// Posts to Supabase Edge Function: survey-submit

import type { SurveySchemaType } from "@/lib/survey-schema";
import { EDGE_FUNCTIONS, getEdgeFunctionHeaders } from "@/lib/supabase";

export interface SubmissionResponse {
  success: boolean;
  id?: string;
  message?: string;
}

/**
 * Submits the validated survey data to the Supabase Edge Function.
 * The Edge Function stores the flat payload in survey_responses.response_data (JSONB)
 * and extracts demo_province / demo_category for dashboard filtering.
 *
 * @param data — Flat survey data from SurveyWizard (extends SurveySchemaType)
 */
export async function submitSurvey(data: Partial<SurveySchemaType>): Promise<SubmissionResponse> {
  // consent_final is derived — never trusted as a pre-set true — from the
  // actual consent answer. If the respondent did not affirmatively consent,
  // this must be false so the Edge Function rejects the submission.
  const payload = {
    ...data,
    consent_final: data.q01_consent_participate === true,
    // Metadata for audit trail
    _meta: {
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "server",
      platform: typeof navigator !== "undefined" ? navigator.platform : "unknown",
      language: typeof navigator !== "undefined" ? navigator.language : "en",
      source: "bird-validation-survey-spa",
    },
  };

  const response = await fetch(EDGE_FUNCTIONS.SUBMIT_SURVEY, {
    method: "POST",
    headers: getEdgeFunctionHeaders(),
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({
    error: `HTTP ${response.status}: ${response.statusText}`,
  }));

  if (!response.ok) {
    throw new Error(result.error || `Submission failed: ${response.status}`);
  }

  return result as SubmissionResponse;
}
