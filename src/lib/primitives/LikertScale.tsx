import React from "react";
import { cn } from "@/lib/utils";
import type { ScaleLabelSet } from "@/lib/scaleLabels";
import { AGREEMENT_SCALE, toLabelTuple } from "@/lib/scaleLabels";

interface LikertScaleProps {
  value?: number;
  onChange: (value: number) => void;
  label?: string;
  description?: string;
  name: string;
  disabled?: boolean;
  /**
   * The 5-point label set for this question — see src/lib/scaleLabels.ts for
   * the canonical sets (UNDERSTANDING_SCALE, CONFIDENCE_SCALE, etc.). Pass
   * the ScaleLabelSet object (not a plain string tuple) to also get the
   * fuller hint text as a hover tooltip on each button. Defaults to a
   * generic Strongly-Disagree→Strongly-Agree agreement scale.
   */
  scale?: ScaleLabelSet;
  /**
   * Back-compat: a plain 5-string tuple, used if `scale` isn't provided.
   * Prefer `scale` for new call sites — it also carries hint text.
   */
  labels?: [string, string, string, string, string];
}

export const LikertScale: React.FC<LikertScaleProps> = ({
  value,
  onChange,
  label,
  description,
  name,
  disabled = false,
  scale,
  labels,
}) => {
  const points = scale
    ? scale
    : labels
    ? (labels.map((l) => ({ label: l })) as unknown as ScaleLabelSet)
    : AGREEMENT_SCALE;
  const shortLabels = scale ? toLabelTuple(scale) : labels ?? toLabelTuple(AGREEMENT_SCALE);

  return (
    <div className={cn("space-y-3", disabled && "opacity-50 pointer-events-none")}>
      {(label || description) && (
        <div className="space-y-1">
          {label && (
            <label className="text-sm font-semibold text-[#ecfdf5]">{label}</label>
          )}
          {description && (
            <p className="text-xs text-[#ecfdf5]/60">{description}</p>
          )}
        </div>
      )}

      <div
        role="radiogroup"
        aria-label={label ?? name}
        className="grid grid-cols-5 gap-1"
        onKeyDown={(e) => {
          if (disabled) return;
          const current = value ?? 0;
          if (e.key === "ArrowRight" || e.key === "ArrowUp") {
            e.preventDefault();
            onChange(current >= 5 ? 1 : current + 1);
          } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
            e.preventDefault();
            onChange(current <= 1 ? 5 : current - 1);
          }
        }}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            tabIndex={value === n || (!value && n === 1) ? 0 : -1}
            onClick={() => onChange(n)}
            title={points[n - 1]?.hint || undefined}
            className={cn(
              "flex flex-col items-center gap-1 py-2 px-1 rounded-lg border transition-all duration-200",
              value === n
                ? "bg-[#C9A84C]/20 border-[#C9A84C] text-[#C9A84C] shadow-sm"
                : "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/50 hover:border-[#C9A84C]/30 hover:text-[#ecfdf5]/80"
            )}
          >
            <span className="text-xs font-semibold">{n}</span>
            <span className="text-[9px] leading-tight text-center">
              {shortLabels[n - 1]}
            </span>
          </button>
        ))}
      </div>

      {/* Hidden input for form integration */}
      <input type="hidden" name={name} value={value ?? ""} />

      {/* Screen-reader live announcement of the current selection */}
      <span role="status" aria-live="polite" className="sr-only">
        {value ? `Selected: ${shortLabels[value - 1]}` : "No selection made"}
      </span>
    </div>
  );
};
