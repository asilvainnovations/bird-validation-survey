import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

interface QuizCardProps {
  title?: string;
  question: string;
  children: React.ReactNode;
  hint?: string;
  className?: string;
  onHintToggle?: () => void;
  showHint?: boolean;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  title,
  question,
  children,
  hint,
  className,
  onHintToggle,
  showHint,
}) => {
  return (
    <Card
      className={cn(
        "bg-[#011a12]/80 border-[#C9A84C]/10 hover:border-[#C9A84C]/20 transition-colors",
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            {title && (
              <CardTitle className="text-sm font-bold text-[#E5C560]">
                {title}
              </CardTitle>
            )}
            <p className="text-sm text-[#ecfdf5]/90 leading-relaxed">{question}</p>
          </div>
          {hint && onHintToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onHintToggle}
              className={cn(
                "shrink-0 text-[#ecfdf5]/40 hover:text-[#C9A84C] hover:bg-[#C9A84C]/10",
                showHint && "text-[#C9A84C] bg-[#C9A84C]/10"
              )}
              aria-label="Toggle hint"
            >
              <HelpCircle className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {showHint && hint && (
          <div className="p-3 rounded-lg bg-[#C9A84C]/5 border border-[#C9A84C]/10 text-xs text-[#ecfdf5]/70 leading-relaxed">
            <span className="font-semibold text-[#C9A84C]">Hint: </span>
            {hint}
          </div>
        )}
        {children}
      </CardContent>
    </Card>
  );
};
