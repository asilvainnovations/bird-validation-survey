// src/components/AppLayout.tsx
// BIRD 2026–2035 · Main Application Layout Shell
//
// This is a SHARED shell — App.tsx wraps every route in exactly one
// <AppLayout>. It renders whatever {children} it's given and nothing else;
// it must never hardcode a specific page's content (that was the earlier
// TS2559 bug: AppLayout hardcoded <SurveyWizard/> and ignored children,
// which also broke every other route since AppLayout never looked at what
// page it was supposed to show).

import React, { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useTheme } from '@/components/theme-provider';
import { BIRD_SITES } from '@/lib/bird-urls';

import { StratLogo } from '@/components/branding/Logo';
import { PlatformBadge } from '@/components/branding/PlatformBadge';
import { Toggle } from '@/components/ui/toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

import { LogIn, Menu, Sun, Moon, BookOpen } from 'lucide-react';

// Core survey components — ContextPanel only (SurveyWizard removed: see
// header comment above, AppLayout must not hardcode page content)
import ContextPanel from './strategic/ContextPanel';

// Lazy loaded modals for performance optimization
const AuthModal = lazy(() => import('./auth/AuthModal').then((m) => ({ default: m.AuthModal })));
const UserProfileModal = lazy(() => import('./auth/UserProfileModal').then((m) => ({ default: m.UserProfileModal })));

// Static companion page links (Aligned with bird-urls.ts) — kept as-is
const NAV_LINKS = [
  { label: 'Orientation', href: BIRD_SITES.surveyBriefing.url },
  { label: 'Live Dashboard', href: BIRD_SITES.surveyDashboard.url },
  { label: 'Resources', href: BIRD_SITES.resources.url },
  { label: 'Privacy', href: '/privacy-policy.html' },
] as const;

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  // useAuthContext(), not useAuth(): App.tsx already wraps this whole tree in
  // <AuthProvider>, which calls useAuth() exactly once and subscribes to
  // supabase.auth.onAuthStateChange a single time. Calling useAuth() again
  // here would open a second, independent subscription instead of reading
  // the shared one — harmless but wasteful, and the two copies of state
  // could theoretically update on different ticks.
  const { user, profile, isAuthenticated, isLoading: authLoading, signOut } = useAuthContext();
  const { theme, setTheme } = useTheme();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [contextPanelOpen, setContextPanelOpen] = useState(false);

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

  // Full-screen loader while auth session initializes
  if (authLoading) {
    return (
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
    );
  }

  return (
    <div className="min-h-screen bg-[#011a12] text-[#ecfdf5] flex flex-col">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 w-full border-b border-[#C9A84C]/20 bg-[#011a12]/95 backdrop-blur supports-[backdrop-filter]:bg-[#011a12]/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            {/* Mobile nav Sheet (hamburger) */}
            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-[#ecfdf5]">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-[#011a12] border-[#C9A84C]/20 text-[#ecfdf5]">
                <div className="flex flex-col gap-6 p-6">
                  <div className="flex items-center gap-2">
                    <StratLogo className="h-8 w-8" />
                    <span className="font-bold text-lg text-[#C9A84C]">BIRD Survey</span>
                  </div>
                  <nav className="flex flex-col gap-4">
                    {NAV_LINKS.map((link) => (
                      
                        key={link.label}
                        href={link.href}
                        className="text-sm font-medium text-[#ecfdf5]/80 hover:text-[#C9A84C] transition-colors"
                        onClick={() => setMobileNavOpen(false)}
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            <a href="/" className="flex items-center gap-2">
              <StratLogo className="h-8 w-8" />
              <span className="font-bold text-lg text-[#C9A84C] hidden sm:inline-block">BIRD Validation Survey</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <nav className="hidden md:flex items-center gap-4">
              {NAV_LINKS.map((link) => (
                
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-[#ecfdf5]/80 hover:text-[#C9A84C] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Context Panel Sheet — separate from the mobile nav Sheet above.
                Available on both mobile and desktop via the BookOpen icon. */}
            <Sheet open={contextPanelOpen} onOpenChange={setContextPanelOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#ecfdf5]/70 hover:text-[#C9A84C] hover:bg-[#C9A84C]/10"
                  aria-label="Open context and references"
                >
                  <BookOpen className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[380px] sm:w-[480px] bg-[#011a12] border-[#C9A84C]/20 text-[#ecfdf5] overflow-y-auto">
                <ContextPanel showAll compact={false} />
              </SheetContent>
            </Sheet>

            <Toggle
              variant="outline"
              size="sm"
              className="border-[#C9A84C]/20 text-[#ecfdf5] data-[state=on]:bg-[#C9A84C]/20 data-[state=on]:text-[#C9A84C]"
              pressed={theme === 'dark'}
              onPressedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </Toggle>

            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="sm"
                className="text-[#ecfdf5] hover:bg-[#C9A84C]/20 hover:text-[#C9A84C]"
                onClick={() => setShowProfileModal(true)}
              >
                <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#C9A84C] text-[#011a12] text-xs font-bold">
                  {userDisplayInfo.initials}
                </div>
                <span className="hidden sm:inline">{userDisplayInfo.name}</span>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="border-[#C9A84C]/50 text-[#C9A84C] hover:bg-[#C9A84C]/10"
                onClick={() => setShowAuthModal(true)}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* ── Main Content Area — renders whatever route/page was passed in ── */}
      <main className="flex-1 container py-6">
        {children}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-[#C9A84C]/20 bg-[#011a12] py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-[#ecfdf5]/60 md:text-left">
            © {new Date().getFullYear()} Bangsamoro Autonomous Region in Muslim Mindanao (BARMM). All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="/privacy-policy.html" className="text-sm text-[#ecfdf5]/60 hover:text-[#C9A84C] transition-colors">
              Privacy Policy
            </a>
            <a href="/cookie-policy.html" className="text-sm text-[#ecfdf5]/60 hover:text-[#C9A84C] transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </footer>

      {/* ── Floating MTIT badge ── */}
      <div className="fixed bottom-4 right-4 z-40">
        <PlatformBadge />
      </div>

      {/* ── Auth Modals (Lazy Loaded) ──
          AuthModal / UserProfileModal both take { isOpen, onClose } — the
          previous version of this file called them with open/onOpenChange/
          user/onSignOut, none of which exist on either component's real
          props interface (both were TS2322/TS2741 errors once the JSX
          parse error above them was fixed). UserProfileModal reads user
          state itself via useAuth() internally; it doesn't take user or
          onSignOut as props. */}
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
