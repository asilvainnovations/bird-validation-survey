import React from "react";
import {
  TreePine,
  AlertTriangle,
  TrendingDown,
  CloudRain,
  Bug,
  PackageX,
  Users,
  BookOpen,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BIRD_IMAGES } from "@/lib/bird-urls";

// ── Types (aligned with SurveyWizard.tsx s4 state & survey-schema.ts) ────────
export interface Section4Data {
  // Validation / understanding questions
  q4_1_foundations_banner_understanding?: number;
  q4_2_tragedy_commons_accuracy?: string;
  q4_3_tragedy_followup?: string;
  // SWOT factor pairs (impact + likelihood) — 1–5 scale
  q4_4_climate_impact?: number;
  q4_5_climate_likelihood?: number;
  q4_6_pestalotiopsis_impact?: number;
  q4_7_pestalotiopsis_likelihood?: number;
  q4_8_postharvest_impact?: number;
  q4_9_postharvest_likelihood?: number;
  q4_10_poverty_impact?: number;
  q4_11_poverty_likelihood?: number;
  // Limits to Growth archetype validation
  q4_12_limits_growth_accuracy?: string;
  q4_13_limits_followup?: string;
  // BIRD SWOT scoring fields (computed via formulas.ts)
  q_s4_climate_impact?: number;
  q_s4_climate_likelihood?: number;
  q_s4_pestalotiopsis_impact?: number;
  q_s4_pestalotiopsis_likelihood?: number;
  q_s4_postharvest_impact?: number;
  q_s4_postharvest_likelihood?: number;
  q_s4_poverty_impact?: number;
  q_s4_poverty_likelihood?: number;
  // Archetype validation strings
  q_s4_tragedy_commons?: string;
  q_s4_tragedy_followup?: string;
  q_s4_limits_growth?: string;
}

interface Section4Props {
  data: Section4Data;
  onChange: (data: Section4Data) => void;
}

// ── Helper: 1–5 Scale Selector ───────────────────────────────────────────────
const ScaleSelector: React.FC<{
  value?: number;
  onSelect: (v: number) => void;
  labels?: [string, string];
}> = ({ value, onSelect, labels = ["Low", "High"] }) => (
  <div className="flex flex-col gap-2">
    <div className="flex gap-2 flex-wrap">
      {[1, 2, 3, 4, 5].map((v) => (
        <Button
          key={v}
          type="button"
          variant="outline"
          size="icon"
          className={cn(
            "w-11 h-11 rounded-lg border text-sm font-semibold transition-all",
            value === v
              ? "bg-[#C9A84C] text-white border-[#C9A84C] shadow-md"
              : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
          )}
          onClick={() => onSelect(v)}
        >
          {v}
        </Button>
      ))}
    </div>
    <div className="flex justify-between text-[10px] text-[#64748b] px-1">
      <span>{labels[0]}</span>
      <span>{labels[1]}</span>
    </div>
  </div>
);

