// src/components/dashboard/SurveyDashboard.tsx
import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users, MapPin, Briefcase, TrendingUp, AlertTriangle,
  ShieldCheck, Target, BarChart3, RefreshCw, Brain, Layers,
  Compass, Rocket, LineChart as LineChartIcon, Wallet, HandHeart,
} from "lucide-react";
import { EDGE_FUNCTIONS, getEdgeFunctionHeaders } from "@/lib/supabase";

// ── Wire contract ──────────────────────────────────────────────────────────
// Matches supabase/functions/survey-analytics/index.ts's payload exactly.
// Every new (2026-08-13) field is typed as optional / defaulted so this
// component degrades gracefully if the Edge Function deploy lags behind
// this frontend deploy (or vice versa) — the two don't ship atomically.
interface NumFieldAvg { avg: number; n: number; }
interface ClusterHealth {
  section: number;
  label: string;
  avgStrengthRI: number;
  avgOpportunityRI: number;
  avgWeaknessRisk: number;
  avgThreatVI: number;
  strategicBalanceIndex: number;
  universal: { confidence: number; readiness: number; urgency: number };
}
interface AnalyticsData {
  totalResponses: number;
  lastUpdated: string;
  demographics: { provinces: Record<string, number>; categories: Record<string, number> };
  birdScores: {
    avgStrengthRI: number; avgOpportunityRI: number;
    avgWeaknessRisk: number; avgThreatVI: number;
    strategicBalanceIndex: number;
  };
  archetypes: Record<string, { accurate: number; total: number; consensus: number }>;
  iedsPreferences: Record<string, number>;

  systemsThinking?: {
    valueAvg: number; valueN: number;
    readyDistribution: Record<string, number>;
    comprehension: {
      cldPolarity: { correctPct: number; n: number };
      reinforcingLoop: { correctPct: number; n: number };
      leveragePoint: { correctPct: number; n: number };
    };
  };
  beieUnderstanding?: Record<string, { avg: number; n: number; label: string }>;
  clusterHealth?: Record<string, ClusterHealth>;
  strategicOptions?: {
    respondentScores: Record<string, NumFieldAvg>;
    baselineScores: Record<string, number>;
    strategicRankingDistribution: Record<string, number>;
    leverageLikerts: {
      leveragePointsClarity: number; activatingLeverage: number;
      capacityTraps: number; icebergModel: number; collaborativeGovernance: number;
    };
  };
  balancedScorecard?: {
    perspectives: { learningGrowth: number; internalProcess: number; stakeholder: number; financial: number };
    vision: { clarity: number; achievable: number; missionAlignment: number; bscUseful: number };
    strongestPathwayDistribution: Record<string, number>;
  };
  budgetAndRisk?: {
    fundingMixFair: number; targetsRealistic: number;
    riskConcern: { high: number; medium: number; low: number };
    budgetPriorityClusterDistribution: Record<string, number>;
    blendedFinanceDistribution: Record<string, number>;
  };
  engagementDistribution?: Record<string, number>;
}

