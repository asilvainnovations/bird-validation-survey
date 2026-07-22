// src/components/strategic/Section14_AccessResources.tsx
// BIRD 2026–2035 · Section 14: Resources & Engagements
// Updated: 2026-07-23 · Strict schema alignment, shadcn/ui components

import React from "react";
import { Users, Calendar, MessageSquare, FileText, Handshake } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SurveySchemaType } from "@/lib/survey-schema";

// ── shadcn/ui imports ────────────────────────────────────────────────────────
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// ── Type definitions ─────────────────────────────────────────────────────────
export type Section14Data = Pick<
  SurveySchemaType,
  | "q14_1_engagement_type"
  | "q14_2_contact_method"
  | "q14_3_timing"
  | "q14_4_role_contribution"
  | "q14_5_additional_comments"
>;

interface Section14Props {
  data: Section14Data;
  onChange: (data: Section14Data) => void;
}

// ── Design tokens ────────────────────────────────────────────────────────────
const activeBtnClass = "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90";
const inactiveBtnClass = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]";

// ── Engagement options ───────────────────────────────────────────────────────
const engagementOptions = [
  {
    value: "provincial_workshop",
    label: "Provincial Validation Workshop",
    icon: Users,
    description: "In-person workshop in your province to discuss BIRD priorities and gather local insights",
  },
  {
    value: "sector_focus_group",
    label: "Sector-Specific Focus Group Discussion",
    icon: MessageSquare,
    description: "Focused discussion with stakeholders from your industry sector",
  },
  {
    value: "one_on_one_interview",
    label: "One-on-One Interview",
    icon: Handshake,
    description: "Private interview with BIRD team members for detailed input",
  },
  {
    value: "online_webinar",
    label: "Online Webinar",
    icon: Calendar,
    description: "Virtual session to review BIRD findings and provide feedback",
  },
  {
    value: "written_submission",
    label: "Written Submission",
    icon: FileText,
    description: "Submit detailed written feedback on specific BIRD sections",
  },
  {
    value: "technical_working_group",
    label: "Technical Working Group Participation",
    icon: Users,
    description: "Join specialized working groups on infrastructure, finance, or industry",
  },
];

// ── Contact method options ───────────────────────────────────────────────────
const contactMethodOptions = [
  "Email",
  "Phone call",
  "Video conference (Zoom/Teams)",
  "In-person meeting",
];

