import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Factory,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  BarChart3,
  BookOpen,
  Globe,
  Landmark,
  Palette,
  Snowflake,
  Link2,
  Award,
  Package,
} from "lucide-react";
import { BIRD_IMAGES } from "@/lib/bird-urls";
import {
  calculateStrengthRI,
  calculateWeaknessRisk,
  calculateThreatVI,
} from "@/lib/formulas";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES — Aligned with SWOT_Scale_Questions.md & CLDs_Systems_Archetypes_Questions.md
// ─────────────────────────────────────────────────────────────────────────────

export interface Section5Data {
  // Understanding validation
  q5_1_transformers_banner_understanding?: number;
  q5_2_halal_advantage_understanding?: number;
  q5_3_farm_to_market_understanding?: number;
  q5_4_economic_zones_understanding?: number;

  // Archetype: Growth and Underinvestment
  q5_5_growth_underinvestment_accuracy?: string;
  q5_6_growth_underinvestment_followup?: string;

  // ── Strengths ──
  q5_s1_halal_legitimacy_impact?: number;
  q5_s1_halal_legitimacy_likelihood?: number;
  q5_s2_domestic_demand_impact?: number;
  q5_s2_domestic_demand_likelihood?: number;
  q5_s3_polloc_freeport_impact?: number;
  q5_s3_polloc_freeport_likelihood?: number;
  q5_s4_cultural_heritage_impact?: number;
  q5_s4_cultural_heritage_likelihood?: number;

  // ── Weaknesses ──
  q5_w1_halal_cert_impact?: number;
  q5_w1_halal_cert_likelihood?: number;
  q5_w2_cold_chain_impact?: number;
  q5_w2_cold_chain_likelihood?: number;
  q5_w3_market_linkages_impact?: number;
  q5_w3_market_linkages_likelihood?: number;

  // ── Threats ──
  q5_t1_standards_recognition_impact?: number;
  q5_t1_standards_recognition_likelihood?: number;
}

interface Section5Props {
  data: Section5Data;
  onChange: (data: Section5Data) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// REUSABLE SCALE SELECTOR
// ─────────────────────────────────────────────────────────────────────────────

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
              : "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C]"
          )}
          onClick={() => onSelect(v)}
        >
          {v}
        </Button>
      ))}
    </div>
    <div className="flex justify-between text-[10px] text-[#64748b] dark:text-[#ecfdf5]/50 px-1">
      <span>{labels[0]}</span>
      <span>{labels[1]}</span>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SWOT FACTOR CARD
// ─────────────────────────────────────────────────────────────────────────────

interface SwotFactorProps {
  icon: React.ReactNode;
  label: string;
  code: string;
  description: string;
  impact?: number;
  likelihood?: number;
  onImpact: (v: number) => void;
  onLikelihood: (v: number) => void;
  category: "strength" | "weakness" | "threat";
}

