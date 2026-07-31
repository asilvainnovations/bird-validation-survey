// src/lib/scaleLabels.ts
// BIRD 2026–2035 · Canonical 1–5 scale labels
//
// WHY THIS FILE EXISTS
// Every 1-5 scale question in the survey previously showed only its two
// endpoint labels (e.g. "1 = not at all, 5 = completely") — the middle three
// points (2, 3, 4) were unlabeled buttons. A respondent had to guess what
// "3" meant relative to "2" or "4" on each and every question. This file
// gives every scale TYPE (not every individual question — see below) one
// short, consistent 5-point label set, so "3" always means the same kind of
// thing across every "understanding" question, every "confidence" question,
// etc.
//
// DESIGN NOTE: labels here are short (1–3 words) so they can sit visibly
// under each of the 5 buttons without crowding the layout, especially on
// mobile. The fuller parenthetical descriptions (e.g. "Slightly — I have a
// minimal grasp, but it's still unclear") are valuable as calibration
// guidance, so they're kept here as an optional `hint` per point, surfaced
// as a tooltip/aria-description rather than always-visible body text.
//
// Each set is a tuple of exactly 5 { label, hint } pairs, points 1–5 in order.

export interface ScalePoint {
  label: string;
  hint?: string;
}

export type ScaleLabelSet = readonly [
  ScalePoint,
  ScalePoint,
  ScalePoint,
  ScalePoint,
  ScalePoint
];

/** Comprehension / "how well did you understand X" questions. */
export const UNDERSTANDING_SCALE: ScaleLabelSet = [
  { label: "Not at all", hint: "I don't understand this concept." },
  { label: "Slightly", hint: "I have a minimal grasp, but it's still unclear." },
  { label: "Moderately", hint: "I understand some parts, but not fully confident." },
  { label: "Mostly", hint: "I grasp most of the concept, with minor gaps." },
  { label: "Completely", hint: "I fully understand this concept with confidence." },
];

/** "How valuable/useful is X" questions. */
export const VALUE_SCALE: ScaleLabelSet = [
  { label: "Not valuable", hint: "This adds little or no value." },
  { label: "Slightly valuable", hint: "Minor, limited value." },
  { label: "Moderately valuable", hint: "Meaningful but not central value." },
  { label: "Very valuable", hint: "Substantial, clear value." },
  { label: "Extremely valuable", hint: "Essential, high-impact value." },
];

/** "How confident are you that X" / achievability questions. */
export const CONFIDENCE_SCALE: ScaleLabelSet = [
  { label: "Not confident", hint: "I don't believe this is achievable." },
  { label: "Slightly confident", hint: "Possible, but significant doubt remains." },
  { label: "Moderately confident", hint: "Plausible, with real uncertainty." },
  { label: "Very confident", hint: "Likely achievable, minor doubts only." },
  { label: "Completely confident", hint: "I'm fully confident this is achievable." },
];

/** "How clear is X" questions (visions, statements, diagrams). */
export const CLARITY_SCALE: ScaleLabelSet = [
  { label: "Not clear", hint: "This is confusing or ambiguous." },
  { label: "Slightly clear", hint: "Mostly unclear, a few understandable parts." },
  { label: "Moderately clear", hint: "Understandable with some effort." },
  { label: "Very clear", hint: "Easy to understand, minor ambiguity." },
  { label: "Extremely clear", hint: "Completely unambiguous and easy to follow." },
];

/** "How effective is X" questions (sequencing, frameworks, mechanisms). */
export const EFFECTIVENESS_SCALE: ScaleLabelSet = [
  { label: "Not effective", hint: "This will not achieve its intended goal." },
  { label: "Slightly effective", hint: "Limited impact toward the goal." },
  { label: "Moderately effective", hint: "Partial progress toward the goal." },
  { label: "Very effective", hint: "Strong progress toward the goal." },
  { label: "Highly effective", hint: "Fully achieves its intended goal." },
];

/** "How concerned are you about X" risk questions. */
export const CONCERN_SCALE: ScaleLabelSet = [
  { label: "Not concerned", hint: "This poses no real worry." },
  { label: "Slightly concerned", hint: "A minor, low-priority worry." },
  { label: "Moderately concerned", hint: "A real but manageable worry." },
  { label: "Very concerned", hint: "A serious worry needing attention." },
  { label: "Extremely concerned", hint: "A critical, urgent worry." },
];

