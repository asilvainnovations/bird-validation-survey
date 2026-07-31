// src/components/dashboard/SurveyDashboard.tsx
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, MapPin, Briefcase, TrendingUp, AlertTriangle, 
  ShieldCheck, Target, BarChart3, RefreshCw 
} from "lucide-react";
import { EDGE_FUNCTIONS, getEdgeFunctionHeaders } from "@/lib/supabase";

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
}

// Keys must exactly match the archetype field names survey-analytics/index.ts
// actually returns (see archetypeKeys/governanceScaleKeys there, generated
// from src/lib/swot-content.ts's ARCHETYPES_BY_SECTION) — these previously
// referenced old, non-canonical field names that never matched anything the
// API returned, so every card silently fell back to showing the raw key.
const ARCHETYPE_LABELS: Record<string, string> = {
  q4_arch_tragedy_commons: "Tragedy of the Commons",
  q5_arch_growth_underinvest: "Growth & Underinvestment",
  q6_arch_limits_growth: "Limits to Growth",
  q7_arch_success_successful: "Success to the Successful",
  q8_arch_shifting_burden: "Shifting the Burden",
  q9_arch_moral_governance_derisk: "Moral Governance De-Risks Capital",
  q9_arch_fixes_fail: "Fixes That Fail",
  q9_arch_escalation: "Escalation",
  q9_arch_big_man: "The Big Man",
  q11_arch_drifting_goals: "Drifting Goals",
};

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

  if (loading) return <div className="p-8 text-center text-[#64748b]">Loading Live Analytics...</div>;
  if (error) return <div className="p-8 text-center text-rose-500">Error: {error}</div>;
  if (!data) return null;

  const { demographics, birdScores, archetypes, iedsPreferences, totalResponses } = data;
  const provTotal = Object.values(demographics.provinces).reduce((a, b) => a + b, 0);
  const catTotal = Object.values(demographics.categories).reduce((a, b) => a + b, 0);
  const iedsTotal = Object.values(iedsPreferences).reduce((a, b) => a + b, 0);

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
              Real-time stakeholder consensus & strategic balance metrics
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

        {/* Archetype Consensus */}
        <Card className="bg-white/90 dark:bg-[#022c22]/80 border-[#C9A84C]/20">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
              Systems Archetype Consensus (% Validation)
            </CardTitle>
            <p className="text-xs text-[#64748b]">Threshold: ≥75% Validated (Green) | 50-74% Partial (Yellow) | &lt;50% Revision Needed (Red)</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(archetypes).map(([key, val]) => (
                <div key={key} className="p-4 rounded-lg border border-[#C9A84C]/10 bg-[#ecfdf5]/50 dark:bg-[#1B4D3E]/20">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xs font-bold text-[#022c22] dark:text-[#ecfdf5] leading-tight">
                      {ARCHETYPE_LABELS[key] || key}
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
      </div>
    </div>
  );
};

export default SurveyDashboard;
