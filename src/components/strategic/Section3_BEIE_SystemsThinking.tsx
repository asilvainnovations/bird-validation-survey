import React from "react";
import { Sparkles, Play, ArrowRight, BookOpen, BarChart3, Users } from "lucide-react";
import { cn } from "@/lib/utils";
// ✅ IMPORT: Single source of truth for types
import type { SurveySchemaType } from "@/lib/survey-schema";

// ✅ TYPE SAFETY: Extract only the fields this section manages
export type Section0Data = Pick<
  SurveySchemaType,
  "q0_1_ready" | "q0_2_ecosystem_understanding" | "q0_3_systems_thinking_value"
>;

interface Section0Props {
  data: Section0Data;
  onChange: (data: Section0Data) => void;
}

// Note: In production, move this to @/components/strategic/SurveyCard.tsx
const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={cn("rounded-xl border border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm p-6", className)}>
    {children}
 this section manages
export type Section3Data = Pick<
  SurveySchemaType,
  | "q3_1_beie_collaboration"
  | "q3_2_beie_understanding"
  | "q3_3_beie_relevance"
  | "q3_4_cluster_position"
  | "q_s1_halal_legitimacy_impact"
  | "q_s1_halal_legitimacy_likelihood"
  | "q_s1_bimpeaga_impact"
  | "q_s1_bimpeaga_likelihood"
  | "q_s1_aff_base_impact"
  | "q_s1_aff_base_likelihood"
>;

interface Section3Props {
  data: Section3Data;
  onChange: (data: Section3Data) => void;
}

const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={cn("rounded-xl border border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm p-6", className)}>
    {children}
  </div>
);

const Section3_BEIE_SystemsThinking: React.FC<Section3Props> = ({ data, onChange }) => {
  // ✅ Type-safe update function
  const update = <K extends keyof Section3Data>(field: K, value: Section3Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  const understandingOptions = [
    "Very well — I see the interconnected value",
    "Somewhat — I grasp the concept but need clarity on linkages",
    "Familiar with sector-based only — ecosystems are new to me",
    "Not familiar with either approach",
  ];

  const strengthFactors = [
    {
      label: "Halal Legitimacy & Cultural Credibility",
      description: "BARMM's authentic Muslim-majority identity provides unmatched credibility for halal branding.",
      impactField: "q_s1_halal_legitimacy_impact" as keyof Section3Data,
      likelihoodField: "q_s1_halal_legitimacy_likelihood" as keyof Section3Data,
    },
    {
      label: "Strategic BIMP-EAGA Location",
      description: "BARMM is close to Sabah and ASEAN trade routes, making it a natural gateway for regional trade.",
      impactField: "q_s1_bimpeaga_impact" as keyof Section3Data,
      likelihoodField: "q_s1_bimpeaga_likelihood" as keyof Section3Data,
    },
    {
      label: "Strong Agriculture, Fisheries, Forestry Base",
      description: "Strong resources in rubber, coconut, seaweed, fisheries, halal farm products, and rice.",
      impactField: "q_s1_aff_base_impact" as keyof Section3Data,
      likelihoodField: "q_s1_aff_base_likelihood" as keyof Section3Data,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Network className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">Section 3: Systems Thinking & BEIE Framework</h2>
      </div>

      {/* ... (Video and Image Cards remain the same as previous output) ... */}

      <GlassCard className="!p-6 space-y-6">
        {/* Q3.1 */}
        <div>
          <h3 className="text-base font-semibold text-[#022c22] mb-3">
            Q3.1 How can stakeholders across government, business, and civil society work together to make
            the BEIE ecosystem approach more actionable in real investment planning?
          </h3>
          <textarea
            value={data.q3_1_beie_collaboration || ""}
            onChange={(e) => update("q3_1_beie_collaboration", e.target.value)}
            placeholder="Write your answer in one to two sentences..."
            rows={3}
            className="w-full rounded-lg border border-[#C9A84C]/30 bg-white px-4 py-3 text-sm text-[#022c22] placeholder:text-[#065f46]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent resize-none"
          />
        </div>

        {/* Q3.2 */}
        <div>
          <h3 className="text-base font-semibold text-[#022c22] mb-3">
            Q3.2 How well do you understand the BEIE ecosystem approach compared to traditional sector-based planning?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {understandingOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => update("q3_2_beie_understanding", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q3_2_beie_understanding === opt
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* SWOT Scale Section */}
        <div className="pt-4 border-t border-[#C9A84C]/20">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">STRENGTH</span>
            <h3 className="text-base font-semibold text-[#022c22] ml-2">Foundational Strengths of BARMM</h3>
          </div>
          
          {strengthFactors.map((factor, idx) => (
            <div key={factor.label} className={cn("space-y-3", idx < strengthFactors.length - 1 && "pb-6 border-b border-[#C9A84C]/20")}>
              <p className="text-sm font-medium text-[#022c22]">
                <strong>S{idx + 1}: {factor.label}.</strong> {factor.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <button
                        key={v}
                        onClick={() => update(factor.impactField, v)}
                        className={cn(
                          "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                          data[factor.impactField] === v
                            ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                            : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                        )}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <button
                        key={v}
                        onClick={() => update(factor.likelihoodField, v)}
                        className={cn(
                          "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                          data[factor.likelihoodField] === v
                            ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                            : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                        )}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default Section3_BEIE_SystemsThinking;