// Keys must exactly match the archetype field names survey-analytics/index.ts
// actually returns (see archetypeKeys/governanceScaleKeys there, generated
// from src/lib/swot-content.ts's ARCHETYPES_BY_SECTION) — these previously
// referenced old, non-canonical field names that never matched anything the
// API returned, so every card silently fell back to showing the raw key.
//
// Extended (2026-08-13) with the two CLD-loop questions and an explicit LP
// (Critical Leverage Point) tag per formulas-and-invariants.md's LP1–LP5
// table, wherever an archetype maps to one of the 5 canonical leverage
// points. Archetypes without an `lp` are still real systems-archetype
// validation questions — they just aren't one of the 5 CLPs the roadmap
// tracks as a headline leverage point.
const ARCHETYPE_META: Record<string, { name: string; lp?: "LP1" | "LP2" | "LP3" | "LP4" | "LP5" }> = {
  q3_cld1_investment_development: { name: "Investment–Development Virtuous Cycle (CLD)" },
  q3_cld2_governance_confidence: { name: "Governance–Investor Confidence Loop (CLD)" },
  q4_arch_tragedy_commons: { name: "Tragedy of the Commons", lp: "LP5" },
  q5_arch_growth_underinvest: { name: "Growth & Underinvestment", lp: "LP3" },
  q6_arch_limits_growth: { name: "Limits to Growth", lp: "LP2" },
  q7_arch_success_successful: { name: "Success to the Successful" },
  q8_arch_shifting_burden: { name: "Shifting the Burden", lp: "LP4" },
  q9_arch_moral_governance_derisk: { name: "Moral Governance De-Risks Capital" },
  q9_arch_fixes_fail: { name: "Fixes That Fail", lp: "LP1" },
  q9_arch_escalation: { name: "Escalation" },
  q9_arch_big_man: { name: "The Big Man" },
  q11_arch_drifting_goals: { name: "Drifting Goals" },
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
const CHART_COLORS = ["#1B4D3E", "#C9A84C", "#065f46", "#92400e", "#9d174d", "#475569", "#0891b2"];

export const SurveyDashboard: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(EDGE_FUNCTIONS.ANALYTICS || `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/survey-analytics`, {
        headers: getEdgeFunctionHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch analytics");
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const getBarColor = (pct: number) => {
    if (pct >= 75) return "bg-emerald-500";
    if (pct >= 50) return "bg-amber-500";
    return "bg-rose-500";
  };

  const renderBars = (dataObj: Record<string, number>, total: number) => {
    const sorted = Object.entries(dataObj).sort(([, a], [, b]) => b - a);
    return (
      <div className="space-y-3">
        {sorted.map(([label, count]) => {
          const pct = total > 0 ? (count / total) * 100 : 0;
          return (
            <div key={label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-[#022c22] dark:text-[#ecfdf5] truncate max-w-[200px]">{label}</span>
                <span className="text-[#64748b]">{count} ({pct.toFixed(0)}%)</span>
              </div>
              <div className="w-full bg-[#C9A84C]/10 rounded-full h-2.5">
                <div className="bg-[#1B4D3E] h-2.5 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  /** Same visual language as renderBars, but for a 1–5 average score instead
   * of a count distribution — used throughout the new panels below. `n` is
   * optional: several backend aggregates (leverage Likerts, BSC, budget/risk)
   * report only the mean, not a per-field response count, so we simply omit
   * the "(n=…)" suffix rather than show a misleading n=0. */
  const renderScaleBar = (label: string, avg: number, n?: number, max = 5) => {
    const pct = Math.max(0, Math.min(100, (avg / max) * 100));
    return (
      <div key={label}>
        <div className="flex justify-between text-xs mb-1">
          <span className="font-medium text-[#022c22] dark:text-[#ecfdf5]">{label}</span>
          <span className="text-[#64748b]">{avg.toFixed(2)} / {max}{typeof n === "number" ? ` (n=${n})` : ""}</span>
        </div>
        <div className="w-full bg-[#C9A84C]/10 rounded-full h-2.5">
          <div className="bg-[#C9A84C] h-2.5 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>
    );
  };

  if (loading) return <div className="p-8 text-center text-[#64748b]">Loading Live Analytics...</div>;
  if (error) return <div className="p-8 text-center text-rose-500">Error: {error}</div>;
  if (!data) return null;

  const {
    demographics, birdScores, archetypes, iedsPreferences, totalResponses,
    systemsThinking, beieUnderstanding, clusterHealth, strategicOptions,
    balancedScorecard, budgetAndRisk, engagementDistribution,
  } = data;
  const provTotal = Object.values(demographics.provinces).reduce((a, b) => a + b, 0);
  const catTotal = Object.values(demographics.categories).reduce((a, b) => a + b, 0);
  const iedsTotal = Object.values(iedsPreferences).reduce((a, b) => a + b, 0);

  const lpEntries = Object.entries(archetypes).filter(([k]) => ARCHETYPE_META[k]?.lp);
  const otherArchetypeEntries = Object.entries(archetypes).filter(([k]) => !ARCHETYPE_META[k]?.lp);

  const clusterChartData = clusterHealth
    ? Object.values(clusterHealth).sort((a, b) => a.section - b.section).map((c) => ({
        cluster: c.label,
        "Strategic Balance": c.strategicBalanceIndex,
        "Strength RI": c.avgStrengthRI,
        "Opportunity RI": c.avgOpportunityRI,
        "Weakness Risk": c.avgWeaknessRisk,
        "Threat VI": c.avgThreatVI,
      }))
    : [];

  const clusterRadarData = clusterHealth
    ? Object.values(clusterHealth).sort((a, b) => a.section - b.section).map((c) => ({
        cluster: c.label,
        Confidence: c.universal.confidence,
        Readiness: c.universal.readiness,
        Urgency: c.universal.urgency,
      }))
    : [];

  const strategyChartData = strategicOptions
    ? Object.keys(STRATEGY_OPTION_LABELS).map((k) => ({
        option: STRATEGY_OPTION_LABELS[k].name,
        "Respondent avg (0–10)": strategicOptions.respondentScores[k]?.avg ?? 0,
        "Roadmap baseline (0–10)": strategicOptions.baselineScores[k] ?? 0,
        n: strategicOptions.respondentScores[k]?.n ?? 0,
      }))
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ecfdf5] via-white to-[#d1fae5] dark:from-[#022c22] dark:via-[#022c22] dark:to-[#1B4D3E] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
              <BarChart3 className="w-8 h-8 text-[#C9A84C]" />
              BIRD Validation Survey Analytics
            </h1>
            <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 mt-1">
              Real-time stakeholder consensus, systems-thinking appreciation & strategic balance metrics
            </p>
          </div>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 bg-[#1B4D3E] text-white rounded-lg hover:bg-[#022c22] transition-colors text-sm font-semibold"
          >
            <RefreshCw className="w-4 h-4" /> Refresh Data
          </button>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white/90 dark:bg-[#022c22]/80 border-[#C9A84C]/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-[#C9A84C]/10 rounded-lg"><Users className="w-5 h-5 text-[#C9A84C]" /></div>
              <div>
                <p className="text-xs text-[#64748b]">Total Responses</p>
                <p className="text-2xl font-bold text-[#022c22] dark:text-[#ecfdf5]">{totalResponses}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 dark:bg-[#022c22]/80 border-[#C9A84C]/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg"><TrendingUp className="w-5 h-5 text-emerald-600" /></div>
              <div>
                <p className="text-xs text-[#64748b]">Strength RI</p>
                <p className="text-2xl font-bold text-emerald-600">{birdScores.avgStrengthRI}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 dark:bg-[#022c22]/80 border-[#C9A84C]/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg"><AlertTriangle className="w-5 h-5 text-rose-600" /></div>
              <div>
                <p className="text-xs text-[#64748b]">Weakness Risk</p>
                <p className="text-2xl font-bold text-rose-600">{birdScores.avgWeaknessRisk}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#1B4D3E] to-[#022c22] text-white border-none">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-[#C9A84C]/20 rounded-lg"><ShieldCheck className="w-5 h-5 text-[#C9A84C]" /></div>
              <div>
                <p className="text-xs text-[#C9A84C]">Strategic Balance</p>
                <p className="text-2xl font-bold text-white">{birdScores.strategicBalanceIndex}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Demographics & IEDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white/90 dark:bg-[#022c22]/80 border-[#C9A84C]/20">
            <CardHeader><CardTitle className="text-sm font-semibold flex items-center gap-2"><MapPin className="w-4 h-4 text-[#C9A84C]" /> Province Distribution</CardTitle></CardHeader>
            <CardContent>{renderBars(demographics.provinces, provTotal)}</CardContent>
          </Card>
          <Card className="bg-white/90 dark:bg-[#022c22]/80 border-[#C9A84C]/20">
            <CardHeader><CardTitle className="text-sm font-semibold flex items-center gap-2"><Briefcase className="w-4 h-4 text-[#C9A84C]" /> Stakeholder Categories</CardTitle></CardHeader>
            <CardContent>{renderBars(demographics.categories, catTotal)}</CardContent>
          </Card>
          <Card className="bg-white/90 dark:bg-[#022c22]/80 border-[#C9A84C]/20">
            <CardHeader><CardTitle className="text-sm font-semibold flex items-center gap-2"><Target className="w-4 h-4 text-[#C9A84C]" /> IEDS Preference</CardTitle></CardHeader>
            <CardContent>{renderBars(iedsPreferences, iedsTotal)}</CardContent>
          </Card>
        </div>

        {/* ═══════════════════════════ SYSTEMS THINKING APPRECIATION ═══════════════ */}
        {systemsThinking && (
          <Card className="bg-white/90 dark:bg-[#022c22]/80 border-[#C9A84C]/20">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#C9A84C]" /> Systems Thinking Appreciation (Section 0)
              </CardTitle>
              <p className="text-xs text-[#64748b]">
                How much value respondents place on systems thinking, and whether the orientation module's
                explanations of CLDs, feedback loops, and leverage points actually land — measured with a
                3-question comprehension quiz, not just a self-report.
              </p>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#022c22] dark:text-[#ecfdf5]">Perceived Value & Readiness</p>
                {renderScaleBar("Value of systems thinking for BARMM investment planning", systemsThinking.valueAvg, systemsThinking.valueN)}
                <div className="pt-2">
                  <p className="text-xs font-semibold text-[#022c22] dark:text-[#ecfdf5] mb-2">Readiness to contribute (q0_1_ready)</p>
                  {renderBars(systemsThinking.readyDistribution, Object.values(systemsThinking.readyDistribution).reduce((a, b) => a + b, 0))}
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#022c22] dark:text-[#ecfdf5]">Comprehension Quiz (% answered correctly)</p>
                {[
                  { label: "CLD polarity ('s' marker = same-direction)", d: systemsThinking.comprehension.cldPolarity },
                  { label: "Reinforcing loop definition", d: systemsThinking.comprehension.reinforcingLoop },
                  { label: "Most transformative leverage point (paradigm/mindset)", d: systemsThinking.comprehension.leveragePoint },
                ].map((q) => (
                  <div key={q.label} className="p-3 rounded-lg border border-[#C9A84C]/10 bg-[#ecfdf5]/50 dark:bg-[#1B4D3E]/20">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xs font-bold text-[#022c22] dark:text-[#ecfdf5] leading-tight max-w-[70%]">{q.label}</h4>
                      <Badge variant="outline" className={`text-xs ${q.d.correctPct >= 75 ? 'border-emerald-500 text-emerald-600' : q.d.correctPct >= 50 ? 'border-amber-500 text-amber-600' : 'border-rose-500 text-rose-600'}`}>
                        {q.d.correctPct}%
                      </Badge>
                    </div>
                    <div className="w-full bg-[#C9A84C]/10 rounded-full h-2 mb-1">
                      <div className={`h-2 rounded-full ${getBarColor(q.d.correctPct)}`} style={{ width: `${q.d.correctPct}%` }} />
                    </div>
                    <p className="text-[10px] text-[#64748b]">n={q.d.n}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* ═══════════════════════════ BEIE UNDERSTANDING ═══════════════════════════ */}
        {beieUnderstanding && (
          <Card className="bg-white/90 dark:bg-[#022c22]/80 border-[#C9A84C]/20">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#C9A84C]" /> BEIE Framework Comprehension (Section 3)
              </CardTitle>
              <p className="text-xs text-[#64748b]">
                Clarity of the Bangsamoro Economic and Investment Ecosystem framework itself — the video, the
                sector-to-ecosystem mental-model shift, the 5-cluster diagram, and Moral Governance as the
                ecosystem's "operating system." 1–5 scale.
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.values(beieUnderstanding).map((f) => renderScaleBar(f.label, f.avg, f.n))}
            </CardContent>
          </Card>
        )}

        {/* ═══════════════════════════ BEIE CLUSTER HEALTH (SWOT AGGREGATE) ════════ */}
        {clusterHealth && (
          <Card className="bg-white/90 dark:bg-[#022c22]/80 border-[#C9A84C]/20">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#C9A84C]" /> BEIE Cluster Health — Aggregate SWOT (Sections 4–9)
              </CardTitle>
              <p className="text-xs text-[#64748b]">
                Each cluster's Strength RI, Opportunity RI, Weakness Risk, and Threat VI computed with the same
                BIRD Chapter 3-A formulas used by the Strat Planner Pro app (RI = Impact×Likelihood/5,
                Opportunity RI = √(Impact×Likelihood), Weakness Risk = Impact×Likelihood, Threat VI =
                Impact²×Likelihood/25), scoped per cluster instead of BARMM-wide.
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={clusterChartData} margin={{ top: 8, right: 8, left: -16, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#C9A84C22" />
                    <XAxis dataKey="cluster" tick={{ fontSize: 11, fill: "#64748b" }} interval={0} angle={-15} textAnchor="end" height={50} />
                    <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="Strength RI" fill="#10b981" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="Opportunity RI" fill="#0891b2" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="Weakness Risk" fill="#f59e0b" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="Threat VI" fill="#ef4444" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.values(clusterHealth).sort((a, b) => a.section - b.section).map((c) => (
                  <div key={c.section} className="p-4 rounded-lg border border-[#C9A84C]/10 bg-[#ecfdf5]/50 dark:bg-[#1B4D3E]/20">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-xs font-bold text-[#022c22] dark:text-[#ecfdf5]">Section {c.section} · {c.label}</h4>
                      <Badge variant="outline" className={`text-xs ${c.strategicBalanceIndex >= 55 ? 'border-emerald-500 text-emerald-600' : c.strategicBalanceIndex >= 45 ? 'border-amber-500 text-amber-600' : 'border-rose-500 text-rose-600'}`}>
                        SBI {c.strategicBalanceIndex}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-[#64748b] mb-2">
                      <span>Strength RI: <b className="text-[#022c22] dark:text-[#ecfdf5]">{c.avgStrengthRI}</b></span>
                      <span>Opportunity RI: <b className="text-[#022c22] dark:text-[#ecfdf5]">{c.avgOpportunityRI}</b></span>
                      <span>Weakness Risk: <b className="text-[#022c22] dark:text-[#ecfdf5]">{c.avgWeaknessRisk}</b></span>
                      <span>Threat VI: <b className="text-[#022c22] dark:text-[#ecfdf5]">{c.avgThreatVI}</b></span>
                    </div>
                    <div className="pt-2 border-t border-[#C9A84C]/10 text-[11px] text-[#64748b] space-y-1">
                      <div className="flex justify-between"><span>Confidence</span><b className="text-[#022c22] dark:text-[#ecfdf5]">{c.universal.confidence}/5</b></div>
                      <div className="flex justify-between"><span>Readiness</span><b className="text-[#022c22] dark:text-[#ecfdf5]">{c.universal.readiness}/5</b></div>
                      <div className="flex justify-between"><span>Urgency</span><b className="text-[#022c22] dark:text-[#ecfdf5]">{c.universal.urgency}/5</b></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-72">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#022c22] dark:text-[#ecfdf5] mb-2">
                  Confidence / Readiness / Urgency by Cluster
                </p>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={clusterRadarData} outerRadius="75%">
                    <PolarGrid stroke="#C9A84C33" />
                    <PolarAngleAxis dataKey="cluster" tick={{ fontSize: 10, fill: "#64748b" }} />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 9, fill: "#64748b" }} />
                    <Radar name="Confidence" dataKey="Confidence" stroke="#1B4D3E" fill="#1B4D3E" fillOpacity={0.25} />
                    <Radar name="Readiness" dataKey="Readiness" stroke="#C9A84C" fill="#C9A84C" fillOpacity={0.25} />
                    <Radar name="Urgency" dataKey="Urgency" stroke="#9d174d" fill="#9d174d" fillOpacity={0.15} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ═══════════════════════════ LEVERAGE POINTS (LP1–LP5) ════════════════════ */}
        <Card className="bg-white/90 dark:bg-[#022c22]/80 border-[#C9A84C]/20">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
              <Rocket className="w-5 h-5 text-[#C9A84C]" /> Critical Leverage Points — Archetype Validation (LP1–LP5)
            </CardTitle>
            <p className="text-xs text-[#64748b]">
              Consensus that the systems archetype behind each of BARMM's 5 Critical Leverage Points accurately
              describes reality on the ground. Threshold: ≥75% Validated · 50–74% Partial · &lt;50% Revision Needed.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {lpEntries.sort(([a], [b]) => (ARCHETYPE_META[a]?.lp ?? "").localeCompare(ARCHETYPE_META[b]?.lp ?? "")).map(([key, val]) => (
                <div key={key} className="p-4 rounded-lg border border-[#C9A84C]/10 bg-[#ecfdf5]/50 dark:bg-[#1B4D3E]/20">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xs font-bold text-[#022c22] dark:text-[#ecfdf5] leading-tight">
                      {LP_LABELS[ARCHETYPE_META[key]?.lp ?? ""] ?? ARCHETYPE_META[key]?.name ?? key}
                    </h4>
                    <Badge variant="outline" className={`text-xs shrink-0 ml-2 ${val.consensus >= 75 ? 'border-emerald-500 text-emerald-600' : val.consensus >= 50 ? 'border-amber-500 text-amber-600' : 'border-rose-500 text-rose-600'}`}>
                      {val.consensus}%
                    </Badge>
                  </div>
                  <p className="text-[10px] text-[#64748b] mb-2">Archetype: {ARCHETYPE_META[key]?.name ?? key}</p>
                  <div className="w-full bg-[#C9A84C]/10 rounded-full h-2 mb-1">
                    <div className={`h-2 rounded-full ${getBarColor(val.consensus)}`} style={{ width: `${val.consensus}%` }} />
                  </div>
                  <p className="text-[10px] text-[#64748b]">{val.accurate} of {val.total} respondents agree</p>
                </div>
              ))}
            </div>

            <p className="text-xs font-semibold uppercase tracking-wide text-[#022c22] dark:text-[#ecfdf5] mb-3">
              Other Systems Archetypes &amp; CLD Loops (not mapped to a headline LP)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherArchetypeEntries.map(([key, val]) => (
                <div key={key} className="p-4 rounded-lg border border-[#C9A84C]/10 bg-[#ecfdf5]/50 dark:bg-[#1B4D3E]/20">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xs font-bold text-[#022c22] dark:text-[#ecfdf5] leading-tight">
                      {ARCHETYPE_META[key]?.name ?? key}
                    </h4>
                    <Badge variant="outline" className={`text-xs ${val.consensus >= 75 ? 'border-emerald-500 text-emerald-600' : val.consensus >= 50 ? 'border-amber-500 text-amber-600' : 'border-rose-500 text-rose-600'}`}>
                      {val.consensus}%
                    </Badge>
                  </div>
                  <div className="w-full bg-[#C9A84C]/10 rounded-full h-2 mb-1">
                    <div className={`h-2 rounded-full ${getBarColor(val.consensus)}`} style={{ width: `${val.consensus}%` }} />
                  </div>
                  <p className="text-[10px] text-[#64748b]">{val.accurate} of {val.total} respondents agree</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ═══════════════════════════ STRATEGIC OPTIONS RANKING & SCORING ═════════ */}
        {strategicOptions && (
          <Card className="bg-white/90 dark:bg-[#022c22]/80 border-[#C9A84C]/20">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
                <LineChartIcon className="w-5 h-5 text-[#C9A84C]" /> Strategic Options — Ranking &amp; Scoring (Section 10 IEDS)
              </CardTitle>
              <p className="text-xs text-[#64748b]">
                Respondents scored each of the 4 strategic options (0–10 per criterion) using the exact
                7-criteria weighted matrix from BIRD 2026–2035 Chapter 4, §A.6 (Economic Impact 25%, Feasibility
                20%, Identity Alignment 15%, Systems Leverage 15%, Risk-Return 10%, Inclusivity 10%,
                Sustainability 5%) — the same weights shown live in Section 10, so these bars match what
                respondents actually saw.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed">
                <b>Engineering note:</b> this respondent-scored average is computed with the Chapter 4 weights
                above (verified 2026-08-13 against the source document), which also match{" "}
                <code>Section10_IEDS.tsx</code>'s live <code>EVALUATION_CRITERIA</code>. <code>formulas.ts</code>'s{" "}
                <code>calculateStrategyOverallScore</code> currently uses a <i>different</i> weight set (economic
                impact 0.20, feasibility 0.18, risk-return 0.16, sustainability 0.06) that does not match this
                chapter — that's the file that needs correcting, in both the Planner and Survey repos, since
                it's documented as byte-identical between them.
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={strategyChartData} margin={{ top: 8, right: 8, left: -16, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#C9A84C22" />
                    <XAxis dataKey="option" tick={{ fontSize: 12, fill: "#64748b" }} />
                    <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: "#64748b" }} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="Respondent avg (0–10)" fill="#1B4D3E" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="Roadmap baseline (0–10)" fill="#C9A84C" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(STRATEGY_OPTION_LABELS).map(([key, meta]) => (
                  <div key={key} className="rounded-lg border border-[#C9A84C]/30 bg-[#ecfdf5]/40 dark:bg-[#022c22]/50 p-3 text-center">
                    <p className="text-xs font-semibold text-[#022c22] dark:text-[#ecfdf5] uppercase">{meta.name}</p>
                    <p className="text-[10px] text-[#065f46] dark:text-[#ecfdf5]/50 mb-1">{meta.full}</p>
                    <p className="text-lg font-bold text-[#C9A84C]">{(strategicOptions.respondentScores[key]?.avg ?? 0).toFixed(2)}</p>
                    <p className="text-[10px] text-[#065f46] dark:text-[#ecfdf5]/50">
                      roadmap: {strategicOptions.baselineScores[key]?.toFixed(2)} · n={strategicOptions.respondentScores[key]?.n ?? 0}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#022c22] dark:text-[#ecfdf5] mb-2">Which option ranked #1 (q10_strategic_ranking)</p>
                  {renderBars(
                    strategicOptions.strategicRankingDistribution,
                    Object.values(strategicOptions.strategicRankingDistribution).reduce((a, b) => a + b, 0)
                  )}
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#022c22] dark:text-[#ecfdf5]">Leverage-Point Methodology Comprehension (1–5)</p>
                  {renderScaleBar("Clarity of leverage-point identification methodology", strategicOptions.leverageLikerts.leveragePointsClarity)}
                  {renderScaleBar("Effectiveness of leverage points in accelerating growth", strategicOptions.leverageLikerts.activatingLeverage)}
                  {renderScaleBar("Criticality of front-loading enablers", strategicOptions.leverageLikerts.capacityTraps)}
                  {renderScaleBar("Importance of mental models/structures over events", strategicOptions.leverageLikerts.icebergModel)}
                  {renderScaleBar("Transformative potential of collaborative governance", strategicOptions.leverageLikerts.collaborativeGovernance)}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ═══════════════════════════ BALANCED SCORECARD & BUDGET/RISK/ENGAGEMENT ═ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {balancedScorecard && (
            <Card className="bg-white/90 dark:bg-[#022c22]/80 border-[#C9A84C]/20">
              <CardHeader><CardTitle className="text-sm font-semibold flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#C9A84C]" /> Balanced Scorecard Validation</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {renderScaleBar("Learning & Growth alignment", balancedScorecard.perspectives.learningGrowth)}
                {renderScaleBar("Internal Process alignment", balancedScorecard.perspectives.internalProcess)}
                {renderScaleBar("Stakeholder alignment", balancedScorecard.perspectives.stakeholder)}
                {renderScaleBar("Financial alignment", balancedScorecard.perspectives.financial)}
                <div className="pt-2 border-t border-[#C9A84C]/10" />
                {renderScaleBar("Vision clarity", balancedScorecard.vision.clarity)}
                {renderScaleBar("Vision achievable", balancedScorecard.vision.achievable)}
                {renderScaleBar("Mission alignment", balancedScorecard.vision.missionAlignment)}
                {renderScaleBar("BSC usefulness", balancedScorecard.vision.bscUseful)}
              </CardContent>
            </Card>
          )}

          {budgetAndRisk && (
            <Card className="bg-white/90 dark:bg-[#022c22]/80 border-[#C9A84C]/20">
              <CardHeader><CardTitle className="text-sm font-semibold flex items-center gap-2"><Wallet className="w-4 h-4 text-[#C9A84C]" /> Budget &amp; Risk</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {renderScaleBar("Funding mix perceived as fair", budgetAndRisk.fundingMixFair)}
                {renderScaleBar("Targets perceived as realistic", budgetAndRisk.targetsRealistic)}
                {renderScaleBar("High-risk concern level", budgetAndRisk.riskConcern.high)}
                {renderScaleBar("Medium-risk concern level", budgetAndRisk.riskConcern.medium)}
                {renderScaleBar("Low-risk concern level", budgetAndRisk.riskConcern.low)}
                <div className="pt-2 border-t border-[#C9A84C]/10" />
                <p className="text-xs font-semibold text-[#022c22] dark:text-[#ecfdf5]">Budget priority cluster</p>
                {renderBars(budgetAndRisk.budgetPriorityClusterDistribution, Object.values(budgetAndRisk.budgetPriorityClusterDistribution).reduce((a, b) => a + b, 0))}
              </CardContent>
            </Card>
          )}

          {engagementDistribution && (
            <Card className="bg-white/90 dark:bg-[#022c22]/80 border-[#C9A84C]/20">
              <CardHeader><CardTitle className="text-sm font-semibold flex items-center gap-2"><HandHeart className="w-4 h-4 text-[#C9A84C]" /> Post-Survey Engagement Interest</CardTitle></CardHeader>
              <CardContent>
                {renderBars(engagementDistribution, totalResponses)}
                <p className="text-[10px] text-[#64748b] mt-3">Multi-select — percentages are share of {totalResponses} respondents, not of 100%.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyDashboard;