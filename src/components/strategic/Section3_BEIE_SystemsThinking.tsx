import React from "react";
import { Network } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SurveySchemaType } from "@/lib/survey-schema";
import { BIRD_IMAGES, BIRD_VIDEOS } from "@/lib/bird-ads"; // Note: Ensure this matches your actual bird-urls.ts path

// ✅ STRICT UI IMPORTS (No custom wrappers)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// ✅ TYPE SAFETY: Extract EXACT keys from the master schema
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

export const Section3_BEIE_SystemsThinking: React.FC<Section3Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section3Data>(field: K, value: Section3Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  const understandingOptions = [
    "Very well — I see the interconnected value",
    "Somewhat — I grasp the concept but need clarity on linkages",
    "Familiar with sector-based only — ecosystems are new to me",
    "Not familiar with either approach",
  ];

  const relevanceOptions = ["Highly relevant", "Moderately relevant", "Somewhat relevant", "Not relevant"];
  const clusterOptions = ["Foundations", "Transformers", "Enablers", "Connectors", "Financiers", "Multiple clusters", "Observer / External partner"];

  const strengthFactors = [
    {
      label: "Halal Legitimacy & Cultural Credibility",
      description: "BARMM's authentic Muslim-majority identity provides unmatched credibility for halal branding and global market access.",
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

  const activeBtnClass = "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90";
  const inactiveBtnClass = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]";
  const activeScaleClass = "bg-[#C9A84C] text-white border-[#C9A84C] hover:bg-[#C9A84C]/90";
  const inactiveScaleClass = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Network className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">Section 3: Systems Thinking & BEIE Framework</h2>
      </div>
      <p className="text-sm text-[#065f46] mb-4">
        Before evaluating specific clusters, let's establish the conceptual foundation. The BEIE framework shifts from siloed sector planning to an interconnected ecosystem approach.
      </p>

      {/* 1. Video Card */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between text-[#022c22]">
            The Bangsamoro Economic and Investment Ecosystem (BEIE) Framework
            <span className="px-2 py-1 rounded text-xs font-semibold bg-[#C9A84C]/10 text-[#C9A84C]">~4 mins</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg aspect-video">
            <iframe
              src={BIRD_VIDEOS.strategicOptions.url.replace("youtu.be/", "youtube.com/embed/")} 
              title="BEIE Framework"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-sm text-[#065f46]">
            Don’t just read about the framework—see it in action. Watch now to understand how these drivers of change will shape the future of Bangsamoro’s economy and investment landscape.
          </p>
        </CardContent>
      </Card>

      {/* 2. Operating Systems Image */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-base font-semibold text-[#022c22]">The Operating System: Moral Governance at the Core</h3>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src={BIRD_IMAGES.operatingSystems.url}
              alt={BIRD_IMAGES.operatingSystems.alt}
              className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">Moral Governance: The Operating System of the Bangsamoro Economy</p>
            </div>
          </div>
          <p className="text-sm text-[#065f46]">
            At the core of the Bangsamoro Economic and Investment Ecosystem is <strong>Moral Governance</strong>—ensuring justice, transparency, accountability, and Islamic ethics (khalifa stewardship). Surrounding it are three foundational pillars that serve as the operating system determining whether all other clusters function effectively, equitably, and sustainably.
          </p>
        </CardContent>
      </Card>

      {/* 3. BEIE Validation Questions */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardContent className="pt-6 space-y-6">
          {/* Q3.1 */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-[#022c22]">
              Q3.1 How can stakeholders across government, business, and civil society work together to make the BEIE ecosystem approach more actionable in real investment planning?
            </Label>
            <Textarea
              value={data.q3_1_beie_collaboration || ""}
              onChange={(e) => update("q3_1_beie_collaboration", e.target.value)}
              placeholder="Write your answer in one to two sentences..."
              rows={3}
              className="bg-white border-[#C9A84C]/30 focus-visible:ring-[#C9A84C] text-[#022c22] placeholder:text-[#065f46]/50"
            />
          </div>

          {/* Q3.2 */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-[#022c22]">
              Q3.2 How well do you understand the BEIE ecosystem approach compared to traditional sector-based planning?
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {understandingOptions.map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn("justify-start h-auto py-3 text-sm text-left", data.q3_2_beie_understanding === opt ? activeBtnClass : inactiveBtnClass)}
                  onClick={() => update("q3_2_beie_understanding", opt)}
                >
                  {opt}
                </Button>
                ))}
            </div>
          </div>

          {/* Q3.3 */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-[#022c22]">
              Q3.3 How relevant is the BEIE framework to real-world investment planning in your province or organization?
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {relevanceOptions.map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn("justify-start h-auto py-3 text-sm text-left", data.q3_3_beie_relevance === opt ? activeBtnClass : inactiveBtnClass)}
                  onClick={() => update("q3_3_beie_relevance", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>

          {/* Q3.4 */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-[#022c22]">
              Q3.4 Where does your organization belong in the economic and investment ecosystem?
            </Label>
            <Select value={data.q3_4_cluster_position} onValueChange={(val) => update("q3_4_cluster_position", val)}>
              <SelectTrigger className="bg-white border-[#C9A84C]/30 focus:ring-[#C9A84C] text-[#022c22]">
                <SelectValue placeholder="Select your cluster position..." />
              </SelectTrigger>
              <SelectContent>
                {clusterOptions.map((opt) => (
                  <SelectItem key={opt} value={opt} className="text-[#022c22] focus:bg-[#1B4D3E] focus:text-white">
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 4. SWOT Scale: Key Strengths */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardContent className="pt-6 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">STRENGTH</span>
            <h3 className="text-base font-semibold text-[#022c22]">Foundational Strengths of BARMM</h3>
          </div>
          <p className="text-xs text-[#065f46] italic mb-4">
            Rate each factor: Impact (1 = very small effect, 5 = very large effect) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>
          
          {strengthFactors.map((factor, idx) => (
            <div key={factor.label} className={cn("space-y-3", idx < strengthFactors.length - 1 && "pb-6 border-b border-[#C9A84C]/20")}>
              <p className="text-sm font-medium text-[#022c22]">
                <strong>S{idx + 1}: {factor.label}.</strong> {factor.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-xs text-[#065f46]">Impact (1–5)</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <Button
                        key={v}
                        type="button"
                        variant="outline"
                        size="icon"
                        className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data[factor.impactField] === v ? activeScaleClass : inactiveScaleClass)}
                        onClick={() => update(factor.impactField, v)}
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-[#065f46]">Likelihood (1–5)</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <Button
                        key={v}
                        type="button"
                        variant="outline"
                        size="icon"
                        className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data[factor.likelihoodField] === v ? activeScaleClass : inactiveScaleClass)}
                        onClick={() => update(factor.likelihoodField, v)}
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Section3_BEIE_SystemsThinking;
