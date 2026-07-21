import React from "react"; 
import { Leaf, AlertTriangle, GitBranch, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
export interface Section4Data {
  // S3 from Section 3 - moved here as first question
  q_s3_strength_1_impact?: number;
  q_s3_strength_1_likelihood?: number;
  
  // SWOT Threats
  q_s4_climate_impact?: number;
  q_s4_climate_likelihood?: number;
  q_s4_pestalotiopsis_impact?: number;
  q_s4_pestalotiopsis_likelihood?: number;
  q_s4_postharvest_impact?: number;
  q_s4_postharvest_likelihood?: number;
  q_s4_poverty_impact?: number;
  q_s4_poverty_likelihood?: number;
  
  // Archetypes
  q_s4_limits_growth: string;
  q_s4_tragedy_commons: string;
  q_s4_tragedy_followup: string;
}

interface Section4Props {
  data: Section4Data;
  onChange: (data: Section4Data) => void;
}

// ------------------------------------------------------------------
// GlassCard sub-component
// ------------------------------------------------------------------
const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div
    className={cn(
      "rounded-xl border border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm p-6",
      className
    )}
  >
    {children}
  </div>
);

// ------------------------------------------------------------------
// Main component
// ------------------------------------------------------------------
const Section4_Foundations: React.FC<Section4Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section4Data>(
    field: K,
    value: Section4Data[K]
  ) => onChange({ ...data, [field]: value });

  const tragedyAgree =
    data.q_s4_tragedy_commons === "Very accurately" ||
    data.q_s4_tragedy_commons === "Somewhat accurately";

  return (
    <div className="space-y-6">
      {/* ============================================================ */}
      {/* HEADER                                                       */}
      {/* ============================================================ */}
      <div className="flex items-center gap-3 mb-4">
        <Leaf className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">
          Section 4: Cluster 1 — Foundations: The Resource Base
        </h2>
      </div>
      <p className="text-sm text-[#065f46] mb-4">
        The Foundations cluster sustains the Bangsamoro economy. Agriculture
        contributes 32.4% of GRDP (₱97.2B). All other clusters depend on its
        health.
      </p>

      {/* ============================================================ */}
      {/* 1. Cluster Image                                             */}
      {/* ============================================================ */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Cluster%201-Foundations.png"
          alt="Cluster 1 Foundations"
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">
            Source: Cluster 1 | Foundations: The Infrastructure-First Resource Base
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. Context Card                                              */}
      {/* ============================================================ */}
      <GlassCard>
        <p className="text-sm text-[#065f46]">
          Highlights four sectors: Agri-Fisheries (32.4% of GRDP, ₱97.2B),
          Energy (75.86% renewable mix), Forestry (untapped carbon potential),
          and Environment (green economy as revenue generator).
        </p>
      </GlassCard>

      {/* ============================================================ */}
      {/* 3. S3: Strong AFF Base (MOVED FROM SECTION 3)                */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">
            STRENGTH
          </span>
        </div>
        <p className="text-xs text-[#065f46] mb-4 italic">
          Rate this foundational strength: Impact (1 = very small effect, 5 = very large effect) × Likelihood (1 = very unlikely, 5 = very likely)
        </p>
        
        <div className="space-y-3 mb-6">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>S3: Strong Agriculture, Fisheries, Forestry Base.</strong> BARMM has strong resources in rubber, coconut, seaweed, fisheries, halal farm products, and rice.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s3_strength_1_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s3_strength_1_impact === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s3_strength_1_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s3_strength_1_likelihood === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* ============================================================ */}
      {/* 4. SWOT Scale Questions — THREATS                            */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">
            THREAT
          </span>
          <h3 className="text-base font-semibold text-[#022c22] ml-2">
            External Threats to Foundations Cluster
          </h3>
        </div>
        <p className="text-xs text-[#065f46] mb-6 italic">
          The following threats could undermine BARMM's resource base. Rate each factor: 
          Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
        </p>

        {/* T1 — Climate Change Vulnerabilities */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>T1: Climate Change Vulnerabilities.</strong> El Niño, floods,
            and changing rainfall patterns already caused a 4.2% drop in
            agriculture in 2024 and threaten food security.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s4_climate_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s4_climate_impact === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s4_climate_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s4_climate_likelihood === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* T10 — Rubber Pestalotiopsis Disease */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>T10: Rubber Pestalotiopsis Disease.</strong> A fungal disease
            attacking rubber plantations in Basilan that could spread to other
            areas, threatening farmer livelihoods.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s4_pestalotiopsis_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s4_pestalotiopsis_impact === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s4_pestalotiopsis_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s4_pestalotiopsis_likelihood === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* W7 — Limited Agro-Processing and Cold Chain */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>W7: Limited Agro-Processing and Cold Chain.</strong> Without
            proper storage, 20–40% of farm produce is lost after harvest, cutting
            farmer income.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s4_postharvest_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s4_postharvest_impact === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s4_postharvest_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s4_postharvest_likelihood === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* W2 — Highest Poverty Incidence */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>W2: Highest Poverty Incidence.</strong> At 34.8%, poverty
            limits domestic market size and consumer purchasing power.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s4_poverty_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s4_poverty_impact === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s4_poverty_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s4_poverty_likelihood === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* ============================================================ */}
      {/* 5. Introduction to Systems Thinking Tools                    */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <GitBranch className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Understanding Systems Dynamics in BARMM
          </h3>
        </div>
        <p className="text-sm text-[#065f46] mb-4">
          Before assessing systemic patterns, let's understand the tools we use to map 
          complex dynamics in BARMM's economic ecosystem.
        </p>
        
        {/* Anatomy of Causal Loop Diagram */}
        <div className="mb-6 pb-6 border-b border-[#C9A84C]/20">
          <h4 className="text-sm font-semibold text-[#022c22] mb-3">
            Anatomy of Causal Loop Diagrams (CLDs)
          </h4>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/3-Anatomy%20of%20CLD.png"
              alt="Anatomy of Causal Loop Diagram"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <div className="space-y-2 text-sm text-[#065f46]">
            <p>A Causal Loop Diagram (CLD) has interconnected elements:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Variables</strong> — factors that change over time, such as Governance Capacity and Investor Confidence</li>
              <li><strong>Links</strong> — arrows showing how one variable directly influences another</li>
              <li><strong>Polarity</strong> — marked as 's' for same-direction effects (e.g., higher governance increases confidence) and 'o' for opposite-direction effects (e.g., more bottlenecks reduce private investment)</li>
              <li><strong>Feedback Loops</strong> — the circular layout illustrates how these relationships form reinforcing or balancing loops that drive system behavior</li>
            </ul>
            <p className="italic mt-2">
              In short, a CLD visually maps cause-and-effect relationships that drive dynamic change within a system.
            </p>
          </div>
        </div>

        {/* Anatomy of Systems Archetypes */}
        <div>
          <h4 className="text-sm font-semibold text-[#022c22] mb-3">
            Anatomy of Systems Archetypes
          </h4>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/6-Anatomy%20of%20Systems%20Traps.png"
              alt="Anatomy of Systems Archetypes"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#065f46]">
            Systems archetypes are recurring patterns of behavior that appear across different 
            contexts. They help us diagnose why certain problems persist despite repeated interventions. 
            In the next questions, you'll assess which archetypes accurately describe the dynamics 
            in BARMM's Foundations cluster.
          </p>
        </div>
      </GlassCard>

      {/* ============================================================ */}
      {/* 6. Systems Archetype: Limits to Growth (SECOND TO LAST)      */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Archetype: Limits to Growth
          </h3>
        </div>
        <p className="text-sm text-[#065f46] mb-4">
          This archetype describes a common pattern: initial success triggers growth, 
          but eventually the system encounters constraints that slow or halt progress. 
          Without addressing these limiting factors, the system plateaus or declines.
        </p>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Limits%20to%20Growth%20Archetype.png"
            alt="Limits to Growth Archetype"
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          In BARMM's context: Agricultural and energy sector growth encounters balancing loops — 
          infrastructure gaps, climate shocks, and funding limits slow progress despite initial gains.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          How accurately does &quot;Limits to Growth&quot; describe the barriers facing
          BARMM&apos;s agricultural and energy expansion?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map(
            (opt) => (
              <button
                key={opt}
                onClick={() => update("q_s4_limits_growth", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q_s4_limits_growth === opt
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {opt}
              </button>
            )
          )}
        </div>
      </GlassCard>

      {/* ============================================================ */}
      {/* 7. Systems Archetype: Tragedy of the Commons (LAST)          */}
      {/* ============================================================ */}
      <GlassCard className="!p-6 border-2 border-amber-500/40 bg-amber-50/30">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-6 h-6 text-amber-600" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Archetype: Tragedy of the Commons — A Warning
          </h3>
        </div>
        
        <div className="bg-amber-100/50 border-l-4 border-amber-600 p-4 mb-4 rounded-r-lg">
          <p className="text-sm text-amber-900 font-medium mb-2">
            ️ This archetype represents a critical warning scenario
          </p>
          <p className="text-sm text-amber-800">
            The &quot;Tragedy of the Commons&quot; occurs when shared resources are over-exploited 
            due to lack of proper governance. It is <strong>not inevitable</strong> — it serves as 
            a warning of what happens when individual actors prioritize short-term gains over 
            collective long-term sustainability.
          </p>
        </div>

        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Tragedy%20of%20the%20Commons%20Archetype.png"
            alt="Tragedy of the Commons Archetype"
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </div>
        
        <p className="text-sm text-[#022c22] mb-4">
          Shared resources get over-exploited when governance is fragmented. Each actor gains 
          individually, but collective impact depletes the resource base — watersheds degrade, 
          fisheries collapse, forests disappear.
        </p>
        
        <p className="text-sm font-medium text-[#022c22] mb-3">
          How accurately does the &quot;Tragedy of the Commons&quot; reflect <strong>potential</strong> resource
          management challenges in BARMM&apos;s agriculture, fisheries, and forestry sectors?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map(
            (opt) => (
              <button
                key={opt}
                onClick={() => update("q_s4_tragedy_commons", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q_s4_tragedy_commons === opt
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {opt}
              </button>
            )
          )}
        </div>

        {/* Follow-up (conditional) */}
        {tragedyAgree && (
          <div className="mt-4 pt-4 border-t border-[#C9A84C]/20">
            <p className="text-sm font-medium text-[#022c22] mb-3">
              If this archetype applies, which shared resource is <strong>most at risk</strong> of over-exploitation?
            </p>
            <div className="grid grid-cols-2 gap-3">
              {["Watersheds", "Fishing grounds", "Forest reserves", "Agricultural land"].map(
                (opt) => (
                  <button
                    key={opt}
                    onClick={() => update("q_s4_tragedy_followup", opt)}
                    className={cn(
                      "p-3 rounded-lg border text-sm text-left transition-all",
                      data.q_s4_tragedy_followup === opt
                        ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {opt}
                  </button>
                )
              )}
            </div>
            <p className="text-xs text-amber-800 mt-3 italic">
              Identifying the most vulnerable resource helps prioritize governance interventions 
              to prevent the tragedy before it occurs.
            </p>
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default Section4_Foundations;