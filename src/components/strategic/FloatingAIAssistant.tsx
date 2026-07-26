// src/components/strategic/FloatingAIAssistant.tsx
// BIRD 2026-2035 · AI Strategy Assistant for Validation Survey
// Wired to: https://lydsisparsmvextskevw.supabase.co/functions/v1/ai-strategy-assistant
// Updated: 2026-07-23

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Sparkles, X, Send, Loader2, ChevronDown, ChevronUp, Brain, Target, BarChart3, Globe2, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AIStrategistAvatar } from '@/components/branding/Logo';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Msg {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}

interface FloatingAIAssistantProps {
  plan?: any;
  activeView?: string;
  compact?: boolean;
}

// ─── BIRD AI System Prompt Context ──────────────────────────────────────────
const BIRD_SYSTEM_CONTEXT = `You are BIRD AI — an expert strategic advisor embedded in the BIRD 2026–2035 Validation Survey platform.

Your expertise spans:
- BIRD 2026-2035 Validation Survey methodology and structure
- BEIE Framework (Bangsamoro Economic and Investment Ecosystem)
- Systems thinking, SWOT analysis, and strategic planning
- BARMM context: 5 provinces, halal economy, Islamic finance, BIMP-EAGA integration
- Survey sections: Orientation, Privacy, Demographics, BEIE, 5 Clusters, Operating Systems, IEDS, Metrics, BSC, Budget, Resources

KEY DATA:
- BARMM population: 5.69M (PSA 2025)
- GRDP: ₱299.5B (2024); Growth: 2.7%
- Poverty incidence: 34.8% (1H 2023)
- Investment approvals: ₱5.1B (Q1 2026)
- Halal-certified firms: ~500 (2024), target 5,000+ by 2035
- 5 Leverage Points: LP1 (Halal Certification), LP2 (Infrastructure), LP3 (Governance), LP4 (Islamic Finance), LP5 (Green Economy)

Respond with practical, survey-relevant insights. Help respondents understand:
- How to complete each survey section
- The BEIE framework and its 5 clusters
- Systems archetypes and causal loop diagrams
- SWOT scoring methodology
- BIRD strategic priorities

Use a collegial, professional tone. Keep responses concise (<200 words unless asked for depth).`;

// ─── Contextual Suggestion Sets ───────────────────────────────────────────────
const SURVEY_SUGGESTIONS = [
  { icon: Brain, label: 'What is the BEIE Framework and how does it organize BARMM sectors?' },
  { icon: Target, label: 'Why is halal certification a critical leverage point for BARMM?' },
  { icon: BarChart3, label: 'How are SWOT factors scored in this survey?' },
  { icon: Globe2, label: 'What are the 5 BEIE clusters and how do they interconnect?' },
];