const SwotFactor: React.FC<SwotFactorProps> = ({
  icon,
  label,
  code,
  description,
  impact,
  likelihood,
  onImpact,
  onLikelihood,
  category,
}) => {
  let score: number | null = null;
  let scoreLabel = "";
  let scoreColor = "";

  if (impact && likelihood) {
    switch (category) {
      case "strength":
        score = calculateStrengthRI(impact, likelihood);
        scoreLabel = "RI";
        scoreColor = "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300";
        break;
      case "weakness":
        score = calculateWeaknessRisk(impact, likelihood);
        scoreLabel = "Risk";
        scoreColor = "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300";
        break;
      case "threat":
        score = calculateThreatVI(impact, likelihood);
        scoreLabel = "VI";
        scoreColor = "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
        break;
    }
  }

  return (
    <div className="pb-6 border-b border-[#C9A84C]/10 dark:border-[#C9A84C]/10 last:border-0 last:pb-0">
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-lg bg-[#C9A84C]/10 text-[#C9A84C] shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5]">
              {code}: {label}
            </h4>
            {score !== null && (
              <Badge className={cn("text-[10px] font-bold", scoreColor)}>
                {scoreLabel}: {score.toFixed(2)}
              </Badge>
            )}
          </div>
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-12">
        <div>
          <Label className="text-xs font-medium text-[#022c22] dark:text-[#ecfdf5]/80 mb-2 block">
            Impact (Severity)
          </Label>
          <ScaleSelector
            value={impact}
            onSelect={onImpact}
            labels={["Minimal", "Transformative"]}
          />
        </div>
        <div>
          <Label className="text-xs font-medium text-[#022c22] dark:text-[#ecfdf5]/80 mb-2 block">
            Likelihood (Probability)
          </Label>
          <ScaleSelector
            value={likelihood}
            onSelect={onLikelihood}
            labels={["Very Unlikely", "Almost Certain"]}
          />
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const Section5_Transformers: React.FC<Section5Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section5Data>(
    field: K,
    value: Section5Data[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  const activeBtn =
    "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90 dark:bg-[#C9A84C] dark:text-[#022c22] dark:border-[#C9A84C]";
  const inactiveBtn =
    "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C] dark:bg-[#022c22]/50 dark:text-[#ecfdf5] dark:border-[#C9A84C]/30";

  const understandingQuestions = [
    {
      field: "q5_1_transformers_banner_understanding" as keyof Section5Data,
      label: "How well do you understand the Transformers cluster as the engine of value creation in BARMM?",
    },
    {
      field: "q5_2_halal_advantage_understanding" as keyof Section5Data,
      label: "How well do you understand Bangsamoro's cultural and geographic advantage in the ASEAN halal market?",
    },
    {
      field: "q5_3_farm_to_market_understanding" as keyof Section5Data,
      label: "How well do you understand the MAFAR halal farm-to-market pipeline and its value chain stages?",
    },
    {
      field: "q5_4_economic_zones_understanding" as keyof Section5Data,
      label: "How well do you understand the role of Polloc Freeport and WOW Matanog SEZ in industrial scaling?",
    },
  ];

  const growthAgree =
    data.q5_5_growth_underinvestment_accuracy === "Very accurately" ||
    data.q5_5_growth_underinvestment_accuracy === "Somewhat accurately";

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-2">
        <Factory className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22] dark:text-[#ecfdf5]">
          Section 5: Cluster 2 — Transformers
        </h2>
      </div>
      <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 mb-4 -mt-2">
        Engines of Value Creation — converting raw materials into higher-value halal products and premium exports
      </p>

      {/* ── 1. Banner Image ── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src={BIRD_IMAGES.cluster2Transformers.url}
          alt={BIRD_IMAGES.cluster2Transformers.alt}
          className="w-full h-auto max-h-[420px] object-contain transition-transform group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
          <p className="text-xs text-white/90 italic">
            {BIRD_IMAGES.cluster2Transformers.title}
          </p>
        </div>
      </div>

      {/* ── 2. Understanding Questions ── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Framework Understanding
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {understandingQuestions.map((q, idx) => (
            <div
              key={q.field}
              className={cn(
                "space-y-3",
                idx < understandingQuestions.length - 1 &&
                  "pb-6 border-b border-[#C9A84C]/20 dark:border-[#C9A84C]/10"
              )}
            >
              <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
                {q.label}
                <span className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 block mt-1 font-normal">
                  (1 = not at all, 5 = completely)
                </span>
              </Label>
              <ScaleSelector
                value={data[q.field]}
                onSelect={(v) => update(q.field, v)}
                labels={["Not at all", "Completely"]}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ── 3. Halal Industry Advantage ── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src={BIRD_IMAGES.halalIndustryAdvantage.url}
              alt={BIRD_IMAGES.halalIndustryAdvantage.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">
                {BIRD_IMAGES.halalIndustryAdvantage.title}
              </p>
            </div>
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            <strong>Three key sectors:</strong> Halal Food & Beverage (coconut-based by-products),{" "}
            Halal Cosmetics (beauty for Muslim consumers), Halal Pharmaceuticals (compliant medicine).{" "}
            The BIMP-EAGA trade corridor connects Bangsamoro to a large regional Muslim population.
          </p>
        </CardContent>
      </Card>

      {/* ── 4. Farm-to-Market Pipeline ── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src={BIRD_IMAGES.farmToMarketPipeline.url}
              alt={BIRD_IMAGES.farmToMarketPipeline.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">
                {BIRD_IMAGES.farmToMarketPipeline.title}
              </p>
            </div>
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            <strong>Four stages:</strong> Input Supply (hatcheries, feed mills) → Cold Chain & Logistics{" "}
            (roads, ice plants, cold storage) → Processing (halal livestock, poultry, seaweed) →{" "}
            Market Linkage (halal pasalubong centers, BIMP-EAGA export).
          </p>
        </CardContent>
      </Card>

      {/* ── 5. SWOT Assessment ── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#C9A84C]" />
            Risk & Resilience Assessment — Transformers Cluster
          </CardTitle>
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 pt-1">
            Rate each factor&apos;s <strong>Impact</strong> (severity if realized) and{" "}
            <strong>Likelihood</strong> (probability of occurrence) on a 1–5 scale.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Strengths */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                Strengths — Internal Resilience Drivers
              </h3>
            </div>
            <div className="space-y-6">
              <SwotFactor
                icon={<Award className="w-4 h-4" />}
                label="Halal Legitimacy & Cultural Credibility"
                code="S1"
                description="Authentic Muslim-majority identity providing unmatched authenticity for halal branding."
                impact={data.q5_s1_halal_legitimacy_impact}
                likelihood={data.q5_s1_halal_legitimacy_likelihood}
                onImpact={(v) => update("q5_s1_halal_legitimacy_impact", v)}
                onLikelihood={(v) => update("q5_s1_halal_legitimacy_likelihood", v)}
                category="strength"
              />
              <SwotFactor
                icon={<Users className="w-4 h-4" />}
                label="Domestic Halal Demand"
                code="S2"
                description="5.69M Muslim consumer base driving local market absorption."
                impact={data.q5_s2_domestic_demand_impact}
                likelihood={data.q5_s2_domestic_demand_likelihood}
                onImpact={(v) => update("q5_s2_domestic_demand_impact", v)}
                onLikelihood={(v) => update("q5_s2_domestic_demand_likelihood", v)}
                category="strength"
              />
              <SwotFactor
                icon={<Landmark className="w-4 h-4" />}
                label="Polloc Freeport & Economic Zone"
                code="S3"
                description="Strategic logistics hub and trade gateway in Maguindanao del Norte."
                impact={data.q5_s3_polloc_freeport_impact}
                likelihood={data.q5_s3_polloc_freeport_likelihood}
                onImpact={(v) => update("q5_s3_polloc_freeport_impact", v)}
                onLikelihood={(v) => update("q5_s3_polloc_freeport_likelihood", v)}
                category="strength"
              />
              <SwotFactor
                icon={<Palette className="w-4 h-4" />}
                label="Rich Cultural Heritage"
                code="S4"
                description="Maranao, Yakan, and Tausug heritage as assets for creative and tourism industries."
                impact={data.q5_s4_cultural_heritage_impact}
                likelihood={data.q5_s4_cultural_heritage_likelihood}
                onImpact={(v) => update("q5_s4_cultural_heritage_impact", v)}
                onLikelihood={(v) => update("q5_s4_cultural_heritage_likelihood", v)}
                category="strength"
              />
            </div>
          </div>

          {/* Weaknesses */}
          <div className="pt-6 border-t border-[#C9A84C]/10 dark:border-[#C9A84C]/10">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <h3 className="text-sm font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider">
                Weaknesses — Internal Risk Exposure
              </h3>
            </div>
            <div className="space-y-6">
              <SwotFactor
                icon={<Award className="w-4 h-4" />}
                label="Weak Halal Certification System"
                code="W1"
                description="Resource-constrained BHB with limited international recognition. Certification takes 45–60 days vs. Malaysia's 15-day benchmark."
                impact={data.q5_w1_halal_cert_impact}
                likelihood={data.q5_w1_halal_cert_likelihood}
                onImpact={(v) => update("q5_w1_halal_cert_impact", v)}
                onLikelihood={(v) => update("q5_w1_halal_cert_likelihood", v)}
                category="weakness"
              />
              <SwotFactor
                icon={<Snowflake className="w-4 h-4" />}
                label="Limited Agro-Processing / Cold Chain"
                code="W2"
                description="High post-harvest losses (20–40%) constraining value addition due to inadequate cold storage and processing facilities."
                impact={data.q5_w2_cold_chain_impact}
                likelihood={data.q5_w2_cold_chain_likelihood}
                onImpact={(v) => update("q5_w2_cold_chain_impact", v)}
                onLikelihood={(v) => update("q5_w2_cold_chain_likelihood", v)}
                category="weakness"
              />
              <SwotFactor
                icon={<Link2 className="w-4 h-4" />}
                label="Weak Market Linkages"
                code="W3"
                description="Limited access to buyers and price information for producers."
                impact={data.q5_w3_market_linkages_impact}
                likelihood={data.q5_w3_market_linkages_likelihood}
                onImpact={(v) => update("q5_w3_market_linkages_impact", v)}
                onLikelihood={(v) => update("q5_w3_market_linkages_likelihood", v)}
                category="weakness"
              />
            </div>
          </div>

          {/* Threats */}
          <div className="pt-6 border-t border-[#C9A84C]/10 dark:border-[#C9A84C]/10">
            <div className="flex items-center gap-2 mb-4">
              <ShieldAlert className="w-4 h-4 text-red-600 dark:text-red-400" />
              <h3 className="text-sm font-bold text-red-800 dark:text-red-300 uppercase tracking-wider">
                Threats — External Vulnerability Factors
              </h3>
            </div>
            <SwotFactor
              icon={<Globe className="w-4 h-4" />}
              label="Standards Recognition Risk"
              code="T1"
              description="BARMM certifications not yet aligned with OIC/SMIIC international standards."
              impact={data.q5_t1_standards_recognition_impact}
              likelihood={data.q5_t1_standards_recognition_likelihood}
              onImpact={(v) => update("q5_t1_standards_recognition_impact", v)}
              onLikelihood={(v) => update("q5_t1_standards_recognition_likelihood", v)}
              category="threat"
            />
          </div>
        </CardContent>
      </Card>

      {/* ── 6. Industrial & Economic Zones ── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src={BIRD_IMAGES.industrialEconomicZones.url}
              alt={BIRD_IMAGES.industrialEconomicZones.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">
                {BIRD_IMAGES.industrialEconomicZones.title}
              </p>
            </div>
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            <strong>Polloc Freeport & EcoZone</strong> (119-hectare agro-industrial hub in Parang, ADB-funded) and{" "}
            <strong>WOW Matanog Special Economic Zone</strong> (upcoming Bangsamoro Halal Park).
          </p>
        </CardContent>
      </Card>

      {/* ── 7. Archetype: Growth and Underinvestment ── */}
      <Card className="border-2 border-amber-500/40 bg-amber-50/30 dark:bg-amber-900/10 dark:border-amber-500/30 backdrop-blur-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
              Archetype: Growth and Underinvestment
            </h3>
          </div>

          <div className="bg-amber-100/50 dark:bg-amber-900/20 border-l-4 border-amber-600 dark:border-amber-400 p-4 rounded-r-lg">
            <p className="text-sm text-amber-900 dark:text-amber-200 font-medium mb-2">
              ⚠️ Capacity Gap Warning
            </p>
            <p className="text-sm text-amber-800 dark:text-amber-300/80 leading-relaxed">
              &quot;Growth and Underinvestment&quot; illustrates how rapid investment expansion stalls when
              institutional capacity fails to keep pace. As investment increases, facilitation capacity
              (certifiers, staff, infrastructure) expands — but when it hits its ceiling, processing slows,
              creating backlogs that erode investor confidence and dampen growth.
            </p>
          </div>

          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
            <img
              src={BIRD_IMAGES.growthUnderinvestment.url}
              alt={BIRD_IMAGES.growthUnderinvestment.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>

          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
            How accurately does &quot;Growth and Underinvestment&quot; describe the gap between BARMM&apos;s
            investment growth and its institutional capacity?
          </Label>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn(
                  "justify-start h-auto py-3 text-sm text-left transition-all",
                  data.q5_5_growth_underinvestment_accuracy === opt ? activeBtn : inactiveBtn
                )}
                onClick={() => update("q5_5_growth_underinvestment_accuracy", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>

          {growthAgree && (
            <div className="mt-4 pt-4 border-t border-[#C9A84C]/20 dark:border-[#C9A84C]/10 space-y-3">
              <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
                Which capacity constraint most affects your sector?
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Halal certification delays",
                  "Infrastructure bottlenecks",
                  "Skills shortage",
                  "Processing facilities",
                ].map((opt) => (
                  <Button
                    key={opt}
                    type="button"
                    variant="outline"
                    className={cn(
                      "justify-start h-auto py-3 text-sm text-left transition-all",
                      data.q5_6_growth_underinvestment_followup === opt ? activeBtn : inactiveBtn
                    )}
                    onClick={() => update("q5_6_growth_underinvestment_followup", opt)}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── 8. Live Score Summary ── */}
      {(data.q5_s1_halal_legitimacy_impact || data.q5_w1_halal_cert_impact || data.q5_t1_standards_recognition_impact) && (
        <Card className="border-[#C9A84C]/30 bg-gradient-to-r from-[#022c22]/5 to-[#C9A84C]/5 dark:from-[#022c22]/20 dark:to-[#C9A84C]/10">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-[#C9A84C]" />
              <span className="text-xs font-bold text-[#C9A84C] uppercase tracking-wider">
                Live SWOT Scores — Transformers
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "S1 Halal Legitimacy", i: data.q5_s1_halal_legitimacy_impact, l: data.q5_s1_halal_legitimacy_likelihood, cat: "strength" },
                { label: "S2 Domestic Demand", i: data.q5_s2_domestic_demand_impact, l: data.q5_s2_domestic_demand_likelihood, cat: "strength" },
                { label: "S3 Polloc Freeport", i: data.q5_s3_polloc_freeport_impact, l: data.q5_s3_polloc_freeport_likelihood, cat: "strength" },
                { label: "S4 Cultural Heritage", i: data.q5_s4_cultural_heritage_impact, l: data.q5_s4_cultural_heritage_likelihood, cat: "strength" },
                { label: "W1 Halal Cert", i: data.q5_w1_halal_cert_impact, l: data.q5_w1_halal_cert_likelihood, cat: "weakness" },
                { label: "W2 Cold Chain", i: data.q5_w2_cold_chain_impact, l: data.q5_w2_cold_chain_likelihood, cat: "weakness" },
                { label: "W3 Market Links", i: data.q5_w3_market_linkages_impact, l: data.q5_w3_market_linkages_likelihood, cat: "weakness" },
                { label: "T1 Standards Risk", i: data.q5_t1_standards_recognition_impact, l: data.q5_t1_standards_recognition_likelihood, cat: "threat" },
              ].map(({ label, i, l, cat }) => {
                let score: number | null = null;
                let suffix = "";
                if (i && l) {
                  if (cat === "strength") { score = calculateStrengthRI(i, l); suffix = "RI"; }
                  else if (cat === "weakness") { score = calculateWeaknessRisk(i, l); suffix = "Risk"; }
                  else if (cat === "threat") { score = calculateThreatVI(i, l); suffix = "VI"; }
                }
                return (
                  <div
                    key={label}
                    className="rounded-lg border border-[#C9A84C]/20 bg-white/80 dark:bg-[#022c22]/60 p-3 text-center"
                  >
                    <p className="text-[10px] text-[#065f46] dark:text-[#ecfdf5]/60 font-medium mb-1">{label}</p>
                    <p className="text-lg font-bold text-[#022c22] dark:text-[#ecfdf5]">
                      {score !== null ? `${score.toFixed(1)}` : "—"}
                    </p>
                    <p className="text-[9px] text-[#64748b] dark:text-[#ecfdf5]/40">{suffix || "Pending"}</p>
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

export default Section5_Transformers;
