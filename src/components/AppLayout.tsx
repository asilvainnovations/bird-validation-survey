// src/components/AppLayout.tsx
// BIRD 2026–2035 · Main Application Layout Shell
//
// Built from the version you uploaded, with the header/nav visual design,
// Sheet-based ContextPanel trigger, and mobile nav dropdown all kept intact.
// Three changes from that file, explained where they happen below:
//   1. Renders {children} instead of hardcoding <SurveyWizard/> — required
//      because App.tsx wraps EVERY route (Index, /dashboard, /validation-survey)
//      in this one shared AppLayout. Hardcoding SurveyWizard here means the
//      Dashboard route would render the survey instead of the dashboard.
//   2. FloatingAIAssistant restored alongside PlatformBadge (present in an
//      earlier version, missing from the one you uploaded).
//   3. Nav items wired to real destinations — see NAV_LINKS and the Sign In
//      button notes below.

import React, { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { useTheme } from '@/components/theme-provider';
import { BIRD_SITES } from '@/lib/bird-urls';

import { StratLogo } from '@/components/branding/Logo';
import { PlatformBadge } from '@/components/branding/PlatformBadge';
import { Toggle } from '@/components/ui/toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

import {
  LogIn, LogOut, Menu, X, Sun, Moon, BookOpen
} from 'lucide-react';

// ─── CORE COMPONENTS ────────────────────────────────────────────────────────────
// SurveyWizard is NOT imported here anymore — see header comment. ContextPanel
// and FloatingAIAssistant are layout chrome (they belong on every route), so
// they stay.
import ContextPanel from './strategic/ContextPanel';
import FloatingAIAssistant from './strategic/FloatingAIAssistant';

// ─── LAZY LOADED MODALS ─────────────────────────────────────────────────────────
const AuthModal = lazy(() => import('./auth/AuthModal').then((m) => ({ default: m.AuthModal })));
const UserProfileModal = lazy(() => import('./auth/UserProfileModal').then((m) => ({ default: m.UserProfileModal })));

// ─── NAVIGATION ─────────────────────────────────────────────────────────────────
// Each link now carries a `kind` so it's rendered correctly instead of every
// item being an identical <a target="_blank"> regardless of where it
// actually points:
//   - "step"     → internal survey deep-link. SurveyWizard has no URL-based
//                  routing for its 16 internal steps (step is local state,
//                  not reflected in the path), so the only way to tell it
//                  "jump to Section 0" from outside is the gotoStep router
//                  state read by the new useEffect in SurveyWizard.tsx.
//                  Clicking this always navigates to "/" first (where Index
//                  renders SurveyWizard), then requests the step.
//   - "internal" → a real SPA route (react-router), navigated in-app with no
//                  full page reload.
//   - "external" → a genuinely different, separately-hosted site
//                  (bird-resources.asilvainnovations.com) — a normal new-tab
//                  link is correct here, not a routing bug.
//   - "static"   → a real static HTML file this app serves from /public
//                  (privacy-policy.html), not an SPA route — a plain anchor
//                  causing a real navigation is correct here too.
type NavLink =
  | { label: string; kind: 'step'; step: number }
  | { label: string; kind: 'internal'; href: string }
  | { label: string; kind: 'external'; href: string }
  | { label: string; kind: 'static'; href: string };

const NAV_LINKS: NavLink[] = [
  { label: 'Orientation', kind: 'step', step: 0 },
  { label: 'Live Dashboard', kind: 'internal', href: '/dashboard' },
  { label: 'Resources', kind: 'external', href: BIRD_SITES.resources.url },
  { label: 'Privacy', kind: 'static', href: '/privacy-policy.html' },
];

// ─── MAIN LAYOUT ────────────────────────────────────────────────────────────────
interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  // useAuthContext(), not useAuth() directly: App.tsx wraps this whole tree
  // in <AuthProvider>, which already calls useAuth() once and owns the single
  // supabase.auth.onAuthStateChange subscription. Calling useAuth() again
  // here would open a second, independent subscription instead of reading
  // the shared one.
  const { user, profile, isAuthenticated, isLoading: authLoading, signOut } = useAuthContext();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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

  // Handles all four NavLink kinds. Passed to both the desktop nav and the
  // mobile dropdown so the routing logic exists in exactly one place.
  const handleNavClick = useCallback((link: NavLink, e: React.MouseEvent) => {
    if (link.kind === 'step') {
      e.preventDefault();
      navigate('/', { state: { gotoStep: link.step } });
      setMobileNavOpen(false);
    } else if (link.kind === 'internal') {
      e.preventDefault();
      navigate(link.href);
      setMobileNavOpen(false);
    }
    // 'external' and 'static' fall through to the anchor's native href/target
    // behavior — no preventDefault, nothing to intercept.
  }, [navigate]);

  const navHref = (link: NavLink) => (link.kind === 'step' ? '/' : link.href);
  const navExternalProps = (link: NavLink) =>
    link.kind === 'external' ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  // ── Full-screen loader while auth session initializes ──
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#011a12] flex flex-col items-center justify-center p-6">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-[#C9A84C] shadow-2xl border border-white/20 animate-pulse bg-[#022c22] flex items-center justify-center">
            <StratLogo size="lg" variant="icon" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
        </div>
        <h2 className="text-[#ecfdf5] font-bold text-xl mb-2">Loading BIRD Validation Survey</h2>
        <p className="text-[#ecfdf5]/50 text-sm">Preparing the stakeholder validation instrument…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#011a12] text-[#ecfdf5] flex flex-col relative">
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 border-b border-[#C9A84C]/15 bg-[#022c22]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">

          {/* Logo */}
          <a href={BIRD_SITES.home.url} className="flex items-center gap-3 min-w-0">
            <StratLogo size="sm" variant="icon" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#E8C560] leading-tight truncate">BIRD 2026–2035</p>
              <p className="text-[10px] uppercase tracking-widest text-[#ecfdf5]/50 leading-tight">Validation Survey</p>
            </div>
          </a>

          {/* Desktop Nav & Actions */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex items-center gap-1">
              {NAV_LINKS.map((l) => (
                
                  key={l.label}
                  href={navHref(l)}
                  {...navExternalProps(l)}
                  onClick={(e) => handleNavClick(l, e)}
                  className="px-3 py-2 text-xs font-medium text-[#ecfdf5]/70 hover:text-[#E8C560] rounded-lg hover:bg-white/5 transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="h-6 w-px bg-[#C9A84C]/20" />

            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <Toggle
                pressed={theme === 'dark'}
                onPressedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="text-[#ecfdf5]/60 hover:text-[#C9A84C] hover:bg-white/5 data-[state=on]:text-[#C9A84C] data-[state=on]:bg-[#C9A84C]/10"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </Toggle>

              {/* Context Panel Trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-[#ecfdf5]/60 hover:text-[#C9A84C] hover:bg-white/5">
                    <BookOpen className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[400px] sm:w-[540px] bg-[#011a12] border-[#C9A84C]/20 text-[#ecfdf5] overflow-y-auto">
                  <ContextPanel showAll compact={false} />
                </SheetContent>
              </Sheet>

              {/* Auth State — Sign In already correctly opens AuthModal via
                  showAuthModal state; kept exactly as in the uploaded file. */}
              {isAuthenticated ? (
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
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <Toggle
              pressed={theme === 'dark'}
              onPressedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-[#ecfdf5]/60 hover:text-[#C9A84C] hover:bg-white/5 data-[state=on]:text-[#C9A84C] data-[state=on]:bg-[#C9A84C]/10"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Toggle>
            <button
              onClick={() => setMobileNavOpen((v) => !v)}
              className="p-2 rounded-lg text-[#ecfdf5]/70 hover:bg-white/5 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileNavOpen && (
          <nav className="md:hidden border-t border-white/5 px-4 py-2 flex flex-col bg-[#022c22]/95">
            {NAV_LINKS.map((l) => (
              
                key={l.label}
                href={navHref(l)}
                {...navExternalProps(l)}
                onClick={(e) => handleNavClick(l, e)}
                className="px-2 py-2.5 text-sm text-[#ecfdf5]/80 hover:text-[#E8C560] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="border-t border-white/5 mt-2 pt-2">
              {isAuthenticated ? (
                <button
                  onClick={() => { handleSignOut(); setMobileNavOpen(false); }}
                  className="w-full flex items-center gap-2 px-2 py-2.5 text-sm text-rose-400 hover:bg-white/5 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign Out ({userDisplayInfo.name})
                </button>
              ) : (
                <button
                  onClick={() => { setShowAuthModal(true); setMobileNavOpen(false); }}
                  className="w-full flex items-center gap-2 px-2 py-2.5 text-sm text-[#C9A84C] hover:bg-white/5 transition-colors"
                >
                  <LogIn className="w-4 h-4" /> Sign In
                </button>
              )}
            </div>
          </nav>
        )}
      </header>

      {/* ── Page Content — renders whatever route was actually matched ── */}
      <main className="flex-1">
        {children}
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

      {/* ── Floating Elements — both restored: PlatformBadge was already
          here, FloatingAIAssistant was missing from the uploaded file. ── */}
      <PlatformBadge />
      <FloatingAIAssistant plan={null} activeView="survey" compact={true} />

      {/* ── Auth Modals ── */}
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
