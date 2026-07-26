import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  TreePine,
  AlertTriangle,
  CloudRain,
  Bug,
  Sun,
  Waves,
  Mountain,
  MapPin,
  FileText,
  Leaf,
  Sprout,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Zap,
  BookOpen,
  ShieldAlert,
  Users,
  Wind,
  Droplets,
} from "lucide-react";
import { BIRD_IMAGES } from "@/lib/bird-urls";
import {
  calculateStrengthRI,
  calculateWeaknessRisk,
  calculateOpportunityRI,
  calculateThreatVI,
} from "@/lib/formulas";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES — Aligned with SWOT_Scale_Questions.md & CLDs_Systems_Archetypes_Questions.md
// ─────────────────────────────────────────────────────────────────────────────

export interface Section4Data {
  // Understanding validation
  q4_1_foundations_banner_understanding?: number;

  // Archetype: Tragedy of the Commons
  q4_2_tragedy_commons_accuracy?: string;
  q4_3_tragedy_followup?: string;

  // ── Strengths ──
  q4_s1_aff_base_impact?: number;
  q4_s1_aff_base_likelihood?: number;
  q4_s2_renewable_energy_impact?: number;
  q4_s2_renewable_energy_likelihood?: number;
  q4_s3_lake_lanao_impact?: number;
  q4_s3_lake_lanao_likelihood?: number;
  q4_s4_seaweed_dominance_impact?: number;
  q4_s4_seaweed_dominance_likelihood?: number;

  // ── Weaknesses ──
  q4_w1_land_tenure_impact?: number;
  q4_w1_land_tenure_likelihood?: number;

  // ── Opportunities ──
  q4_o1_renewable_invest_impact?: number;
  q4_o1_renewable_invest_likelihood?: number;
  q4_o2_carbon_markets_impact?: number;
  q4_o2_carbon_markets_likelihood?: number;
  q4_o3_pes_impact?: number;
  q4_o3_pes_likelihood?: number;
  q4_o4_forestry_code_impact?: number;
  q4_o4_forestry_code_likelihood?: number;

  // ── Threats ──
  q4_t1_pestalotiopsis_impact?: number;
  q4_t1_pestalotiopsis_likelihood?: number;
}