/** "How realistic/achievable is X" (targets, budgets, timelines). */
export const REALISM_SCALE: ScaleLabelSet = [
  { label: "Unrealistic", hint: "This is very unlikely to be achieved." },
  { label: "Somewhat unrealistic", hint: "Achievable only under ideal conditions." },
  { label: "Moderately realistic", hint: "Achievable with real effort." },
  { label: "Very realistic", hint: "Achievable under normal conditions." },
  { label: "Fully realistic", hint: "Confidently achievable as stated." },
];

/** Generic magnitude scale (e.g. Impact severity in SWOT ratings). */
export const MAGNITUDE_SCALE: ScaleLabelSet = [
  { label: "Very small", hint: "Minimal effect." },
  { label: "Small", hint: "Limited effect." },
  { label: "Moderate", hint: "Noticeable, moderate effect." },
  { label: "Large", hint: "Substantial effect." },
  { label: "Very large", hint: "Transformative, major effect." },
];

/** Generic likelihood/probability scale (e.g. SWOT Likelihood ratings). */
export const LIKELIHOOD_SCALE: ScaleLabelSet = [
  { label: "Very unlikely", hint: "Almost certainly will not happen." },
  { label: "Unlikely", hint: "Probably will not happen." },
  { label: "Possible", hint: "Could go either way." },
  { label: "Likely", hint: "Probably will happen." },
  { label: "Very likely", hint: "Almost certainly will happen." },
];

/** Generic low↔high scale, used where no more specific set applies. */
export const LOW_HIGH_SCALE: ScaleLabelSet = [
  { label: "Low", hint: "Well below what would be needed." },
  { label: "Below average", hint: "Somewhat short of what would be needed." },
  { label: "Moderate", hint: "Roughly adequate, neither strong nor weak." },
  { label: "Above average", hint: "Comfortably more than adequate." },
  { label: "High", hint: "Well beyond what would be needed." },
];

/** Agreement scale (e.g. "do you agree with this logic"). */
export const AGREEMENT_SCALE: ScaleLabelSet = [
  { label: "Strongly disagree", hint: "I don't believe this at all." },
  { label: "Disagree", hint: "I lean toward not believing this." },
  { label: "Neutral", hint: "I'm genuinely unsure either way." },
  { label: "Agree", hint: "I lean toward believing this." },
  { label: "Strongly agree", hint: "I fully believe this." },
];

/** Priority/importance scale (e.g. KPI importance ratings). */
export const IMPORTANCE_SCALE: ScaleLabelSet = [
  { label: "Not important", hint: "This could be dropped with no real loss." },
  { label: "Slightly important", hint: "Nice to have, but easily deprioritized." },
  { label: "Moderately important", hint: "Genuinely useful, but not a top priority." },
  { label: "Very important", hint: "A high priority that should not be dropped." },
  { label: "Critical", hint: "Essential — the effort fails without this." },
];

/** "How ready is BARMM's institutional capacity to implement X" — distinct
 * from CONFIDENCE_SCALE, which asks belief in the *strategy*, not belief in
 * *current capacity to execute it*. See universalQuestions.ts. */
export const READINESS_SCALE: ScaleLabelSet = [
  { label: "Not ready at all", hint: "Institutions currently lack the capacity to act on this." },
  { label: "Slightly ready", hint: "Early groundwork exists, but major gaps remain." },
  { label: "Moderately ready", hint: "Some real capacity, with real gaps still to close." },
  { label: "Very ready", hint: "Strong capacity, with only minor gaps remaining." },
  { label: "Fully ready", hint: "Institutions are fully equipped to act on this now." },
];

/** "How urgent is action in X relative to other priorities" — a relative
 * prioritization scale, distinct from CONCERN_SCALE (risk) or IMPORTANCE_SCALE
 * (importance in isolation). See universalQuestions.ts. */
export const URGENCY_SCALE: ScaleLabelSet = [
  { label: "Low urgency", hint: "Can reasonably wait behind other priorities." },
  { label: "Some urgency", hint: "Worth scheduling soon, but not first in line." },
  { label: "Moderate urgency", hint: "Should be addressed in the near term." },
  { label: "High urgency", hint: "Should be prioritized ahead of most other work." },
  { label: "Critical urgency", hint: "Needs immediate action, ahead of nearly everything else." },
];

/** Convert a ScaleLabelSet to a plain 5-tuple of strings, for primitives
 * that only need the short label text (e.g. LikertScale's `labels` prop
 * expects [string,string,string,string,string], not the {label,hint} shape). */
export function toLabelTuple(
  set: ScaleLabelSet
): [string, string, string, string, string] {
  return [set[0].label, set[1].label, set[2].label, set[3].label, set[4].label];
}