// ── Component ────────────────────────────────────────────────────────────────
const Section4_Foundations: React.FC<Section4Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section4Data>(field: K, value: Section4Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  // Sync SWOT fields: when user sets q4_4_climate_impact, also set q_s4_climate_impact
  const updateImpactPair = (
    impactField: keyof Section4Data,
    likelihoodField: keyof Section4Data,
    sImpactField: keyof Section4Data,
    sLikelihoodField: keyof Section4Data,
    impactVal?: number,
    likelihoodVal?: number
  ) => {
    const patch: Partial<Section4Data> = {};
    if (impactVal !== undefined) {
      patch[impactField] = impactVal;
      patch[sImpactField] = impactVal;
    }
    if (likelihoodVal !== undefined) {
      patch[likelihoodField] = likelihoodVal;
      patch[sLikelihoodField] = likelihoodVal;
    }
    onChange({ ...data, ...patch });
  };

  const bannerUrl = BIRD_IMAGES.cluster1Foundations?.url?.trim() ||
    "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Cluster%201-Foundations.png";
  const tragedyUrl = BIRD_IMAGES.tragedyCommons?.url?.trim() ||
    "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Tragedy%20of%20the%20Commons%20Archetype.png";

  return (
    <div className="space-y-8">
      {/* ── Section Header ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-2">
        <TreePine className="w-6 h-6 text-[#1B4D3E]" />
        <h2 className="text-xl font-bold text-[#022c22]">
          Section 4: Cluster 1 — Foundations
        </h2>
      </div>
      <p className="text-sm text-[#065f46] mb-4 -mt-2">
        The Infrastructure-First Resource Base: agriculture, energy, forestry & environment
      </p>

      {/* ── 1. Image Banner ────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg">
        <img
          src={bannerUrl}
          alt="Cluster 1 | Foundations: The Infrastructure-First Resource Base"
          className="w-full h-auto max-h-[420px] object-contain"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
          <p className="text-xs text-white/90 italic">
            Cluster 1 | Foundations: The Infrastructure‑First Resource Base
          </p>
        </div>
      </div>

      {/* ── 2. Foundations Description Card ────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22]">
            The Resource & Infrastructure Backbone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-[#022c22] leading-relaxed">
            "Cluster 1 | Foundations: The Infrastructure‑First Resource Base" forms the resource and
            infrastructure backbone of the Bangsamoro Investment Roadmap — the essential groundwork
            upon which other clusters and strategies will build.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-4">
              <h4 className="text-sm font-semibold text-[#022c22] mb-1 flex items-center gap-2">
                <TreePine className="w-4 h-4 text-[#1B4D3E]" /> Agri‑Fisheries
              </h4>
              <p className="text-xs text-[#065f46] leading-relaxed">
                Over 30% of GRDP, with notable outputs like Tawi‑Tawi's seaweed and Maguindanao's rice and corn.
              </p>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-4">
              <h4 className="text-sm font-semibold text-[#022c22] mb-1 flex items-center gap-2">
                <CloudRain className="w-4 h-4 text-amber-700" /> Energy
              </h4>
              <p className="text-xs text-[#065f46] leading-relaxed">
                Over 75% renewable energy mix, anchored by hydroelectric and emerging solar/biomass sources.
              </p>
            </div>
            <div className="rounded-lg border border-green-200 bg-green-50/60 p-4">
              <h4 className="text-sm font-semibold text-[#022c22] mb-1 flex items-center gap-2">
                <TreePine className="w-4 h-4 text-green-700" /> Forestry
              </h4>
              <p className="text-xs text-[#065f46] leading-relaxed">
                Vast untapped carbon reserves and ecosystem services for sustainable resource management.
              </p>
            </div>
            <div className="rounded-lg border border-teal-200 bg-teal-50/60 p-4">
              <h4 className="text-sm font-semibold text-[#022c22] mb-1 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-teal-700" /> Environment
              </h4>
              <p className="text-xs text-[#065f46] leading-relaxed">
                Green Economy as a driver of revenue and innovation, not merely a compliance obligation.
              </p>
            </div>
          </div>

          {/* Validation Question: Banner Understanding */}
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] mb-3 block">
              How clearly does the Foundations cluster description convey the role of natural resources
              and infrastructure as the backbone of BARMM's economy?
              <span className="text-xs text-[#065f46] block mt-1 font-normal">
                (1 = not clear at all, 5 = extremely clear)
              </span>
            </Label>
            <ScaleSelector
              value={data.q4_1_foundations_banner_understanding}
              onSelect={(v) => update("q4_1_foundations_banner_understanding", v)}
              labels={["Unclear", "Very Clear"]}
            />
          </div>
        </CardContent>
      </Card>

      {/* ── 3. Tragedy of the Commons Archetype ────────────────────────── */}
      <Card className="border-red-200/60 bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Systems Archetype: Tragedy of the Commons — A Warning
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-red-200/50 shadow-lg">
            <img
              src={tragedyUrl}
              alt="Tragedy of the Commons Archetype"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>

          <p className="text-sm text-[#022c22] leading-relaxed">
            The "Tragedy of the Commons" occurs when shared resources are over-exploited due to lack
            of proper governance. It is <strong>not inevitable</strong> — it serves as a warning of
            what happens when actors prioritize short-term gains over collective long-term
            sustainability. It visualizes how uncoordinated exploitation of shared natural resources
            leads to systemic collapse across BARMM's Foundations cluster.
          </p>

          <div className="space-y-3 pt-2">
            <div className="rounded-lg border border-red-100 bg-red-50/40 p-4">
              <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider mb-2">
                Reinforcing Loops (Self-Amplifying Overuse)
              </h4>
              <ul className="text-xs text-[#065f46] space-y-1.5 list-disc list-inside">
                <li><strong>R1:</strong> Economic gains attract more actors — a self‑amplifying cycle of overuse.</li>
                <li><strong>R2:</strong> Growing communities and industries intensify resource use, accelerating depletion.</li>
                <li><strong>R3:</strong> Increased activities further boost gains, reinforcing the illusion of prosperity.</li>
                <li><strong>R4:</strong> Larger communities and industries multiply consumption, compounding ecological strain.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-amber-100 bg-amber-50/40 p-4">
              <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
                Balancing Loops (Delayed Collapse)
              </h4>
              <ul className="text-xs text-[#065f46] space-y-1.5 list-disc list-inside">
                <li><strong>B5:</strong> Resource limits push back — finite ecological capacity constrains extraction, but feedback arrives too late.</li>
                <li><strong>B6:</strong> Delayed impact and collapse — environmental decline lags behind exploitation; by the time depletion is visible, the system nears failure.</li>
              </ul>
            </div>
          </div>

          <p className="text-xs text-[#065f46] italic border-l-2 border-[#C9A84C] pl-3">
            Without governance intervention — such as the Bangsamoro Forestry Code, carbon markets,
            and community co-management — the Foundations cluster risks <strong>systemic collapse</strong>.
          </p>

          {/* Validation Question: Tragedy Accuracy */}
          <div className="pt-4 border-t border-[#C9A84C]/20 space-y-5">
            <div>
              <Label className="text-sm font-medium text-[#022c22] mb-3 block">
                How accurately does this archetype capture the real risk of resource over-exploitation
                in BARMM's agriculture, fisheries, forestry, and energy sectors?
              </Label>
              <div className="flex gap-2 flex-wrap">
                {["Highly accurate", "Somewhat accurate", "Partially accurate", "Not accurate", "Unsure"].map(
                  (opt) => (
                    <Button
                      key={opt}
                      type="button"
                      variant="outline"
                      size="sm"
                      className={cn(
                        "text-xs px-3 py-2 rounded-lg border transition-all",
                        data.q4_2_tragedy_commons_accuracy === opt
                          ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                          : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                      )}
                      onClick={() => {
                        update("q4_2_tragedy_commons_accuracy", opt);
                        update("q_s4_tragedy_commons", opt);
                      }}
                    >
                      {opt}
                    </Button>
                  )
                )}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-[#022c22] mb-2 block">
                In your experience, what specific governance gaps make the Tragedy of the Commons
                most likely in BARMM? (Optional)
              </Label>
              <Textarea
                value={data.q4_3_tragedy_followup || ""}
                onChange={(e) => {
                  update("q4_3_tragedy_followup", e.target.value);
                  update("q_s4_tragedy_followup", e.target.value);
                }}
                placeholder="e.g., Lack of enforcement of fishing regulations in Tawi-Tawi..."
                className="min-h-[80px] text-sm border-[#C9A84C]/30 focus:border-[#C9A84C]"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 4. SWOT Factor Pairs (Impact × Likelihood) ─────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#C9A84C]" />
            Risk & Vulnerability Assessment — Foundations Cluster
          </CardTitle>
          <p className="text-xs text-[#065f46] pt-1">
            Rate each factor's <strong>Impact</strong> (severity if realized) and{" "}
            <strong>Likelihood</strong> (probability of occurrence) on a 1–5 scale.
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Factor 1: Climate Change */}
          <div className="pb-6 border-b border-[#C9A84C]/10">
            <div className="flex items-start gap-3 mb-3">
              <CloudRain className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-[#022c22]">
                  Climate Change Impact on Agriculture & Fisheries
                </h4>
                <p className="text-xs text-[#065f46] mt-1">
                  Increased typhoons, droughts, and sea-level rise threatening crop yields,
                  aquaculture, and coastal communities.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-8">
              <div>
                <Label className="text-xs font-medium text-[#022c22] mb-2 block">Impact (Severity)</Label>
                <ScaleSelector
                  value={data.q4_4_climate_impact}
                  onSelect={(v) =>
                    updateImpactPair(
                      "q4_4_climate_impact", "q4_5_climate_likelihood",
                      "q_s4_climate_impact", "q_s4_climate_likelihood",
                      v, undefined
                    )
                  }
                  labels={["Minimal", "Catastrophic"]}
                />
              </div>
              <div>
                <Label className="text-xs font-medium text-[#022c22] mb-2 block">Likelihood (Probability)</Label>
                <ScaleSelector
                  value={data.q4_5_climate_likelihood}
                  onSelect={(v) =>
                    updateImpactPair(
                      "q4_4_climate_impact", "q4_5_climate_likelihood",
                      "q_s4_climate_impact", "q_s4_climate_likelihood",
                      undefined, v
                    )
                  }
                  labels={["Very Unlikely", "Almost Certain"]}
                />
              </div>
            </div>
          </div>

          {/* Factor 2: Pestalotiopsis / Crop Disease */}
          <div className="pb-6 border-b border-[#C9A84C]/10">
            <div className="flex items-start gap-3 mb-3">
              <Bug className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-[#022c22]">
                  Pestalotiopsis & Crop Disease Outbreaks
                </h4>
                <p className="text-xs text-[#065f46] mt-1">
                  Fungal and pest infestations devastating coconut, rubber, and rice plantations
                  across Maguindanao and Basilan.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-8">
              <div>
                <Label className="text-xs font-medium text-[#022c22] mb-2 block">Impact (Severity)</Label>
                <ScaleSelector
                  value={data.q4_6_pestalotiopsis_impact}
                  onSelect={(v) =>
                    updateImpactPair(
                      "q4_6_pestalotiopsis_impact", "q4_7_pestalotiopsis_likelihood",
                      "q_s4_pestalotiopsis_impact", "q_s4_pestalotiopsis_likelihood",
                      v, undefined
                    )
                  }
                  labels={["Minimal", "Catastrophic"]}
                />
              </div>
              <div>
                <Label className="text-xs font-medium text-[#022c22] mb-2 block">Likelihood (Probability)</Label>
                <ScaleSelector
                  value={data.q4_7_pestalotiopsis_likelihood}
                  onSelect={(v) =>
                    updateImpactPair(
                      "q4_6_pestalotiopsis_impact", "q4_7_pestalotiopsis_likelihood",
                      "q_s4_pestalotiopsis_impact", "q_s4_pestalotiopsis_likelihood",
                      undefined, v
                    )
                  }
                  labels={["Very Unlikely", "Almost Certain"]}
                />
              </div>
            </div>
          </div>

          {/* Factor 3: Post-Harvest Losses */}
          <div className="pb-6 border-b border-[#C9A84C]/10">
            <div className="flex items-start gap-3 mb-3">
              <PackageX className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-[#022c22]">
                  Post-Harvest Losses & Cold Chain Gaps
                </h4>
                <p className="text-xs text-[#065f46] mt-1">
                  30–40% spoilage rates due to inadequate cold storage, poor farm-to-market roads,
                  and absence of processing facilities in island provinces.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-8">
              <div>
                <Label className="text-xs font-medium text-[#022c22] mb-2 block">Impact (Severity)</Label>
                <ScaleSelector
                  value={data.q4_8_postharvest_impact}
                  onSelect={(v) =>
                    updateImpactPair(
                      "q4_8_postharvest_impact", "q4_9_postharvest_likelihood",
                      "q_s4_postharvest_impact", "q_s4_postharvest_likelihood",
                      v, undefined
                    )
                  }
                  labels={["Minimal", "Catastrophic"]}
                />
              </div>
              <div>
                <Label className="text-xs font-medium text-[#022c22] mb-2 block">Likelihood (Probability)</Label>
                <ScaleSelector
                  value={data.q4_9_postharvest_likelihood}
                  onSelect={(v) =>
                    updateImpactPair(
                      "q4_8_postharvest_impact", "q4_9_postharvest_likelihood",
                      "q_s4_postharvest_impact", "q_s4_postharvest_likelihood",
                      undefined, v
                    )
                  }
                  labels={["Very Unlikely", "Almost Certain"]}
                />
              </div>
            </div>
          </div>

          {/* Factor 4: Rural Poverty & Food Insecurity */}
          <div>
            <div className="flex items-start gap-3 mb-3">
              <Users className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-[#022c22]">
                  Rural Poverty & Food Insecurity
                </h4>
                <p className="text-xs text-[#065f46] mt-1">
                  Persistent poverty (above 50% in some municipalities) limiting farmer
                  investment capacity, nutrition outcomes, and intergenerational mobility.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-8">
              <div>
                <Label className="text-xs font-medium text-[#022c22] mb-2 block">Impact (Severity)</Label>
                <ScaleSelector
                  value={data.q4_10_poverty_impact}
                  onSelect={(v) =>
                    updateImpactPair(
                      "q4_10_poverty_impact", "q4_11_poverty_likelihood",
                      "q_s4_poverty_impact", "q_s4_poverty_likelihood",
                      v, undefined
                    )
                  }
                  labels={["Minimal", "Catastrophic"]}
                />
              </div>
              <div>
                <Label className="text-xs font-medium text-[#022c22] mb-2 block">Likelihood (Probability)</Label>
                <ScaleSelector
                  value={data.q4_11_poverty_likelihood}
                  onSelect={(v) =>
                    updateImpactPair(
                      "q4_10_poverty_impact", "q4_11_poverty_likelihood",
                      "q_s4_poverty_impact", "q_s4_poverty_likelihood",
                      undefined, v
                    )
                  }
                  labels={["Very Unlikely", "Almost Certain"]}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 5. Limits to Growth Archetype ──────────────────────────────── */}
      <Card className="border-amber-200/60 bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-amber-700" />
            Systems Archetype: Limits to Growth
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-[#022c22] leading-relaxed">
            The "Limits to Growth" illustrates how rapid investment expansion eventually slows when
            structural ceilings — like weak infrastructure, limited skills, and environmental
            constraints — are reached.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 mb-2 text-[10px]">
                R1 — Reinforcing
              </Badge>
              <h4 className="text-xs font-semibold text-[#022c22] mb-1">Investment Fuels Growth</h4>
              <p className="text-xs text-[#065f46] leading-relaxed">
                Initial investments in infrastructure and human capital drive economic performance,
                encouraging further investment — a virtuous cycle of expansion.
              </p>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 mb-2 text-[10px]">
                B2 — Balancing
              </Badge>
              <h4 className="text-xs font-semibold text-[#022c22] mb-1">Resource Ceilings Push Back</h4>
              <p className="text-xs text-[#065f46] leading-relaxed">
                As growth accelerates, bottlenecks emerge — unreliable energy, poor roads, low
                literacy, and resource depletion — reducing efficiency and slowing progress.
              </p>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50/50 p-4">
              <Badge variant="secondary" className="bg-red-100 text-red-800 mb-2 text-[10px]">
                B3 — Balancing
              </Badge>
              <h4 className="text-xs font-semibold text-[#022c22] mb-1">Plateau Effect</h4>
              <p className="text-xs text-[#065f46] leading-relaxed">
                Constraints act as hard ceilings, preventing further improvement unless
                capacity‑building measures are introduced.
              </p>
            </div>
          </div>

          <p className="text-xs text-[#065f46] italic border-l-2 border-[#C9A84C] pl-3">
            Growth without parallel investment in enabling infrastructure and skills inevitably
            plateaus, underscoring the need for systemic capacity development to sustain momentum.
          </p>

          {/* Validation Question: Limits to Growth */}
          <div className="pt-4 border-t border-[#C9A84C]/20 space-y-5">
            <div>
              <Label className="text-sm font-medium text-[#022c22] mb-3 block">
                How well does the "Limits to Growth" archetype explain the infrastructure and
                capacity bottlenecks you observe in BARMM's Foundations sector?
              </Label>
              <div className="flex gap-2 flex-wrap">
                {["Highly applicable", "Somewhat applicable", "Partially applicable", "Not applicable", "Unsure"].map(
                  (opt) => (
                    <Button
                      key={opt}
                      type="button"
                      variant="outline"
                      size="sm"
                      className={cn(
                        "text-xs px-3 py-2 rounded-lg border transition-all",
                        data.q4_12_limits_growth_accuracy === opt
                          ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                          : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                      )}
                      onClick={() => {
                        update("q4_12_limits_growth_accuracy", opt);
                        update("q_s4_limits_growth", opt);
                      }}
                    >
                      {opt}
                    </Button>
                  )
                )}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-[#022c22] mb-2 block">
                What specific "ceiling" or bottleneck do you believe will most limit Foundations
                growth in the next 5 years? (Optional)
              </Label>
              <Textarea
                value={data.q4_13_limits_followup || ""}
                onChange={(e) => update("q4_13_limits_followup", e.target.value)}
                placeholder="e.g., The absence of a reliable power grid in Sulu and Tawi-Tawi..."
                className="min-h-[80px] text-sm border-[#C9A84C]/30 focus:border-[#C9A84C]"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 6. Section Summary / Live Score Preview ────────────────────── */}
      {(data.q_s4_climate_impact || data.q_s4_pestalotiopsis_impact ||
        data.q_s4_postharvest_impact || data.q_s4_poverty_impact) && (
        <Card className="border-[#C9A84C]/30 bg-gradient-to-r from-[#022c22]/5 to-[#C9A84C]/5">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-[#C9A84C]" />
              <span className="text-xs font-bold text-[#C9A84C] uppercase tracking-wider">
                Live Threat & Weakness Scores
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Climate (T)", i: data.q_s4_climate_impact, l: data.q_s4_climate_likelihood },
                { label: "Pest/Disease (T)", i: data.q_s4_pestalotiopsis_impact, l: data.q_s4_pestalotiopsis_likelihood },
                { label: "Post-Harvest (W)", i: data.q_s4_postharvest_impact, l: data.q_s4_postharvest_likelihood },
                { label: "Poverty (W)", i: data.q_s4_poverty_impact, l: data.q_s4_poverty_likelihood },
              ].map(({ label, i, l }) => {
                const score = i && l ? ((i * l) / 25) * 100 : undefined;
                return (
                  <div
                    key={label}
                    className="rounded-lg border border-[#C9A84C]/20 bg-white/80 p-3 text-center"
                  >
                    <p className="text-[10px] text-[#065f46] font-medium mb-1">{label}</p>
                    <p className="text-lg font-bold text-[#022c22]">
                      {score !== undefined ? `${score.toFixed(0)}%` : "—"}
                    </p>
                    <p className="text-[9px] text-[#64748b]">
                      {i && l ? `${i}×${l}/25` : "Pending"}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Section4_Foundations;
