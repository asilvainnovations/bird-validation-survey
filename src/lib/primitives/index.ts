// src/lib/primitives/index.ts
// BIRD 2026–2035 · Reusable survey UI primitives
//
// All primitives are aligned with the canonical schemas in:
//   @/lib/swot-content.ts  (SwotCategory, ArchetypeQuestion, SWOT_BY_SECTION)
//   @/lib/formulas.ts      (calculateSWOTMetric, scoreResilience)
//   @/lib/bird-urls.ts     (BIRD_IMAGES keyed object registry)

export { ImageWithFallback } from "./ImageWithFallback";
export { LikertScale } from "./LikertScale";
export { SectionProgress } from "./SectionProgress";
export { QuizCard } from "./QuizCard";
export { SWOTScalePair } from "./SWOTScalePair";
export { ArchetypeCard } from "./ArchetypeCard";

// Re-export canonical types so consumers don't need to import from multiple files.
export type { SwotCategory } from "@/lib/swot-content";
