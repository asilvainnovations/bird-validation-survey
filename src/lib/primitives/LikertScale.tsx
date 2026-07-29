import React from "react";
import { cn } from "@/lib/utils";

const LIKERT_LABELS: Record<number, string> = {
  1: "Strongly Disagree",
  2: "Disagree",
  3: "Neutral",
  4: "Agree",
  5: "Strongly Agree",
};

interface LikertScaleProps {
  value?: number;
  onChange: (value: number) => void;
  label?: string;
  description?: string;
  name: string;
  disabled?: boolean;
}

export const LikertScale: React.FC<LikertScaleProps> = ({
  value,
  onChange,
  label,
  description,
  name,
  disabled = false,
}) => {
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

      <div className="flex items-center justify-between gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <React.Fragment key={n}>
            <button
              type="button"
              onClick={() => onChange(n)}
              className={cn(
                "flex-1 py-2.5 px-1 text-xs font-medium rounded-lg border transition-all duration-200",
                value === n
                  ? "bg-[#C9A84C]/20 border-[#C9A84C] text-[#C9A84C] shadow-sm"
                  : "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/50 hover:border-[#C9A84C]/30 hover:text-[#ecfdf5]/80"
              )}
              aria-pressed={value === n}
              aria-label={LIKERT_LABELS[n]}
            >
              <span className="block text-center">{n}</span>
            </button>
          </React.Fragment>
        ))}
      </div>

      <div className="flex justify-between text-[10px] text-[#ecfdf5]/40 px-0.5">
        <span>Strongly Disagree</span>
        <span>Strongly Agree</span>
      </div>

      {/* Hidden input for form integration */}
      <input type="hidden" name={name} value={value ?? ""} />
    </div>
  );
};
