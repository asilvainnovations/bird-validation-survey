// src/components/AppLayout.tsx
// BIRD 2026–2035 · Validation Survey Shell
// Standalone layout for the 16-section stakeholder validation survey:
// brand header → SurveyWizard → policy footer, with optional sign-in.

import React, { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { StratLogo } from '@/components/branding/Logo';
import { PlatformBadge } from '@/components/branding/PlatformBadge';
import { Loader2, LogIn, LogOut, Menu, X } from 'lucide-react';

// ─── SURVEY CORE ────────────────────────────────────────────────────────────
import SurveyWizard from './strategic/SurveyWizard';

// ─── LAZY: auth modals (only needed when the user chooses to sign in) ───────
const AuthModal        = lazy(() => import('./auth/AuthModal').then((m) => ({ default: m.AuthModal })));
const UserProfileModal = lazy(() => import('./auth/UserProfileModal').then((m) => ({ default: m.UserProfileModal })));

// ─── STATIC COMPANION PAGES (served from /public) ───────────────────────────
const NAV_LINKS = [
  { label: 'Orientation',    href: '/survey-orientation.html' },
  { label: 'Live Dashboard', href: '/survey-dashboard.html' },
  { label: 'Resources',      href: '/resources.html' },
  { label: 'Privacy',        href: '/privacy-policy.html' },
] as const;

// ─── MAIN LAYOUT ────────────────────────────────────────────────────────────
const AppLayout: React.FC = () => {
  const { user, profile, isAuthenticated, isLoading: authLoading, signOut } = useAuth();

  const [showAuthModal, setShowAuthModal]       = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [mobileNavOpen, setMobileNavOpen]       = useState(false);

  const userDisplayInfo = useMemo(() => {
    const email = user?.email || '';
    const name = profile?.full_name || email.split('@')[0] || 'Respondent';
    const initials = (profile?.full_name || email)
      .split(/[\s@]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join('') || 'R';
    return { name, email, initials };
  }, [user, profile]);

  const handleSignOut = useCallback(async () => {
    await signOut();
    setShowProfileModal(false);
  }, [signOut]);

  return (
    <div className="min-h-screen bg-[#011a12] text-[#ecfdf5] flex flex-col">
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 border-b border-[#C9A84C]/15 bg-[#022c22]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          <a href="/" className="flex items-center gap-3 min-w-0">
            <StratLogo size="sm" variant="icon" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#E8C560] leading-tight truncate">
                BIRD 2026–2035
              </p>
              <p className="text-[10px] uppercase tracking-widest text-[#ecfdf5]/50 leading-tight">
                Validation Survey
              </p>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-xs font-medium text-[#ecfdf5]/70 hover:text-[#E8C560] rounded-lg hover:bg-white/5 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {authLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#C9A84C]" />
            ) : isAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  title={userDisplayInfo.email}
                >
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#064e3b] flex items-center justify-center text-[10px] font-bold text-white">
                    {userDisplayInfo.initials}
                  </span>
                  <span className="hidden sm:inline text-xs font-medium max-w-[120px] truncate">
                    {userDisplayInfo.name}
                  </span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-lg text-[#ecfdf5]/60 hover:text-rose-400 hover:bg-white/5 transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#C9A84C]/10 hover:bg-[#C9A84C]/20 text-[#C9A84C] text-xs font-bold border border-[#C9A84C]/30 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" /> Sign In
              </button>
            )}

            {/* Mobile nav toggle */}
            <button
              onClick={() => setMobileNavOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-[#ecfdf5]/70 hover:bg-white/5 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileNavOpen && (
          <nav className="md:hidden border-t border-white/5 px-4 py-2 flex flex-col">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-2 py-2.5 text-sm text-[#ecfdf5]/80 hover:text-[#E8C560] transition-colors"
                onClick={() => setMobileNavOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* ── Survey ── */}
      <main className="flex-1">
        <SurveyWizard />
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 bg-[#011a12]">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#ecfdf5]/40">
          <p>
            © {new Date().getFullYear()} BOI-MTIT, BARMM · BIRD 2026–2035 Validation Survey · Developed by ASilva Innovations
          </p>
          <div className="flex items-center gap-4">
            <a href="/privacy-policy.html" className="hover:text-[#E8C560] transition-colors">Privacy Policy</a>
            <a href="/cookie-policy.html" className="hover:text-[#E8C560] transition-colors">Cookie Policy</a>
            <a href="mailto:boi@bangsamoro.gov.ph" className="hover:text-[#E8C560] transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* ── Floating MTIT badge ── */}
      <PlatformBadge />

      {/* ── Auth modals ── */}
      <Suspense fallback={null}>
        {showAuthModal && (
          <AuthModal isOpen onClose={() => setShowAuthModal(false)} />
        )}
        {showProfileModal && (
          <UserProfileModal isOpen onClose={() => setShowProfileModal(false)} />
        )}
      </Suspense>
    </div>
  );
};

export default AppLayout;
