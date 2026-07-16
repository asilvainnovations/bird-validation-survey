import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme-provider';
import { AppProvider } from '@/contexts/AppContext';
import { Toaster } from 'sonner';

// ─── LAZY LOADED PAGE COMPONENTS ────────────────────────────────────────────
const Index    = lazy(() => import('@/pages/Index'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// ─── LOADING FALLBACK ───────────────────────────────────────────────────────
const AppLoadingFallback = React.memo(() => (
  <div className="min-h-screen bg-[#011a12] flex flex-col items-center justify-center p-6">
    <div className="relative mb-6">
      <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-[#C9A84C] shadow-2xl border border-white/20 animate-pulse">
        <img
          src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/bird-images/MTIT%20Logo.png"
          alt="BIRD 2026-2035"
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>
      <div className="absolute -bottom-2 -right-2 w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
    </div>
    <h2 className="text-[#ecfdf5] font-bold text-xl mb-2">Loading BIRD Validation Survey</h2>
    <p className="text-[#64748b] text-sm">Preparing the stakeholder validation instrument…</p>
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
    console.error('App Error:', error, errorInfo);
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
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <button
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
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// ─── MAIN APP ───────────────────────────────────────────────────────────────
// Standalone BIRD Validation Survey — the 16-section stakeholder validation
// instrument is the only view; every alias routes to it.
const App: React.FC = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="bird-survey-theme">
        <AppProvider>
          <BrowserRouter>
            <Suspense fallback={<AppLoadingFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/validation-survey" element={<Index />} />
                <Route path="/survey" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Toaster
              position="top-right"
              richColors
              closeButton
              toastOptions={{
                style: {
                  background: '#011a12',
                  border: '1px solid rgba(201,168,76,0.2)',
                  color: '#ecfdf5',
                },
              }}
            />
          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
