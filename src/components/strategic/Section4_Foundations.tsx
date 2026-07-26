import React from "react";
import { Leaf, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SurveySchemaType } from "@/lib/survey-schema";
import { BIRD_IMAGES } from "@/lib/bird-urls";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export type Section4Data = Pick<
  SurveySchemaType,
  | "q_s4_aff_base_impact"
  | "q_s4_aff_base_likelihood"
  | "q_s4_renewable_energy_impact"
  | "q_s4_renewable_energy_likelihood"
  | "q_s4_lake_lanao_impact"
  | "q_s4_lake_lanao_likelihood"
  | "q_s4_land_tenure_impact"
  | "q_s4_land_tenure_likelihood"
  | "q_s4_renewable_invest_impact"
  | "q_s4_renewable_invest_likelihood"
  | "q_s4_carbon_markets_impact"
  | "q_s4_carbon_markets_likelihood"
  | "q_s4_pes_impact"
  | "q_s4_pes_likelihood"
  | "q_s4_forestry_code_impact"
  | "q_s4_forestry_code_likelihood"
  | "q_s4_pestalotiopsis_impact"
  | "q_s4_pestalotiopsis_likelihood"
  | "q_s4_limits_growth"
  | "q_s4_tragedy_commons"
  | "q_s4_tragedy_followup"
>;

interface Section4Props {
  data: Section4Data;
  onChange: (data: Section4Data) => void;
}

