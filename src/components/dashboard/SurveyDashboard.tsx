// src/components/dashboard/SurveyDashboard.tsx
//
// BIRD 2026–2035
// Research-grade Survey Validation & Decision-Support Dashboard
//
// Design principles, in priority order:
//   1. Never confuse missing data with zero.
//   2. Always expose denominators.
//   3. Distinguish respondent *agreement* from *validation*.
//   4. Preserve the BIRD scoring methodology — never recompute it here.
//   5. Never visually compare BIRD metrics that do not share a scale.
//   6. Make the analytical limitations visible to decision-makers.
//   7. Degrade gracefully when the Edge Function contract moves.
//
// This component is a PRESENTATION layer. It performs no BIRD scoring: the
// four SWOT formulas and the Strategic Balance Index live in
// supabase/functions/survey-analytics/index.ts (mirroring src/lib/formulas.ts)
// and arrive here already computed. The only arithmetic below is *display*
// arithmetic — turning a count and a denominator into a percentage — kept
// deliberately trivial so this file can never become a second, divergent
// statistical engine.

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle, BarChart3, Brain, CheckCircle2, Compass, HandHeart, Info,
  Layers, MapPin, RefreshCw, ShieldCheck, Target, TrendingUp, Users, Wallet,
} from "lucide-react";
import { EDGE_FUNCTIONS, getEdgeFunctionHeaders } from "@/lib/supabase";

// ═══════════════════════════════════════════════════════════════════════════
// Wire contract
// ═══════════════════════════════════════════════════════════════════════════
//
// Two generations of the survey-analytics payload are supported at once,
// because the Edge Function and this frontend do not deploy atomically:
//
//   v1 — scalar means only. A metric with no observations arrives as the
//        number 0, indistinguishable from a genuine mean of 0.
//   v2 — adds `analyticsVersion: 2` plus `*Meta` / `metrics` objects shaped
//        { mean: number | null, n, missing }, where `mean: null` explicitly
//        means "no valid observations".
//
// Every v2 field is optional here and `resolveMetric()` falls back to the v1
// scalar when it is absent — see "Zero vs. missing" below for the fallback
// rule and why it is safe.

/** v2 metric for respondent-level scales (one answer per person). */
interface MetricMeta {
  mean: number | null;
  n: number;
  missing: number;
}

/**
 * v2 metric for item-level SWOT families, where the mean is taken over
 * (respondent × item) observations rather than over people. `observations` is
 * the denominator of the mean; `respondents` is how many people contributed at
 * least one item, and is what `missing` is measured against.
 */
interface ItemMetricMeta {
  mean: number | null;
  observations: number;
  respondents: number;
  missing: number;
  scale?: { min: number; max: number; formula: string };
}

interface NumFieldAvg { avg: number; n: number; }

interface ClusterHealth {
  section: number;
  label: string;

  // v1 — raw BIRD metrics. These do NOT share a mathematical range (see
  // BIRD_SCALES). Retained for backward compatibility.
  avgStrengthRI: number;
  avgOpportunityRI: number;
  avgWeaknessRisk: number;
  avgThreatVI: number;
  strategicBalanceIndex: number;
  universal: { confidence: number; readiness: number; urgency: number };

  // v2
  metrics?: {
    strengthRI: ItemMetricMeta;
    opportunityRI: ItemMetricMeta;
    weaknessRisk: ItemMetricMeta;
    threatVI: ItemMetricMeta;
    /** null when the cluster has zero observations — the SBI formula's +50
     *  constant would otherwise yield a plausible-looking 50 out of nothing. */
    sbi: number | null;
    universal: { confidence: MetricMeta; readiness: MetricMeta; urgency: MetricMeta };
  };
}

interface AnalyticsData {
  analyticsVersion?: number;
  totalResponses: number;
  lastUpdated: string;

  demographics: {
    provinces: Record<string, number>;
    categories: Record<string, number>;
  };

  birdScores: {
    avgStrengthRI: number;
    avgOpportunityRI: number;
    avgWeaknessRisk: number;
    avgThreatVI: number;
    strategicBalanceIndex: number;
  };

  birdScoresMeta?: {
    strengthRI: ItemMetricMeta;
    opportunityRI: ItemMetricMeta;
    weaknessRisk: ItemMetricMeta;
    threatVI: ItemMetricMeta;
    strategicBalanceIndex: { mean: number | null; formula: string };
  };

  /** `consensus` is pre-rounded to a whole percent server-side. This component
   *  deliberately recomputes the percentage from `accurate / total` so it can
   *  report 69 / 70 · 98.6% rather than a bare 99%. */
  archetypes: Record<string, { accurate: number; total: number; consensus: number }>;

  iedsPreferences: Record<string, number>;

  systemsThinking?: {
    valueAvg: number;
    valueN: number;
    valueMeta?: MetricMeta;
    readyDistribution: Record<string, number>;
    comprehension: {
      cldPolarity: { correctPct: number; n: number };
      reinforcingLoop: { correctPct: number; n: number };
      leveragePoint: { correctPct: number; n: number };
    };
  };

  beieUnderstanding?: Record<
    string,
    { avg: number; n: number; label: string; mean?: number | null; missing?: number }
  >;

  clusterHealth?: Record<string, ClusterHealth>;

  strategicOptions?: {
    respondentScores: Record<string, NumFieldAvg>;
    respondentScoresMeta?: Record<string, MetricMeta>;
    baselineScores: Record<string, number>;
    strategicRankingDistribution: Record<string, number>;
    leverageLikerts: {
      leveragePointsClarity: number; activatingLeverage: number;
      capacityTraps: number; icebergModel: number; collaborativeGovernance: number;
    };
    leverageLikertsMeta?: Record<string, MetricMeta>;
  };

  balancedScorecard?: {
    perspectives: { learningGrowth: number; internalProcess: number; stakeholder: number; financial: number };
    vision: { clarity: number; achievable: number; missionAlignment: number; bscUseful: number };
    strongestPathwayDistribution: Record<string, number>;
    perspectivesMeta?: Record<string, MetricMeta>;
    visionMeta?: Record<string, MetricMeta>;
  };

  budgetAndRisk?: {
    fundingMixFair: number;
    targetsRealistic: number;
    /** NOTE: high/medium/low are Likert MEANS on a 1–5 concern scale, not
     *  counts of respondents. They are independent ratings that do not sum to
     *  the sample, so they must never be rendered as a distribution or divided
     *  by totalResponses to produce a percentage. */
    riskConcern: { high: number; medium: number; low: number };
    riskConcernKind?: string;
    budgetPriorityClusterDistribution: Record<string, number>;
    blendedFinanceDistribution: Record<string, number>;
    meta?: Record<string, MetricMeta>;
  };

