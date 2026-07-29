import React, { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_LABELS: Record<number, string> = {
  1: "Strongly Disagree",
  2: "Disagree",
  3: "Neutral",
  4: "Agree",
  5: "Strongly Agree",
};

interface LikertScaleProps {
  value?: number;
  onChange: (value: number) => void;
  label?: React.ReactNode;
  description?: string;
  name: string;
  disabled?: boolean;
  /** Override default labels. Index 0 = value 1, index 4 = value 5. */
  labels?: Record<number, string>;
  /** Minimum value (default 1) */
  min?: number;
  /** Maximum value (default 5) */
  max?: number;
}

export const LikertScale: React.FC<LikertScaleProps> = ({
  value,
  onChange,
  label,
  description,
  name,
  disabled = false,
  labels,
  min = 1,
  max = 5,
}) => {
  const resolvedLabels = labels ?? DEFAULT_LABELS;
  const range = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  const groupRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, n: number) => {
      if (disabled) return;
      const options = range;
      const idx = options.indexOf(n);
      let nextIdx = idx;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        nextIdx = Math.min(idx + 1, options.length - 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        nextIdx = Math.max(idx - 1, 0);
      } else if (e.key === "Home") {
        e.preventDefault();
        nextIdx = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        nextIdx = options.length - 1;
      }

      if (nextIdx !== idx) {
        onChange(options[nextIdx]);
        // Focus the next button for continuous keyboard navigation
        const buttons = groupRef.current?.querySelectorAll('[role="radio"]');
        (buttons?.[nextIdx] as HTMLElement)?.focus();
      }
    },
    [disabled, range, onChange]
  );

  return (
    <div
      className={cn("space-y-3", disabled && "opacity-50 pointer-events-none")}
      role="radiogroup"
      aria-label={typeof label === "string" ? label : name}
    >
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

      <div ref={groupRef} className="flex items-center justify-between gap-1">
        {range.map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            tabIndex={value === n ? 0 : -1}
            onClick={() => onChange(n)}
            onKeyDown={(e) => handleKeyDown(e, n)}
            className={cn(
              "flex-1 py-2.5 px-1 text-xs font-medium rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40",
              value === n
                ? "bg-[#C9A84C]/20 border-[#C9A84C] text-[#C9A84C] shadow-sm"
                : "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/50 hover:border-[#C9A84C]/30 hover:text-[#ecfdf5]/80"
            )}
          >
            <span className="block text-center">{n}</span>
          </button>
        ))}
      </div>

      <div className="flex justify-between text-[10px] text-[#ecfdf5]/40 px-0.5">
        <span>{resolvedLabels[min]}</span>
        <span>{resolvedLabels[max]}</span>
      </div>

      {/* Hidden input for form integration */}
      <input type="hidden" name={name} value={value ?? ""} />
    </div>
  );
};