// ── Timing options ───────────────────────────────────────────────────────────
const timingOptions = [
  "Within 1 month",
  "1-3 months",
  "3-6 months",
  "6-12 months",
  "Anytime",
];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export const Section14_AccessResources: React.FC<Section14Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section14Data>(field: K, value: Section14Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  // Toggle multi-select for engagement types
  const toggleEngagementType = (value: string) => {
    const current = data.q14_1_engagement_type || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    update("q14_1_engagement_type", updated);
  };

  return (
    <div className="space-y-6">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <Users className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">
          Section 14: Resources & Engagements
        </h2>
      </div>
      <p className="text-sm text-[#065f46] mb-4">
        Help us understand how you would like to participate in the ongoing development and validation of the BIRD 2026-2035 roadmap. Your engagement preferences will guide our stakeholder outreach strategy.
      </p>

      {/* ── Context Card ────────────────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardContent className="pt-6">
          <p className="text-sm text-[#022c22] leading-relaxed">
            The BIRD 2026-2035 validation process is an ongoing, participatory effort. We value your continued input and want to ensure our engagement activities align with your availability, preferences, and expertise. This section helps us plan meaningful opportunities for collaboration.
          </p>
        </CardContent>
      </Card>

      {/* ── Q14.1: Engagement Type (Multi-select) ───────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <Users className="w-5 h-5 text-[#C9A84C]" />
            Q14.1 What type of engagement are you most interested in?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-[#065f46] italic">
            Select all that apply (you may choose multiple options)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {engagementOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = (data.q14_1_engagement_type || []).includes(option.value);
              
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleEngagementType(option.value)}
                  className={cn(
                    "flex items-start gap-3 p-4 rounded-lg border text-left transition-all",
                    isSelected
                      ? "bg-[#1B4D3E]/5 border-[#1B4D3E] shadow-sm"
                      : "bg-white border-[#C9A84C]/30 hover:border-[#C9A84C]"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                    isSelected ? "bg-[#1B4D3E] text-white" : "bg-[#C9A84C]/10 text-[#C9A84C]"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-sm font-semibold mb-1",
                      isSelected ? "text-[#1B4D3E]" : "text-[#022c22]"
                    )}>
                      {option.label}
                    </p>
                    <p className="text-xs text-[#065f46] leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#1B4D3E] flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          {(data.q14_1_engagement_type || []).length > 0 && (
            <p className="text-xs text-[#065f46] mt-2">
              Selected: {(data.q14_1_engagement_type || []).length} option{(data.q14_1_engagement_type || []).length !== 1 ? "s" : ""}
            </p>
          )}
        </CardContent>
      </Card>

      {/* ── Q14.2: Contact Method (Single-select) ───────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <Handshake className="w-5 h-5 text-[#C9A84C]" />
            Q14.2 What is your preferred method of contact?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-[#065f46] italic">
            Select one option
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {contactMethodOptions.map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn(
                  "justify-start h-auto py-3 text-sm text-left",
                  data.q14_2_contact_method === opt ? activeBtnClass : inactiveBtnClass
                )}
                onClick={() => update("q14_2_contact_method", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Q14.3: Timing (Single-select) ───────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <Calendar className="w-5 h-5 text-[#C9A84C]" />
            Q14.3 When would you be available to participate?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-[#065f46] italic">
            Select one option
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {timingOptions.map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn(
                  "justify-start h-auto py-3 text-sm text-left",
                  data.q14_3_timing === opt ? activeBtnClass : inactiveBtnClass
                )}
                onClick={() => update("q14_3_timing", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Q14.4: Role Contribution (Open text) ────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <MessageSquare className="w-5 h-5 text-[#C9A84C]" />
            Q14.4 How would you like to contribute your expertise?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-[#065f46] italic">
            Describe your area of expertise and how you can support the BIRD validation process
          </p>
          <Textarea
            value={data.q14_4_role_contribution || ""}
            onChange={(e) => update("q14_4_role_contribution", e.target.value)}
            placeholder="For example: I have 10 years of experience in Islamic finance and can provide insights on Shariah-compliant investment structures..."
            rows={4}
            className="bg-white border-[#C9A84C]/30 focus-visible:ring-[#C9A84C] text-[#022c22] placeholder:text-[#065f46]/50"
          />
        </CardContent>
      </Card>

      {/* ── Q14.5: Additional Comments (Open text) ──────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <FileText className="w-5 h-5 text-[#C9A84C]" />
            Q14.5 Additional comments or suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-[#065f46] italic">
            Share any other thoughts, questions, or suggestions about the BIRD validation process
          </p>
          <Textarea
            value={data.q14_5_additional_comments || ""}
            onChange={(e) => update("q14_5_additional_comments", e.target.value)}
            placeholder="Your feedback helps us improve the validation process..."
            rows={4}
            className="bg-white border-[#C9A84C]/30 focus-visible:ring-[#C9A84C] text-[#022c22] placeholder:text-[#065f46]/50"
          />
        </CardContent>
      </Card>

      {/* ── Thank You Message ───────────────────────────────────────── */}
      <Card className="border-[#1B4D3E]/30 bg-[#1B4D3E]/5 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1B4D3E] flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#1B4D3E] mb-1">
                Thank you for your commitment to the BIRD process
              </p>
              <p className="text-xs text-[#065f46] leading-relaxed">
                Your engagement preferences will help us design meaningful opportunities for collaboration. The BIRD team will reach out to you based on your selected preferences and availability. Together, we can build a roadmap that truly reflects the aspirations of the Bangsamoro people.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Section14_AccessResources;
