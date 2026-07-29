// src/components/strategic/Section7_Connectors.tsx
// BIRD 2026–2035 · Section 7: Cluster 4 — Connectors
// Updated: 2026-07-30 · Fixed imports, primitive APIs, and cut-off ending

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Globe } from "lucide-react";
import { BIRD_IMAGES } from "@/lib/bird-urls";
import { ARCHETYPES_BY_SECTION, ACCURACY_OPTIONS } from "@/lib/swot-content";

// ─── REUSABLE PRIMITIVES ─────────────────────────────────────────────────────
import { ImageWithFallback } from "@/lib/primitives/ImageWithFallback";
import { ArchetypeCard } from "@/lib/primitives/ArchetypeCard";
import { SWOTScalePair } from "@/lib/primitives/SWOTScalePair";
import { LikertScale } from "@/lib/primitives/LikertScale";
import { SectionProgress } from "@/lib/primitives/SectionProgress";

// ── Types (exact runtime contract with SurveyWizard.tsx s7 state) ────────────
export interface Section7Data {
  q7_1_connectivity_priority: string;
  q7_2_integration_challenge: string;
  q7_3_priority_node: string;
  q7_4_trapped_value_province: string;
  q7_5_bridge_impact: string;
  q7_6_gateway_province: string;
  q7_7_priority_vector: string;
  q7_8_uae_feasibility?: number;
  q7_9_bimpeaga_leverage?: number;
  q_s7_bimpeaga_loc_impact?: number;
  q_s7_bimpeaga_loc_likelihood?: number;
  q_s7_domestic_halal_impact?: number;
  q_s7_domestic_halal_likelihood?: number;
  q_s7_polloc_impact?: number;
  q_s7_polloc_likelihood?: number;
  q_s7_islamic_finance_impact?: number;
  q_s7_islamic_finance_likelihood?: number;
  q_s7_infra_deficits_impact?: number;
  q_s7_infra_deficits_likelihood?: number;
  q_s7_fragmented_policy_impact?: number;
  q_s7_fragmented_policy_likelihood?: number;
  q_s7_market_linkages_impact?: number;
  q_s7_market_linkages_likelihood?: number;
  q_s7_tech_adoption_impact?: number;
  q_s7_tech_adoption_likelihood?: number;
  q_s7_asean_halal_impact?: number;
  q_s7_asean_halal_likelihood?: number;
  q_s7_bimpeaga_integration_impact?: number;
  q_s7_bimpeaga_integration_likelihood?: number;
  q_s7_uae_corridor_impact?: number;
  q_s7_uae_corridor_likelihood?: number;
  q_s7_tourism_potential_impact?: number;
  q_s7_tourism_potential_likelihood?: number;
  q_s7_halal_competition_impact?: number;
  q_s7_halal_competition_likelihood?: number;
  q_s7_security_incidents_impact?: number;
  q_s7_security_incidents_likelihood?: number;
  q_s7_price_volatility_impact?: number;
  q_s7_price_volatility_likelihood?: number;
  q_s7_natl_coord_impact?: number;
  q_s7_natl_coord_likelihood?: number;
  q_s7_escalation: string;
  q_s7_escalation_followup: string;
  q_s7_limits_growth: string;
  q_s7_limits_followup: string;
}

interface Section7Props {
  data: Section7Data;
  onChange: (data: Section7Data) => void;
}

// ── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Design tokens for custom selection buttons
const activeBtn =
  "bg-[#C9A84C]/15 border-[#C9A84C] text-[#E5C560]";
const inactiveBtn =
  "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/70 hover:border-[#C9A84C]/30";

