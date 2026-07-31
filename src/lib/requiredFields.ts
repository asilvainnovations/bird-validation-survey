// src/lib/requiredFields.ts
// BIRD 2026–2035 · Single source of truth for "which questions are required"
//
// WHY THIS FILE EXISTS
// Before this file, "required" vs "optional" was a scattered decision: partly
// encoded in survey-schema.ts's Zod wrappers (optionalString vs a required
// variant), but never actually *enforced* anywhere at runtime — neither the
// client nor the Edge Function ever called surveySchema.parse()/.safeParse()
// on the submission payload. In practice, only two things ever blocked
// submission: the consent checkbox and the "ready to submit" checkbox,
// both hardcoded directly in SurveyWizard.tsx's handleSubmit.
//
// This file makes "required" a single, explicit, centrally-editable list
// instead of an implicit scattering of decisions. survey-schema.ts reads
// this list to decide which fields actually fail validation; the UI (see
// Section15_Submission.tsx's "Missing Required Answers" summary) reads the
// same list to tell respondents what's blocking them, with a human-readable
// label and a jump-to-section link.
//
// PILOT MODE (current state, 2026-07-30): only consent is required, matching
// exactly what was enforced before this file existed — adding this
// infrastructure changes nothing about today's behavior. After testing
// concludes, making additional questions required is a one-line addition to
// REQUIRED_FIELD_KEYS below — no changes needed to survey-schema.ts, any
// SectionN_*.tsx component, or the submission payload logic.

/**
 * Every field key in this list must exactly match a key in `surveySchema`
 * (src/lib/survey-schema.ts) — i.e. the *submission payload* key, not the
 * internal component state key. For Sections 1 and 2 specifically, remember
 * the internal state uses bare names (`consent_participate`, `demo_name`)
 * translated to `q1_`/`q2_`-prefixed names only at submission time — always
 * use the q1_/q2_-prefixed (submission) name here, since that's what the
 * schema and the missing-fields check both operate on.
 */
export const REQUIRED_FIELD_KEYS: readonly string[] = [
  "q1_consent_participate",
  // Add more keys here after testing concludes, e.g.:
  // "q2_demo_category",
  // "q4_arch_tragedy_commons_accuracy",
];

/**
 * Human-readable label + wizard step number for every field that's ever
 * likely to become required. Only entries whose key appears in
 * REQUIRED_FIELD_KEYS are actually shown to respondents (see
 * getMissingRequiredFields below) — this map can safely contain more
 * entries than are currently required, ready for when you expand the list.
 */
export const FIELD_METADATA: Readonly<
  Record<string, { label: string; step: number }>
> = {
  q1_consent_participate: { label: "Consent to participate", step: 1 },
  q2_demo_category: { label: "Stakeholder category", step: 2 },
  q2_demo_province: { label: "Province / region of engagement", step: 2 },
  q2_demo_expertise: { label: "Areas of expertise", step: 2 },
  q2_network_accuracy: { label: "BARMM Value Network accuracy rating", step: 2 },
  q4_arch_tragedy_commons_accuracy: {
    label: "Tragedy of the Commons archetype validation",
    step: 4,
  },
  q5_arch_growth_underinvest_accuracy: {
    label: "Growth and Underinvestment archetype validation",
    step: 5,
  },
  q6_arch_limits_growth_accuracy: {
    label: "Limits to Growth archetype validation",
    step: 6,
  },
  q7_arch_success_successful_accuracy: {
    label: "Success to the Successful archetype validation",
    step: 7,
  },
  q8_arch_shifting_burden_accuracy: {
    label: "Shifting the Burden archetype validation",
    step: 8,
  },
  q10_1_ieds_preference: { label: "IEDS strategy preference", step: 10 },
  q13_6_budget_priority_phase: { label: "Budget priority phase", step: 13 },
};

/** Convenience lookup used by both the schema and the UI. */
export function isFieldRequired(key: string): boolean {
  return REQUIRED_FIELD_KEYS.includes(key);
}

/** Shape used by SurveyWizard's missingRequiredFields state and the
 * Section15_Submission "Missing Required Answers" summary. */
export interface MissingField {
  key: string;
  label: string;
  step: number;
}
