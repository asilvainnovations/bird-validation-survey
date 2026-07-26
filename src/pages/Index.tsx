import React from 'react';
import AppLayout from '@/components/AppLayout';
import SurveyWizard from '@/components/strategic/SurveyWizard';
import { useAuth } from '@/hooks/useAuth';

const AppLoadingFallback = () => (
  <div className="min-h-screen bg-[#011a12] flex flex-col items-center justify-center p-6">
    <div className="relative mb-6">
      <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-[#C9A84C] shadow-2xl border border-white/20 animate-pulse bg-[#022c22] flex items-center justify-center">
        <span className="text-[#C9A84C] font-bold text-2xl">BIRD</span>
      </div>
      <div className="absolute -bottom-2 -right-2 w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
    </div>
    <h2 className="text-[#ecfdf5] font-bold text-xl mb-2">Loading BIRD Validation Survey</h2>
    <p className="text-[#64748b] text-sm">Preparing the stakeholder validation instrument…</p>
  </div>
);

const Index: React.FC = () => {
  const { isLoading } = useAuth();

  // Full-screen loading gate while auth initializes
  if (isLoading) {
    return <AppLoadingFallback />;
  }

  return (
    <AppLayout>
      <SurveyWizard />
    </AppLayout>
  );
};

export default Index;
