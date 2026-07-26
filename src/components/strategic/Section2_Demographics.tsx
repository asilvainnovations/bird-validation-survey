import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
} from "lucide-react";
import { BIRD_IMAGES } from "@/lib/bird-urls";

// ✅ Explicit Type Definition strictly aligned with survey-schema.ts and SurveyWizard.tsx
export interface Section2Data {
  demo_name: string;
  demo_email: string;
  demo_organization: string;
  demo_position: string;
  demo_province: string;
  demo_category: string;
  demo_expertise: string[];
}

interface Section2Props {
  data: Section2Data;
  onChange: (data: Section2Data) => void;
}

// ✅ Trimmed arrays to prevent subtle string-matching bugs
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
];

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
];

const EXPERTISE_AREAS = [
  "Agriculture, Fisheries & Forestry (Foundations)",
  "Halal Economy & Manufacturing (Transformers)",
  "Infrastructure, ICT & Logistics (Enablers)",
  "Tourism, Trade & BIMP-EAGA Integration (Connectors)",
  "Islamic Finance & Capital Access (Financiers)",
  "Governance, Peace & Public Administration",
  "Environment, Climate & Green Economy",
  "Education, Health & Human Capital",
];

const Section2_Demographics: React.FC<Section2Props> = ({ data, onChange }) => {
  // ✅ Fixed: Use onChange to match SurveyWizard.tsx prop signature
  const update = <K extends keyof Section2Data>(field: K, value: Section2Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  const toggleExpertise = (val: string) => {
    const current = data.demo_expertise || [];
    const next = current.includes(val)
      ? current.filter((v) => v !== val)
      : [...current, val];
    onChange({ ...data, demo_expertise: next });
  };

  const [showCustomProvince, setShowCustomProvince] = useState(false);
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-[#C9A84C]/30 bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] text-sm placeholder:text-[#64748b] focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/30 transition-all";

  return (
    <div className="space-y-8">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <User className="w-6 h-6 text-[#C9A84C]" />
          <h2 className="text-xl font-bold text-[#022c22] dark:text-[#ecfdf5]">
            Section 2: Your Profile
          </h2>
        </div>
        <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed max-w-3xl">
          This helps us understand whose voice this is, ensuring the BIRD 2026–2035 roadmap
          reflects a true multi-stakeholder consensus. Your email is used{" "}
          <strong>only</strong> to send you a copy of your submission and is protected under
          the Data Privacy Act of 2012 (RA 10173).
        </p>
      </div>

      {/* ── Personal Information Card ──────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <User className="w-5 h-5 text-[#C9A84C]" />
            Personal Information <span className="text-xs font-normal text-[#64748b]">(Optional per Schema)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your full name"
              value={data.demo_name}
              onChange={(e) => update("demo_name", e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
              <input
                type="email"
                placeholder="your@email.com"
                value={data.demo_email}
                onChange={(e) => update("demo_email", e.target.value)}
                className={cn(inputClass, "pl-10")}
              />
            </div>
            <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 mt-1.5 flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              A valid email is needed to send you a copy of your submission. It will never be published or shared publicly.
            </p>
          </div>

          {/* Organization */}
          <div>
            <label className="block text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-1.5">
              Organization / Institution / Agency
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
              <input
                type="text"
                placeholder="e.g., Ministry of Trade, Investments and Tourism"
                value={data.demo_organization}
                onChange={(e) => update("demo_organization", e.target.value)}
                className={cn(inputClass, "pl-10")}
              />
            </div>
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-1.5">
              Position / Designation
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
              <input
                type="text"
                placeholder="e.g., Director, Researcher, Business Owner"
                value={data.demo_position}
                onChange={(e) => update("demo_position", e.target.value)}
                className={cn(inputClass, "pl-10")}
              />
            </div>
          </div8>
        </CardContent>
      </Card>

      {/* ── Location Card ──────────────────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#C9A84C]" />
            Primary Location <span className="text-red-500">*</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-1.5">
                Province / Region of Engagement
              </label>
              <Select
                value={showCustomProvince ? "Other (please specify)" : data.demo_province}
                onValueChange={(value) => {
                  if (value === "Other (please specify)") {
                    setShowCustomProvince(true);
                    update("demo_province", "");
                  } else {
                    setShowCustomProvince(false);
                    update("demo_province", value);
          }
                }}
              >
                <SelectTrigger className={cn(inputClass, !data.demo_province && !showCustomProvince && "text-[#64748b]")}>
                  <SelectValue placeholder="Select your province or region" />
                </SelectTrigger>
                <SelectContent className="z-50 max-h-64">
                  {PROVINCES.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {showCustomProvince && (
                <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  <label className="block text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-1.5">
                    Please specify your location:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Davao City, Cebu, International Organization HQ"
                    value={data.demo_province}
                    onChange={(e) => update("demo_province", e.target.value)}
                    className={inputClass}
                    autoFocus
                  />
                </div>
              )}
              
              <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 mt-2 flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Why this matters:</strong> Your geographic affiliation helps us identify
                  region-specific investment priorities and ensures equitable representation across
                  BARMM's 5 provinces, the SGA, Cotabato City, and our external development partners.
                </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Contextual Image: Provincial Endowments ──────────────────── */}
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
          <img
            src={BIRD_IMAGES.provincialSpecializedNode?.url || "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Layer%201%20-%20Provincial%20-%20Geopolitical%20Specialized%20Nodes.png"}
            alt="BARMM Provincial Endowments and Geographic Context"
            className="w-full h-auto max-h-[350px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5">
            <h4 className="text-[#C9A84C] font-semibold text-sm mb-1 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              BARMM's Diverse Economic Geography
            </h4>
            <p className="text-xs text-white/85 leading-relaxed">
              Understanding the unique endowments across Lanao del Sur, Maguindanao del Norte &amp; Sur,
              Basilan, Sulu, and Tawi-Tawi is critical to designing an equitable, context-specific investment roadmap.
            </p>
          </div>
        </div>

        {/* ── Stakeholder Category Card ────────────────────────────────── */}
        <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#C9A84C]" />
              Which category best describes your role? <span className="text-red-500">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 mb-4 italic">
              This helps us segment responses and ensure all stakeholder voices are accurately represented in the consensus mapping.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CATEGORIES.map((cat) => {
                const isSelected = data.demo_category === cat;
                const isOther = cat === "Other (please specify)";
                
                return (
                  <React.Fragment key={cat}>
                    <button
                      type="button"
                      onClick={() => {
                        if (isOther) {
                          setShowCustomCategory(true);
                          update("demo_category", "");
                        } else {
                          setShowCustomCategory(false);
                          update("demo_category", cat);
                        }
                      }}
                      className={cn(
                        "p-3.5 rounded-lg border text-sm text-left transition-all duration-200 flex items-start gap-3",
                        (isSelected && !isOther) || (showCustomCategory && isOther)
                          ? "bg-[#1B4D3E] text-white border-[#1B4D3E] shadow-md"
                          : "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[#ecfdf5]/30 dark:hover:bg-[#C9A84C]/10"
                      )}
                    >
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full border flex-shrink-0 mt-0.5 transition-all",
                          (isSelected && !isOther) || (showCustomCategory && isOther)
                            ? "bg-[#C9A84C] border-[#C9A84C]"
                            : "border-[#C9A84C]/50 bg-white dark:bg-[#022c22]"
                        )}
                      >
                        {(isSelected && !isOther) || (showCustomCategory && isOther) ? (
                          <div className="w-2 h-2 bg-[#022c22] rounded-full mx-auto mt-0.5" />
                        ) : null}
                      </div>
                      <span className="leading-tight">{cat}</span>
                    </button>
                    
                    {isOther && showCustomCategory && (
                      <div className="sm:col-span-2 mt-1 animate-in fade-in slide-in-from-top-2 duration-200">
                        <input
                          type="text"
                          placeholder="Please specify your category..."
                          value={data.demo_category}
                          onChange={(e) => update("demo_category", e.target.value)}
                          className={inputClass}
                          autoFocus
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* ── Areas of Expertise Card ──────────────────────────────────── */}
        <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-[#C9A84C]" />
              Select Your Areas of Expertise <span className="text-red-500">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 mb-4 italic">
              Select all that apply. This contextualizes your responses within the Bangsamoro Economic and Investment Ecosystem (BEIE) framework.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EXPERTISE_AREAS.map((area) => {
                const isSelected = (data.demo_expertise || []).includes(area);
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => toggleExpertise(area)}
                    className={cn(
                      "p-3.5 rounded-lg border text-sm text-left transition-all duration-200 flex items-start gap-3",
                      isSelected
                        ? "bg-[#1B4D3E] text-white border-[#1B4D3E] shadow-md"
                        : "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[#ecfdf5]/30 dark:hover:bg-[#C9A84C]/10"
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
                        <svg
                          className="w-3 h-3 text-[#022c22]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="leading-tight">{area}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Schema Validation Warning */}
            {(data.demo_expertise || []).length === 0 && (
              <p className="text-xs text-red-500 mt-3 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 flex-shrink-0" />
                Please select at least one area of expertise to proceed.
              </p>
            )}
          </CardContent>
        </Card>

        {/* ── Privacy Assurance Footer ─────────────────────────────────── */}
        <div className="flex items-start gap-3 p-4 bg-[#ecfdf5]/40 dark:bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-lg">
          <ShieldCheck className="w-5 h-5 text-[#1B4D3E] dark:text-[#C9A84C] flex-shrink-0 mt-0.5" />
          <div className="text-xs text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            <strong className="text-[#1B4D3E] dark:text-[#C9A84C]">Data Privacy Assurance:</strong> In compliance with the
            Data Privacy Act of 2012 (RA 10173), all personal data collected is processed solely for the
            purpose of the BIRD 2026–2035 Validation Survey. Aggregated data will be used for public
            reporting, but no individual response will ever be publicly attributed to you without explicit consent.
          </div>
        </div>
      </div>
    );
  };

export default Section2_Demographics;
