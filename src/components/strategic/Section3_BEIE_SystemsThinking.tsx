import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Network, BookOpen, Play, Target, TrendingUp } from "lucide-react";
import { BIRD_IMAGES, BIRD_VIDEOS } from "@/lib/bird-urls";

// ── Types ────────────────────────────────────────────────────────────────────
export interface Section3Data {
  q3_1_beie_video_understanding?: number;
  q3_2_systems_reframing_accuracy?: number;
  q3_3_sector_to_ecosystem_shift?: number;
  q3_4_beie_framework_clarity?: number;
  q3_5_operating_systems_understanding?: number;
  q3_6_five_clusters_understanding?: number;
  q3_cld1_investment_development_accuracy?: string;
  q3_cld1_investment_development_followup?: string;
  q3_cld2_governance_confidence_accuracy?: string;
  q3_cld2_governance_confidence_followup?: string;
}

interface Section3Props {
  data: Section3Data;
  onChange: (data: Section3Data) => void;
}

// ── Component ────────────────────────────────────────────────────────────────
export const Section3_BEIE_SystemsThinking: React.FC<Section3Props> = ({
  data,
  onChange,
}) => {
  const update = <K extends keyof Section3Data>(
    field: K,
    value: Section3Data[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  const activeBtnClass =
    "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90";
  const inactiveBtnClass =
    "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[#ecfdf5]/30 dark:hover:bg-[#C9A84C]/10";

  const scaleLabels = ["Not at all", "Slightly", "Moderately", "Very well", "Completely"];

  const renderScaleQuestion = (
    label: string,
    field: keyof Section3Data,
    description?: string
  ) => (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
        {label}
        {description && (
          <span className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 block mt-1 font-normal">
            {description}
          </span>
        )}
      </Label>
      <div className="flex gap-2 flex-wrap">
        {[1, 2, 3, 4, 5].map((v) => (
          <Button
            key={v}
            type="button"
            variant="outline"
            size="icon"
            className={cn(
              "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
              data[field] === v
                ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                : "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C]"
            )}
            onClick={() => update(field, v as any)}
          >
            {v}
          </Button>
        ))}
      </div>
      <div className="flex justify-between mt-1 max-w-[272px]">
        <span className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60">
          {scaleLabels[0]}
        </span>
        <span className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60">
          {scaleLabels[4]}
        </span>
      </div>
    </div>
  );

  const archetypeOptions = ["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"];

  const renderArchetypeQuestion = (
    label: string,
    accuracyField: keyof Section3Data,
    followupField: keyof Section3Data
  ) => {
    const accuracy = data[accuracyField] as string | undefined;
    const agree = accuracy === "Very accurately" || accuracy === "Somewhat accurately";
    return (
      <div className="space-y-4 p-4 rounded-lg border border-[#C9A84C]/20 bg-emerald-50/40 dark:bg-[#1B4D3E]/10">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[#C9A84C]" />
          <p className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5]">{label}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {archetypeOptions.map((opt) => (
            <Button
              key={opt}
              type="button"
              variant="outline"
              className={cn(
                "justify-start h-auto py-3 text-sm text-left",
                accuracy === opt ? activeBtnClass : inactiveBtnClass
              )}
              onClick={() => update(accuracyField, opt as never)}
            >
              {opt}
            </Button>
          ))}
        </div>
        {agree && (
          <textarea
            value={(data[followupField] as string) || ""}
            onChange={(e) => update(followupField, e.target.value as never)}
            placeholder="Optional: add any nuance or a specific example..."
            rows={3}
            className="w-full rounded-lg border border-[#C9A84C]/30 bg-white dark:bg-[#022c22]/50 px-3 py-2 text-sm text-[#022c22] dark:text-[#ecfdf5] placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 resize-y"
          />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-[#022c22] text-[#C9A84C] shadow-md shrink-0">
          <Network className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#022c22] dark:text-[#ecfdf5]">
            Section 3: BEIE & Systems Thinking
          </h2>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 mt-1 max-w-3xl">
            The IEDS requires a synchronized, cross-cluster monitoring framework
            that measures not just sectoral outputs but ecosystem health. This
            section validates the conceptual foundations and archetype
            understanding.
          </p>
        </div>
      </div>
      {/* ── BEIE Framework Video + Q1 (merged) ───────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <Play className="w-5 h-5 text-[#C9A84C]" />
            Bangsamoro Economic & Investment Ecosystem (BEIE) Framework
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg aspect-video">
            <iframe
              src={BIRD_VIDEOS.beieFramework.url.replace(
                "youtu.be/",
                "youtube.com/embed/"
              )}
              title={BIRD_VIDEOS.beieFramework.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300"
            >
              <Play className="w-3 h-3 mr-1" />
              {BIRD_VIDEOS.beieFramework.duration}
            </Badge>
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            {BIRD_VIDEOS.beieFramework.description}
          </p>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            {renderScaleQuestion(
              "How well did the BEIE Framework video explain the ecosystem approach?",
              "q3_1_beie_video_understanding"
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── Systems-Based Reframing + Q2 (merged) ────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#C9A84C]" />
            Why the Need for Systems-Based Reframing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src={BIRD_IMAGES.systemsBasedReframing.url}
              alt={BIRD_IMAGES.systemsBasedReframing.alt}
              className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">
                {BIRD_IMAGES.systemsBasedReframing.title}
              </p>
            </div>
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            This conveys the shift from traditional, siloed approaches to investment planning
            toward a more integrated, systems-oriented perspective. It contrasts the limitations
            of treating sectors as isolated entities — which leads to fragmented planning and
            missed synergies — with the benefits of viewing agriculture, industry, infrastructure,
            trade, and finance as interdependent parts of one ecosystem.
          </p>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            {renderScaleQuestion(
              "How accurately does 'systems-based reframing' describe the shift BARMM needs?",
              "q3_2_systems_reframing_accuracy"
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── Sector to Ecosystem Shift + Q3 (merged) ──────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#C9A84C]" />
            From Sector-Based Planning to BEIE Approach
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src={BIRD_IMAGES.sectorToEcosystem.url}
              alt={BIRD_IMAGES.sectorToEcosystem.alt}
              className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">
                {BIRD_IMAGES.sectorToEcosystem.title}
              </p>
            </div>
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            On the left, sector-based planning is reactive and fragmented — infrastructure
            follows production, capital is allocated by single-sector grants, and market access
            stays limited to raw exports. On the right, the BEIE approach integrates systems
            thinking: infrastructure is primed first, equity extends across island provinces,
            financing is synchronized through Shariah-compliant instruments, and market access
            connects to the global halal and green economies.
          </p>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            {renderScaleQuestion(
              "How clear is the mental model shift from sector-based planning to the BEIE approach?",
              "q3_3_sector_to_ecosystem_shift"
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── BEIE Framework Diagram + Q4 (merged) ─────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <Network className="w-5 h-5 text-[#C9A84C]" />
            Bangsamoro Economic and Investment Ecosystem (BEIE)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src={BIRD_IMAGES.beieFramework.url}
              alt={BIRD_IMAGES.beieFramework.alt}
              className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">
                {BIRD_IMAGES.beieFramework.title}
              </p>
            </div>
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            The Bangsamoro Economic and Investment Ecosystem is a circular system powered by
            Moral Governance at its center — ethical leadership as the engine of development.
            Around it sit five interconnected clusters: <strong>Foundations</strong> (agriculture,
            forestry, and energy as the resource base), <strong>Transformers</strong> (industries
            and halal manufacturing that create value), <strong>Financiers</strong> (Islamic
            banking, waqf, sukuk, takaful, and microfinance that empower expansion),{" "}
            <strong>Connectors</strong> (trade, tourism, and regional links like BIMP-EAGA that
            open markets), and <strong>Enablers</strong> (infrastructure, health, and education
            providing support systems).
          </p>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            {renderScaleQuestion(
              "How clear is the overall BEIE Framework diagram (5 clusters + Moral Governance OS)?",
              "q3_4_beie_framework_clarity"
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── Operating Systems: Moral Governance + Q5 (merged) ────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#C9A84C]" />
            Operating Systems: Moral Governance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src={BIRD_IMAGES.operatingSystems.url}
              alt={BIRD_IMAGES.operatingSystems.alt}
              className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">
                {BIRD_IMAGES.operatingSystems.title}
              </p>
            </div>
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            Moral Governance is the central operating system of the Bangsamoro ecosystem, ensuring
            justice, transparency, accountability, and Islamic ethics (khalifa stewardship).
            Surrounding it are three foundational pillars: <strong>Peace</strong> — long-term
            stability for investment; <strong>Resilience</strong> — adaptive, climate-smart
            planning to withstand external shocks; and <strong>Inclusivity</strong> — broadening
            participation so marginalized communities share in value creation.
          </p>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            {renderScaleQuestion(
              "How well do you understand Moral Governance as the 'operating system' of the ecosystem?",
              "q3_5_operating_systems_understanding"
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── Five Interconnected Clusters + Q6 (merged) ───────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <Network className="w-5 h-5 text-[#C9A84C]" />
            Five Interconnected Clusters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src={BIRD_IMAGES.fiveClusters.url}
              alt={BIRD_IMAGES.fiveClusters.alt}
              className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">
                {BIRD_IMAGES.fiveClusters.title}
              </p>
            </div>
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            &quot;The Parts of the Engine&quot; shows how the Bangsamoro economy functions as an
            interconnected system driven by Moral Governance at its core: <strong>Foundations</strong>{" "}
            supply natural and energy resources (agriculture, fisheries, forestry);{" "}
            <strong>Financiers</strong> supply capital through Islamic banking, waqf, and
            microfinance; <strong>Transformers</strong> create value via industry and halal
            manufacturing; <strong>Enablers</strong> support movement through infrastructure,
            health, education, and connectivity; and <strong>Connectors</strong> open markets
            through exports, trade, and tourism.
          </p>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            {renderScaleQuestion(
              "How well do you understand the role of each of the five interconnected clusters?",
              "q3_6_five_clusters_understanding"
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── Investment-Development Virtuous Cycle + CLD1 archetype (merged) ── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#C9A84C]" />
            Investment-Development Virtuous Cycle
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src={BIRD_IMAGES.investmentVirtuousCycle.url}
              alt={BIRD_IMAGES.investmentVirtuousCycle.alt}
              className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">
                {BIRD_IMAGES.investmentVirtuousCycle.title}
              </p>
            </div>
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            This reinforcing loop captures how strategic investment triggers a self-sustaining
            cycle of growth across BARMM&apos;s economy. Investments stimulate employment, leading
            to higher income and stronger domestic market growth; as purchasing power expands,
            the business climate improves, attracting more investment — completing a loop that
            continuously amplifies development. Front-loading investment into halal certification
            infrastructure and agro-processing acts as a catalytic flywheel that spins this cycle
            faster than standard agricultural investment.
          </p>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            {renderArchetypeQuestion(
              "R1 — How accurately does this describe how strategic investment triggers self-sustaining growth?",
              "q3_cld1_investment_development_accuracy",
              "q3_cld1_investment_development_followup"
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── Investment and Governance Cycles + CLD2 archetype (merged) ──── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#C9A84C]" />
            Investment and Governance Cycles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src={BIRD_IMAGES.investmentGovernanceCycles.url}
              alt={BIRD_IMAGES.investmentGovernanceCycles.alt}
              className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">
                {BIRD_IMAGES.investmentGovernanceCycles.title}
              </p>
            </div>
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            Two interconnected reinforcing loops drive BARMM&apos;s sustained development.{" "}
            <strong>R1 — Investment-Development Cycle:</strong> strategic investments in halal,
            agro-industry, and tourism stimulate employment and income growth, expanding the
            domestic market and attracting further investment. <strong>R2 — Governance-Investor
            Confidence Cycle:</strong> moral governance and transparency expand the tax base and
            public funding, enabling better infrastructure that boosts investor confidence and
            further strengthens governance capacity. Operating in sync, the two loops form a
            compound growth engine for inclusive regional prosperity.
          </p>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            {renderArchetypeQuestion(
              "R2 — How accurately does this describe how moral governance de-risks capital?",
              "q3_cld2_governance_confidence_accuracy",
              "q3_cld2_governance_confidence_followup"
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Section3_BEIE_SystemsThinking;