interface Section4Props {
  data: Section4Data;
  onChange: (data: Section4Data) => void;
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
  category: "strength" | "weakness" | "opportunity" | "threat";
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
      case "opportunity":
        score = calculateOpportunityRI(impact, likelihood);
        scoreLabel = "RI";
        scoreColor = "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300";
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

const Section4_Foundations: React.FC<Section4Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section4Data>(
    field: K,
    value: Section4Data[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  const activeBtn =
    "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90 dark:bg-[#C9A84C] dark:text-[#022c22] dark:border-[#C9A84C]";
  const inactiveBtn =
    "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C] dark:bg-[#022c22]/50 dark:text-[#ecfdf5] dark:border-[#C9A84C]/30";

  return (
    <div className="space-y-8">
      {/* ── Section Header ── */}
      <div className="flex items-center gap-3 mb-2">
        <TreePine className="w-6 h-6 text-[#1B4D3E] dark:text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22] dark:text-[#ecfdf5]">
          Section 4: Cluster 1 — Foundations
        </h2>
      </div>
      <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 mb-4 -mt-2">
        The Infrastructure-First Resource Base: agriculture, fisheries, forestry, energy & environment
      </p>

      {/* ── 1. Banner Image ── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src={BIRD_IMAGES.cluster1Foundations.url}
          alt={BIRD_IMAGES.cluster1Foundations.alt}
          className="w-full h-auto max-h-[420px] object-contain transition-transform group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
          <p className="text-xs text-white/90 italic">
            {BIRD_IMAGES.cluster1Foundations.title}
          </p>
        </div>
      </div>

      {/* ── 2. Foundations Description ── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            The Resource & Infrastructure Backbone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90 leading-relaxed">
            Cluster 1 | Foundations forms the resource and infrastructure backbone of the Bangsamoro
            Investment Roadmap — the essential groundwork upon which other clusters and strategies
            will build.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="rounded-lg border border-emerald-200 dark:border-emerald-800/30 bg-emerald-50/60 dark:bg-emerald-900/10 p-4">
              <h4 className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5] mb-1 flex items-center gap-2">
                <Sprout className="w-4 h-4 text-[#1B4D3E] dark:text-emerald-400" /> Agri‑Fisheries
              </h4>
              <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
                Over 30% of GRDP, with notable outputs like Tawi‑Tawi&apos;s seaweed and Maguindanao&apos;s rice and corn.
              </p>
            </div>
            <div className="rounded-lg border border-amber-200 dark:border-amber-800/30 bg-amber-50/60 dark:bg-amber-900/10 p-4">
              <h4 className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5] mb-1 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-700 dark:text-amber-400" /> Energy
              </h4>
              <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
                Over 75% renewable energy mix, anchored by hydroelectric and emerging solar/biomass sources.
              </p>
            </div>
            <div className="rounded-lg border border-green-200 dark:border-green-800/30 bg-green-50/60 dark:bg-green-900/10 p-4">
              <h4 className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5] mb-1 flex items-center gap-2">
                <TreePine className="w-4 h-4 text-green-700 dark:text-green-400" /> Forestry
              </h4>
              <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
                Vast untapped carbon reserves and ecosystem services for sustainable resource management.
              </p>
            </div>
            <div className="rounded-lg border border-teal-200 dark:border-teal-800/30 bg-teal-50/60 dark:bg-teal-900/10 p-4">
              <h4 className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5] mb-1 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-teal-700 dark:text-teal-400" /> Environment
              </h4>
              <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
                Green Economy as a driver of revenue and innovation, not merely a compliance obligation.
              </p>
            </div>
          </div>

          {/* Understanding validation */}
          <div className="pt-4 border-t border-[#C9A84C]/20 dark:border-[#C9A84C]/10">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
              How clearly does the Foundations cluster description convey the role of natural resources
              and infrastructure as the backbone of BARMM&apos;s economy?
              <span className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 block mt-1 font-normal">
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

      {/* ── 3. Tragedy of the Commons Archetype ── */}
      <Card className="border-red-200/60 dark:border-red-800/30 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            Systems Archetype: Tragedy of the Commons
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-red-200/50 dark:border-red-800/20 shadow-lg">
            <img
              src={BIRD_IMAGES.tragedyCommons.url}
              alt={BIRD_IMAGES.tragedyCommons.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>

          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90 leading-relaxed">
            The &quot;Tragedy of the Commons&quot; occurs when shared resources are over-exploited due to lack
            of proper governance. It is <strong>not inevitable</strong> — it serves as a warning of
            what happens when actors prioritize short-term gains over collective long-term
            sustainability.
          </p>

          <div className="space-y-3 pt-2">
            <div className="rounded-lg border border-red-100 dark:border-red-800/20 bg-red-50/40 dark:bg-red-900/10 p-4">
              <h4 className="text-xs font-bold text-red-800 dark:text-red-300 uppercase tracking-wider mb-2">
                Reinforcing Loops (Self-Amplifying Overuse)
              </h4>
              <ul className="text-xs text-[#065f46] dark:text-[#ecfdf5]/70 space-y-1.5 list-disc list-inside">
                <li><strong>R1:</strong> Economic gains attract more actors — a self‑amplifying cycle of overuse.</li>
                <li><strong>R2:</strong> Growing communities and industries intensify resource use, accelerating depletion.</li>
                <li><strong>R3:</strong> Increased activities further boost gains, reinforcing the illusion of prosperity.</li>
                <li><strong>R4:</strong> Larger communities and industries multiply consumption, compounding ecological strain.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-amber-100 dark:border-amber-800/20 bg-amber-50/40 dark:bg-amber-900/10 p-4">
              <h4 className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-2">
                Balancing Loops (Delayed Collapse)
              </h4>
              <ul className="text-xs text-[#065f46] dark:text-[#ecfdf5]/70 space-y-1.5 list-disc list-inside">
                <li><strong>B5:</strong> Resource limits push back — finite ecological capacity constrains extraction, but feedback arrives too late.</li>
                <li><strong>B6:</strong> Delayed impact and collapse — environmental decline lags behind exploitation; by the time depletion is visible, the system nears failure.</li>
              </ul>
            </div>
          </div>

          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 italic border-l-2 border-[#C9A84C] dark:border-[#C9A84C]/50 pl-3">
            Without governance intervention — such as the Bangsamoro Forestry Code, carbon markets,
            and community co-management — the Foundations cluster risks <strong>systemic collapse</strong>.
          </p>

          {/* Archetype Validation Questions */}
          <div className="pt-4 border-t border-[#C9A84C]/20 dark:border-[#C9A84C]/10 space-y-5">
            <div>
              <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
                How accurately does the &quot;Tragedy of the Commons&quot; reflect potential resource
                management challenges in BARMM&apos;s agriculture, fisheries, and forestry sectors?
              </Label>
              <div className="flex gap-2 flex-wrap">
                {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map((opt) => (
                  <Button
                    key={opt}
                    type="button"
                    variant="outline"
                    size="sm"
                    className={cn(
                      "text-xs px-3 py-2 rounded-lg border transition-all",
                      data.q4_2_tragedy_commons_accuracy === opt ? activeBtn : inactiveBtn
                    )}
                    onClick={() => update("q4_2_tragedy_commons_accuracy", opt)}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
                If this archetype applies, which shared resource is most at risk of over-exploitation?
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Watersheds", icon: <Droplets className="w-4 h-4" /> },
                  { label: "Fishing grounds", icon: <Waves className="w-4 h-4" /> },
                  { label: "Forest reserves", icon: <TreePine className="w-4 h-4" /> },
                  { label: "Agricultural land", icon: <Sprout className="w-4 h-4" /> },
                ].map(({ label, icon }) => (
                  <Button
                    key={label}
                    type="button"
                    variant="outline"
                    className={cn(
                      "justify-start h-auto py-3 text-sm text-left gap-2 transition-all",
                      data.q4_3_tragedy_followup === label ? activeBtn : inactiveBtn
                    )}
                    onClick={() => update("q4_3_tragedy_followup", label)}
                  >
                    {icon} {label}
                  </Button>
                ))}
              </div>
              <Textarea
                value={
                  data.q4_3_tragedy_followup &&
                  !["Watersheds", "Fishing grounds", "Forest reserves", "Agricultural land"].includes(data.q4_3_tragedy_followup)
                    ? data.q4_3_tragedy_followup
                    : ""
                }
                onChange={(e) => update("q4_3_tragedy_followup", e.target.value)}
                placeholder="Other (please specify)..."
                className="mt-3 min-h-[60px] text-sm border-[#C9A84C]/30 dark:border-[#C9A84C]/20 focus:border-[#C9A84C] dark:bg-[#022c22]/50 dark:text-[#ecfdf5]"
                rows={2}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 4. SWOT Assessment ── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#C9A84C]" />
            Risk & Resilience Assessment — Foundations Cluster
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
                icon={<Sprout className="w-4 h-4" />}
                label="Strong AFF Base"
                code="S1"
                description="BARMM has strong resources in rubber, coconut, seaweed, fisheries, halal farm products, and rice."
                impact={data.q4_s1_aff_base_impact}
                likelihood={data.q4_s1_aff_base_likelihood}
                onImpact={(v) => update("q4_s1_aff_base_impact", v)}
                onLikelihood={(v) => update("q4_s1_aff_base_likelihood", v)}
                category="strength"
              />
              <SwotFactor
                icon={<Sun className="w-4 h-4" />}
                label="Renewable Energy Endowments"
                code="S2"
                description="Untapped hydro (Lake Lanao), solar, and biomass energy potential."
                impact={data.q4_s2_renewable_energy_impact}
                likelihood={data.q4_s2_renewable_energy_likelihood}
                onImpact={(v) => update("q4_s2_renewable_energy_impact", v)}
                onLikelihood={(v) => update("q4_s2_renewable_energy_likelihood", v)}
                category="strength"
              />
              <SwotFactor
                icon={<Mountain className="w-4 h-4" />}
                label="Lake Lanao"
                code="S3"
                description="Multi-purpose resource for freshwater supply, hydroelectric power, and eco-tourism opportunities in Lanao del Sur."
                impact={data.q4_s3_lake_lanao_impact}
                likelihood={data.q4_s3_lake_lanao_likelihood}
                onImpact={(v) => update("q4_s3_lake_lanao_impact", v)}
                onLikelihood={(v) => update("q4_s3_lake_lanao_likelihood", v)}
                category="strength"
              />
              <SwotFactor
                icon={<Waves className="w-4 h-4" />}
                label="Tawi-Tawi's Global Seaweed Dominance"
                code="S4"
                description="Tawi-Tawi produces 40% of the Philippines' seaweed output, providing a massive resource base for industrial carrageenan processing."
                impact={data.q4_s4_seaweed_dominance_impact}
                likelihood={data.q4_s4_seaweed_dominance_likelihood}
                onImpact={(v) => update("q4_s4_seaweed_dominance_impact", v)}
                onLikelihood={(v) => update("q4_s4_seaweed_dominance_likelihood", v)}
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
            <SwotFactor
              icon={<MapPin className="w-4 h-4" />}
              label="Complex Land Tenure (SGA)"
              code="W1"
              description="Difficult overlay of Ancestral Domain (CADT), private titles, and public land, creating friction for large-scale agro-industrial parks."
              impact={data.q4_w1_land_tenure_impact}
              likelihood={data.q4_w1_land_tenure_likelihood}
              onImpact={(v) => update("q4_w1_land_tenure_impact", v)}
              onLikelihood={(v) => update("q4_w1_land_tenure_likelihood", v)}
              category="weakness"
            />
          </div>

          {/* Opportunities */}
          <div className="pt-6 border-t border-[#C9A84C]/10 dark:border-[#C9A84C]/10">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <h3 className="text-sm font-bold text-sky-800 dark:text-sky-300 uppercase tracking-wider">
                Opportunities — External Resilience Drivers
              </h3>
            </div>
            <div className="space-y-6">
              <SwotFactor
                icon={<Sun className="w-4 h-4" />}
                label="Renewable Energy Investments"
                code="O1"
                description="Growing interest in solar farms, hydro rehabilitation, and biomass projects aligning with BARMM's clean energy potential."
                impact={data.q4_o1_renewable_invest_impact}
                likelihood={data.q4_o1_renewable_invest_likelihood}
                onImpact={(v) => update("q4_o1_renewable_invest_impact", v)}
                onLikelihood={(v) => update("q4_o1_renewable_invest_likelihood", v)}
                category="opportunity"
              />
              <SwotFactor
                icon={<Leaf className="w-4 h-4" />}
                label="Carbon Markets & REDD+"
                code="O2"
                description="BARMM's forests and carbon stocks can be monetized through carbon credits, creating new revenue for communities and LGUs."
                impact={data.q4_o2_carbon_markets_impact}
                likelihood={data.q4_o2_carbon_markets_likelihood}
                onImpact={(v) => update("q4_o2_carbon_markets_impact", v)}
                onLikelihood={(v) => update("q4_o2_carbon_markets_likelihood", v)}
                category="opportunity"
              />
              <SwotFactor
                icon={<Droplets className="w-4 h-4" />}
                label="Payment for Ecosystem Services (PES)"
                code="O3"
                description="LGUs can earn income by protecting watersheds, coastlines, and mangroves — turning conservation into a revenue source."
                impact={data.q4_o3_pes_impact}
                likelihood={data.q4_o3_pes_likelihood}
                onImpact={(v) => update("q4_o3_pes_impact", v)}
                onLikelihood={(v) => update("q4_o3_pes_likelihood", v)}
                category="opportunity"
              />
              <SwotFactor
                icon={<FileText className="w-4 h-4" />}
                label="Bangsamoro Forestry Code"
                code="O4"
                description="Pending legislation could open sustainable timber, non-timber forest products (NTFPs), and forest nursery investments."
                impact={data.q4_o4_forestry_code_impact}
                likelihood={data.q4_o4_forestry_code_likelihood}
                onImpact={(v) => update("q4_o4_forestry_code_impact", v)}
                onLikelihood={(v) => update("q4_o4_forestry_code_likelihood", v)}
                category="opportunity"
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
              icon={<Bug className="w-4 h-4" />}
              label="Rubber Pestalotiopsis Disease"
              code="T1"
              description="A fungal disease attacking rubber plantations in Basilan and could spread to other rubber-producing areas, threatening farmer livelihoods."
              impact={data.q4_t1_pestalotiopsis_impact}
              likelihood={data.q4_t1_pestalotiopsis_likelihood}
              onImpact={(v) => update("q4_t1_pestalotiopsis_impact", v)}
              onLikelihood={(v) => update("q4_t1_pestalotiopsis_likelihood", v)}
              category="threat"
            />
          </div>
        </CardContent>
      </Card>

      {/* ── 5. Live Score Summary ── */}
      {(data.q4_s1_aff_base_impact || data.q4_w1_land_tenure_impact || data.q4_o1_renewable_invest_impact || data.q4_t1_pestalotiopsis_impact) && (
        <Card className="border-[#C9A84C]/30 bg-gradient-to-r from-[#022c22]/5 to-[#C9A84C]/5 dark:from-[#022c22]/20 dark:to-[#C9A84C]/10">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-[#C9A84C]" />
              <span className="text-xs font-bold text-[#C9A84C] uppercase tracking-wider">
                Live SWOT Scores — Foundations
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "S1 AFF Base", i: data.q4_s1_aff_base_impact, l: data.q4_s1_aff_base_likelihood, cat: "strength" },
                { label: "S2 Renewable", i: data.q4_s2_renewable_energy_impact, l: data.q4_s2_renewable_energy_likelihood, cat: "strength" },
                { label: "S3 Lake Lanao", i: data.q4_s3_lake_lanao_impact, l: data.q4_s3_lake_lanao_likelihood, cat: "strength" },
                { label: "S4 Seaweed", i: data.q4_s4_seaweed_dominance_impact, l: data.q4_s4_seaweed_dominance_likelihood, cat: "strength" },
                { label: "W1 Land Tenure", i: data.q4_w1_land_tenure_impact, l: data.q4_w1_land_tenure_likelihood, cat: "weakness" },
                { label: "O1 Renew Invest", i: data.q4_o1_renewable_invest_impact, l: data.q4_o1_renewable_invest_likelihood, cat: "opportunity" },
                { label: "O2 Carbon", i: data.q4_o2_carbon_markets_impact, l: data.q4_o2_carbon_markets_likelihood, cat: "opportunity" },
                { label: "T1 Pestalotiopsis", i: data.q4_t1_pestalotiopsis_impact, l: data.q4_t1_pestalotiopsis_likelihood, cat: "threat" },
              ].map(({ label, i, l, cat }) => {
                let score: number | null = null;
                let suffix = "";
                if (i && l) {
                  if (cat === "strength") { score = calculateStrengthRI(i, l); suffix = "RI"; }
                  else if (cat === "weakness") { score = calculateWeaknessRisk(i, l); suffix = "Risk"; }
                  else if (cat === "opportunity") { score = calculateOpportunityRI(i, l); suffix = "RI"; }
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

export default Section4_Foundations;