// ─── Component ────────────────────────────────────────────────────────────────
const FloatingAIAssistant: React.FC<FloatingAIAssistantProps> = ({ 
  plan, 
  activeView = 'survey',
  compact = false 
}) => {
  const [messages, setMessages] = useState<Msg[]>([{
    role: 'assistant',
    content: 'As-salamu alaykum! I\'m the BIRD AI Assistant for the Validation Survey.\n\nI can help you:\n• Understand the BEIE Framework and survey sections\n• Clarify systems thinking concepts and archetypes\n• Explain SWOT scoring methodology\n• Navigate the survey effectively\n\nWhat would you like to know?',
    timestamp: Date.now(),
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(!compact);
  
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, loading, isOpen]);

  const send = useCallback(async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;

    const history = messages.slice(-12).map(({ role, content }) => ({ role, content }));
    setMessages((p) => [...p, { role: 'user', content: q, timestamp: Date.now() }]);
    setInput('');
    setLoading(true);

    try {
      const AI_ASSISTANT_URL = 'https://lydsisparsmvextskevw.supabase.co/functions/v1/ai-strategy-assistant';
      
      const response = await fetch(AI_ASSISTANT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'chat',
          data: {
            message: q,
            activeView: activeView || 'survey',
            messages: history,
            surveyContext: {
              currentSection: activeView,
              totalSections: 16,
            },
          },
          plan: plan ? {
            name: plan.name,
            organization: plan.organization,
          } : null,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI service error: ${response.status}`);
      }

      const data = await response.json();
      const reply = data?.data?.reply || data?.data?.markdown || 'Sorry, I could not generate a response right now.';
      
      setMessages((p) => [...p, { role: 'assistant', content: reply, timestamp: Date.now() }]);
    } catch (error) {
      console.error('AI Assistant error:', error);
      setMessages((p) => [
        ...p,
        {
          role: 'assistant',
          content: 'I had trouble reaching the AI service. Please check your connection and try again.',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [messages, loading, activeView, plan]);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  if (compact) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full px-5 py-3 bg-gradient-to-r from-[#C9A84C] via-[#B8942E] to-[#E8C560] text-white shadow-xl hover:scale-105 transition-all"
      >
        <Sparkles className="w-5 h-5" />
        <span className="font-semibold text-sm">BIRD AI</span>
      </Button>
    );
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="fixed bottom-5 right-5 z-50 rounded-full px-4 py-2 bg-[#C9A84C]/10 border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C]/20"
      >
        <MessageCircle className="w-4 h-4 mr-2" />
        Ask BIRD AI
      </Button>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#011a12] rounded-lg border border-[#C9A84C]/20">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-4 py-3 bg-gradient-to-r from-[#B8942E] via-[#A08028] to-[#C9A84C] text-white flex-shrink-0 rounded-t-lg">
        <div className="flex items-center gap-2.5">
          <AIStrategistAvatar size="sm" />
          <div>
            <p className="font-bold text-sm">BIRD AI Assistant</p>
            <p className="text-[10px] text-white/70">Validation Survey Guide</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {loading && (
            <Badge variant="outline" className="text-[10px] border-white/20 text-white/80">
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
              Thinking…
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 p-0 hover:bg-white/20 text-white"
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
            {m.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#E8C560] flex-shrink-0 mr-2 mt-1 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            )}
            <div
              className={cn(
                'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap leading-relaxed',
                m.role === 'user'
                  ? 'bg-gradient-to-br from-[#C9A84C] to-blue-600 text-white rounded-br-sm'
                  : 'bg-[#022c22] text-[#ecfdf5] rounded-bl-sm border border-[#C9A84C]/20',
              )}
            >
              {m.content}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#E8C560] flex-shrink-0 mr-2 mt-1 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <div className="bg-[#022c22] rounded-2xl rounded-bl-sm px-4 py-2.5 border border-[#C9A84C]/20 flex items-center gap-2">
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#ecfdf5]/60 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </span>
              <span className="text-xs text-[#ecfdf5]/60">Analyzing…</span>
            </div>
          </div>
        )}

        {/* Quick suggestions (show on first message) */}
        {messages.length === 1 && !loading && (
          <div className="space-y-2 pt-2">
            <p className="text-[10px] text-[#ecfdf5]/50 font-semibold uppercase tracking-wider px-1">
              Suggested Questions
            </p>
            <div className="grid grid-cols-1 gap-2">
              {SURVEY_SUGGESTIONS.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  onClick={() => send(label)}
                  className={cn(
                    'flex items-start gap-2.5 text-left rounded-xl border border-[#C9A84C]/20 bg-[#022c22]/60',
                    'px-3 py-2.5 text-xs leading-snug transition-all duration-150',
                    'hover:border-[#C9A84C]/50 hover:bg-[#C9A84C]/10 hover:text-[#C9A84C]',
                  )}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#ecfdf5]/50" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div ref={endRef} />
      </ScrollArea>

      {/* Input */}
      <div className="flex items-center gap-2 border-t border-[#C9A84C]/20 p-3 bg-[#011a12] flex-shrink-0 rounded-b-lg">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask about the survey, BEIE framework, or BARMM context…"
          disabled={loading}
          className={cn(
            'flex-1 rounded-full bg-[#022c22] border border-[#C9A84C]/30 px-4 py-2 text-sm',
            'outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C]/30',
            'placeholder:text-[#ecfdf5]/30 disabled:opacity-50',
            'text-[#ecfdf5] transition-all',
          )}
        />
        <Button
          onClick={() => send(input)}
          disabled={loading || !input.trim()}
          size="icon"
          className={cn(
            'rounded-full flex-shrink-0 transition-all',
            'bg-gradient-to-br from-[#C9A84C] to-[#E8C560] text-white',
            'hover:from-[#C9A84C] hover:to-[#E8C560] hover:scale-105',
            'disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100',
          )}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-[#011a12] border-t border-[#C9A84C]/10 flex-shrink-0 rounded-b-lg">
        <p className="text-[10px] text-[#ecfdf5]/30 text-center">
          BIRD AI · Validation Survey Assistant · BOI-MTIT, BARMM
        </p>
      </div>
    </div>
  );
};

export default React.memo(FloatingAIAssistant);
