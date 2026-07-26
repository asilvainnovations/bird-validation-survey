import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Zap,
  Wifi,
  Route,
  GraduationCap,
  HeartPulse,
  TrendingUp,
  Target,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { BIRD_IMAGES } from "@/lib/bird-urls";
import {
  calculateStrengthRI,
  calculateWeaknessRisk,
  calculateOpportunityRI,
  calculateThreatVI,
} from "@/lib/formulas";

// ── Types (exact runtime contract with SurveyWizard.tsx s6 state) ────────────
export interface Section6Data {
  q6_1_halal_sector_rank: string;
  q6_2_sequencing_effectiveness?: number;
  q6_3_begmp_confidence?: number;
  q6_4_tourism_confidence?: number;
  q6_5_digital_tourism_rank: string[];
  q6_6_moral_governance_realistic: string;
  q_s6_youth_pop_impact?: number;
  q_s6_youth_pop_likelihood?: number;
  q_s6_renewable_energy_impact?: number;
  q_s6_renewable_energy_likelihood?: number;
  q_s6_polloc_impact?: number;
  q_s6_polloc_likelihood?: number;
  q_s6_infra_deficits_impact?: number;
  q_s6_infra_deficits_likelihood?: number;
  q_s6_literacy_impact?: number;
  q_s6_literacy_likelihood?: number;
  q_s6_skills_mismatch_impact?: number;
  q_s6_skills_mismatch_likelihood?: number;
  q_s6_tech_adoption_impact?: number;
  q_s6_tech_adoption_likelihood?: number;
  q_s6_renewable_invest_impact?: number;
  q_s6_renewable_invest_likelihood?: number;
  q_s6_tourism_potential_impact?: number;
  q_s6_tourism_potential_likelihood?: number;
  q_s6_political_transition_impact?: number;
  q_s6_political_transition_likelihood?: number;
  q_s6_cost_overruns_impact?: number;
  q_s6_cost_overruns_likelihood?: number;
  q_s6_natl_coord_impact?: number;
  q_s6_natl_coord_likelihood?: number;
  q_s6_shifting_burden: string;
  q_s6_shifting_followup: string;
  q_s6_growth_underinvest: string;
  q_s6_growth_followup: string;
}

interface Section6Props {
  data: Section6Data;
  onChange: (data: Section6Data) => void;
}

// ── Design tokens ────────────────────────────────────────────────────────────
const activeBtn =
  "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90 dark:bg-[#1B4D3E] dark:text-white dark:border-[#1B4D3E]";
const inactiveBtn =
  "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[#ecfdf5]/30 dark:hover:bg-[#C9A84C]/10";
const activeScale =
  "bg-[#C9A84C] text-white border-[#C9A84C] hover:bg-[#C9A84C]/90";
const inactiveScale =
  "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C]";

const archetypeOptions = [
  "Very accurately",
  "Somewhat accurately",
  "Needs revision",
  "Not accurate",
];

const scaleLabels = ["Not at all", "Slightly", "Moderately", "Very well", "Completely"];

