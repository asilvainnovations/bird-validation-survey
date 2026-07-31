// src/lib/universalQuestions.ts
// BIRD 2026–2035 · Universal Cross-Cluster Likert Questions
//
// Three questions, worded and scaled identically, asked once per cluster
// section (4 through 9). Defined here exactly once — the same "single
// source of truth, not six hand-copies" pattern already used for SWOT items
// (swot-content.ts) and required fields (requiredFields.ts) — specifically
// to avoid the exact copy-paste drift bug class found repeatedly elsewhere
// in this survey this session.
//
// Deliberately orthogonal, not three flavors of "how much do you like this
// cluster": Confidence measures belief in the strategy itself; Readiness
// measures belief in institutional capacity to execute it; Urgency measures
// relative prioritization against BARMM's other investment priorities. A
// respondent can legitimately score high on one and low on another (e.g.
// "the right plan, but institutions aren't ready yet").

import {
  CONFIDENCE_SCALE,
  READINESS_SCALE,
  URGENCY_SCALE,
  type ScaleLabelSet,
} from "./scaleLabels";

export type UniversalQuestionId = "confidence" | "readiness" | "urgency";

export interface UniversalQuestion {
  id: UniversalQuestionId;
  label: string;
  /** Passed directly to LikertScale's `labels` prop — see scaleLabels.ts. */
  scale: ScaleLabelSet;
}

export const UNIVERSAL_QUESTIONS: readonly UniversalQuestion[] = [
  {
    id: "confidence",
    label:
      "How confident are you that this cluster's proposed strategy is the right direction for BARMM?",
    scale: CONFIDENCE_SCALE,
  },
  {
    id: "readiness",
    label:
      "How ready is BARMM's current institutional capacity to implement this cluster's priorities?",
    scale: READINESS_SCALE,
  },
  {
    id: "urgency",
    label:
      "How urgent is action in this cluster relative to BARMM's other investment priorities?",
    scale: URGENCY_SCALE,
  },
] as const;

/** The 6 cluster sections these questions repeat in — Foundations through
 * Operating Systems. Not Section 3 (no SWOT/cluster content) or 10+
 * (post-cluster strategy sections). */
export const UNIVERSAL_QUESTION_SECTIONS: readonly number[] = [4, 5, 6, 7, 8, 9];

/** Canonical field name for a given section + question, e.g.
 * `q4_universal_confidence`. Both survey-schema.ts and every SectionN_*.tsx
 * component should build the field name through this function rather than
 * hand-typing `q${n}_universal_${id}` themselves. */
export function universalFieldName(
  sectionNumber: number,
  questionId: UniversalQuestionId
): string {
  return `q${sectionNumber}_universal_${questionId}`;
}
