import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ImageWithFallback } from "./ImageWithFallback";
import { BIRD_IMAGES } from "@/lib/bird-urls";
import { Lightbulb, AlertTriangle, TrendingUp, ShieldAlert, GitBranch, Scale } from "lucide-react";

// Iconography & color mapping by slug (stable identifier from swot-content.ts).
// Fallbacks are provided so any new archetype added to the registry renders gracefully.
const SLUG_META: Record<
  string,
  { icon: React.ReactNode; color: string; kind: string }
> = {
  investment_development_loop: {
    icon: <TrendingUp className="w-4 h-4" />,
    color: "text-emerald-400",
    kind: "Reinforcing Loop",
  },
  governance_investor_confidence_loop: {
    icon: <ShieldAlert className="w-4 h-4" />,
    color: "text-sky-400",
    kind: "Governance Loop",
  },
  tragedy_of_commons: {
    icon: <AlertTriangle className="w-4 h-4" />,
    color: "text-amber-400",
    kind: "Archetype",
  },
  growth_and_underinvestment: {
    icon: <TrendingUp className="w-4 h-4" />,
    color: "text-violet-400",
    kind: "Archetype",
  },
  limits_to_growth: {
    icon: <AlertTriangle className="w-4 h-4" />,
    color: "text-orange-400",
    kind: "Archetype",
  },
  success_to_the_successful: {
    icon: <TrendingUp className="w-4 h-4" />,
    color: "text-emerald-400",
    kind: "Archetype",
  },
  shifting_the_burden: {
    icon: <ShieldAlert className="w-4 h-4" />,
    color: "text-rose-400",
    kind: "Archetype",
  },
  moral_governance_derisks_capital: {
    icon: <Scale className="w-4 h-4" />,
    color: "text-sky-400",
    kind: "Governance",
  },
  fixes_that_fail: {
    icon: <AlertTriangle className="w-4 h-4" />,
    color: "text-red-400",
    kind: "Archetype",
  },
  escalation: {
    icon: <AlertTriangle className="w-4 h-4" />,
    color: "text-amber-400",
    kind: "Archetype",
  },
  big_man_archetype: {
    icon: <AlertTriangle className="w-4 h-4" />,
    color: "text-rose-400",
    kind: "Archetype",
  },
  drifting_goals: {
    icon: <AlertTriangle className="w-4 h-4" />,
    color: "text-amber-400",
    kind: "Archetype",
  },
};

/** Props aligned with ArchetypeQuestion from @/lib/swot-content (subset). */
interface ArchetypeCardProps {
  archetype: {
    id: number;
    slug: string;
    name: string;
    type: "swot-archetype" | "cld-loop" | "governance-scale";
    imageKey: string;
    description: string;
  };
  className?: string;
  compact?: boolean;
}

export const ArchetypeCard: React.FC<ArchetypeCardProps> = ({
  archetype,
  className,
  compact = false,
}) => {
  // Resolve iconography by slug; fallback derived from type if slug unknown.
  const meta = SLUG_META[archetype.slug] ?? {
    icon: archetype.type === "cld-loop"
      ? <GitBranch className="w-4 h-4" />
      : archetype.type === "governance-scale"
      ? <Scale className="w-4 h-4" />
      : <Lightbulb className="w-4 h-4" />,
    color: "text-[#C9A84C]",
    kind: archetype.type === "cld-loop"
      ? "Causal Loop"
      : archetype.type === "governance-scale"
      ? "Governance"
      : "Archetype",
  };

  // RESOLVED: BIRD_IMAGES is a keyed object, not an array.
  // Use direct key access rather than .find() on a non-existent array.
  const imageEntry = BIRD_IMAGES[archetype.imageKey as keyof typeof BIRD_IMAGES];
  const imageUrl = imageEntry?.url;

  return (
    <Card
      className={cn(
        "bg-[#011a12]/80 border-[#C9A84C]/10 overflow-hidden",
        className
      )}
    >
      {!compact && imageUrl && (
        <div className="w-full h-40">
          <ImageWithFallback
            src={imageUrl}
            alt={archetype.name}
            className="w-full h-full rounded-none"
            imgClassName="rounded-none"
          />
        </div>
      )}
      <CardContent className={cn("space-y-2", compact ? "p-3" : "p-4")}>
        <div className="flex items-center gap-2">
          <span className={cn("flex items-center justify-center", meta.color)}>
            {meta.icon}
          </span>
          <span className={cn("text-xs font-bold uppercase tracking-wider", meta.color)}>
            {meta.kind}
          </span>
        </div>
        <h4 className="text-sm font-semibold text-[#ecfdf5]">{archetype.name}</h4>
        <p className="text-xs text-[#ecfdf5]/60 leading-relaxed">{archetype.description}</p>
      </CardContent>
    </Card>
  );
};
