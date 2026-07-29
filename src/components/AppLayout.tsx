// src/components/AppLayout.tsx
// BIRD 2026–2035 · Validation Survey Shell
// Updated: 2026-07-29 · Resolved double footer, wired Live Dashboard to React route

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { AppProvider } from "@contexts/AppContext";
import { StratLogo } from "@/components/branding/Logo";
import { PlatformBadge } from "@/components/branding/PlatformBadge";
import { AuthModal } from "@/components/auth/AuthModal";
import { useTheme } from "@/components/theme-provider";
import { Toggle } from "@/components/ui/toggle";
import { Toaster } from "sonner";
import { ContextPanel } from "@/components/strategic/ContextPanel";
import FloatingAIAssistant from "@/components/strategic/FloatingAIAssistant";
import { Button } from "@/components/ui/button";
import {
  LogIn,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  BookOpen,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";

// ─── LAZY LOADED PAGE COMPONENTS ────────────────────────────────────────────
const Index = lazy(() => import("@pages/Index"));
const NotFound = lazy(() => import("@pages/NotFound"));
const SurveyDashboard = lazy(() => import("@components/dashboard/SurveyDashboard"));
const SurveyWizard = lazy(() => import("@components/strategic/SurveyWizard"));

// ─── AUTH GUARD ─────────────────────────────────────────────────────────────
// If you have a real RequireAuth at @/components/auth/RequireAuth, swap this
// import in. For the BIRD Validation Survey, the survey itself is PUBLIC;
// auth is optional (for saving progress / personalized dashboards only).
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // TODO: wire to @/hooks/useAuth if you want protected admin routes later
  return <>{children}</>;
};

// ─── LOADING FALLBACK ───────────────────────────────────────────────────────
const AppLoadingFallback = React.memo(() => (
  <div className="min-h-screen bg-[#011a12] flex flex-col items-center justify-center p-6">
    <div className="relative mb-6">
      <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-[#C9A84C] shadow-2xl border border-white/20 animate-pulse bg-[#022c22] flex items-center justify-center">
        <span className="text-[#C9A84C] font-serif font-bold text-lg">BIRD</span>
      </div>
      <div className="absolute -bottom-2 -right-2 w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
    </div>
    <h2 className="text-[#ecfdf5] font-bold text-xl mb-2">
      Loading BIRD Validation Survey
    </h2>
    <p className="text-[#64748b] text-sm">
      Preparing the stakeholder validation instrument…
    </p>
  </div>
));

// ─── ERROR BOUNDARY ─────────────────────────────────────────────────────────
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("App Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#011a12] text-[#ecfdf5] flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-[#64748b] text-sm mb-4">
              {this.state.error?.message || "An unexpected error occurred."}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-lg bg-[#C9A84C] text-[#011a12] font-semibold text-sm hover:bg-[#C9A84C]/90 transition-all"
            >
              Reload Survey
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── QUERY CLIENT ───────────────────────────────────────────────────────────
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// ─── MAIN APP ───────────────────────────────────────────────────────────────
const App: React.FC = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="bird-survey-theme">
        <AppProvider>
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              style: {
                background: "#011a12",
                border: "1px solid rgba(201,168,76,0.2)",
                color: "#ecfdf5",
              },
            }}
          />
          <AppLayout>
            <Suspense fallback={<AppLoadingFallback />}>
              <Routes>
                {/* Landing / Orientation */}
                <Route path="/" element={<Index />} />

                {/* Public survey — no auth required for stakeholder participation */}
                <Route path="/validation-survey" element={<SurveyWizard />} />
                <Route path="/survey" element={<Navigate to="/validation-survey" replace />} />

                {/* Live Dashboard (public analytics) */}
                <Route path="/dashboard" element={<SurveyDashboard />} />

                {/* Redirects: old static HTML pages → SPA equivalents */}
                <Route path="/survey-orientation" element={<Navigate to="/" replace />} />
                <Route path="/survey-orientation.html" element={<Navigate to="/" replace />} />
                <Route path="/validation-survey.html" element={<Navigate to="/validation-survey" replace />} />
                <Route path="/survey-dashboard.html" element={<Navigate to="/dashboard" replace />} />

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AppLayout>
        </AppProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