  engagementDistribution?: Record<string, number>;
}

// ═══════════════════════════════════════════════════════════════════════════
// Metadata
// ═══════════════════════════════════════════════════════════════════════════

// Keys must exactly match the archetype field names survey-analytics/index.ts
// actually returns (see archetypeKeys/governanceScaleKeys there, generated
// from src/lib/swot-content.ts's ARCHETYPES_BY_SECTION).
//
// The `lp` tag follows formulas-and-invariants.md's LP1–LP5 (Critical Leverage
// Point) table wherever an archetype maps to one. Archetypes without an `lp`
// are still real systems-archetype questions — they just aren't one of the 5
// CLPs the roadmap tracks as a headline leverage point.
const ARCHETYPE_META: Record<
  string,
  { name: string; kind: "CLD" | "Archetype"; lp?: "LP1" | "LP2" | "LP3" | "LP4" | "LP5" }
> = {
  q3_cld1_investment_development: { name: "Investment–Development Virtuous Cycle", kind: "CLD" },
  q3_cld2_governance_confidence: { name: "Governance–Investor Confidence Loop", kind: "CLD" },
  q4_arch_tragedy_commons: { name: "Tragedy of the Commons", kind: "Archetype", lp: "LP5" },
  q5_arch_growth_underinvest: { name: "Growth & Underinvestment", kind: "Archetype", lp: "LP3" },
  q6_arch_limits_growth: { name: "Limits to Growth", kind: "Archetype", lp: "LP2" },
  q7_arch_success_successful: { name: "Success to the Successful", kind: "Archetype" },
  q8_arch_shifting_burden: { name: "Shifting the Burden", kind: "Archetype", lp: "LP4" },
  q9_arch_moral_governance_derisk: { name: "Moral Governance De-Risks Capital", kind: "Archetype" },
  q9_arch_fixes_fail: { name: "Fixes That Fail", kind: "Archetype", lp: "LP1" },
  q9_arch_escalation: { name: "Escalation", kind: "Archetype" },
  q9_arch_big_man: { name: "The Big Man", kind: "Archetype" },
  q11_arch_drifting_goals: { name: "Drifting Goals", kind: "Archetype" },
};

const LP_LABELS: Record<string, string> = {
  LP1: "LP1 · Halal Certification System Integrity",
  LP2: "LP2 · Infrastructure–Energy–Connectivity Nexus",
  LP3: "LP3 · Governance–Investor Confidence Feedback",
  LP4: "LP4 · Islamic Finance Ecosystem Development",
  LP5: "LP5 · Green Economy Revenue Framework",
};

const STRATEGY_OPTION_LABELS: Record<string, { name: string; full: string }> = {
  heds: { name: "HEDS", full: "Halal Economy Dominance Strategy" },
  gems: { name: "GEMS", full: "Green Economy Monetization Strategy" },
  ifes: { name: "IFES", full: "Infrastructure-First Enabling Strategy" },
  ieds: { name: "IEDS", full: "Integrated Ecosystem Development Strategy" },
};

/**
 * The four BIRD SWOT formulas produce genuinely different ranges from the same
 * 1–5 impact/likelihood inputs. Presenting the four averages side by side as
 * though they were comparable scores is the single most common misreading of
 * this dashboard, so the ranges are declared here and surfaced in the UI.
 *
 * Source of truth: src/lib/formulas.ts, mirrored in survey-analytics/index.ts.
 */
const BIRD_SCALES = {
  strengthRI: { label: "Strength RI", formula: "(Impact × Likelihood) / 5", min: 0.2, max: 5 },
  opportunityRI: { label: "Opportunity RI", formula: "√(Impact × Likelihood)", min: 1, max: 5 },
  weaknessRisk: { label: "Weakness Risk", formula: "Impact × Likelihood", min: 1, max: 25 },
  threatVI: { label: "Threat VI", formula: "(Impact² × Likelihood) / 25", min: 0.04, max: 5 },
} as const;

const NO_DATA_LABEL = "No valid responses";

// ═══════════════════════════════════════════════════════════════════════════
// Zero vs. missing
// ═══════════════════════════════════════════════════════════════════════════
//
// A v1 payload reports a metric with no observations as the number 0. Every
// underlying input is on a 1–5 scale, so no BIRD or Likert metric can ever
// legitimately average exactly 0 — the smallest attainable values are 0.2
// (Strength RI), 1 (Opportunity RI, Weakness Risk, any Likert) and 0.04
// (Threat VI). Treating an exact 0 as "no data" is therefore sound rather than
// merely convenient, and it is the ONLY inference this file makes about the
// backend's numbers. Under analyticsVersion >= 2 the inference is not used at
// all: `mean: null` says so directly.

interface Resolved {
  /** null means "no valid observations" — never "scored zero". */
  mean: number | null;
  /** Denominator of the mean, where the payload provides one. */
  n?: number;
  missing?: number;
}

function resolveMetric(
  meta: MetricMeta | ItemMetricMeta | undefined,
  legacy: number | null | undefined,
): Resolved {
  if (meta && typeof meta.mean !== "undefined") {
    const n = "n" in meta ? meta.n : meta.observations;
    return { mean: meta.mean, n, missing: meta.missing };
  }
  if (typeof legacy !== "number" || !Number.isFinite(legacy) || legacy === 0) {
    return { mean: null };
  }
  return { mean: legacy };
}

// ═══════════════════════════════════════════════════════════════════════════
// Display helpers
// ═══════════════════════════════════════════════════════════════════════════

function percentage(value: number, denominator: number): number | null {
  if (!denominator || denominator <= 0) return null;
  return (value / denominator) * 100;
}

/** "69 / 70 · 98.6%" — the canonical way this dashboard states a proportion. */
function formatProportion(value: number, denominator: number): string {
  const pct = percentage(value, denominator);
  if (pct === null) return NO_DATA_LABEL;
  return `${value} / ${denominator} · ${pct.toFixed(1)}%`;
}