export const Section4_Foundations: React.FC<Section4Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section4Data>(field: K, value: Section4Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  const tragedyAgree = data.q_s4_tragedy_commons === "Very accurately" || data.q_s4_tragedy_commons === "Somewhat accurately";
  
  const activeBtnClass = "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90 dark:bg-[#C9A84C] dark:text-[#022c22] dark:border-[#C9A84C]";
  const inactiveBtnClass = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C] dark:bg-[#022c22]/50 dark:text-[#ecfdf5] dark:border-[#C9A84C]/30";
  const activeScaleClass = "bg-[#C9A84C] text-white border-[#C9A84C] hover:bg-[#C9A84C]/90";
  const inactiveScaleClass = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C] dark:bg-[#022c22]/50 dark:text-[#ecfdf5] dark:border-[#C9A84C]/30";

  const swotFactors = [
    // Strengths
    { id: "aff_base", label: "S1: Strong AFF Base", desc: "BARMM has strong resources in rubber, coconut, seaweed, fisheries, halal farm products, and rice.", impactField: "q_s4_aff_base_impact" as keyof Section4Data, likelihoodField: "q_s4_aff_base_likelihood" as keyof Section4Data },
    { id: "renewable_energy", label: "S2: Renewable Energy Endowments", desc: "BARMM has untapped hydro (Lake Lanao), solar, and biomass energy potential.", impactField: "q_s4_renewable_energy_impact" as keyof Section4Data, likelihoodField: "q_s4_renewable_energy_likelihood" as keyof Section4Data },
    { id: "lake_lanao", label: "S3: Lake Lanao", desc: "Multi-purpose resource for freshwater supply, hydroelectric power, and eco-tourism opportunities.", impactField: "q_s4_lake_lanao_impact" as keyof Section4Data, likelihoodField: "q_s4_lake_lanao_likelihood" as keyof Section4Data },
    // Weaknesses
    { id: "land_tenure", label: "W1: Complex Land Tenure (SGA)", desc: "The Special Geographic Area faces a difficult overlay of Ancestral Domain (CADT), private titles, and public land.", impactField: "q_s4_land_tenure_impact" as keyof Section4Data, likelihoodField: "q_s4_land_tenure_likelihood" as keyof Section4Data },
    // Opportunities
    { id: "renewable_invest", label: "O1: Renewable Energy Investments", desc: "Growing interest in solar farms, hydro rehabilitation, and biomass projects.", impactField: "q_s4_renewable_invest_impact" as keyof Section4Data, likelihoodField: "q_s4_renewable_invest_likelihood" as keyof Section4Data },
    { id: "carbon_markets", label: "O2: Carbon Markets & REDD+", desc: "BARMM's forests and carbon stocks can be monetized through carbon credits.", impactField: "q_s4_carbon_markets_impact" as keyof Section4Data, likelihoodField: "q_s4_carbon_markets_likelihood" as keyof Section4Data },
    { id: "pes", label: "O3: Payment for Ecosystem Services (PES)", desc: "LGUs can earn income by protecting watersheds, coastlines, and mangroves.", impactField: "q_s4_pes_impact" as keyof Section4Data, likelihoodField: "q_s4_pes_likelihood" as keyof Section4Data },
    { id: "forestry_code", label: "O4: Bangsamoro Forestry Code", desc: "Pending legislation could open sustainable timber, NTFPs, and forest nursery investments.", impactField: "q_s4_forestry_code_impact" as keyof Section4Data, likelihoodField: "q_s4_forestry_code_likelihood" as keyof Section4Data },
    // Threats
    { id: "pestalotiopsis", label: "T1: Rubber Pestalotiopsis Disease", desc: "A fungal disease attacking rubber plantations in Basilan that could spread to other areas.", impactField: "q_s4_pestalotiopsis_impact" as keyof Section4Data, likelihoodField: "q_s4_pestalotiopsis_likelihood" as keyof Section4Data },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Leaf className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22] dark:text-[#ecfdf5]">Section 4: Cluster 1 — Foundations</h2>
      </div>
      <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 mb-4">
        The Foundations cluster sustains the Bangsamoro economy. Agriculture contributes 32.4% of GRDP (₱97.2B). All other clusters depend on its health.
      </p>

      {/* 1. Cluster Image */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src={BIRD_IMAGES.cluster1Foundations.url}
          alt={BIRD_IMAGES.cluster1Foundations.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">{BIRD_IMAGES.cluster1Foundations.description}</p>
        </div>
      </div>

      {/* 2. Context Card */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm dark:bg-[#022c22]/80 dark:border-[#C9A84C]/30">
        <CardContent className="pt-6">
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            Highlights four sectors: <strong>Agri-Fisheries</strong> (32.4% of GRDP, ₱97.2B), <strong>Energy</strong> (75.86% renewable mix), <strong>Forestry</strong> (untapped carbon potential), and <strong>Environment</strong> (green economy as revenue generator).
          </p>
        </CardContent>
      </Card>

      {/* 3. SWOT Scale Questions */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm dark:bg-[#022c22]/80 dark:border-[#C9A84C]/30">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-[#C9A84C]/10 text-[#C9A84C]">SWOT ASSESSMENT</span>
            Foundations Cluster Factors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/50 italic -mt-4">
            Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>
          {swotFactors.map((factor, idx) => (
            <div key={factor.id} className={cn("space-y-3", idx < swotFactors.length - 1 && "pb-6 border-b border-[#C9A84C]/20 dark:border-[#C9A84C]/10")}>
              <p className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">
                <strong>{factor.label}.</strong> {factor.desc}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/50">Impact (1–5)</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <Button key={v} type="button" variant="outline" size="icon"
                        className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data[factor.impactField] === v ? activeScaleClass : inactiveScaleClass)}
                        onClick={() => update(factor.impactField, v)}>
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/50">Likelihood (1–5)</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <Button key={v} type="button" variant="outline" size="icon"
                        className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data[factor.likelihoodField] === v ? activeScaleClass : inactiveScaleClass)}
                        onClick={() => update(factor.likelihoodField, v)}>
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

      {/* 4. Systems Archetype: Tragedy of the Commons */}
      <Card className="border-2 border-amber-500/40 bg-amber-50/30 backdrop-blur-sm dark:bg-amber-900/10 dark:border-amber-500/30">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            <h3 className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">Archetype: Tragedy of the Commons — A Warning</h3>
          </div>
          <div className="bg-amber-100/50 border-l-4 border-amber-600 p-4 rounded-r-lg dark:bg-amber-900/20 dark:border-amber-400">
            <p className="text-sm text-amber-900 dark:text-amber-200 font-medium mb-2">⚠️ This archetype represents a critical warning scenario</p>
            <p className="text-sm text-amber-800 dark:text-amber-300/80 leading-relaxed">
              The "Tragedy of the Commons" occurs when shared resources are over-exploited due to lack of proper governance. It is <strong>not inevitable</strong> — it serves as a warning of what happens when actors prioritize short-term gains over collective long-term sustainability.
            </p>
          </div>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
            <img src={BIRD_IMAGES.tragedyCommons.url} alt={BIRD_IMAGES.tragedyCommons.alt} className="w-full h-auto object-contain" loading="lazy" />
          </div>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
            How accurately does the "Tragedy of the Commons" reflect potential resource management challenges in BARMM?
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map((opt) => (
              <Button key={opt} type="button" variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q_s4_tragedy_commons === opt ? activeBtnClass : inactiveBtnClass)}
                onClick={() => update("q_s4_tragedy_commons", opt)}>
                {opt}
              </Button>
            ))}
          </div>
          {tragedyAgree && (
            <div className="mt-4 pt-4 border-t border-[#C9A84C]/20 dark:border-[#C9A84C]/10 space-y-3">
              <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
                If this archetype applies, which shared resource is most at risk?
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {["Watersheds", "Fishing grounds", "Forest reserves", "Agricultural land"].map((opt) => (
                  <Button key={opt} type="button" variant="outline"
                    className={cn("justify-start h-auto py-3 text-sm text-left", data.q_s4_tragedy_followup === opt ? activeBtnClass : inactiveBtnClass)}
                    onClick={() => update("q_s4_tragedy_followup", opt)}>
                    {opt}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Section4_Foundations;
