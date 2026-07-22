import React from "react";
import { ShieldCheck, AlertTriangle, HandCoins, Landmark, FileText, TreePine, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { BIRD_IMAGES, BIRD_VIDEOS } from "@/lib/bird-urls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// ── Types ───────────────────────────────────────────────────────────────────
export interface Section9Data {
  // SWOT — Strengths
  q_s9_policy_recognition_impact?: number;
  q_s9_policy_recognition_likelihood?: number;
  q_s9_islamic_finance_impact?: number;
  q_s9_islamic_finance_likelihood?: number;
  q_s9_cultural_heritage_impact?: number;
  q_s9_cultural_heritage_likelihood?: number;
  q_s9_peace_dividend_impact?: number;
  q_s9_peace_dividend_likelihood?: number;

  // SWOT — Weaknesses
  q_s9_literacy_impact?: number;
  q_s9_literacy_likelihood?: number;
  q_s9_fragmented_policy_impact?: number;
  q_s9_fragmented_policy_likelihood?: number;
  q_s9_underspending_impact?: number;
  q_s9_underspending_likelihood?: number;

  // SWOT — Opportunities
  q_s9_carbon_markets_impact?: number;
  q_s9_carbon_markets_likelihood?: number;
  q_s9_pes_impact?: number;
  q_s9_pes_likelihood?: number;
  q_s9_postconflict_impact?: number;
  q_s9_postconflict_likelihood?: number;
  q_s9_forestry_code_impact?: number;
  q_s9_forestry_code_likelihood?: number;

  // SWOT — Threats
  q_s9_security_incidents_impact?: number;
  q_s9_security_incidents_likelihood?: number;
  q_s9_political_transition_impact?: number;
  q_s9_political_transition_likelihood?: number;
  q_s9_fragmented_agency_impact?: number;
  q_s9_fragmented_agency_likelihood?: number;

  // Archetypes
  q_s9_fixes_fail: string;
  q_s9_fixes_fail_followup: string;
  q_s9_big_man: string;
  q_s9_big_man_followup: string;

  // Contextual questions
  q9_1_moral_governance_derisk?: number;
  q9_2_regulatory_coherence?: number;
  q9_3_jmc_revenue?: number;
  q9_4_collaborative_governance?: number;
}

interface Section9Props {
  data: Section9Data;
  onChange: (data: Section9Data) => void;
}

// ── Component ────────────────────────────────────────────────────────────────
const Section9_OperatingSystems: React.FC<Section9Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section9Data>(field: K, value: Section9Data[K]) =>
    onChange({ ...data, [field]: value });

  const activeBtnClass = "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90";
  const inactiveBtnClass = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]";
  const activeScaleClass = "bg-[#C9A84C] text-white border-[#C9A84C] hover:bg-[#C9A84C]/90";
  const inactiveScaleClass = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]";

  // SWOT Factors from reference document
  const strengthFactors = [
    {
      id: "policy_recognition",
      label: "S7: Growing Policy Recognition",
      desc: "BOL, BIC, and SIPP creating stronger investment climate and governance framework.",
      impactField: "q_s9_policy_recognition_impact" as keyof Section9Data,
      likelihoodField: "q_s9_policy_recognition_likelihood" as keyof Section9Data,
    },
    {
      id: "islamic_finance",
      label: "S9: Islamic Finance Legal Framework",
      desc: "RA 11439 enables Shariah-compliant banking and finance, opening ethical capital pathways.",
      impactField: "q_s9_islamic_finance_impact" as keyof Section9Data,
      likelihoodField: "q_s9_islamic_finance_likelihood" as keyof Section9Data,
    },
    {
      id: "cultural_heritage",
      label: "S10: Rich Cultural Heritage",
      desc: "Maranao, Yakan, and Tausug cultural traditions are assets for creative industries and tourism.",
      impactField: "q_s9_cultural_heritage_impact" as keyof Section9Data,
      likelihoodField: "q_s9_cultural_heritage_likelihood" as keyof Section9Data,
    },
    {
      id: "peace_dividend",
      label: "S12: Peace Dividend Momentum",
      desc: "Basilan ASG-free declaration (2024) and stabilized security in select zones.",
      impactField: "q_s9_peace_dividend_impact" as keyof Section9Data,
      likelihoodField: "q_s9_peace_dividend_likelihood" as keyof Section9Data,
    },
  ];

  const weaknessFactors = [
    {
      id: "literacy",
      label: "W4: Low Functional Literacy Rate",
      desc: "At 59.3%, BARMM has the lowest literacy rate in the country, creating severe human capital constraint.",
      impactField: "q_s9_literacy_impact" as keyof Section9Data,
      likelihoodField: "q_s9_literacy_likelihood" as keyof Section9Data,
    },
    {
      id: "fragmented_policy",
      label: "W6: Fragmented Policy Frameworks",
      desc: "Governance coordination gaps and underspending in budget execution.",
      impactField: "q_s9_fragmented_policy_impact" as keyof Section9Data,
      likelihoodField: "q_s9_fragmented_policy_likelihood" as keyof Section9Data,
    },
    {
      id: "underspending",
      label: "W11: Underspending in Budget Execution",
      desc: "Delays in development program rollout; absorptive capacity challenge.",
      impactField: "q_s9_underspending_impact" as keyof Section9Data,
      likelihoodField: "q_s9_underspending_likelihood" as keyof Section9Data,
    },
  ];

  const opportunityFactors = [
    {
      id: "carbon_markets",
      label: "O7: Carbon Markets & REDD+",
      desc: "Monetizing forest endowments and carbon stocks through carbon credits.",
      impactField: "q_s9_carbon_markets_impact" as keyof Section9Data,
      likelihoodField: "q_s9_carbon_markets_likelihood" as keyof Section9Data,
    },
    {
      id: "pes",
      label: "O8: Payment for Ecosystem Services (PES)",
      desc: "New revenue streams for LGUs via watershed/coastal conservation.",
      impactField: "q_s9_pes_impact" as keyof Section9Data,
      likelihoodField: "q_s9_pes_likelihood" as keyof Section9Data,
    },
    {
      id: "postconflict",
      label: "O9: Post-Conflict Reconstruction",
      desc: "Marawi MAA commercial redevelopment and normalization.",
      impactField: "q_s9_postconflict_impact" as keyof Section9Data,
      likelihoodField: "q_s9_postconflict_likelihood" as keyof Section9Data,
    },
    {
      id: "forestry_code",
      label: "O10: Bangsamoro Forestry Code",
      desc: "Sustainable timber, NTFPs, and forest nurseries pending enactment.",
      impactField: "q_s9_forestry_code_impact" as keyof Section9Data,
      likelihoodField: "q_s9_forestry_code_likelihood" as keyof Section9Data,
    },
  ];

  const threatFactors = [
    {
      id: "security_incidents",
      label: "T4: Residual Security Incidents",
      desc: "Rido, remnant armed groups, and investor perception risks (variable by province).",
      impactField: "q_s9_security_incidents_impact" as keyof Section9Data,
      likelihoodField: "q_s9_security_incidents_likelihood" as keyof Section9Data,
    },
    {
      id: "political_transition",
      label: "T5: Political Transition Uncertainties",
      desc: "First parliamentary elections and governance continuity risks.",
      impactField: "q_s9_political_transition_impact" as keyof Section9Data,
      likelihoodField: "q_s9_political_transition_likelihood" as keyof Section9Data,
    },
    {
      id: "fragmented_agency",
      label: "T9: Risk of Fragmented Agency Mandates",
      desc: "Islamic banking, halal certification, and trade agencies operating in silos.",
      impactField: "q_s9_fragmented_agency_impact" as keyof Section9Data,
      likelihoodField: "q_s9_fragmented_agency_likelihood" as keyof Section9Data,
    },
  ];

  return (
    <div className="space-y-6">
      {/* ====== HEADER ====== */}
      <div className="flex items-center gap-3 mb-4">
        <ShieldCheck className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">
          Section 9: Operating Systems — Moral Governance, Resilience, Inclusivity & Peace
        </h2>
      </div>
      <p className="text-sm text-[#065f46] mb-4">
        Moral Governance serves as the central operating system of the Bangsamoro ecosystem —
        ensuring justice, transparency, accountability, and Islamic ethics (khalifa stewardship).
        Peace provides stability, Resilience enables climate-smart planning, and Inclusivity
        broadens participation.
      </p>

      {/* ====== 1. OPERATING SYSTEMS BANNER ====== */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src={BIRD_IMAGES.operatingSystemsTrust.url}
          alt={BIRD_IMAGES.operatingSystemsTrust.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">
            Moral Governance: The Operating System of the Bangsamoro Economy
          </p>
        </div>
      </div>

      {/* ====== 2. CONTEXT CARD: THREE PILLARS ====== */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base text-[#022c22]">
            Three Foundational Pillars
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <h4 className="text-sm font-bold text-[#022c22]">Peace</h4>
              </div>
              <p className="text-xs text-[#065f46]">
                Provides long-term stability for investment
              </p>
            </div>
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
              <div className="flex items-center gap-2 mb-2">
                <TreePine className="w-5 h-5 text-amber-700" />
                <h4 className="text-sm font-bold text-[#022c22]">Resilience</h4>
              </div>
              <p className="text-xs text-[#065f46]">
                Promotes adaptive, climate-smart planning to withstand external shocks
              </p>
            </div>
            <div className="p-4 rounded-lg bg-sky-50 border border-sky-200">
              <div className="flex items-center gap-2 mb-2">
                <HandCoins className="w-5 h-5 text-sky-700" />
                <h4 className="text-sm font-bold text-[#022c22]">Inclusivity</h4>
              </div>
              <p className="text-xs text-[#065f46]">
                Broadens participation so marginalized communities share in value creation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ====== 3. HOW MORAL GOVERNANCE DE-RISKS CAPITAL ====== */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base text-[#022c22]">
            How Moral Governance De-Risks Capital
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/How%20moral%20Governance%20De-Risks%20Capital.png"
              alt="How Moral Governance De-Risks Capital"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#065f46]">
            The reinforcing feedback loop shows how moral governance continuously strengthens 
            a region's economic and institutional health. Ethical and transparent governance 
            creates trust and efficiency, attracting investment that funds even better governance.
          </p>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] mb-3 block">
              How effectively does moral governance de-risk investment capital in BARMM? (1-5)
            </Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((v) => (
                <Button
                  key={v}
                  type="button"
                  variant="outline"
                  size="icon"
                  className={cn(
                    "w-12 h-12 rounded-lg text-sm font-semibold",
                    data.q9_1_moral_governance_derisk === v ? activeScaleClass : inactiveScaleClass
                  )}
                  onClick={() => update("q9_1_moral_governance_derisk", v)}
                >
                  {v}
                </Button>
              ))}
            </div>
            <p className="text-xs text-[#065f46] mt-2">
              1 = Not effective, 5 = Very effective
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ====== 4. REGULATORY ARCHITECTURE ====== */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base text-[#022c22]">
            Regulatory Architecture Securing Capital
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Regulatory%20Architecture.png"
              alt="Regulatory Architecture"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#065f46]">
            At its core is the Bangsamoro Organic Law (RA 11054) — the constitutional mandate 
            for economic self-determination — supported by five pillars: 2nd BDP & SIPP, 
            BHIDP, BSEMP, RA 11439 & CREATE MORE Act, and Pending Forestry Code.
          </p>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] mb-3 block">
              How coherent is BARMM's regulatory architecture for securing investment? (1-5)
            </Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((v) => (
                <Button
                  key={v}
                  type="button"
                  variant="outline"
                  size="icon"
                  className={cn(
                    "w-12 h-12 rounded-lg text-sm font-semibold",
                    data.q9_2_regulatory_coherence === v ? activeScaleClass : inactiveScaleClass
                  )}
                  onClick={() => update("q9_2_regulatory_coherence", v)}
                >
                  {v}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ====== 5. DRAFT JMC 2026-01 ====== */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base text-[#022c22]">
            Draft Joint Memorandum Circular 2026-01
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Draft%20JMC%202026-01.png"
              alt="Draft JMC 2026-01"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#065f46]">
            Transforms conservation into municipal revenue streams through three flowing channels: 
            Carbon Credits, Payment for Ecosystem Services (PES), and Eco-Tourism User Fees — 
            merging into a Revenue River that feeds Local Government Units.
          </p>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] mb-3 block">
              How impactful will JMC 2026-01 be in generating LGU revenue from conservation? (1-5)
            </Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((v) => (
                <Button
                  key={v}
                  type="button"
                  variant="outline"
                  size="icon"
                  className={cn(
                    "w-12 h-12 rounded-lg text-sm font-semibold",
                    data.q9_3_jmc_revenue === v ? activeScaleClass : inactiveScaleClass
                  )}
                  onClick={() => update("q9_3_jmc_revenue", v)}
                >
                  {v}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ====== 6. SYSTEMS ARCHETYPE: FIXES THAT FAIL ====== */}
      <Card className="border-2 border-amber-500/40 bg-amber-50/30 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <CardTitle className="text-base text-[#022c22]">
              Archetype: Fixes That Fail — A Warning
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-amber-100/50 border-l-4 border-amber-600 p-4 rounded-r-lg">
            <p className="text-sm text-amber-900 font-medium mb-2">
              ⚠️ Short-term remedies undermine long-term institutional reform
            </p>
            <p className="text-sm text-amber-800">
              Ad-hoc tax incentives, fragmented subsidies, and short-term security operations 
              create the illusion of progress but postpone systemic reform, trapping the region 
              in recurring crisis management.
            </p>
          </div>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src={BIRD_IMAGES.fixesFail.url}
              alt={BIRD_IMAGES.fixesFail.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22]">
            <strong>Balancing Loop 1 (B1):</strong> Short-term relief temporarily boosts investor attraction.
            <br />
            <strong>Reinforcing Loop 2 (R2):</strong> Institutional weakness persists and compounds over time.
          </p>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] mb-3 block">
              How accurately does "Fixes That Fail" describe BARMM's governance patterns?
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left",
                    data.q_s9_fixes_fail === opt ? activeBtnClass : inactiveBtnClass
                  )}
                  onClick={() => update("q_s9_fixes_fail", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
          {(data.q_s9_fixes_fail === "Very accurately" || data.q_s9_fixes_fail === "Somewhat accurately") && (
            <div className="pt-4 border-t border-[#C9A84C]/20">
              <Label className="text-sm font-medium text-[#022c22] mb-2 block">
                Which short-term fix has been most counterproductive?
              </Label>
              <textarea
                value={data.q_s9_fixes_fail_followup || ""}
                onChange={(e) => update("q_s9_fixes_fail_followup", e.target.value)}
                placeholder="Describe specific examples..."
                rows={3}
                className="w-full rounded-lg border border-[#C9A84C]/30 bg-white px-4 py-3 text-sm text-[#022c22] placeholder:text-[#065f46]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] resize-none"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* ====== 7. SYSTEMS ARCHETYPE: BIG MAN ====== */}
      <Card className="border-2 border-amber-500/40 bg-amber-50/30 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <CardTitle className="text-base text-[#022c22]">
              Archetype: The Big Man — Power Concentration Trap
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-amber-100/50 border-l-4 border-amber-600 p-4 rounded-r-lg">
            <p className="text-sm text-amber-900 font-medium mb-2">
              ⚠️ Concentrated political power creates self-reinforcing instability
            </p>
            <p className="text-sm text-amber-800">
              Three reinforcing loops form a vicious cycle: political dominance fuels conflict, 
              conflict justifies dominance, and both deplete resources needed for progress.
            </p>
          </div>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/The%20Big%20Man%20Archetype.png"
              alt="The Big Man Archetype"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22]">
            <strong>R1: Patronage-Governance Trade-off</strong> — Power concentration fosters patron-client mindset.
            <br />
            <strong>R2: Cycle of Exclusion & Conflict</strong> — Marginalization breeds resentment and rido.
            <br />
            <strong>R3: Resource Depletion</strong> — Unqualified hiring drains budgets, development stagnates.
          </p>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] mb-3 block">
              How accurately does "The Big Man" archetype reflect BARMM's political dynamics?
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left",
                    data.q_s9_big_man === opt ? activeBtnClass : inactiveBtnClass
                  )}
                  onClick={() => update("q_s9_big_man", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
          {(data.q_s9_big_man === "Very accurately" || data.q_s9_big_man === "Somewhat accurately") && (
            <div className="pt-4 border-t border-[#C9A84C]/20">
              <Label className="text-sm font-medium text-[#022c22] mb-2 block">
                Which reinforcing loop is most active in your province?
              </Label>
              <textarea
                value={data.q_s9_big_man_followup || ""}
                onChange={(e) => update("q_s9_big_man_followup", e.target.value)}
                placeholder="Describe which loop (R1, R2, or R3) and provide examples..."
                rows={3}
                className="w-full rounded-lg border border-[#C9A84C]/30 bg-white px-4 py-3 text-sm text-[#022c22] placeholder:text-[#065f46]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] resize-none"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* ====== 8. POLICY RECOMMENDATIONS: SYNCHRONIZED MANDATE ====== */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base text-[#022c22]">
            Policy Recommendations: A Synchronized Mandate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Policy%20Recommendations-Policy%20Makers-Planners-Investors.png"
              alt="Policy Recommendations for Policymakers, Planners, Investors"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#065f46]">
            Aligning government, planning, and private-sector actions creates synergy between 
            policy, planning, and investment to drive inclusive growth through collaborative governance.
          </p>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] mb-3 block">
              How critical is synchronized action among policymakers, planners, and investors? (1-5)
            </Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((v) => (
                <Button
                  key={v}
                  type="button"
                  variant="outline"
                  size="icon"
                  className={cn(
                    "w-12 h-12 rounded-lg text-sm font-semibold",
                    data.q9_4_collaborative_governance === v ? activeScaleClass : inactiveScaleClass
                  )}
                  onClick={() => update("q9_4_collaborative_governance", v)}
                >
                  {v}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ====== 9. POLICY RECOMMENDATIONS: THREE REFORMS ====== */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base text-[#022c22]">
            Policy Recommendations: Activating the Framework
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Policy%20recommendations-Institutional-Fiscal-Regulatory.png"
              alt="Policy Recommendations: Institutional, Fiscal, Regulatory"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#065f46]">
            Three integrated reforms: <strong>Institutional</strong> (BIF-Net coordination), 
            <strong> Fiscal</strong> (SIPP & CREATE MORE harmonization), and 
            <strong> Regulatory</strong> (BEIE institutionalization) to strengthen investment coordination.
          </p>
        </CardContent>
      </Card>

      {/* ====== 10. SWOT SCALE QUESTIONS ====== */}
      {/* Strengths */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-100 text-emerald-700">STRENGTH</Badge>
            <CardTitle className="text-base text-[#022c22]">
              Operating Systems Strengths
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-xs text-[#065f46] italic">
            Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>
          {strengthFactors.map((factor, idx) => (
            <div key={factor.id} className={cn("space-y-3", idx < strengthFactors.length - 1 && "pb-6 border-b border-[#C9A84C]/20")}>
              <p className="text-sm font-medium text-[#022c22]">
                <strong>{factor.label}.</strong> {factor.desc}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-xs text-[#065f46]">Impact (1–5)</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <Button
                        key={v}
                        type="button"
                        variant="outline"
                        size="icon"
                        className={cn(
                          "w-12 h-12 rounded-lg text-sm font-semibold",
                          data[factor.impactField] === v ? activeScaleClass : inactiveScaleClass
                        )}
                        onClick={() => update(factor.impactField, v)}
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-[#065f46]">Likelihood (1–5)</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <Button
                        key={v}
                        type="button"
                        variant="outline"
                        size="icon"
                        className={cn(
                          "w-12 h-12 rounded-lg text-sm font-semibold",
                          data[factor.likelihoodField] === v ? activeScaleClass : inactiveScaleClass
                        )}
                        onClick={() => update(factor.likelihoodField, v)}
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weaknesses */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge className="bg-rose-100 text-rose-700">WEAKNESS</Badge>
            <CardTitle className="text-base text-[#022c22]">
              Operating Systems Weaknesses
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-xs text-[#065f46] italic">
            Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>
          {weaknessFactors.map((factor, idx) => (
            <div key={factor.id} className={cn("space-y-3", idx < weaknessFactors.length - 1 && "pb-6 border-b border-[#C9A84C]/20")}>
              <p className="text-sm font-medium text-[#022c22]">
                <strong>{factor.label}.</strong> {factor.desc}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-xs text-[#065f46]">Impact (1–5)</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <Button
                        key={v}
                        type="button"
                        variant="outline"
                        size="icon"
                        className={cn(
                          "w-12 h-12 rounded-lg text-sm font-semibold",
                          data[factor.impactField] === v ? activeScaleClass : inactiveScaleClass
                        )}
                        onClick={() => update(factor.impactField, v)}
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-[#065f46]">Likelihood (1–5)</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <Button
                        key={v}
                        type="button"
                        variant="outline"
                        size="icon"
                        className={cn(
                          "w-12 h-12 rounded-lg text-sm font-semibold",
                          data[factor.likelihoodField] === v ? activeScaleClass : inactiveScaleClass
                        )}
                        onClick={() => update(factor.likelihoodField, v)}
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Opportunities */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-100 text-emerald-700">OPPORTUNITY</Badge>
            <CardTitle className="text-base text-[#022c22]">
              Operating Systems Opportunities
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-xs text-[#065f46] italic">
            Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>
          {opportunityFactors.map((factor, idx) => (
            <div key={factor.id} className={cn("space-y-3", idx < opportunityFactors.length - 1 && "pb-6 border-b border-[#C9A84C]/20")}>
              <p className="text-sm font-medium text-[#022c22]">
                <strong>{factor.label}.</strong> {factor.desc}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-xs text-[#065f46]">Impact (1–5)</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <Button
                        key={v}
                        type="button"
                        variant="outline"
                        size="icon"
                        className={cn(
                          "w-12 h-12 rounded-lg text-sm font-semibold",
                          data[factor.impactField] === v ? activeScaleClass : inactiveScaleClass
                        )}
                        onClick={() => update(factor.impactField, v)}
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-[#065f46]">Likelihood (1–5)</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <Button
                        key={v}
                        type="button"
                        variant="outline"
                        size="icon"
                        className={cn(
                          "w-12 h-12 rounded-lg text-sm font-semibold",
                          data[factor.likelihoodField] === v ? activeScaleClass : inactiveScaleClass
                        )}
                        onClick={() => update(factor.likelihoodField, v)}
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Threats */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge className="bg-red-100 text-red-700">THREAT</Badge>
            <CardTitle className="text-base text-[#022c22]">
              Operating Systems Threats
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-xs text-[#065f46] italic">
            Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>
          {threatFactors.map((factor, idx) => (
            <div key={factor.id} className={cn("space-y-3", idx < threatFactors.length - 1 && "pb-6 border-b border-[#C9A84C]/20")}>
              <p className="text-sm font-medium text-[#022c22]">
                <strong>{factor.label}.</strong> {factor.desc}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-xs text-[#065f46]">Impact (1–5)</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <Button
                        key={v}
                        type="button"
                        variant="outline"
                        size="icon"
                        className={cn(
                          "w-12 h-12 rounded-lg text-sm font-semibold",
                          data[factor.impactField] === v ? activeScaleClass : inactiveScaleClass
                        )}
                        onClick={() => update(factor.impactField, v)}
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-[#065f46]">Likelihood (1–5)</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <Button
                        key={v}
                        type="button"
                        variant="outline"
                        size="icon"
                        className={cn(
                          "w-12 h-12 rounded-lg text-sm font-semibold",
                          data[factor.likelihoodField] === v ? activeScaleClass : inactiveScaleClass
                        )}
                        onClick={() => update(factor.likelihoodField, v)}
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Section9_OperatingSystems;
