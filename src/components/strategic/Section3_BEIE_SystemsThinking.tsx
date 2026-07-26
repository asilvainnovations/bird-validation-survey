import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Network, BookOpen, Target, AlertTriangle } from "lucide-react";
import { BIRD_IMAGES } from "@/lib/bird-urls";

export interface Section3Data {
  q3_1_beie_collaboration: string;
  q3_2_beie_understanding: string;
  q3_3_beie_relevance: string;
  q3_4_cluster_position: string;
}

interface Section3Props {
  data: Section3Data;
  setData: React.Dispatch<React.SetStateAction<Section3Data>>;
}

const Section3_BEIE_SystemsThinking: React.FC<Section3Props> = ({ data, setData }) => {
  const update = <K extends keyof Section3Data>(field: K, value: Section3Data[K]) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const understandingOptions = [
    "Very well — I see the interconnected value",
    "Somewhat — I grasp the concept but need clarity on linkages",
    "Familiar with sector-based only — ecosystems are new to me",
    "Not familiar with either approach",
  ];

  const relevanceOptions = ["Highly relevant", "Moderately relevant", "Somewhat relevant", "Not relevant"];
  const clusterOptions = ["Foundations", "Transformers", "Enablers", "Connectors", "Financiers", "Multiple clusters", "Observer / External partner"];

  const activeBtnClass = "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90";
  const inactiveBtnClass = "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[#ecfdf5]/30 dark:hover:bg-[#C9A84C]/10";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-[#022c22] text-[#C9A84C] shadow-md shrink-0">
          <Network className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#022c22] dark:text-[#ecfdf5]">
            Section 3: Systems Thinking & BEIE Framework
          </h2>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 mt-1 max-w-3xl">
            The IEDS requires a synchronized, cross-cluster monitoring framework that measures not just sectoral outputs 
            but ecosystem health. This section validates the conceptual foundations and archetype understanding.
          </p>
        </div>
      </div>

      {/* Anatomy of Causal Loop Diagram */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#C9A84C]" />
            Anatomy of Causal Loop Diagrams (CLDs)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src={BIRD_IMAGES.anatomyCLD?.url || "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/3-Anatomy%20of%20CLD.png"}
              alt="Anatomy of Causal Loop Diagram"
              className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">
                Variables, Links, and Polarity in Systems Mapping
              </p>
            </div>
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            A Causal Loop Diagram (CLD) has interconnected elements: <strong>Variables</strong> (factors that change over time), 
            <strong> Links</strong> (arrows showing influence), and <strong>Polarity</strong> (marked as 's' for same-direction 
            and 'o' for opposite-direction effects).
          </p>
        </CardContent>
      </Card>

      {/* Feedback Loops and Leverage Points */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <Target className="w-5 h-5 text-[#C9A84C]" />
            Feedback Loops & Leverage Points
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src={BIRD_IMAGES.feedbackLoops?.url || "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/6-Anatomy%20of%20Systems%20Traps.png"}
              alt="Feedback Loops and Leverage Points"
              className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">
                Reinforcing (R) and Balancing (B) Loops with Meadows' Leverage Hierarchy
              </p>
            </div>
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            <strong>Two Types of Loops:</strong> Reinforcing (R) loops amplify change; Balancing (B) loops stabilize systems.
            <strong> Leverage Hierarchy:</strong> Transformative (L1–L2), Systemic (L5–L6), and Incremental (L10) intervention points.
          </p>
        </CardContent>
      </Card>

      {/* BEIE Validation Questions */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#C9A84C]" />
            Framework Validation & Archetype Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Q3.1: Understanding */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">
              How well do you understand the BEIE ecosystem approach compared to traditional sector-based planning?
            </Label>
            <RadioGroup
              value={data.q3_2_beie_understanding}
              onValueChange={(val) => update("q3_2_beie_understanding", val)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {understandingOptions.map((opt) => (
                <div key={opt}>
                  <RadioGroupItem value={opt} id={`understand-${opt}`} className="peer sr-only" />
                  <Label
                    htmlFor={`understand-${opt}`}
                    className={cn(
                      "flex items-center justify-center p-3 rounded-lg border text-sm text-left transition-all cursor-pointer h-full",
                      data.q3_2_beie_understanding === opt ? activeBtnClass : inactiveBtnClass
                    )}
                  >
                    {opt}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Q3.2: Relevance */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">
              How relevant is the BEIE framework to real-world investment planning in your province or organization?
            </Label>
            <RadioGroup
              value={data.q3_3_beie_relevance}
              onValueChange={(val) => update("q3_3_beie_relevance", val)}
              className="grid grid-cols-2 gap-3"
            >
              {relevanceOptions.map((opt) => (
                <div key={opt}>
                  <RadioGroupItem value={opt} id={`relevance-${opt}`} className="peer sr-only" />
                  <Label
                    htmlFor={`relevance-${opt}`}
                    className={cn(
                      "flex items-center justify-center p-3 rounded-lg border text-sm text-left transition-all cursor-pointer h-full",
                      data.q3_3_beie_relevance === opt ? activeBtnClass : inactiveBtnClass
                    )}
                  >
                    {opt}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Q3.3: Cluster Position */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">
              Where does your organization belong in the economic and investment ecosystem?
            </Label>
            <RadioGroup
              value={data.q3_4_cluster_position}
              onValueChange={(val) => update("q3_4_cluster_position", val)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {clusterOptions.map((opt) => (
                <div key={opt}>
                  <RadioGroupItem value={opt} id={`cluster-${opt}`} className="peer sr-only" />
                  <Label
                    htmlFor={`cluster-${opt}`}
                    className={cn(
                      "flex items-center justify-center p-3 rounded-lg border text-sm text-left transition-all cursor-pointer h-full",
                      data.q3_4_cluster_position === opt ? activeBtnClass : inactiveBtnClass
                    )}
                  >
                    {opt}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Q3.4: Archetype Validation */}
          <div className="space-y-3 pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">
              How accurately does the "Limits to Growth" archetype describe the barriers facing BARMM's development?
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn("justify-start h-auto py-3 text-sm text-left", data.q3_1_beie_collaboration === opt ? activeBtnClass : inactiveBtnClass)}
                  onClick={() => update("q3_1_beie_collaboration", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Section3_BEIE_SystemsThinking;