function formatDate(value: string): string {
  if (!value) return "Unavailable";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unavailable";
  return date.toLocaleString(undefined, {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function sumValues(record: Record<string, number> | undefined): number {
  if (!record) return 0;
  return Object.values(record).reduce((sum, v) => sum + (typeof v === "number" ? v : 0), 0);
}

function agreementColor(pct: number): string {
  if (pct >= 90) return "bg-emerald-500";
  if (pct >= 75) return "bg-amber-500";
  return "bg-rose-500";
}

// ═══════════════════════════════════════════════════════════════════════════
// Reusable UI
// ═══════════════════════════════════════════════════════════════════════════

const DashboardSection: React.FC<{
  icon: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}> = ({ icon, title, description, children }) => (
  <section className="space-y-4">
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-lg bg-[#C9A84C]/10 text-[#C9A84C]">{icon}</div>
      <div>
        <h2 className="text-lg md:text-xl font-bold text-[#022c22] dark:text-[#ecfdf5]">{title}</h2>
        {description && (
          <p className="text-sm text-[#64748b] dark:text-[#cbd5e1] mt-1">{description}</p>
        )}
      </div>
    </div>
    {children}
  </section>
);

const InfoNotice: React.FC<{ children: React.ReactNode; tone?: "info" | "warn" }> = ({
  children,
  tone = "info",
}) => {
  const classes =
    tone === "warn"
      ? "border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900 text-amber-900 dark:text-amber-100"
      : "border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900 text-blue-900 dark:text-blue-100";
  const Icon = tone === "warn" ? AlertTriangle : Info;
  return (
    <div className={`flex gap-3 rounded-lg border p-4 text-sm ${classes}`}>
      <Icon className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="space-y-1">{children}</div>
    </div>
  );
};

const NoData: React.FC<{ label?: string }> = ({ label = NO_DATA_LABEL }) => (
  <span className="text-xs italic text-[#94a3b8]">{label}</span>
);

const MetricCard: React.FC<{
  label: string;
  value: string | null;
  description?: React.ReactNode;
  icon?: React.ReactNode;
}> = ({ label, value, description, icon }) => (
  <Card className="bg-white/90 dark:bg-[#022c22]/80 border-[#C9A84C]/20">
    <CardContent className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-[#64748b]">{label}</p>
          <p className="text-2xl font-bold mt-1 text-[#022c22] dark:text-[#ecfdf5] break-words">
            {value ?? <NoData />}
          </p>
          {description && <div className="text-xs text-[#64748b] mt-1">{description}</div>}
        </div>
        {icon && (
          <div className="p-2 rounded-lg bg-[#C9A84C]/10 text-[#C9A84C] shrink-0">{icon}</div>
        )}
      </div>
    </CardContent>
  </Card>
);

/**
 * Renders a categorical distribution. Every row states its own count AND its
 * percentage of the explicitly-labelled denominator (principle 2).
 */
const DistributionBars: React.FC<{
  data: Record<string, number> | undefined;
  denominator: number;
  denominatorLabel?: string;
  emptyLabel?: string;
}> = ({ data, denominator, denominatorLabel, emptyLabel }) => {
  const entries = Object.entries(data || {})
    .filter(([, count]) => typeof count === "number")
    .sort(([, a], [, b]) => b - a);

  if (entries.length === 0 || denominator <= 0) {
    return <NoData label={emptyLabel ?? NO_DATA_LABEL} />;
  }

  return (
    <div className="space-y-3">
      {denominatorLabel && (
        <p className="text-xs text-[#64748b]">
          Denominator: {denominator} {denominatorLabel}
        </p>
      )}
      {entries.map(([label, count]) => {
        const pct = percentage(count, denominator) ?? 0;
        return (
          <div key={label}>
            <div className="flex items-center justify-between gap-3 mb-1">
              <span className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] truncate">
                {label}
              </span>
              <span className="text-xs text-[#64748b] whitespace-nowrap tabular-nums">
                {count} · {pct.toFixed(1)}%
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#1B4D3E] transition-all"
                style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

/**
 * A single Likert mean on a bounded scale. Renders "No valid responses"
 * instead of an empty bar when the metric has no observations, so a
 * non-response is never displayed as a low score.
 */
const LikertBar: React.FC<{
  label: string;
  metric: Resolved;
  min?: number;
  max?: number;
}> = ({ label, metric, min = 1, max = 5 }) => {
  const value = metric.mean;
  const hasData = value !== null;
  const pct = hasData ? ((value - min) / (max - min)) * 100 : 0;

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-1">
        <span className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">{label}</span>
        <span className="text-xs text-[#64748b] whitespace-nowrap tabular-nums">
          {hasData ? (
            <>
              {value.toFixed(2)} / {max}
              {typeof metric.n === "number" ? ` · n=${metric.n}` : ""}
            </>
          ) : (
            <NoData />
          )}
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {hasData && (
          <div
            className="h-full rounded-full bg-[#C9A84C]"
            style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
          />
        )}
      </div>
    </div>
  );
};

/**
 * A correct-answer rate for an objectively-scored knowledge item. Kept on its
 * own 0–100% scale rather than rescaled to look like a Likert score, because
 * it is not one.
 */
const CorrectnessBar: React.FC<{ label: string; correctPct: number; n: number }> = ({
  label, correctPct, n,
}) => {
  const hasData = n > 0;
  const correctCount = Math.round((correctPct / 100) * n);
  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-1">
        <span className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">{label}</span>
        <span className="text-xs text-[#64748b] whitespace-nowrap tabular-nums">
          {hasData ? `${correctCount} / ${n} correct · ${correctPct.toFixed(0)}%` : <NoData />}
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {hasData && (
          <div
            className="h-full rounded-full bg-[#1B4D3E]"
            style={{ width: `${Math.min(100, Math.max(0, correctPct))}%` }}
          />
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// Main dashboard
// ═══════════════════════════════════════════════════════════════════════════

export const SurveyDashboard: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const endpoint =
        EDGE_FUNCTIONS.ANALYTICS ||
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/survey-analytics`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: getEdgeFunctionHeaders(),
        cache: "no-store",
      });

      if (!response.ok) throw new Error(`Analytics request failed (${response.status})`);

      const json = (await response.json()) as AnalyticsData;
      if (!json || typeof json.totalResponses !== "number") {
        throw new Error("Analytics endpoint returned an invalid payload.");
      }
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load survey analytics.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  // ─────────────────────────────────────────────────────────────────────────
  // Derived display values (no BIRD scoring — see file header)
  // ─────────────────────────────────────────────────────────────────────────

  const derived = useMemo(() => {
    if (!data) return null;

    const provinces = data.demographics?.provinces ?? {};
    const categories = data.demographics?.categories ?? {};

    // survey-analytics buckets a blank location under the literal string
    // "Unknown" and always increments something, so the province tally is
    // identically equal to totalResponses. Reporting that as "geographic
    // entries" would be a tautology; what is actually informative is how many
    // distinct locations are represented and how much of the sample declined
    // to state one.
    const namedProvinces = Object.keys(provinces).filter((k) => k !== "Unknown");
    const unknownProvince = provinces.Unknown ?? 0;
    const namedCategories = Object.keys(categories).filter((k) => k !== "Unknown");
    const unknownCategory = categories.Unknown ?? 0;

    // `consensus` from the API is Math.round()ed to a whole percent, which
    // loses exactly the precision that makes a small denominator legible
    // (69/70 reads as "99%" when it is 98.6%). Recompute from the counts.
    const archetypeEntries = Object.entries(data.archetypes ?? {})
      .map(([key, result]) => {
        const accurate = result?.accurate ?? 0;
        const answered = result?.total ?? 0;
        return { key, accurate, answered, pct: percentage(accurate, answered) };
      })
      .sort((a, b) => (b.pct ?? -1) - (a.pct ?? -1));

    const clusterEntries = data.clusterHealth
      ? Object.values(data.clusterHealth).sort((a, b) => a.section - b.section)
      : [];

    // Resolve each cluster's four raw metrics + SBI exactly once, so the
    // chart, the table, the radar and the callout below can never disagree
    // about what "has data" means.
    const clusters = clusterEntries.map((c) => {
      const strength = resolveMetric(c.metrics?.strengthRI, c.avgStrengthRI);
      const opportunity = resolveMetric(c.metrics?.opportunityRI, c.avgOpportunityRI);
      const weakness = resolveMetric(c.metrics?.weaknessRisk, c.avgWeaknessRisk);
      const threat = resolveMetric(c.metrics?.threatVI, c.avgThreatVI);
      const anyObservations =
        strength.mean !== null || opportunity.mean !== null ||
        weakness.mean !== null || threat.mean !== null;

      // SBI = ((S̄+Ō)/2) − ((W̄+T̄)/2) + 50, so a cluster nobody answered still
      // evaluates to exactly 50. Suppress it rather than plot a phantom
      // mid-range bar computed from nothing.
      const sbi =
        typeof c.metrics?.sbi !== "undefined"
          ? c.metrics.sbi
          : anyObservations
            ? c.strategicBalanceIndex
            : null;

      return {
        label: c.label,
        section: c.section,
        strength, opportunity, weakness, threat, sbi,
        hasData: anyObservations,
        confidence: resolveMetric(c.metrics?.universal?.confidence, c.universal?.confidence),
        readiness: resolveMetric(c.metrics?.universal?.readiness, c.universal?.readiness),
        urgency: resolveMetric(c.metrics?.universal?.urgency, c.universal?.urgency),
      };
    });

    const scoredClusters = clusters.filter((c) => c.sbi !== null);
    const strongestCluster =
      scoredClusters.length > 0
        ? [...scoredClusters].sort((a, b) => (b.sbi ?? 0) - (a.sbi ?? 0))[0]
        : null;

    return {
      namedProvinces, unknownProvince, namedCategories, unknownCategory,
      archetypeEntries, clusters, scoredClusters, strongestCluster,
      iedsTotal: sumValues(data.iedsPreferences),
      isV2: (data.analyticsVersion ?? 1) >= 2,
    };
  }, [data]);

  // ─────────────────────────────────────────────────────────────────────────
  // Loading / error
  // ─────────────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#ecfdf5]">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#1B4D3E]" />
          <p className="mt-3 text-sm text-[#64748b]">Loading live survey analytics…</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#ecfdf5] p-6">
        <Card className="max-w-lg w-full">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="w-10 h-10 mx-auto text-rose-500" />
            <h2 className="mt-3 font-bold text-lg">Analytics unavailable</h2>
            <p className="text-sm text-[#64748b] mt-2">{error}</p>
            <button
              onClick={() => void fetchData(true)}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1B4D3E] text-white text-sm font-semibold"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data || !derived) return null;

  const {
    totalResponses, demographics, birdScores, birdScoresMeta, iedsPreferences,
    systemsThinking, beieUnderstanding, strategicOptions, balancedScorecard,
    budgetAndRisk, engagementDistribution, lastUpdated,
  } = data;

  // Charted separately from the four raw metrics: SBI is the only cluster
  // figure on a single common scale, so it is the only one that can honestly
  // be compared bar-to-bar. The raw four go in the table beneath it.
  const clusterSBIData = derived.scoredClusters.map((c) => ({
    cluster: c.label,
    "Strategic Balance": c.sbi as number,
  }));

  const strategyChartData = strategicOptions
    ? Object.keys(STRATEGY_OPTION_LABELS).map((key) => {
        const respondent = resolveMetric(
          strategicOptions.respondentScoresMeta?.[key],
          strategicOptions.respondentScores?.[key]?.avg,
        );
        return {
          option: STRATEGY_OPTION_LABELS[key].name,
          full: STRATEGY_OPTION_LABELS[key].full,
          // null (not 0) so recharts omits the bar entirely rather than
          // drawing a zero-height bar that reads as "scored nothing".
          respondent: respondent.mean,
          baseline: strategicOptions.baselineScores?.[key] ?? null,
          n: respondent.n ?? strategicOptions.respondentScores?.[key]?.n ?? 0,
        };
      })
    : [];

  const radarData = derived.clusters
    .filter((c) => c.confidence.mean !== null || c.readiness.mean !== null || c.urgency.mean !== null)
    .map((c) => ({
      cluster: c.label,
      Confidence: c.confidence.mean,
      Readiness: c.readiness.mean,
      Urgency: c.urgency.mean,
    }));

  const bird = {
    strengthRI: resolveMetric(birdScoresMeta?.strengthRI, birdScores?.avgStrengthRI),
    opportunityRI: resolveMetric(birdScoresMeta?.opportunityRI, birdScores?.avgOpportunityRI),
    weaknessRisk: resolveMetric(birdScoresMeta?.weaknessRisk, birdScores?.avgWeaknessRisk),
    threatVI: resolveMetric(birdScoresMeta?.threatVI, birdScores?.avgThreatVI),
  };
  const anyBirdData = Object.values(bird).some((m) => m.mean !== null);
  const globalSBI =
    typeof birdScoresMeta?.strategicBalanceIndex?.mean !== "undefined"
      ? birdScoresMeta.strategicBalanceIndex.mean
      : anyBirdData
        ? birdScores?.strategicBalanceIndex ?? null
        : null;

  const birdCardKeys = Object.keys(BIRD_SCALES) as (keyof typeof BIRD_SCALES)[];

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ecfdf5] via-white to-[#d1fae5] dark:from-[#022c22] dark:via-[#022c22] dark:to-[#1B4D3E] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ── Header ────────────────────────────────────────────────────── */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-[#C9A84C] shrink-0" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#022c22] dark:text-[#ecfdf5]">
                BIRD Validation Survey Analytics
              </h1>
              <p className="text-sm text-[#64748b] mt-1">
                Stakeholder validation, systems understanding, strategic options and
                implementation signals
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-xs text-[#64748b]">Analytics updated</p>
              <p className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">
                {formatDate(lastUpdated)}
              </p>
            </div>
            <button
              onClick={() => void fetchData(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1B4D3E] text-white text-sm font-semibold hover:bg-[#022c22] disabled:opacity-60 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              {refreshing ? "Refreshing…" : "Refresh Data"}
            </button>
          </div>
        </header>

        {error && (
          <InfoNotice tone="warn">
            The previous analytics snapshot is being displayed. The latest refresh failed:{" "}
            <strong>{error}</strong>
          </InfoNotice>
        )}

        {/* ── How to read this dashboard ────────────────────────────────── */}
        <InfoNotice>
          <p className="font-semibold">How to read this dashboard</p>
          <ol className="list-decimal ml-5 space-y-1 mt-1">
            <li>
              Every figure describes <strong>participating stakeholders</strong> who consented and
              submitted a response — not a probability sample of the BARMM population.
            </li>
            <li>
              Results are <strong>descriptive</strong>. No weighting, confidence intervals or
              significance tests are applied, so no population estimate should be inferred.
            </li>
            <li>
              "Agreement" on an archetype means the respondent chose <em>Very accurately</em> or{" "}
              <em>Somewhat accurately</em>. It is not a probability that the archetype is
              objectively correct.
            </li>
            <li>
              The four BIRD dimensions use <strong>different formulas and different ranges</strong>{" "}
              and are not directly comparable with one another.
            </li>
            <li>Missing values are excluded from means rather than counted as zero.</li>
            <li>
              <strong>n varies by question</strong> — not every respondent answered every analytical
              item, so denominators are stated per metric.
            </li>
            <li>
              Strategic-option scores compare respondent perceptions against the roadmap's own
              baseline evaluation. They are perceptions, not audited outcomes.
            </li>
          </ol>
          {!derived.isV2 && (
            <p className="mt-2 text-xs">
              This snapshot predates the v2 analytics contract, so per-metric denominators are not
              available for every figure. Where a metric reports exactly 0 on a 1–5 scale — a value
              no valid response can produce — it is shown as "{NO_DATA_LABEL}".
            </p>
          )}
        </InfoNotice>

        {/* ── 1. Validation sample ──────────────────────────────────────── */}
        <DashboardSection
          icon={<Users className="w-5 h-5" />}
          title="1. Validation Sample"
          description="Who participated in the BIRD validation exercise?"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              label="Total Responses"
              value={String(totalResponses)}
              description="Consented survey submissions"
              icon={<Users className="w-5 h-5" />}
            />
            <MetricCard
              label="Geographic Coverage"
              value={
                derived.namedProvinces.length > 0 ? String(derived.namedProvinces.length) : null
              }
              description={
                derived.unknownProvince > 0
                  ? `locations named · ${formatProportion(derived.unknownProvince, totalResponses)} stated none`
                  : "locations named by respondents"
              }
              icon={<MapPin className="w-5 h-5" />}
            />
            <MetricCard
              label="Stakeholder Coverage"
              value={
                derived.namedCategories.length > 0 ? String(derived.namedCategories.length) : null
              }
              description={
                derived.unknownCategory > 0
                  ? `categories named · ${formatProportion(derived.unknownCategory, totalResponses)} uncategorised`
                  : "stakeholder categories represented"
              }
              icon={<ShieldCheck className="w-5 h-5" />}
            />
            <MetricCard
              label="Latest Update"
              value={formatDate(lastUpdated)}
              description="Analytics snapshot time"
              icon={<RefreshCw className="w-5 h-5" />}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Geographic distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DistributionBars
                  data={demographics?.provinces}
                  denominator={totalResponses}
                  denominatorLabel="responses"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Stakeholder distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DistributionBars
                  data={demographics?.categories}
                  denominator={totalResponses}
                  denominatorLabel="responses"
                />
              </CardContent>
            </Card>
          </div>
        </DashboardSection>

        {/* ── 2. Strategic signals ──────────────────────────────────────── */}
        <DashboardSection
          icon={<TrendingUp className="w-5 h-5" />}
          title="2. Strategic Signals"
          description="BIRD raw analytical metrics — not directly comparable across dimensions"
        >
          <InfoNotice tone="warn">
            <p>
              <strong>Scale warning.</strong> These four metrics are computed with different
              formulas from the same 1–5 impact/likelihood inputs, so they occupy different ranges.
              A Weakness Risk of 16.5 is <em>not</em> "larger" than a Strength RI of 3.4 — they are
              not on the same axis. Each card states its own formula and range.
            </p>
          </InfoNotice>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {birdCardKeys.map((key) => {
              const scale = BIRD_SCALES[key];
              const metric = bird[key];
              return (
                <MetricCard
                  key={key}
                  label={scale.label}
                  value={metric.mean !== null ? metric.mean.toFixed(2) : null}
                  description={
                    <>
                      <span className="block font-mono text-[11px]">{scale.formula}</span>
                      <span className="block">
                        range {scale.min}–{scale.max}
                        {typeof metric.n === "number" ? ` · n=${metric.n} observations` : ""}
                      </span>
                    </>
                  }
                />
              );
            })}
          </div>

          <Card>
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#64748b]">
                    Strategic Balance Index
                  </p>
                  <p className="text-3xl font-bold mt-1 text-[#022c22] dark:text-[#ecfdf5]">
                    {globalSBI !== null ? globalSBI.toFixed(2) : <NoData />}
                  </p>
                </div>
                <p className="text-xs text-[#64748b] md:max-w-md">
                  <span className="font-mono">
                    {birdScoresMeta?.strategicBalanceIndex?.formula ??
                      "((S̄ + Ō) / 2) − ((W̄ + T̄) / 2) + 50"}
                  </span>
                  <br />
                  A composite index, not a percentage. Because of the +50 constant, a value near 50
                  indicates balance between positive and negative signals — it does not mean "50%
                  good", and it is only meaningful relative to other clusters or to itself over
                  time.
                </p>
              </div>
            </CardContent>
          </Card>
        </DashboardSection>

        {/* ── 3. Archetype agreement ────────────────────────────────────── */}
        <DashboardSection
          icon={<Brain className="w-5 h-5" />}
          title="3. Systems Archetype Agreement"
          description="Very + Somewhat accurately, among respondents who answered each item"
        >
          <InfoNotice>
            <strong>Agreement, not validation.</strong> Each figure is the share of respondents who
            selected <em>Very accurately</em> or <em>Somewhat accurately</em> for that archetype,
            out of those who answered it. A high figure means stakeholders recognise the pattern —
            it is not an estimate of the archetype's objective truth, and the denominator differs
            from one archetype to the next.
          </InfoNotice>

          <Card>
            <CardContent className="p-5 space-y-4">
              {derived.archetypeEntries.length === 0 && <NoData />}
              {derived.archetypeEntries.map(({ key, accurate, answered, pct }) => {
                const meta = ARCHETYPE_META[key];
                const name = meta?.name ?? key.replace(/^q\d+_/, "").replace(/_/g, " ");
                return (
                  <div key={key}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                      <div>
                        <p className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5]">
                          {name}
                          {meta?.kind === "CLD" && (
                            <span className="ml-2 text-[10px] uppercase tracking-wide text-[#64748b]">
                              causal loop
                            </span>
                          )}
                        </p>
                        {meta?.lp && <p className="text-xs text-[#64748b]">{LP_LABELS[meta.lp]}</p>}
                      </div>
                      <div className="text-xs text-[#64748b] tabular-nums whitespace-nowrap">
                        {pct === null ? <NoData /> : formatProportion(accurate, answered)}
                      </div>
                    </div>
                    <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      {pct !== null && (
                        <div
                          className={`h-full rounded-full ${agreementColor(pct)}`}
                          style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </DashboardSection>

        {/* ── 4. Systems thinking ───────────────────────────────────────── */}
        {systemsThinking && (
          <DashboardSection
            icon={<Brain className="w-5 h-5" />}
            title="4. Systems-Thinking Capability"
            description="Perceived value, readiness and demonstrated comprehension"
          >
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Perceived value and readiness</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <LikertBar
                    label="Value of systems thinking"
                    metric={resolveMetric(
                      systemsThinking.valueMeta ??
                        (typeof systemsThinking.valueN === "number"
                          ? {
                              mean: systemsThinking.valueN > 0 ? systemsThinking.valueAvg : null,
                              n: systemsThinking.valueN,
                              missing: Math.max(0, totalResponses - systemsThinking.valueN),
                            }
                          : undefined),
                      systemsThinking.valueAvg,
                    )}
                  />
                  <div>
                    <p className="text-sm font-medium mb-2 text-[#022c22] dark:text-[#ecfdf5]">
                      Readiness to apply systems thinking
                    </p>
                    <DistributionBars
                      data={systemsThinking.readyDistribution}
                      denominator={sumValues(systemsThinking.readyDistribution)}
                      denominatorLabel="respondents answering this item"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Concept comprehension</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <CorrectnessBar
                    label="CLD polarity"
                    correctPct={systemsThinking.comprehension?.cldPolarity?.correctPct ?? 0}
                    n={systemsThinking.comprehension?.cldPolarity?.n ?? 0}
                  />
                  <CorrectnessBar
                    label="Reinforcing loop"
                    correctPct={systemsThinking.comprehension?.reinforcingLoop?.correctPct ?? 0}
                    n={systemsThinking.comprehension?.reinforcingLoop?.n ?? 0}
                  />
                  <CorrectnessBar
                    label="Leverage point"
                    correctPct={systemsThinking.comprehension?.leveragePoint?.correctPct ?? 0}
                    n={systemsThinking.comprehension?.leveragePoint?.n ?? 0}
                  />
                  <p className="text-xs text-[#64748b]">
                    These are objectively-scored knowledge items (one correct option each), shown on
                    their own 0–100% scale. They are not Likert ratings and are not comparable with
                    the perception scores on the left.
                  </p>
                </CardContent>
              </Card>
            </div>
          </DashboardSection>
        )}

        {/* ── 5. BEIE understanding ─────────────────────────────────────── */}
        {beieUnderstanding && Object.keys(beieUnderstanding).length > 0 && (
          <DashboardSection
            icon={<Layers className="w-5 h-5" />}
            title="5. BEIE Framework Understanding"
            description="Respondent ratings of the explanation, reframing and framework clarity (1–5)"
          >
            <Card>
              <CardContent className="p-5 grid md:grid-cols-2 gap-x-8 gap-y-5">
                {Object.entries(beieUnderstanding).map(([key, metric]) => (
                  <LikertBar
                    key={key}
                    label={metric.label}
                    metric={resolveMetric(
                      typeof metric.mean !== "undefined"
                        ? { mean: metric.mean, n: metric.n, missing: metric.missing ?? 0 }
                        : { mean: metric.n > 0 ? metric.avg : null, n: metric.n, missing: 0 },
                      metric.avg,
                    )}
                  />
                ))}
              </CardContent>
            </Card>
          </DashboardSection>
        )}

        {/* ── 6. Cluster health ─────────────────────────────────────────── */}
        {derived.clusters.length > 0 && (
          <DashboardSection
            icon={<Layers className="w-5 h-5" />}
            title="6. Cluster-Level Strategic Position"
            description="Strategic Balance Index and universal confidence / readiness / urgency signals"
          >
            <InfoNotice>
              A cluster with no valid observations is shown as "no data" rather than as a zero. On a
              1–5 input scale none of these metrics can legitimately average zero, so a zero always
              means <em>nobody answered</em> — never <em>performed badly</em>.
            </InfoNotice>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Strategic Balance Index by cluster</CardTitle>
              </CardHeader>
              <CardContent>
                {clusterSBIData.length === 0 ? (
                  <NoData label="No cluster has enough observations to compute an index." />
                ) : (
                  <>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={clusterSBIData}
                          margin={{ top: 10, right: 20, left: 10, bottom: 60 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                          <XAxis
                            dataKey="cluster"
                            angle={-25}
                            textAnchor="end"
                            interval={0}
                            height={80}
                          />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Bar dataKey="Strategic Balance" fill="#1B4D3E" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    {clusterSBIData.length < derived.clusters.length && (
                      <p className="text-xs text-[#64748b] mt-2">
                        {derived.clusters.length - clusterSBIData.length} of{" "}
                        {derived.clusters.length} clusters are omitted from this chart because they
                        have no valid observations.
                      </p>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Cluster analytical table</CardTitle>
                <p className="text-xs text-[#64748b] mt-1">
                  These columns use four different formulas and four different ranges. Read down a
                  column to compare clusters; do not read across a row to compare dimensions.
                </p>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-[#64748b]">
                      <th className="text-left py-3 pr-4 font-medium">Cluster</th>
                      <th className="text-right px-3 font-medium">
                        Strength RI<span className="block text-[10px] font-normal">0.2–5</span>
                      </th>
                      <th className="text-right px-3 font-medium">
                        Opportunity RI<span className="block text-[10px] font-normal">1–5</span>
                      </th>
                      <th className="text-right px-3 font-medium">
                        Weakness Risk<span className="block text-[10px] font-normal">1–25</span>
                      </th>
                      <th className="text-right px-3 font-medium">
                        Threat VI<span className="block text-[10px] font-normal">0.04–5</span>
                      </th>
                      <th className="text-right pl-3 font-medium">
                        SBI<span className="block text-[10px] font-normal">index</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {derived.clusters.map((c) => {
                      const cell = (m: Resolved) =>
                        m.mean === null ? (
                          <span className="text-[#94a3b8] italic text-xs">no data</span>
                        ) : (
                          <span className="tabular-nums">{m.mean.toFixed(2)}</span>
                        );
                      return (
                        <tr key={c.label} className="border-b last:border-0">
                          <td className="py-3 pr-4 font-medium">{c.label}</td>
                          <td className="text-right px-3">{cell(c.strength)}</td>
                          <td className="text-right px-3">{cell(c.opportunity)}</td>
                          <td className="text-right px-3">{cell(c.weakness)}</td>
                          <td className="text-right px-3">{cell(c.threat)}</td>
                          <td className="text-right pl-3 font-semibold">
                            {c.sbi === null ? (
                              <span className="text-[#94a3b8] italic text-xs font-normal">
                                no data
                              </span>
                            ) : (
                              <span className="tabular-nums">{c.sbi.toFixed(2)}</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Confidence · Readiness · Urgency</CardTitle>
                <p className="text-xs text-[#64748b] mt-1">
                  All three are 1–5 Likert means and <em>are</em> mutually comparable, which is why
                  they share one chart.
                </p>
              </CardHeader>
              <CardContent>
                {radarData.length === 0 ? (
                  <NoData />
                ) : (
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="cluster" />
                        <PolarRadiusAxis domain={[0, 5]} />
                        <Radar
                          name="Confidence" dataKey="Confidence"
                          stroke="#1B4D3E" fill="#1B4D3E" fillOpacity={0.15}
                        />
                        <Radar
                          name="Readiness" dataKey="Readiness"
                          stroke="#C9A84C" fill="#C9A84C" fillOpacity={0.12}
                        />
                        <Radar
                          name="Urgency" dataKey="Urgency"
                          stroke="#92400e" fill="#92400e" fillOpacity={0.1}
                        />
                        <Legend />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            {derived.strongestCluster && (
              <InfoNotice>
                <strong>Highest current SBI:</strong> {derived.strongestCluster.label} at{" "}
                {(derived.strongestCluster.sbi ?? 0).toFixed(2)}. This is a descriptive ranking of
                the current analytics output across clusters with valid observations — not a causal
                finding, and not by itself a basis for allocating investment.
              </InfoNotice>
            )}
          </DashboardSection>
        )}

        {/* ── 7. Strategic option preference ────────────────────────────── */}
        {strategicOptions && (
          <DashboardSection
            icon={<Compass className="w-5 h-5" />}
            title="7. Strategic Option Preference"
            description="Respondent scoring compared with the roadmap's own baseline evaluation"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Weighted score — respondents vs. roadmap baseline
                </CardTitle>
                <p className="text-xs text-[#64748b] mt-1">
                  Both series use the same 7-criteria weighted matrix on a 0–10 scale, so this
                  comparison is like-for-like. The baseline is a single documented evaluation from
                  the roadmap, not a mean, and therefore carries no denominator.
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={strategyChartData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                      <XAxis dataKey="option" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="respondent" name="Respondent average" fill="#1B4D3E" />
                      <Bar dataKey="baseline" name="Roadmap baseline" fill="#C9A84C" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#64748b]">
                  {strategyChartData.map((row) => (
                    <div key={row.option}>
                      <span className="font-semibold text-[#022c22] dark:text-[#ecfdf5]">
                        {row.option}
                      </span>{" "}
                      {row.full} —{" "}
                      {row.respondent === null ? NO_DATA_LABEL : `scored by n=${row.n} respondents`}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Strategic ranking distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <DistributionBars
                    data={strategicOptions.strategicRankingDistribution}
                    denominator={sumValues(strategicOptions.strategicRankingDistribution)}
                    denominatorLabel="respondents answering this item"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">IEDS preference</CardTitle>
                </CardHeader>
                <CardContent>
                  <DistributionBars
                    data={iedsPreferences}
                    denominator={derived.iedsTotal}
                    denominatorLabel="respondents answering this item"
                  />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Leverage and implementation understanding (1–5)
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-5">
                {(
                  [
                    ["Leverage points clarity", "q10_leverage_points_clarity", "leveragePointsClarity"],
                    ["Activating leverage", "q10_activating_leverage", "activatingLeverage"],
                    ["Capacity traps", "q10_capacity_traps", "capacityTraps"],
                    ["Iceberg model", "q10_iceberg_model", "icebergModel"],
                    ["Collaborative governance", "q10_collaborative_governance", "collaborativeGovernance"],
                  ] as const
                ).map(([label, metaKey, legacyKey]) => (
                  <LikertBar
                    key={metaKey}
                    label={label}
                    metric={resolveMetric(
                      strategicOptions.leverageLikertsMeta?.[metaKey],
                      strategicOptions.leverageLikerts?.[legacyKey],
                    )}
                  />
                ))}
              </CardContent>
            </Card>
          </DashboardSection>
        )}

        {/* ── 8. Balanced scorecard ─────────────────────────────────────── */}
        {balancedScorecard && (
          <DashboardSection
            icon={<Target className="w-5 h-5" />}
            title="8. Balanced Scorecard & Strategic Pathway"
            description="Perceived scorecard alignment, vision quality and strongest pathway (1–5)"
          >
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Scorecard perspectives</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {(
                    [
                      ["Learning & Growth", "q12_1_learning_growth_alignment", "learningGrowth"],
                      ["Internal Process", "q12_2_internal_process_alignment", "internalProcess"],
                      ["Stakeholder", "q12_3_stakeholder_alignment", "stakeholder"],
                      ["Financial", "q12_4_financial_alignment", "financial"],
                    ] as const
                  ).map(([label, metaKey, legacyKey]) => (
                    <LikertBar
                      key={metaKey}
                      label={label}
                      metric={resolveMetric(
                        balancedScorecard.perspectivesMeta?.[metaKey],
                        balancedScorecard.perspectives?.[legacyKey],
                      )}
                    />
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Vision and scorecard assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {(
                    [
                      ["Vision clarity", "q12_6_vision_clarity", "clarity"],
                      ["Achievability", "q12_7_vision_achievable", "achievable"],
                      ["Mission alignment", "q12_8_mission_alignment", "missionAlignment"],
                      ["BSC usefulness", "q12_9_bsc_useful", "bscUseful"],
                    ] as const
                  ).map(([label, metaKey, legacyKey]) => (
                    <LikertBar
                      key={metaKey}
                      label={label}
                      metric={resolveMetric(
                        balancedScorecard.visionMeta?.[metaKey],
                        balancedScorecard.vision?.[legacyKey],
                      )}
                    />
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Strongest pathway selected</CardTitle>
              </CardHeader>
              <CardContent>
                <DistributionBars
                  data={balancedScorecard.strongestPathwayDistribution}
                  denominator={sumValues(balancedScorecard.strongestPathwayDistribution)}
                  denominatorLabel="respondents answering this item"
                />
              </CardContent>
            </Card>
          </DashboardSection>
        )}

        {/* ── 9. Budget, risk & financing ───────────────────────────────── */}
        {budgetAndRisk && (
          <DashboardSection
            icon={<Wallet className="w-5 h-5" />}
            title="9. Budget, Risk & Financing Signals"
            description="Stakeholder perceptions of funding, targets and implementation risk"
          >
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Funding and target assessment (1–5)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <LikertBar
                    label="Funding mix is fair"
                    metric={resolveMetric(
                      budgetAndRisk.meta?.q13_1_funding_mix_fair,
                      budgetAndRisk.fundingMixFair,
                    )}
                  />
                  <LikertBar
                    label="Targets are realistic"
                    metric={resolveMetric(
                      budgetAndRisk.meta?.q13_2_targets_realistic,
                      budgetAndRisk.targetsRealistic,
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Level of risk concern (1–5)</CardTitle>
                  <p className="text-xs text-[#64748b] mt-1">
                    Three independent Likert ratings — how concerned respondents are about each risk
                    tier. These are means, not counts of people, and they do not sum to the sample.
                  </p>
                </CardHeader>
                <CardContent className="space-y-5">
                  <LikertBar
                    label="High-risk items"
                    metric={resolveMetric(
                      budgetAndRisk.meta?.q13_3_high_risk_concern,
                      budgetAndRisk.riskConcern?.high,
                    )}
                  />
                  <LikertBar
                    label="Medium-risk items"
                    metric={resolveMetric(
                      budgetAndRisk.meta?.q13_4_medium_risk_concern,
                      budgetAndRisk.riskConcern?.medium,
                    )}
                  />
                  <LikertBar
                    label="Low-risk items"
                    metric={resolveMetric(
                      budgetAndRisk.meta?.q13_5_low_risk_concern,
                      budgetAndRisk.riskConcern?.low,
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Budget priority by cluster</CardTitle>
                </CardHeader>
                <CardContent>
                  <DistributionBars
                    data={budgetAndRisk.budgetPriorityClusterDistribution}
                    denominator={sumValues(budgetAndRisk.budgetPriorityClusterDistribution)}
                    denominatorLabel="respondents answering this item"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Blended finance</CardTitle>
                </CardHeader>
                <CardContent>
                  <DistributionBars
                    data={budgetAndRisk.blendedFinanceDistribution}
                    denominator={sumValues(budgetAndRisk.blendedFinanceDistribution)}
                    denominatorLabel="respondents answering this item"
                  />
                </CardContent>
              </Card>
            </div>
          </DashboardSection>
        )}

        {/* ── 10. Engagement demand ─────────────────────────────────────── */}
        {engagementDistribution && (
          <DashboardSection
            icon={<HandHeart className="w-5 h-5" />}
            title="10. Stakeholder Engagement Demand"
            description="Preferred next steps selected by respondents"
          >
            <Card>
              <CardContent className="p-5 space-y-3">
                <p className="text-xs text-[#64748b]">
                  Multi-select: respondents could choose more than one option, so these percentages
                  are shares of all {totalResponses} responses and will not sum to 100%.
                </p>
                <DistributionBars
                  data={engagementDistribution}
                  denominator={totalResponses}
                  denominatorLabel="responses"
                />
              </CardContent>
            </Card>
          </DashboardSection>
        )}

        {/* ── 11. Analytical interpretation ─────────────────────────────── */}
        <DashboardSection
          icon={<ShieldCheck className="w-5 h-5" />}
          title="11. Analytical Interpretation"
          description="What this dashboard can and cannot establish"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">What the data supports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {[
                  "Descriptive analysis of participating stakeholder responses.",
                  "Reported agreement with the proposed systems archetypes and causal loops.",
                  "Perceived value of, and readiness for, systems-thinking practice.",
                  "Relative stakeholder preference among the four strategic options.",
                  "Implementation, budget and engagement signals to inform sequencing.",
                ].map((text) => (
                  <p key={text} className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    {text}
                  </p>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">What the data does not establish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {[
                  "A statistically representative estimate of the BARMM population.",
                  "Causal relationships between any BIRD variables.",
                  "The objective truth of an archetype, from agreement responses alone.",
                  "Direct comparability of the four raw BIRD metrics with one another.",
                  "Investment priority on the basis of the SBI ranking alone.",
                ].map((text) => (
                  <p key={text} className="flex gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    {text}
                  </p>
                ))}
              </CardContent>
            </Card>
          </div>
        </DashboardSection>

        {/* ── Footer ────────────────────────────────────────────────────── */}
        <footer className="border-t border-[#C9A84C]/20 pt-5 pb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <p className="text-xs text-[#64748b]">BIRD 2026–2035 · Validation Analytics</p>
            <p className="text-xs text-[#64748b]">
              {totalResponses} responses · Updated {formatDate(lastUpdated)}
              {derived.isV2 ? " · analytics contract v2" : ""}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SurveyDashboard;
