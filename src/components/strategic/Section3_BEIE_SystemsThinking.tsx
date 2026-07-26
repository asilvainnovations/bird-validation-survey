import React from "react";
import { Network } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SurveySchemaType } from "@/lib/survey-schema";
import { BIRD_IMAGES, BIRD_VIDEOS } from "@/lib/bird-urls";

// ✅ STRICT UI IMPORTS (No custom wrappers)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// ✅ TYPE SAFETY: Extract EXACT keys from the master schema
// Note: Ensure these new q3_5 to q3_10 fields are added to your survey-schema.ts
export type Section3Data = Pick<
  SurveySchemaType,
  | "q3_1_beie_collaboration"
  | "q3_2_beie_understanding"
  | "q3_3_beie_relevance"
  | "q3_4_cluster_position"
  | "q3_5_systems_reframing"
  | "q3_6_sector_to_ecosystem"
  | "q3_7_beie_interconnectedness"
  | "q3_8_five_clusters_understanding"
  | "q3_9_virtuous_cycle_accuracy"
  | "q3_10_governance_investment_sync"
>;

interface Section3Props {
  data: Section3Data;
  onChange: (data: Section3Data) => void;
}

export const Section3_BEIE_SystemsThinking: React.FC<Section3Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section3Data>(field: K, value: Section3Data[K]) => {
    onChange({ ...data, [field]: value });
    // Fallback for schema compatibility if fields are temporarily missing
    if (value === undefined) {
      onChange({ ...data, [field]: 0 } as any);
    }
  };

  const understandingOptions = [
    "Very well — I see the interconnected value",
    "Somewhat — I grasp the concept but need clarity on linkages",
    "Familiar with sector-based only — ecosystems are new to me",
    "Not familiar with either approach",
  ];

  const relevanceOptions = ["Highly relevant", "Moderately relevant", "Somewhat relevant", "Not relevant"];
  const clusterOptions = ["Foundations", "Transformers", "Enablers", "Connectors", "Financiers", "Multiple clusters", "Observer / External partner"];

  const activeBtnClass = "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90";
  const inactiveBtnClass = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]";
  const activeScaleClass = "bg-[#C9A84C] text-white border-[#C9A84C] hover:bg-[#C9A84C]/90";
  const inactiveScaleClass = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]";

  // Helper for 1-5 scale rendering
  const renderScale = (field: keyof Section3Data, labelMin: string, labelMax: string) => (
    <div className="space-y-2">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((v) => (
          <Button
            key={v}
            type="button"
            variant="outline"
            size="icon"
            className={cn("w-12 h-12 rounded-lg text-sm font-semibold", (data[field] as number) === v ? activeScaleClass : inactiveScaleClass)}
            onClick={() => update(field, v)}
          >
            {v}
          </Button>
        ))}
      </div>
      <div className="flex justify-between text-xs text-[#065f46] px-1">
        <span>{labelMin}</span>
        <span>{labelMax}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Network className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">Section 3: Systems Thinking & BEIE Framework</h2>
      </div>
      <p className="text-sm text-[#065f46] mb-4">
        Before evaluating specific clusters, let's establish the conceptual foundation. The BEIE framework shifts from siloed sector planning to an interconnected ecosystem approach.
      </p>

      {/* 1. Video Banner */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between text-[#022c22]">
            Bangsamoro Economic & Investment Ecosystem (BEIE) Framework
            <span className="px-2 py-1 rounded text-xs font-semibold bg-[#C9A84C]/10 text-[#C9A84C]">~3 mins</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg aspect-video">
            <iframe
              src={BIRD_VIDEOS.beieFramework.url.replace("youtu.be/", "youtube.com/embed/")} 
              title={BIRD_VIDEOS.beieFramework.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-sm text-[#065f46] leading-relaxed">
            {BIRD_VIDEOS.beieFramework.description}
          </p>
        </CardContent>
      </Card>

      {/* 2. Why the Need for Systems-Based Reframing */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-base font-semibold text-[#022c22]">Why the Need for Systems-Based Reframing?</h3>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src={BIRD_IMAGES.systemsBasedReframing.url}
              alt={BIRD_IMAGES.systemsBasedReframing.alt}
              className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">{BIRD_IMAGES.systemsBasedReframing.description}</p>
            </div>
          </div>
          <p className="text-sm text-[#065f46] leading-relaxed">
            This conveys the shift from traditional, siloed approaches to investment planning toward a more integrated, systems-oriented perspective. It contrasts the limitations of treating sectors as isolated entities (which leads to fragmented planning and missed synergies) with the benefits of viewing them as interdependent.
          </p>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] mb-3 block">
              "The most successful investments are those that generate positive effects across multiple sectors simultaneously — reinforcing the idea that holistic, systems-based strategies yield stronger long-term impact."
            </Label>
            {renderScale("q3_5_systems_reframing", "1 - Strongly Disagree", "5 - Strongly Agree")}
          </div>
        </CardContent>
      </Card>

      {/* 3. From Sector-Based Planning to Ecosystem Approach */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-base font-semibold text-[#022c22]">From Sector-Based Planning to Ecosystem Approach</h3>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src={BIRD_IMAGES.sectorToEcosystem.url}
              alt={BIRD_IMAGES.sectorToEcosystem.alt}
              className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">{BIRD_IMAGES.sectorToEcosystem.description}</p>
            </div>
          </div>
          <ul className="text-sm text-[#065f46] space-y-2 list-disc list-inside">
            <li><strong>Left (Siloed):</strong> Reactive and fragmented — infrastructure follows production, capital is allocated by single-sector grants, and market access remains limited to raw exports.</li>
            <li><strong>Right (BEIE):</strong> Integrates systems thinking — infrastructure is primed first, equity extends across island provinces, financing is synchronized through Shariah-compliant instruments, and market access connects to global halal and green economies.</li>
                </ul>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] mb-3 block">
              How accurately does this mental model shift reflect the current needs of BARMM's investment planning?
            </Label>
            {renderScale("q3_6_sector_to_ecosystem", "1 - Not Accurate", "5 - Highly Accurate")}
          </div>
        </CardContent>
      </Card>

      {/* 4. BEIE Framework */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-base font-semibold text-[#022c22]">The BEIE Framework</h3>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src={BIRD_IMAGES.beieFramework.url}
              alt={BIRD_IMAGES.beieFramework.alt}
              className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">{BIRD_IMAGES.beieFramework.description}</p>
            </div>
          </div>
          <p className="text-sm text-[#065f46] leading-relaxed">
            The "Bangsamoro Economic and Investment Ecosystem" presents a circular system powered by Moral Governance at its center—symbolizing ethical leadership as the engine of development. Surrounding it are five interconnected components: <strong>Foundations</strong> (resource base), <strong>Transformers</strong> (value creation), <strong>Financiers</strong> (capital empowerment), <strong>Connectors</strong> (market access), and <strong>Enablers</strong> (support systems).
          </p>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] mb-3 block">
              How well do you understand how these five interconnected components work together to drive sustainable growth?
            </Label>
            {renderScale("q3_7_beie_interconnectedness", "1 - Poorly", "5 - Very Well")}
          </div>
        </CardContent>
      </Card>

      {/* 5. Operating Systems */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-base font-semibold text-[#022c22]">Operating Systems: Moral Governance</h3>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src={BIRD_IMAGES.operatingSystems.url}
              alt={BIRD_IMAGES.operatingSystems.alt}
              className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">{BIRD_IMAGES.operatingSystems.description}</p>
            </div>
          </div>
          <p className="text-sm text-[#065f46] leading-relaxed">
            Moral Governance serves as the central operating system of the Bangsamoro ecosystem, ensuring justice, transparency, accountability, and Islamic ethics (khalifa stewardship). Surrounding it are three foundational pillars:
          </p>
          <ul className="text-sm text-[#065f46] space-y-1 list-disc list-inside">
            <li><strong>Peace:</strong> provides long-term stability for investment.</li>
            <li><strong>Resilience:</strong> promotes adaptive, climate-smart planning to withstand external shocks.</li>
            <li><strong>Inclusivity:</strong> broadens participation so marginalized communities share in value creation.</li>
          </ul>
        </CardContent>
      </Card>

      {/* 6. Five Interconnected Clusters */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-base font-semibold text-[#022c22]">The Five Interconnected Clusters</h3>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src={BIRD_IMAGES.fiveClusters.url}
              alt={BIRD_IMAGES.fiveClusters.alt}
              className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">{BIRD_IMAGES.fiveClusters.description}</p>
            </div>
          </div>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] mb-3 block">
              How clearly does this diagram illustrate the distinct roles of the five clusters in the Bangsamoro economy?
            </Label>
            {renderScale("q3_8_five_clusters_understanding", "1 - Unclear", "5 - Very Clear")}
          </div>
        </CardContent>
      </Card>

      {/* 7. Reinforcing Loop: The Investment–Development Virtuous Cycle */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-base font-semibold text-[#022c22]">Reinforcing Loop: The Investment–Development Virtuous Cycle</h3>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src={BIRD_IMAGES.investmentVirtuousCycle.url}
              alt={BIRD_IMAGES.investmentVirtuousCycle.alt}
              className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">{BIRD_IMAGES.investmentVirtuousCycle.description}</p>
            </div>
          </div>
          <p className="text-sm text-[#065f46] leading-relaxed">
            This loop captures how strategic investment triggers a self-sustaining cycle of growth. Investments stimulate employment, leading to higher income and stronger domestic market growth. As purchasing power expands, the business climate improves, attracting more investment. Front-loading investments into Halal certification infrastructure and agro-processing facilities acts as a catalytic "flywheel," spinning this cycle faster than standard agricultural investments.
          </p>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] mb-3 block">
              How accurately does this reinforcing loop describe the potential for self-sustaining growth through front-loaded investments in BARMM?
            </Label>
            {renderScale("q3_9_virtuous_cycle_accuracy", "1 - Not Accurate", "5 - Highly Accurate")}
          </div>
        </CardContent>
      </Card>

      {/* 8. Investment-Development Loop and Governance-Investor Confidence Loop */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-base font-semibold text-[#022c22]">Growth Compounds through Synchronized Investment and Governance Cycles</h3>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src={BIRD_IMAGES.investmentGovernanceCycles.url}
              alt={BIRD_IMAGES.investmentGovernanceCycles.alt}
              className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">{BIRD_IMAGES.investmentGovernanceCycles.description}</p>
            </div>
          </div>
          <ul className="text-sm text-[#065f46] space-y-2 list-disc list-inside">
            <li><strong>Reinforcing Loop 1 (R1): Investment–Development Cycle.</strong> Strategic investments in Halal, agro-industry, and tourism stimulate employment and income growth, expanding the domestic consumer market and enhancing business viability, which attracts additional investors.</li>
            <li><strong>Reinforcing Loop 2 (R2): Governance–Investor Confidence Cycle.</strong> Moral governance and transparency expand the tax base and public resource funding, enabling better infrastructure and services. These improvements boost investor confidence, leading to economic growth, which further strengthens governance capacity.</li>
          </ul>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] mb-3 block">
              How effectively do you believe synchronizing R1 and R2 will compound BARMM's economic and institutional development?
            </Label>
            {renderScale("q3_10_governance_investment_sync", "1 - Ineffectively", "5 - Highly Effectively")}
          </div>
        </CardContent>
      </Card>

      {/* 9. BEIE Validation Open Questions */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardContent className="pt-6 space-y-6">
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
    </div>
  );
};

export default Section3_BEIE_SystemsThinking;
