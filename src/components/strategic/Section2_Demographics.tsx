// src/components/strategic/Section2_Demographics.tsx
// BIRD 2026–2035 · Section 2: Respondent Profile
//
// SYSTEMS ARCHITECTURE ALIGNMENT:
// • Field naming: unpadded q2_ prefix (matches swot-content.ts convention)
// • Primitives: LikertScale (network accuracy), SectionProgress (sub-header)
// • Animations: Framer Motion staggered entrance
// • Accessibility: All scales are true radio groups with keyboard nav
// • Theme: Dark-first consistent with Section 0

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Primitives ───────────────────────────────────────────────────────────────
import { SectionProgress } from "@/lib/primitives/SectionProgress";
import { LikertScale } from "@/lib/primitives/LikertScale";

// ── shadcn/ui ────────────────────────────────────────────────────────────────
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ── Icons ────────────────────────────────────────────────────────────────────
import {
  User,
  MapPin,
  Building2,
  Mail,
  Briefcase,
  GraduationCap,
  CheckSquare,
  ShieldCheck,
  Info,
  Loader2,
  AlertTriangle,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES — CONTRACT WITH SURVEYWIZARD.TSX
// ═══════════════════════════════════════════════════════════════════════════════
// RESOLVED: Standardized to unpadded q2_ prefix per architecture agreement.
export interface Section2Data {
  q2_name: string;
  q2_email: string;
  q2_organization: string;
  q2_position: string;
  q2_province: string;
  q2_category: string;
  q2_expertise: string[];
  q2_network_accuracy?: number;
}

interface Section2Props {
  data: Section2Data;
  onChange: (data: Section2Data) => void;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════
const PROVINCES = [
  "Lanao del Sur",
  "Maguindanao del Norte",
  "Maguindanao del Sur",
  "Basilan",
  "Sulu",
  "Tawi-Tawi",
  "Special Geographic Area (SGA)",
  "Cotabato City",
  "Regional / BARMM-wide",
  "Outside BARMM - National Capital Region (Manila)",
  "Outside BARMM - Other Philippines Region",
  "International / Development Partner",
  "Other (please specify)",
] as const;

const CATEGORIES = [
  "Bangsamoro Government Official",
  "Local Government Unit (LGU) Official",
  "Private Sector / Investor / Business Owner",
  "Civil Society Organization (CSO) Representative",
  "Academic / Researcher / Educational Institution",
  "Development Partner / Donor Agency",
  "International Organization",
  "Community Leader / Traditional Authority",
  "Youth / Student Representative",
  "Other (please specify)",
] as const;

const EXPERTISE_AREAS = [
  "Agriculture, Fisheries & Forestry (Foundations)",
  "Halal Economy & Manufacturing (Transformers)",
  "Infrastructure, ICT & Logistics (Enablers)",
  "Tourism, Trade & BIMP-EAGA Integration (Connectors)",
  "Islamic Finance & Capital Access (Financiers)",
  "Governance, Peace & Public Administration",
  "Environment, Climate & Green Economy",
  "Education, Health & Human Capital",
] as const;

const NETWORK_ACCURACY_LABELS: Record<number, string> = {
  1: "Strongly disagree — misrepresents relationships",
  2: "Disagree — several connections are wrong",
  3: "Neutral — some connections are unclear",
  4: "Agree — mostly accurate, minor fixes needed",
  5: "Strongly agree — reflects actual relationships",
};

// ── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const Section2_Demographics: React.FC<Section2Props> = ({ data, onChange }) => {
  const [showCustomProvince, setShowCustomProvince] = useState(false);
  const [embedLoaded, setEmbedLoaded] = useState(false);
  const [embedError, setEmbedError] = useState(false);

  const update = <K extends keyof Section2Data>(field: K, value: Section2Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  const toggleExpertise = (area: string) => {
    const arr = data.q2_expertise;
    update(
      "q2_expertise",
      arr.includes(area) ? arr.filter((v) => v !== area) : [...arr, area]
    );
  };

  // ── Compute sub-progress ──
  const filledCount = [
    data.q2_name,
    data.q2_email,
    data.q2_organization,
    data.q2_position,
    data.q2_province,
    data.q2_category,
    data.q2_expertise.length > 0,
    data.q2_network_accuracy != null,
  ].filter(Boolean).length;
  const totalFields = 8;

  const inputClass = cn(
    "w-full px-4 py-3 rounded-lg border text-sm placeholder:text-[#ecfdf5]/30",
    "bg-[#022c22]/60 border-[#C9A84C]/20 text-[#ecfdf5]",
    "focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/30",
    "transition-all"
  );

  return (
    <motion.div
      className="space-y-8 max-w-4xl mx-auto px-4 py-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Progress Header ── */}
      <SectionProgress
        currentSection={2}
        totalSections={16}
        sectionLabel="Your Profile"
      />

      {/* ── Sub-progress ── */}
      <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#022c22]/40 border border-[#C9A84C]/10">
        <span className="text-[11px] text-[#ecfdf5]/40 uppercase tracking-wider">
          Profile completion
        </span>
        <span className="text-[11px] text-[#C9A84C]/70">
          {filledCount}/{totalFields} fields
        </span>
      </div>

      {/* ── Header ── */}
      <motion.div variants={cardVariants} className="space-y-3">
        <div className="flex items-center gap-3">
          <User className="w-6 h-6 text-[#C9A84C]" />
          <h2 className="text-xl font-bold text-[#ecfdf5]">
            Section 2: Your Profile
          </h2>
        </div>
        <p className="text-sm text-[#ecfdf5]/70 leading-relaxed max-w-3xl">
          This helps us understand whose voice this is, ensuring the BIRD
          2026–2035 roadmap reflects a true multi-stakeholder consensus. Your
          email is used <strong className="text-[#C9A84C]">only</strong> to send
          you a copy of your submission and is protected under the Data Privacy
          Act of 2012 (RA 10173).
        </p>
      </motion.div>

      {/* ── Personal Information ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <User className="w-5 h-5 text-[#C9A84C]" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-[#ecfdf5] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                value={data.q2_name}
                onChange={(e) => update("q2_name", e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#ecfdf5] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#ecfdf5]/40" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={data.q2_email}
                  onChange={(e) => update("q2_email", e.target.value)}
                  className={cn(inputClass, "pl-10")}
                />
              </div>
              <p className="text-xs text-[#ecfdf5]/50 mt-1.5 flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#C9A84C]/60" />
                A valid email is needed to send you a copy of your submission.
                It will never be published or shared publicly.
              </p>
            </div>

            {/* Organization */}
            <div>
              <label className="block text-sm font-medium text-[#ecfdf5] mb-1.5">
                Organization / Institution / Agency
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#ecfdf5]/40" />
                <input
                  type="text"
                  placeholder="e.g., Ministry of Trade, Investments and Tourism"
                  value={data.q2_organization}
                  onChange={(e) => update("q2_organization", e.target.value)}
                  className={cn(inputClass, "pl-10")}
                />
              </div>
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-[#ecfdf5] mb-1.5">
                Position / Designation
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#ecfdf5]/40" />
                <input
                  type="text"
                  placeholder="e.g., Director, Researcher, Business Owner"
                  value={data.q2_position}
                  onChange={(e) => update("q2_position", e.target.value)}
                  className={cn(inputClass, "pl-10")}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Location ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#C9A84C]" />
              Primary Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#ecfdf5] mb-1.5">
                  Province / Region of Engagement{" "}
                  <span className="text-rose-400">*</span>
                </label>
                <Select
                  value={data.q2_province || undefined}
                  onValueChange={(value) => {
                    if (value === "Other (please specify)") {
                      setShowCustomProvince(true);
                      update("q2_province", "");
                    } else {
                      setShowCustomProvince(false);
                      update("q2_province", value);
                    }
                  }}
                >
                  <SelectTrigger className={cn(inputClass, !data.q2_province && !showCustomProvince && "text-[#ecfdf5]/40")}>
                    <SelectValue placeholder="Select your province or region" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#022c22] border-[#C9A84C]/20 max-h-64">
                    {PROVINCES.map((province) => (
                      <SelectItem
                        key={province}
                        value={province}
                        className="text-[#ecfdf5] focus:bg-[#C9A84C]/10 focus:text-[#C9A84C]"
                      >
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {showCustomProvince && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3"
                  >
                    <label className="block text-sm font-medium text-[#ecfdf5] mb-1.5">
                      Please specify your location:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Davao City, Cebu, International Organization HQ"
                      value={data.q2_province}
                      onChange={(e) => update("q2_province", e.target.value)}
                      className={inputClass}
                      autoFocus
                    />
                  </motion.div>
                )}

                <p className="text-xs text-[#ecfdf5]/50 mt-2 flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#C9A84C]/60" />
                  <span>
                    <strong className="text-[#ecfdf5]">Why this matters:</strong>{" "}
                    Your geographic affiliation helps us identify region-specific
                    investment priorities and ensures equitable representation
                    across BARMM&apos;s provinces, SGA, Cotabato City, and
                    external development partners.
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Stakeholder Category ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#C9A84C]" />
              Which category best describes your role?{" "}
              <span className="text-rose-400">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-[#ecfdf5]/50 mb-4 italic">
              This helps us segment responses and ensure all stakeholder voices
              are accurately represented in the consensus mapping.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => update("q2_category", cat)}
                  className={cn(
                    "p-3.5 rounded-lg border text-sm text-left transition-all duration-200 flex items-start gap-3",
                    data.q2_category === cat
                      ? "bg-[#C9A84C]/15 border-[#C9A84C] text-[#E5C560] shadow-sm"
                      : "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/80 hover:border-[#C9A84C]/30"
                  )}
                >
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border flex-shrink-0 mt-0.5 transition-all",
                      data.q2_category === cat
                        ? "bg-[#C9A84C] border-[#C9A84C]"
                        : "border-[#C9A84C]/40"
                    )}
                  >
                    {data.q2_category === cat && (
                      <div className="w-1.5 h-1.5 bg-[#011a12] rounded-full mx-auto mt-[3px]" />
                    )}
                  </div>
                  <span className="leading-tight">{cat}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Areas of Expertise ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-[#C9A84C]" />
              Select Your Areas of Expertise{" "}
              <span className="text-rose-400">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-[#ecfdf5]/50 mb-4 italic">
              Select all that apply. This contextualizes your responses within
              the Bangsamoro Economic and Investment Ecosystem (BEIE) framework.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EXPERTISE_AREAS.map((area) => {
                const isSelected = data.q2_expertise.includes(area);
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => toggleExpertise(area)}
                    className={cn(
                      "p-3.5 rounded-lg border text-sm text-left transition-all duration-200 flex items-start gap-3",
                      isSelected
                        ? "bg-[#C9A84C]/15 border-[#C9A84C] text-[#E5C560] shadow-sm"
                        : "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/80 hover:border-[#C9A84C]/30"
                    )}
                  >
                    <div
                      className={cn(
                        "w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all",
                        isSelected
                          ? "bg-[#C9A84C] border-[#C9A84C]"
                          : "border-[#C9A84C]/40"
                      )}
                    >
                      {isSelected && (
                        <svg className="w-3 h-3 text-[#011a12]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="leading-tight">{area}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── BARMM Value Network ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <Info className="w-5 h-5 text-[#C9A84C]" />
              BARMM Value Network Validation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-[#ecfdf5]/70">
              Review the interactive visualization of the BARMM Value Network
              below, then rate its accuracy using the scale provided.
            </p>

            {/* Flourish Embed with skeleton + error fallback */}
            <div className="relative w-full overflow-hidden rounded-lg border border-[#C9A84C]/20 bg-[#022c22]/30">
              {!embedLoaded && !embedError && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#022c22]">
                  <Loader2 className="w-8 h-8 text-[#C9A84C] animate-spin" />
                  <span className="text-xs text-[#ecfdf5]/50">Loading network visualization…</span>
                </div>
              )}
              {embedError && (
                <div className="flex flex-col items-center justify-center gap-3 p-8 bg-[#022c22]">
                  <AlertTriangle className="w-8 h-8 text-amber-400" />
                  <p className="text-sm text-[#ecfdf5]/70 text-center">
                    The network visualization could not be loaded.
                  </p>
                  <p className="text-xs text-[#ecfdf5]/40 text-center max-w-md">
                    This interactive diagram shows connections between key actors,
                    institutions, and stakeholders in the BARMM investment ecosystem.
                    You may continue the survey without it.
                  </p>
                </div>
              )}
              {!embedError && (
                <div
                  className="flourish-embed flourish-network"
                  data-src="visualisation/10095720"
                  style={{ width: "100%", minHeight: "500px" }}
                >
                  <script
                    src="https://public.flourish.studio/resources/embed.js"
                    onLoad={() => setEmbedLoaded(true)}
                    onError={() => setEmbedError(true)}
                  />
                  <noscript>
                    <img
                      src="https://public.flourish.studio/visualisation/10095720/thumbnail"
                      alt="BARMM Value Network visualization"
                      className="w-full h-auto"
                      onLoad={() => setEmbedLoaded(true)}
                    />
                  </noscript>
                </div>
              )}
            </div>

            {/* Network Accuracy — LikertScale primitive */}
            <div className="pt-4 border-t border-[#C9A84C]/10">
              <LikertScale
                name="q2_network_accuracy"
                label="How accurately does this network reflect real-world relationships and influence in BARMM?"
                description="Rate the overall fidelity of the actor connections shown above."
                value={data.q2_network_accuracy}
                onChange={(v) => update("q2_network_accuracy", v)}
                labels={NETWORK_ACCURACY_LABELS}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Privacy Assurance ── */}
      <motion.div variants={cardVariants}>
        <div className="flex items-start gap-3 p-4 bg-[#C9A84C]/5 border border-[#C9A84C]/10 rounded-lg">
          <ShieldCheck className="w-5 h-5 text-[#C9A84C] flex-shrink-0 mt-0.5" />
          <div className="text-xs text-[#ecfdf5]/60 leading-relaxed">
            <strong className="text-[#C9A84C]">Data Privacy Assurance:</strong>{" "}
            In compliance with the Data Privacy Act of 2012 (RA 10173), all
            personal data is processed solely for the BIRD 2026–2035 Validation
            Survey. Aggregated data will be used for public reporting, but no
            individual response will ever be publicly attributed without explicit
            consent.
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Section2_Demographics;
