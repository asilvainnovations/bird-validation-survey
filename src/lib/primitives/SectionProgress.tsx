import React from "react";
import { cn } from "@/lib/utils";

interface SectionProgressProps {
  currentSection: number;
  totalSections?: number;
  sectionLabel?: string;
  className?: string;
}

export const SectionProgress: React.FC<SectionProgressProps> = ({
  currentSection,
  totalSections = 16,
  sectionLabel,
  className,
}) => {
  const pct = Math.round(((currentSection + 1) / totalSections) * 100);
  const activeBlock = Math.min(currentSection, totalSections - 1);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-[#C9A84C]">
          Section {String.fromCharCode(65 + activeBlock)}
          {sectionLabel && `: ${sectionLabel}`}
        </span>
        <span className="text-[#ecfdf5]/50">{pct}% complete</span>
      </div>

      <div className="h-2 w-full bg-[#022c22] rounded-full overflow-hidden border border-white/5">
        <div
          className="h-full bg-gradient-to-r from-[#C9A84C] to-[#E5C560] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Section dots */}
      <div className="flex items-center gap-1">
        {Array.from({ length: totalSections }, (_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors duration-300",
              i <= activeBlock
                ? "bg-[#C9A84C]/60"
                : "bg-white/5"
            )}
          />
        ))}
      </div>
    </div>
  );
};
