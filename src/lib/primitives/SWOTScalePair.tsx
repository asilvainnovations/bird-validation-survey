import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

// Canonical category type from single source of truth (swot-content.ts)
import type { SwotCategory } from "@/lib/swot-content";
// BIRD scoring formulas — displays live computed metric next to sliders
import { calculateSWOTMetric } from "@/lib/formulas";

// Internal mapping from canonical single-letter category to display metadata.
// This keeps the public API aligned with swot-content.ts while still providing
// rich visual differentiation per category.
const CATEGORY_META: Record<
  SwotCategory,
  { label: string; badgeStyle: string; scoreLabel: string }
> = {
  S: {
    label: "Strength",
    badgeStyle: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    scoreLabel: "Resilience Index",
  },
  W: {
    label: "Weakness",
    badgeStyle: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    scoreLabel: "Risk Score",
  },
  O: {
    label: "Opportunity",
    badgeStyle: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    scoreLabel: "Resilience Index",
  },
  T: {
    label: "Threat",
    badgeStyle: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    scoreLabel: "Vulnerability Index",
  },
};

// Map canonical category to formula-compatible lowercase for calculateSWOTMetric.
const CATEGORY_TO_FORMULA: Record<SwotCategory, "strength" | "weakness" | "opportunity" | "threat"> = {
  S: "strength",
  W: "weakness",
  O: "opportunity",
  T: "threat",
};

interface SWOTScalePairProps {
  /** Canonical category from swot-content.ts: "S" | "W" | "O" | "T" */
  category: SwotCategory;
  factorLabel: string;
  factorDescription?: string;
  impact?: number;
  likelihood?: number;
  onImpactChange: (value: number) => void;
  onLikelihoodChange: (value: number) => void;
  disabled?: boolean;
}

export const SWOTScalePair: React.FC<SWOTScalePairProps> = ({
  category,
  factorLabel,
  factorDescription,
  impact,
  likelihood,
  onImpactChange,
  onLikelihoodChange,
  disabled = false,
}) => {
  const meta = CATEGORY_META[category];

  // Live computed BIRD metric (RI, Risk, or VI) based on current slider values.
  const computedScore = useMemo(() => {
    if (impact == null || likelihood == null) return null;
    return calculateSWOTMetric(CATEGORY_TO_FORMULA[category], impact, likelihood);
  }, [category, impact, likelihood]);

  return (
    <div
      className={cn(
        "p-4 rounded-xl border bg-[#011a12]/60 transition-opacity",
        meta.badgeStyle.split(" ").find((s) => s.startsWith("border-")),
        disabled && "opacity-50 pointer-events-none"
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="space-y-1">
          <Badge
            variant="outline"
            className={cn("text-[10px] uppercase tracking-wider", meta.badgeStyle)}
          >
            {meta.label}
          </Badge>
          <h4 className="text-sm font-semibold text-[#ecfdf5]">{factorLabel}</h4>
          {factorDescription && (
            <p className="text-xs text-[#ecfdf5]/50">{factorDescription}</p>
          )}
        </div>
        {computedScore != null && (
          <div className="text-right">
            <div className="text-lg font-bold text-[#C9A84C]">{computedScore}</div>
            <div className="text-[10px] text-[#ecfdf5]/40 uppercase tracking-wider">
              {meta.scoreLabel}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Impact Scale */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-[#ecfdf5]/70">Impact</Label>
            <span className="text-xs font-bold text-[#C9A84C]">{impact ?? "–"}</span>
          </div>
          <Slider
            value={[impact ?? 0]}
            onValueChange={([v]) => onImpactChange(v)}
            min={0}
            max={5}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-[10px] text-[#ecfdf5]/30">
            <span>None</span>
            <span>Critical</span>
          </div>
        </div>

        {/* Likelihood Scale */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-[#ecfdf5]/70">Likelihood</Label>
            <span className="text-xs font-bold text-[#C9A84C]">{likelihood ?? "–"}</span>
          </div>
          <Slider
            value={[likelihood ?? 0]}
            onValueChange={([v]) => onLikelihoodChange(v)}
            min={0}
            max={5}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-[10px] text-[#ecfdf5]/30">
            <span>Improbable</span>
            <span>Certain</span>
          </div>
        </div>
      </div>
    </div>
  );
};
