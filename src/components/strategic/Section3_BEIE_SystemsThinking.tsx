import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Network, BookOpen, Play, Target, TrendingUp } from "lucide-react";
import { BIRD_IMAGES, BIRD_VIDEOS } from "@/lib/bird-urls";
import { calculateStrengthRI } from "@/lib/formulas";

// ── Types ────────────────────────────────────────────────────────────────────
export interface Section3Data {
  q3_1_beie_video_understanding?: number;
  q3_2_systems_reframing_accuracy?: number;
  q3_3_sector_to_ecosystem_shift?: number;
  q3_4_beie_framework_clarity?: number;
  q3_5_operating_systems_understanding?: number;
  q3_6_five_clusters_understanding?: number;
  q3_7_investment_development_loop?: string;
  q3_8_governance_investor_loop?: string;
  q_s1_halal_legitimacy_impact?: number;
  q_s1_halal_legitimacy_likelihood?: number;
  q_s1_bimpeaga_impact?: number;
  q_s1_bimpeaga_likelihood?: number;
  q_s1_aff_base_impact?: number;
  q_s1_aff_base_likelihood?: number;
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

  const renderSwotPair = (
    label: string,
    impactField: keyof Section3Data,
    likelihoodField: keyof Section3Data,
    riLabel: string
  ) => {
    const impact = data[impactField] as number | undefined;
    const likelihood = data[likelihoodField] as number | undefined;
    const ri =
      impact && likelihood ? calculateStrengthRI(impact, likelihood) : null;

    return (
      <div className="space-y-4 p-4 rounded-lg border border-[#C9A84C]/20 bg-emerald-50/40 dark:bg-[#1B4D3E]/10">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[#C9A84C]" />
          <p className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            {label}
          </p>
          {ri !== null && (
            <Badge
              variant="secondary"
              className="ml-auto bg-[#C9A84C]/10 text-[#022c22] dark:text-[#ecfdf5] border border-[#C9A84C]/20"
            >
              <TrendingUp className="w-3 h-3 mr-1" />
              {riLabel}: {ri.toFixed(2)}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs font-medium text-[#065f46] dark:text-[#ecfdf5]/70 mb-2 block">
              Impact (1 = minimal, 5 = transformative)
            </Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((v) => (
                <Button
                  key={v}
                  type="button"
                  variant="outline"
                  size="icon"
                  className={cn(
                    "w-10 h-10 rounded-lg border text-sm font-semibold transition-all",
                    impact === v
                      ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                      : "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                  )}
                  onClick={() => update(impactField, v as any)}
                >
                  {v}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-xs font-medium text-[#065f46] dark:text-[#ecfdf5]/70 mb-2 block">
              Likelihood (1 = unlikely, 5 = almost certain)
            </Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((v) => (
                <Button
                  key={v}
                  type="button"
                  variant="outline"
                  size="icon"
                  className={cn(
                    "w-10 h-10 rounded-lg border text-sm font-semibold transition-all",
                    likelihood === v
                      ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                      : "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                  )}
                  onClick={() => update(likelihoodField, v as any)}
                >
                  {v}
                </Button>
              ))}
            </div>
          </div>
        </div>
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

      {/* ── BEIE Framework Video ───────────────────────────────────────── */}
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
        </CardContent>
      </Card>

      {/* ── Systems-Based Reframing ────────────────────────────────────── */}
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
            {BIRD_IMAGES.systemsBasedReframing.description}
          </p>
        </CardContent>
      </Card>

      {/* ── Sector to Ecosystem Shift ──────────────────────────────────── */}
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
            {BIRD_IMAGES.sectorToEcosystem.description}
          </p>
        </CardContent>
      </Card>

      {/* ── BEIE Framework Diagram ─────────────────────────────────────── */}
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
            {BIRD_IMAGES.beieFramework.description}
          </p>
        </CardContent>
      </Card>

      {/* ── Operating Systems: Moral Governance ────────────────────────── */}
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
            {BIRD_IMAGES.operatingSystems.description}
          </p>
        </CardContent>
      </Card>

      {/* ── Five Interconnected Clusters ───────────────────────────────── */}
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
            {BIRD_IMAGES.fiveClusters.description}
          </p>
        </CardContent>
      </Card>

      {/* ── Investment-Development Virtuous Cycle ──────────────────────── */}
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
            {BIRD_IMAGES.investmentVirtuousCycle.description}
          </p>
        </CardContent>
      </Card>

      {/* ── Investment and Governance Cycles ───────────────────────────── */}
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
            {BIRD_IMAGES.investmentGovernanceCycles.description}
          </p>
        </CardContent>
      </Card>

      {/* ── Framework Understanding Checks ─────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#C9A84C]" />
            Framework Understanding & Validation
          </CardTitle>
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 italic pt-1">
            Rate your understanding of each concept after reviewing the
            materials. (1 = not at all, 5 = completely)
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {renderScaleQuestion(
            "How well did the BEIE Framework video explain the ecosystem approach?",
            "q3_1_beie_video_understanding"
          )}

          {renderScaleQuestion(
            "How accurately does 'systems-based reframing' describe the shift BARMM needs?",
            "q3_2_systems_reframing_accuracy"
          )}

          {renderScaleQuestion(
            "How clear is the mental model shift from sector-based planning to the BEIE approach?",
            "q3_3_sector_to_ecosystem_shift"
          )}

          {renderScaleQuestion(
            "How clear is the overall BEIE Framework diagram (5 clusters + Moral Governance OS)?",
            "q3_4_beie_framework_clarity"
          )}

          {renderScaleQuestion(
            "How well do you understand Moral Governance as the 'operating system' of the ecosystem?",
            "q3_5_operating_systems_understanding"
          )}

          {renderScaleQuestion(
            "How well do you understand the role of each of the five interconnected clusters?",
            "q3_6_five_clusters_understanding"
          )}
        </CardContent>
      </Card>

      {/* ── Causal Loop Reflection ─────────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <Target className="w-5 h-5 text-[#C9A84C]" />
            Causal Loop Reflection
          </CardTitle>
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 italic pt-1">
            In your own words, describe the reinforcing loops that drive
            Bangsamoro&apos;s investment ecosystem.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
              Describe the <strong>Investment-Development Virtuous Cycle</strong>{" "}
              (R1): How does strategic investment trigger self-sustaining growth?
            </Label>
            <textarea
              value={data.q3_7_investment_development_loop || ""}
              onChange={(e) =>
                update("q3_7_investment_development_loop", e.target.value)
              }
              placeholder="e.g., Infrastructure investment → productivity gains → revenue growth → reinvestment..."
              rows={4}
              className="w-full rounded-lg border border-[#C9A84C]/30 bg-white dark:bg-[#022c22]/50 px-3 py-2 text-sm text-[#022c22] dark:text-[#ecfdf5] placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 resize-y"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
              Describe the <strong>Governance-Investor Confidence Cycle</strong>{" "}
              (R2): How does moral governance de-risk capital?
            </Label>
            <textarea
              value={data.q3_8_governance_investor_loop || ""}
              onChange={(e) =>
                update("q3_8_governance_investor_loop", e.target.value)
              }
              placeholder="e.g., Transparent governance → investor trust → FDI inflows → revenue → governance capacity..."
              rows={4}
              className="w-full rounded-lg border border-[#C9A84C]/30 bg-white dark:bg-[#022c22]/50 px-3 py-2 text-sm text-[#022c22] dark:text-[#ecfdf5] placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 resize-y"
            />
          </div>
        </CardContent>
      </Card>

      {/* ── SWOT Strengths Scoring ─────────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#C9A84C]" />
            SWOT Strengths Scoring — Transformers Cluster
          </CardTitle>
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 italic pt-1">
            Rate each strength by <strong>Impact</strong> and{" "}
            <strong>Likelihood</strong>. Resilience Index (RI) computes
            automatically: RI = (Impact × Likelihood) / 5.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderSwotPair(
            "S1 — Halal Industry Legitimacy: BARMM's cultural & geographic advantage in ASEAN halal markets",
            "q_s1_halal_legitimacy_impact",
            "q_s1_halal_legitimacy_likelihood",
            "RI"
          )}

          {renderSwotPair(
            "S1 — BIMP-EAGA Integration: Cross-border trade corridors and regional economic cooperation",
            "q_s1_bimpeaga_impact",
            "q_s1_bimpeaga_likelihood",
            "RI"
          )}

          {renderSwotPair(
            "S1 — Agri-Fisheries Base: Productive land & marine resources as foundational economic assets",
            "q_s1_aff_base_impact",
            "q_s1_aff_base_likelihood",
            "RI"
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Section3_BEIE_SystemsThinking;