const Section7_Connectors: React.FC<Section7Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section7Data>(field: K, value: Section7Data[K]) =>
    onChange({ ...data, [field]: value });

  const archetypes = ARCHETYPES_BY_SECTION[7] ?? [];
  const escalationArchetype = archetypes.find((a) => a.name.toLowerCase().includes("escalation"));
  const limitsArchetype = archetypes.find((a) => a.name.toLowerCase().includes("limits"));

  const escalationAgree =
    data.q_s7_escalation === "Very accurately" ||
    data.q_s7_escalation === "Somewhat accurately";
  const limitsAgree =
    data.q_s7_limits_growth === "Very accurately" ||
    data.q_s7_limits_growth === "Somewhat accurately";

  return (
    <motion.div
      className="space-y-8 max-w-4xl mx-auto px-4 py-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Section Progress ────────────────────────────────────── */}
      <SectionProgress
        currentSection={7}
        totalSections={16}
        sectionLabel="Cluster 4: Connectors"
      />

      {/* ── Header ──────────────────────────────────────────────── */}
      <motion.div variants={cardVariants} className="space-y-2">
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-[#C9A84C]" />
          <h2 className="text-xl font-bold text-[#ecfdf5]">
            Section 7: Cluster 4 — Connectors
          </h2>
        </div>
        <p className="text-sm text-[#ecfdf5]/70">
          The Connectors cluster maps how Bangsamoro connects its halal and cultural assets to international markets through BIMP-EAGA and UAE/GCC trade corridors.
        </p>
      </motion.div>

      {/* ── Banner Image ─────────────────────────────────────────── */}
      <motion.div variants={cardVariants}>
        <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-2xl">
          <ImageWithFallback
            src={BIRD_IMAGES.cluster4Connectors?.url || ""}
            alt={BIRD_IMAGES.cluster4Connectors?.alt || "Cluster 4 Connectors Banner"}
            className="w-full h-56 sm:h-72"
            imgClassName="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#011a12] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-xs text-[#ecfdf5]/70 italic">
              {BIRD_IMAGES.cluster4Connectors?.title || "Cluster 4: Connectors"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Archetype 1: Escalation ───────────────────────────── */}
      {escalationArchetype && (
        <motion.div variants={cardVariants}>
          <Card className="bg-[#011a12]/80 border-orange-500/20">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
                <Globe className="w-5 h-5 text-orange-400" />
                Systems Archetype: {escalationArchetype.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ArchetypeCard archetype={escalationArchetype} />
              <div className="pt-4 border-t border-[#C9A84C]/10 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
                    How accurately does the &quot;Escalation&quot; archetype reflect competitive dynamics among clans, provinces, or agencies competing for trade corridors and connectivity investments in BARMM?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ACCURACY_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => update("q_s7_escalation", opt)}
                        className={cn(
                          "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                          data.q_s7_escalation === opt ? activeBtn : inactiveBtn
                        )}
                      >
                        <div className={cn(
                          "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                          data.q_s7_escalation === opt ? "bg-[#C9A84C] border-[#C9A84C]" : "border-[#C9A84C]/40"
                        )} />
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                {escalationAgree && (
                  <div>
                    <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
                      In which domain do you see this escalation dynamic most clearly?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        "Clan rivalries (rido)",
                        "Inter-provincial competition",
                        "Inter-agency rivalry",
                        "External market competition",
                        "Other (please specify)",
                      ].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => update("q_s7_escalation_followup", opt)}
                          className={cn(
                            "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                            data.q_s7_escalation_followup === opt ? activeBtn : inactiveBtn
                          )}
                        >
                          <div className={cn(
                            "w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0",
                            data.q_s7_escalation_followup === opt ? "bg-[#C9A84C] border-[#C9A84C]" : "border-[#C9A84C]/40"
                          )}>
                            {data.q_s7_escalation_followup === opt && (
                              <svg className="w-2.5 h-2.5 text-[#011a12]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          {opt}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Other (please specify)..."
                      value={
                        data.q_s7_escalation_followup &&
                        !["Clan rivalries (rido)", "Inter-provincial competition", "Inter-agency rivalry", "External market competition"].includes(data.q_s7_escalation_followup)
                          ? data.q_s7_escalation_followup
                          : ""
                      }
                      onChange={(e) => update("q_s7_escalation_followup", e.target.value)}
                      className={cn(
                        "mt-3 w-full px-3 py-2 rounded-lg border text-sm placeholder:text-[#ecfdf5]/30",
                        "bg-[#022c22]/60 border-[#C9A84C]/20 text-[#ecfdf5]",
                        "focus:outline-none focus:border-[#C9A84C]"
                      )}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* ── Archetype 2: Limits to Growth ───────────────────────── */}
      {limitsArchetype && (
        <motion.div variants={cardVariants}>
          <Card className="bg-[#011a12]/80 border-violet-500/20">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
                <Globe className="w-5 h-5 text-violet-400" />
                Systems Archetype: {limitsArchetype.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ArchetypeCard archetype={limitsArchetype} />
              <div className="pt-4 border-t border-[#C9A84C]/10 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
                    How accurately does &quot;{limitsArchetype.name}&quot; reflect the structural constraints limiting BARMM&apos;s connectivity and trade corridor development?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ACCURACY_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => update("q_s7_limits_growth", opt)}
                        className={cn(
                          "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                          data.q_s7_limits_growth === opt ? activeBtn : inactiveBtn
                        )}
                      >
                        <div className={cn(
                          "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                          data.q_s7_limits_growth === opt ? "bg-[#C9A84C] border-[#C9A84C]" : "border-[#C9A84C]/40"
                        )} />
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                {limitsAgree && (
                  <div>
                    <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
                      Which capacity constraint most limits connectivity growth in your sector?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        "Infrastructure bottlenecks",
                        "Regulatory fragmentation",
                        "Skills shortage",
                        "Funding gaps",
                        "Other (please specify)",
                      ].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => update("q_s7_limits_followup", opt)}
                          className={cn(
                            "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                            data.q_s7_limits_followup === opt ? activeBtn : inactiveBtn
                          )}
                        >
                          <div className={cn(
                            "w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0",
                            data.q_s7_limits_followup === opt ? "bg-[#C9A84C] border-[#C9A84C]" : "border-[#C9A84C]/40"
                          )}>
                            {data.q_s7_limits_followup === opt && (
                              <svg className="w-2.5 h-2.5 text-[#011a12]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          {opt}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Other (please specify)..."
                      value={
                        data.q_s7_limits_followup &&
                        !["Infrastructure bottlenecks", "Regulatory fragmentation", "Skills shortage", "Funding gaps"].includes(data.q_s7_limits_followup)
                          ? data.q_s7_limits_followup
                          : ""
                      }
                      onChange={(e) => update("q_s7_limits_followup", e.target.value)}
                      className={cn(
                        "mt-3 w-full px-3 py-2 rounded-lg border text-sm placeholder:text-[#ecfdf5]/30",
                        "bg-[#022c22]/60 border-[#C9A84C]/20 text-[#ecfdf5]",
                        "focus:outline-none focus:border-[#C9A84C]"
                      )}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* ── SWOT Scale Table ──────────────────────────────────── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#C9A84C]" />
              Risk & Resilience Assessment — Connectors Cluster
            </CardTitle>
            <p className="text-xs text-[#ecfdf5]/50 pt-1">
              Rate each factor&apos;s <strong className="text-[#ecfdf5]">Impact</strong> (severity if realized)
              and <strong className="text-[#ecfdf5]">Likelihood</strong> (probability of occurrence) on a 1–5 scale.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Strengths */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Strengths — Internal Resilience Drivers
                </h3>
              </div>
              <div className="space-y-4">
                <SWOTScalePair
                  category="S"
                  factorLabel="S1 — Strategic BIMP-EAGA Location"
                  factorDescription="BARMM is close to Sabah and ASEAN trade routes, making it a natural gateway for regional trade."
                  impact={data.q_s7_bimpeaga_loc_impact}
                  likelihood={data.q_s7_bimpeaga_loc_likelihood}
                  onImpactChange={(v) => update("q_s7_bimpeaga_loc_impact", v)}
                  onLikelihoodChange={(v) => update("q_s7_bimpeaga_loc_likelihood", v)}
                />
                <SWOTScalePair
                  category="S"
                  factorLabel="S4 — Large Domestic Halal Market"
                  factorDescription="5.69 million Muslim consumers create strong built-in local demand for halal products and services."
                  impact={data.q_s7_domestic_halal_impact}
                  likelihood={data.q_s7_domestic_halal_likelihood}
                  onImpactChange={(v) => update("q_s7_domestic_halal_impact", v)}
                  onLikelihoodChange={(v) => update("q_s7_domestic_halal_likelihood", v)}
                />
                <SWOTScalePair
                  category="S"
                  factorLabel="S6 — Polloc Freeport & Economic Zone"
                  factorDescription="Strategic logistics and trade hub serving as a gateway for goods entering and leaving BARMM."
                  impact={data.q_s7_polloc_impact}
                  likelihood={data.q_s7_polloc_likelihood}
                  onImpactChange={(v) => update("q_s7_polloc_impact", v)}
                  onLikelihoodChange={(v) => update("q_s7_polloc_likelihood", v)}
                />
              </div>
            </div>

            {/* Weaknesses */}
            <div className="pt-6 border-t border-[#C9A84C]/10">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-rose-400" />
                <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                  Weaknesses — Internal Risk Exposure
                </h3>
              </div>
              <div className="space-y-4">
                <SWOTScalePair
                  category="W"
                  factorLabel="W1 — Critical Infrastructure Deficits"
                  factorDescription="Gaps in energy, roads, digital connectivity, and water supply — especially in island provinces."
                  impact={data.q_s7_infra_deficits_impact}
                  likelihood={data.q_s7_infra_deficits_likelihood}
                  onImpactChange={(v) => update("q_s7_infra_deficits_impact", v)}
                  onLikelihoodChange={(v) => update("q_s7_infra_deficits_likelihood", v)}
                />
                <SWOTScalePair
                  category="W"
                  factorLabel="W6 — Fragmented Policy Frameworks"
                  factorDescription="Different ministries lack coordination, causing delays and underspending in connectivity projects."
                  impact={data.q_s7_fragmented_policy_impact}
                  likelihood={data.q_s7_fragmented_policy_likelihood}
                  onImpactChange={(v) => update("q_s7_fragmented_policy_impact", v)}
                  onLikelihoodChange={(v) => update("q_s7_fragmented_policy_likelihood", v)}
                />
                <SWOTScalePair
                  category="W"
                  factorLabel="W9 — Weak Market Linkages"
                  factorDescription="Farmers and producers struggle to find buyers and get fair price information for exports."
                  impact={data.q_s7_market_linkages_impact}
                  likelihood={data.q_s7_market_linkages_likelihood}
                  onImpactChange={(v) => update("q_s7_market_linkages_impact", v)}
                  onLikelihoodChange={(v) => update("q_s7_market_linkages_likelihood", v)}
                />
                <SWOTScalePair
                  category="W"
                  factorLabel="W10 — Low Technology Adoption"
                  factorDescription="Slow uptake of modern tools for farming, processing, and online selling across the trade corridor."
                  impact={data.q_s7_tech_adoption_impact}
                  likelihood={data.q_s7_tech_adoption_likelihood}
                  onImpactChange={(v) => update("q_s7_tech_adoption_impact", v)}
                  onLikelihoodChange={(v) => update("q_s7_tech_adoption_likelihood", v)}
                />
              </div>
            </div>

            {/* Opportunities */}
            <div className="pt-6 border-t border-[#C9A84C]/10">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-sky-400" />
                <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  Opportunities — External Resilience Drivers
                </h3>
              </div>
              <div className="space-y-4">
                <SWOTScalePair
                  category="O"
                  factorLabel="O2 — ASEAN Halal Economy"
                  factorDescription="USD 1.38 trillion addressable market; BARMM can target a share through BIMP-EAGA corridor and halal parks."
                  impact={data.q_s7_asean_halal_impact}
                  likelihood={data.q_s7_asean_halal_likelihood}
                  onImpactChange={(v) => update("q_s7_asean_halal_impact", v)}
                  onLikelihoodChange={(v) => update("q_s7_asean_halal_likelihood", v)}
                />
                <SWOTScalePair
                  category="O"
                  factorLabel="O3 — BIMP-EAGA Regional Integration"
                  factorDescription="Cross-border trade agreements and eco-corridors with Sabah can open new markets for Bangsamoro producers."
                  impact={data.q_s7_bimpeaga_integration_impact}
                  likelihood={data.q_s7_bimpeaga_integration_likelihood}
                  onImpactChange={(v) => update("q_s7_bimpeaga_integration_impact", v)}
                  onLikelihoodChange={(v) => update("q_s7_bimpeaga_integration_likelihood", v)}
                />
                <SWOTScalePair
                  category="O"
                  factorLabel="O4 — UAE/GCC Halal Export Corridor"
                  factorDescription="Partnerships like MAFAR-Prime Group connect BARMM producers directly to Middle East buyers."
                  impact={data.q_s7_uae_corridor_impact}
                  likelihood={data.q_s7_uae_corridor_likelihood}
                  onImpactChange={(v) => update("q_s7_uae_corridor_impact", v)}
                  onLikelihoodChange={(v) => update("q_s7_uae_corridor_likelihood", v)}
                />
                <SWOTScalePair
                  category="O"
                  factorLabel="O5 — Mindanao Central Logistics Land-Bridge"
                  factorDescription="SGA serves as the primary land bridge connecting Polloc Freeport to General Santos and Davao export gateways."
                  impact={data.q_s7_tourism_potential_impact}
                  likelihood={data.q_s7_tourism_potential_likelihood}
                  onImpactChange={(v) => update("q_s7_tourism_potential_impact", v)}
                  onLikelihoodChange={(v) => update("q_s7_tourism_potential_likelihood", v)}
                />
              </div>
            </div>

            {/* Threats */}
            <div className="pt-6 border-t border-[#C9A84C]/10">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Threats — External Vulnerability Factors
                </h3>
              </div>
              <div className="space-y-4">
                <SWOTScalePair
                  category="T"
                  factorLabel="T1 — Competition from Halal Hubs"
                  factorDescription="Malaysia, Indonesia, and Thailand already dominate the halal market with established certification and logistics."
                  impact={data.q_s7_halal_competition_impact}
                  likelihood={data.q_s7_halal_competition_likelihood}
                  onImpactChange={(v) => update("q_s7_halal_competition_impact", v)}
                  onLikelihoodChange={(v) => update("q_s7_halal_competition_likelihood", v)}
                />
                <SWOTScalePair
                  category="T"
                  factorLabel="T3 — Residual Security Incidents"
                  factorDescription="Clan conflicts and armed groups create fear among investors and tourists along trade corridors."
                  impact={data.q_s7_security_incidents_impact}
                  likelihood={data.q_s7_security_incidents_likelihood}
                  onImpactChange={(v) => update("q_s7_security_incidents_impact", v)}
                  onLikelihoodChange={(v) => update("q_s7_security_incidents_likelihood", v)}
                />
                <SWOTScalePair
                  category="T"
                  factorLabel="T4 — Global Market Price Volatility"
                  factorDescription="World prices for rubber, coconut, and seaweed fluctuate often, affecting producer incomes."
                  impact={data.q_s7_price_volatility_impact}
                  likelihood={data.q_s7_price_volatility_likelihood}
                  onImpactChange={(v) => update("q_s7_price_volatility_impact", v)}
                  onLikelihoodChange={(v) => update("q_s7_price_volatility_likelihood", v)}
                />
                <SWOTScalePair
                  category="T"
                  factorLabel="T5 — Limited National Government Coordination"
                  factorDescription="Gaps in funding and alignment with national programs leave BARMM connectivity projects behind schedule."
                  impact={data.q_s7_natl_coord_impact}
                  likelihood={data.q_s7_natl_coord_likelihood}
                  onImpactChange={(v) => update("q_s7_natl_coord_impact", v)}
                  onLikelihoodChange={(v) => update("q_s7_natl_coord_likelihood", v)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Q1: Connectivity Capital Matrix ─────────────────────── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560]">
              The Connectivity Capital Matrix
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-xl">
              <ImageWithFallback
                src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/The%20Connectivity%20Capital%20.png"
                alt="The Connectivity Capital Matrix"
                className="w-full h-48 sm:h-64"
                imgClassName="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011a12] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs text-[#ecfdf5]/70 italic">
                  Three pillars define Bangsamoro&apos;s infrastructure and digital investment priorities: Physical Pipelines, Digital Backbones, Market-Access Assets.
                </p>
              </div>
            </div>
            <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
              Which connectivity pillar should receive the highest priority investment?
            </label>
            <div className="grid grid-cols-1 gap-2">
              {["Physical pipelines (roads, ports)", "Digital backbones (broadband, e-gov)", "Market-access assets (cold-chain, logistics)"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => update("q7_1_connectivity_priority", opt)}
                  className={cn(
                    "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                    data.q7_1_connectivity_priority === opt ? activeBtn : inactiveBtn
                  )}
                >
                  <div className={cn(
                    "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                    data.q7_1_connectivity_priority === opt ? "bg-[#C9A84C] border-[#C9A84C]" : "border-[#C9A84C]/40"
                  )} />
                  {opt}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Q2: Critical Test ─────────────────────────────────── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560]">
              The Critical Test: Integrating Zones & Scaling Capital
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-xl">
              <ImageWithFallback
                src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-strategic-options-roadmap/Critical%20Test%20-%20Integrating%20Zones%20and%20Scaling%20Capiral%20-%20Think%20of%20one%20challenge%20%20we%20must%20overcome%20to%20achieve%20this%20vision.png"
                alt="The Critical Test"
                className="w-full h-48 sm:h-64"
                imgClassName="object-cover object-center"
              />
            </div>
            <p className="text-xs text-[#ecfdf5]/60 italic">
              The Connectivity Map and Ethical Bloodstream Pyramid show that true integration requires both physical and financial connectivity.
            </p>
            <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
              What is the single biggest challenge to integrating BARMM&apos;s economic zones with global trade corridors?
            </label>
            <Textarea
              rows={3}
              value={data.q7_2_integration_challenge || ""}
              onChange={(e) => update("q7_2_integration_challenge", e.target.value)}
              placeholder="Describe the biggest integration challenge..."
              className={cn(
                "w-full rounded-lg border text-sm placeholder:text-[#ecfdf5]/30",
                "bg-[#022c22]/60 border-[#C9A84C]/20 text-[#ecfdf5]",
                "focus:outline-none focus:border-[#C9A84C] resize-y"
              )}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Q3: Provincial Specialized Nodes ──────────────────── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560]">
              Layer 1: Provincial Specialized Nodes — &quot;One Bangsamoro&quot;
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-xl">
              <ImageWithFallback
                src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Layer%201%20-%20Provincial%20-%20Geopolitical%20Specialized%20Nodes.png"
                alt="Layer 1 - Provincial Specialized Nodes"
                className="w-full h-48 sm:h-64"
                imgClassName="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011a12] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs text-[#ecfdf5]/70 italic">
                  Six provincial hubs: Mainland (Maguindanao del Norte & Cotabato, Maguindanao del Sur, Lanao del Sur, SGA) and Archipelagic (Basilan, Tawi-Tawi).
                </p>
              </div>
            </div>
            <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
              Which provincial node should be the highest priority for connectivity investment?
            </label>
            <div className="grid grid-cols-1 gap-2">
              {["Maguindanao del Norte (Polloc/Halal Hub)", "Maguindanao del Sur (Agro-Industrial)", "Lanao del Sur (Energy/Agro)", "Basilan (Logistics Gateway)", "Tawi-Tawi (Maritime Gateway)", "SGA (Mindanao Bridge)"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => update("q7_3_priority_node", opt)}
                  className={cn(
                    "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                    data.q7_3_priority_node === opt ? activeBtn : inactiveBtn
                  )}
                >
                  <div className={cn(
                    "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                    data.q7_3_priority_node === opt ? "bg-[#C9A84C] border-[#C9A84C]" : "border-[#C9A84C]/40"
                  )} />
                  {opt}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Q4: The Trapped Value ─────────────────────────────── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560]">
              The Trapped Value: Geographic Reality
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-xl">
              <ImageWithFallback
                src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/The%20Trapped%20Value.png"
                alt="The Trapped Value"
                className="w-full h-48 sm:h-64"
                imgClassName="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011a12] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs text-[#ecfdf5]/70 italic">
                  Shows how limited connectivity traps economic potential — Basilan&apos;s rubber and Tawi-Tawi&apos;s seaweed output isolated from global trade.
                </p>
              </div>
            </div>
            <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
              Which trapped-value province would benefit most from immediate connectivity investment?
            </label>
            <div className="grid grid-cols-1 gap-2">
              {["Basilan (rubber, aquaculture)", "Tawi-Tawi (seaweed, BIMP-EAGA)", "Sulu (fisheries, tourism)", "Lanao del Sur (energy, agriculture)"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => update("q7_4_trapped_value_province", opt)}
                  className={cn(
                    "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                    data.q7_4_trapped_value_province === opt ? activeBtn : inactiveBtn
                  )}
                >
                  <div className={cn(
                    "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                    data.q7_4_trapped_value_province === opt ? "bg-[#C9A84C] border-[#C9A84C]" : "border-[#C9A84C]/40"
                  )} />
                  {opt}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Q5: Shattering Geographic Isolation ─────────────── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560]">
              Shattering Geographic Isolation: The Archipelagic Bridge
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-xl">
              <ImageWithFallback
                src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Shattering%20Geographical%20Isolation.png"
                alt="Shattering Geographic Isolation"
                className="w-full h-48 sm:h-64"
                imgClassName="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011a12] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs text-[#ecfdf5]/70 italic">
                  Three key initiatives: Zamboanga–Basilan Interconnection, Basilan–Zamboanga Bridge, Bongao Bridge Tawi-Tawi.
                </p>
              </div>
            </div>
            <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
              Which bridge/interconnection project will have the most transformative impact?
            </label>
            <div className="grid grid-cols-1 gap-2">
              {["Zamboanga-Basilan Interconnection (energy)", "Basilan-Zamboanga Bridge (transport)", "Bongao Bridge Tawi-Tawi (intra-provincial)"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => update("q7_5_bridge_impact", opt)}
                  className={cn(
                    "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                    data.q7_5_bridge_impact === opt ? activeBtn : inactiveBtn
                  )}
                >
                  <div className={cn(
                    "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                    data.q7_5_bridge_impact === opt ? "bg-[#C9A84C] border-[#C9A84C]" : "border-[#C9A84C]/40"
                  )} />
                  {opt}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Q6: Basilan and Tawi-Tawi ─────────────────────────── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560]">
              Basilan and Tawi-Tawi: Provincial Endowments & Strategic Leverages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-xl">
              <ImageWithFallback
                src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Basilan%20and%20tawi-Tawi.png"
                alt="Basilan and Tawi-Tawi"
                className="w-full h-48 sm:h-64"
                imgClassName="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011a12] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs text-[#ecfdf5]/70 italic">
                  Basilan: Archipelagic Catalyst. Tawi-Tawi: Maritime & Eco-Tourism Hub.
                </p>
              </div>
            </div>
            <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
              Which province has greater potential to become Bangsamoro&apos;s primary maritime trade gateway?
            </label>
            <div className="grid grid-cols-1 gap-2">
              {["Basilan (rubber, ZBIP, closer to Mindanao)", "Tawi-Tawi (seaweed, BIMP-EAGA, direct Sabah route)", "Both equally — they serve different corridors"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => update("q7_6_gateway_province", opt)}
                  className={cn(
                    "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                    data.q7_6_gateway_province === opt ? activeBtn : inactiveBtn
                  )}
                >
                  <div className={cn(
                    "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                    data.q7_6_gateway_province === opt ? "bg-[#C9A84C] border-[#C9A84C]" : "border-[#C9A84C]/40"
                  )} />
                  {opt}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Q7: Global Integration Vectors ──────────────────────── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560]">
              Layer 3: Global Integration Vectors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-xl">
              <ImageWithFallback
                src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Global%20Integration%20Vectors.png"
                alt="Global Integration Vectors"
                className="w-full h-48 sm:h-64"
                imgClassName="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011a12] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs text-[#ecfdf5]/70 italic">
                  Vector 1: BIMP-EAGA Corridor. Vector 2: UAE & GCC Corridor.
                </p>
              </div>
            </div>
            <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
              Which global integration vector should Bangsamoro prioritize?
            </label>
            <div className="grid grid-cols-1 gap-2">
              {["BIMP-EAGA (regional, proximity-based, lower barriers)", "UAE/GCC (global, higher value, standards-based)", "Both simultaneously — they complement each other"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => update("q7_7_priority_vector", opt)}
                  className={cn(
                    "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                    data.q7_7_priority_vector === opt ? activeBtn : inactiveBtn
                  )}
                >
                  <div className={cn(
                    "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                    data.q7_7_priority_vector === opt ? "bg-[#C9A84C] border-[#C9A84C]" : "border-[#C9A84C]/40"
                  )} />
                  {opt}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Section7_Connectors;