// ── Enablers context data ────────────────────────────────────────────────────
const enablers = [
  {
    icon: <Wifi className="w-5 h-5 text-[#C9A84C]" />,
    title: "Digital Connectivity",
    desc: "Expanding broadband, e-governance, and cybersecurity to accelerate investment facilitation",
  },
  {
    icon: <Route className="w-5 h-5 text-[#C9A84C]" />,
    title: "Physical Infrastructure",
    desc: "Improving ports, airports, and cold-chain logistics to reduce post-harvest losses",
  },
  {
    icon: <GraduationCap className="w-5 h-5 text-[#C9A84C]" />,
    title: "Education & Skills",
    desc: "Aligning TESDA programs with industry needs to close the 59.3% literacy gap",
  },
  {
    icon: <HeartPulse className="w-5 h-5 text-[#C9A84C]" />,
    title: "Health & Social Protection",
    desc: "Ensuring workforce resilience through accessible healthcare and social safety nets",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
export const Section6_Enablers: React.FC<Section6Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section6Data>(
    field: K,
    value: Section6Data[K]
  ) => onChange({ ...data, [field]: value });

  const toggleArray = (field: keyof Section6Data, val: string) => {
    const arr = (data[field] as string[]) || [];
    update(
      field,
      arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]
    );
  };

  const renderScaleQuestion = (
    label: string,
    field: keyof Section6Data,
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
                ? activeScale
                : inactiveScale
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
    desc: string,
    impactField: keyof Section6Data,
    likelihoodField: keyof Section6Data,
    category: "strength" | "weakness" | "opportunity" | "threat"
  ) => {
    const impact = data[impactField] as number | undefined;
    const likelihood = data[likelihoodField] as number | undefined;
    let score: number | null = null;
    let scoreLabel = "";
    let badgeClass = "";

    if (impact && likelihood) {
      switch (category) {
        case "strength":
          score = calculateStrengthRI(impact, likelihood);
          scoreLabel = "RI";
          badgeClass = "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300";
          break;
        case "weakness":
          score = calculateWeaknessRisk(impact, likelihood);
          scoreLabel = "Risk";
          badgeClass = "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300";
          break;
        case "opportunity":
          score = calculateOpportunityRI(impact, likelihood);
          scoreLabel = "RI";
          badgeClass = "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300";
          break;
        case "threat":
          score = calculateThreatVI(impact, likelihood);
          scoreLabel = "VI";
          badgeClass = "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
          break;
      }
    }

    return (
      <div className="space-y-4 p-4 rounded-lg border border-[#C9A84C]/20 bg-emerald-50/40 dark:bg-[#1B4D3E]/10">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[#C9A84C]" />
          <p className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            {label}
          </p>
          {score !== null && (
            <Badge
              variant="secondary"
              className={cn("ml-auto border", badgeClass)}
            >
              <TrendingUp className="w-3 h-3 mr-1" />
              {scoreLabel}: {score.toFixed(2)}
            </Badge>
          )}
        </div>
        <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/70">{desc}</p>
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
      {/* ── Header ────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <Zap className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22] dark:text-[#ecfdf5]">
          Section 6: Cluster 3 — Enablers: Constructing the Support Architecture
        </h2>
      </div>
      <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 -mt-2 max-w-3xl">
        The Enablers cluster forms the backbone that supports industrialization and inclusive growth across Bangsamoro — from broadband to cold-chain logistics.
      </p>

      {/* ── 1. Cluster Banner Image ──────────────────────────────── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src={BIRD_IMAGES.cluster3Enablers.url}
          alt={BIRD_IMAGES.cluster3Enablers.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">
            {BIRD_IMAGES.cluster3Enablers.description}
          </p>
        </div>
      </div>

      {/* ── 2. Context Card ──────────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Four Enablers for Bangsamoro Development
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enablers.map((e) => (
              <div
                key={e.title}
                className="flex items-start gap-3 p-4 rounded-lg border border-[#C9A84C]/20 bg-emerald-50/60 dark:bg-[#1B4D3E]/20"
              >
                <div className="mt-0.5 shrink-0">{e.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5]">
                    {e.title}
                  </p>
                  <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/70">
                    {e.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 3. SWOT Scales: Strengths ────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              STRENGTH
            </span>
            Enablers Cluster Strengths
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 italic">
            Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>
          {renderSwotPair(
            "S1 — Young, Growing Population",
            "BARMM's population grows at 3.43% per year (the highest in the Philippines), creating a large future workforce and consumer base.",
            "q_s6_youth_pop_impact",
            "q_s6_youth_pop_likelihood",
            "strength"
          )}
          {renderSwotPair(
            "S2 — Renewable Energy Potential",
            "Untapped hydro (Lake Lanao), solar, and biomass resources can attract clean energy investments and power industrial scaling.",
            "q_s6_renewable_energy_impact",
            "q_s6_renewable_energy_likelihood",
            "strength"
          )}
          {renderSwotPair(
            "S6 — Polloc Freeport & Economic Zone",
            "Strategic logistics and trade hub in Maguindanao del Norte serving as a gateway for goods entering and leaving BARMM.",
            "q_s6_polloc_impact",
            "q_s6_polloc_likelihood",
            "strength"
          )}
        </CardContent>
      </Card>

      {/* ── 4. SWOT Scales: Weaknesses ───────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
              WEAKNESS
            </span>
            Critical Enablers Gaps
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 italic">
            Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>
          {renderSwotPair(
            "W1 — Critical Infrastructure Deficits",
            "Gaps in energy, roads, digital connectivity, and water supply make it hard for businesses to operate, especially in island provinces.",
            "q_s6_infra_deficits_impact",
            "q_s6_infra_deficits_likelihood",
            "weakness"
          )}
          {renderSwotPair(
            "W3 — Lowest Functional Literacy Rate",
            "At 59.3%, BARMM has the lowest literacy rate in the country, creating a serious shortage of skilled workers.",
            "q_s6_literacy_impact",
            "q_s6_literacy_likelihood",
            "weakness"
          )}
          {renderSwotPair(
            "W5 — Skills Mismatch",
            "Technical schools (TVIs) are not fully aligned with what industries need — especially in halal manufacturing and modern agriculture.",
            "q_s6_skills_mismatch_impact",
            "q_s6_skills_mismatch_likelihood",
            "weakness"
          )}
          {renderSwotPair(
            "W6 — Low Technology Adoption",
            "Many farms and businesses still use old methods, with slow uptake of modern tools for farming, processing, and online selling.",
            "q_s6_tech_adoption_impact",
            "q_s6_tech_adoption_likelihood",
            "weakness"
          )}
        </CardContent>
      </Card>

      {/* ── 5. SWOT Scales: Opportunities ────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
              OPPORTUNITY
            </span>
            Enablers Cluster Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 italic">
            Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>
          {renderSwotPair(
            "O1 — Renewable Energy Investments",
            "Growing interest in solar farms, hydro rehabilitation, and biomass projects aligning with BARMM's clean energy potential.",
            "q_s6_renewable_invest_impact",
            "q_s6_renewable_invest_likelihood",
            "opportunity"
          )}
          {renderSwotPair(
            "O2 — Tourism Recovery",
            "Isabela City Tourism Champion (2024) and Lake Lanao eco-tourism potential create new service-sector growth pathways.",
            "q_s6_tourism_potential_impact",
            "q_s6_tourism_potential_likelihood",
            "opportunity"
          )}
        </CardContent>
      </Card>

      {/* ── 6. SWOT Scales: Threats ──────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
              THREAT
            </span>
            Enablers Cluster Threats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 italic">
            Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>
          {renderSwotPair(
            "T1 — Political Transition Uncertainties",
            "First parliamentary elections and governance continuity risks may delay infrastructure and education investments.",
            "q_s6_political_transition_impact",
            "q_s6_political_transition_likelihood",
            "threat"
          )}
          {renderSwotPair(
            "T2 — Infrastructure Cost Overruns",
            "Large-scale enabling projects face risk of budget overruns and procurement delays (12–18 months historically).",
            "q_s6_cost_overruns_impact",
            "q_s6_cost_overruns_likelihood",
            "threat"
          )}
          {renderSwotPair(
            "T3 — Limited National Coordination",
            "Gaps in BARMM-specific infrastructure funding from the national government slow rollout of critical projects.",
            "q_s6_natl_coord_impact",
            "q_s6_natl_coord_likelihood",
            "threat"
          )}
        </CardContent>
      </Card>

      {/* ── 7. Skills and Education Gap Image ────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Skills%20and%20Education%20Gap.png"
              alt="Skills and Education Gap Analysis"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">
                Gap Analysis Matrix: Workforce Training vs Industry Needs
              </p>
            </div>
          </div>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
            The matrix compares three sectors: <strong>Agriculture</strong> (demand for seed suppliers and mechanized farming but no available training), <strong>Infrastructure</strong> (need for heavy equipment operators but shortage of advanced training), <strong>Halal Industry</strong> (demand for auditors and food safety officers but no available training).
          </p>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
            Rank which sector should be prioritized first for new training programs to close the education gap.
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {["Agriculture", "Infrastructure", "Halal Industry"].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn(
                  "justify-start h-auto py-3 text-sm text-left",
                  data.q6_1_halal_sector_rank === opt ? activeBtn : inactiveBtn
                )}
                onClick={() => update("q6_1_halal_sector_rank", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 8. The Enabling Grid Image ───────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Layer%202%20-%20The%20Enabling%20Grid%20and%20Lawof%20Sequencing.png"
              alt="The Enabling Grid & The Law of Sequencing"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">
                The Enabling Grid: 2nd Layer of BARMM Interconnectivity
              </p>
            </div>
          </div>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
            <strong>Four sequential stages:</strong> Energy Priming (connecting islands to Mindanao grid), Physical Mobility (bridges and transport), Logistics Integrity (cold-storage and warehousing), Industrial Scaling (agro-industrial expansion). Infrastructure readiness must precede industrial scaling.
          </p>
          {renderScaleQuestion(
            "How effectively do you think Bangsamoro's current infrastructure sequencing supports future industrial expansion?",
            "q6_2_sequencing_effectiveness",
            "(1 = not effective, 5 = very effective)"
          )}
        </CardContent>
      </Card>

      {/* ── 9. Digital Transformation Plan Image ─────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Digital%20Transformation%20Master%20Plan.png"
              alt="Digital Transformation Master Plan"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">Digital Transformation (BEGMP)</p>
            </div>
          </div>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
            <strong>Roadmap bridging the digital divide:</strong> Broadband & Connectivity (data centers, last-mile hubs), Smart Cities (public safety, command centers), E-Government (digital identities, shared services), Cybersecurity (data protection, secure transactions).
          </p>
          {renderScaleQuestion(
            "How confident are you that the BEGMP roadmap will effectively bridge Bangsamoro's digital divide?",
            "q6_3_begmp_confidence",
            "(1 = not confident, 5 = very confident)"
          )}
        </CardContent>
      </Card>

      {/* ── 10. Tourism Master Plan Image ────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Tourism%20Master%20Plan.png"
              alt="Tourism Master Plan (BTDP 2024–2033)"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">Tourism Master Plan (BTDP 2024–2033)</p>
            </div>
          </div>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
            <strong>Three phases:</strong> Organizing (2025–2026), Stabilizing (2027–2028), Institutionalizing (2029–2033). ₱161.97B funded with 93% allocated to physical access and connectivity.
          </p>
          {renderScaleQuestion(
            "How confident are you that prioritizing infrastructure will make Bangsamoro globally competitive in tourism by 2033?",
            "q6_4_tourism_confidence",
            "(1 = not confident, 5 = very confident)"
          )}
        </CardContent>
      </Card>

      {/* ── 11. Tourism and Digital Connectivity Image ───────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Tourism%20and%20Digital%20Connectivity.png"
              alt="Reinforcing Loop II: Digital Infrastructure & Smart Tourism"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">
                Reinforcing Loop II: Digital Infrastructure & Smart Tourism
              </p>
            </div>
          </div>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
            Digital infrastructure enables tourism (₱161.97B BTDP investment), which fuels broader economic development. The BEGMP digital backbone supports tourism and regional growth.
          </p>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
            Rank these components by their importance to tourism:
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {["Broadband", "Smart Cities", "E-Government", "Cybersecurity"].map((opt) => {
              const isSelected = data.q6_5_digital_tourism_rank.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleArray("q6_5_digital_tourism_rank", opt)}
                  className={cn(
                    "p-3.5 rounded-lg border text-sm text-left transition-all duration-200 flex items-start gap-3",
                    isSelected
                      ? activeBtn
                      : inactiveBtn
                  )}
                >
                  <div
                    className={cn(
                      "w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all",
                      isSelected
                        ? "bg-[#C9A84C] border-[#C9A84C]"
                        : "border-[#C9A84C]/50 bg-white dark:bg-[#022c22]"
                    )}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-[#022c22]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="leading-tight">{opt}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* ── 12. Activating the Enablers Image ──────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Activating%20the%20Enablers%20-%20Infra%20Primed%20by%20Moral%20Governance.png"
              alt="Activating the Enablers: Infrastructure Primed by Moral Governance"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">
                Activating the Enablers: Primed by Moral Governance
              </p>
            </div>
          </div>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
            <strong>Moral Governance as the operating system</strong> powering physical development: Transparency, Accountability, Stability form the governance core. Physical backbones: 100% Electrification through renewables, 85% Broadband by 2035, 30% Logistics Cost Reduction via improved inter-island routes.
          </p>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
            How realistic is it that Moral Governance can effectively deliver these physical enablers?
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Very realistic",
              "Somewhat realistic",
              "Needs stronger institutional support",
              "Not realistic",
            ].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn(
                  "justify-start h-auto py-3 text-sm text-left",
                  data.q6_6_moral_governance_realistic === opt ? activeBtn : inactiveBtn
                )}
                onClick={() => update("q6_6_moral_governance_realistic", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 13. Archetype: Limits to Growth ─────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            Archetype: Limits to Growth
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Limits%20to%20Growth%20Archetype.png"
              alt="Limits to Growth Archetype"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90 leading-relaxed">
            The "Limits to Growth" archetype illustrates how rapid investment expansion eventually slows when structural ceilings — like weak infrastructure, limited skills, and environmental constraints — are reached. Initial investments drive growth, but bottlenecks emerge (unreliable energy, poor roads, low literacy), creating hard ceilings that prevent further improvement unless capacity-building measures are introduced.
          </p>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
              How accurately does "Limits to Growth" describe the barriers facing BARMM's infrastructure and human capital development?
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {archetypeOptions.map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left",
                    data.q_s6_growth_underinvest === opt ? activeBtn : inactiveBtn
                  )}
                  onClick={() => update("q_s6_growth_underinvest", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>

          {(data.q_s6_growth_underinvest === "Very accurately" ||
            data.q_s6_growth_underinvest === "Somewhat accurately") && (
            <div className="space-y-3 pt-4 border-t border-[#C9A84C]/20 animate-in fade-in slide-in-from-top-2 duration-200">
              <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
                Which constraint most limits growth in your sector?
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["Infrastructure gaps", "Skills shortage", "Environmental constraints", "Funding limitations"].map((opt) => (
                  <Button
                    key={opt}
                    type="button"
                    variant="outline"
                    className={cn(
                      "justify-start h-auto py-3 text-sm text-left",
                      data.q_s6_growth_followup === opt ? activeBtn : inactiveBtn
                    )}
                    onClick={() => update("q_s6_growth_followup", opt)}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
              <Textarea
                placeholder="Or describe another constraint..."
                rows={2}
                value={data.q_s6_growth_followup || ""}
                onChange={(e) => update("q_s6_growth_followup", e.target.value)}
                className="w-full rounded-lg border border-[#C9A84C]/30 bg-white dark:bg-[#022c22]/50 px-3 py-2 text-sm text-[#022c22] dark:text-[#ecfdf5] placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 resize-y"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Section6_Enablers;
