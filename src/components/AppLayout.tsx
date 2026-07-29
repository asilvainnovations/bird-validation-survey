// src/components/AppLayout.tsx
// BIRD 2026–2035 · Validation Survey Shell
// Contains ALL visual chrome: header, footer, nav, AuthModal, FloatingAIAssistant,
// ContextPanel, and theme toggle. Renders {children} as the main page content.

import React, { useState, useMemo, useCallback, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import { useTheme } from "@/components/theme-provider";
import { BIRD_SITES } from "@/lib/bird-urls";

import { StratLogo } from "@/components/branding/Logo";
import { PlatformBadge } from "@/components/branding/PlatformBadge";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { ContextPanel } from "@/components/strategic/ContextPanel";
import FloatingAIAssistant from "@/components/strategic/FloatingAIAssistant";

import {
  LogIn,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";

// ─── LAZY LOADED MODALS ─────────────────────────────────────────────────────
// NOTE: this repo's actual auth surface is AuthModal (login/signup) +
// UserProfileModal (account/sign-out), not separate Login/Logout/UserProfile
// components — there are no such files under src/components/auth today.
// Wiring against files that don't exist would just be new dead code, so this
// layout uses what's actually there. If dedicated Login/Logout/UserProfile
// components are added later, swap the two lazy imports below; useAuth()'s
// return shape (user, profile, isAuthenticated, isLoading, signOut) already
// supports either.
const AuthModal = lazy(() => import("./auth/AuthModal").then((m) => ({ default: m.AuthModal })));
const UserProfileModal = lazy(() => import("./auth/UserProfileModal").then((m) => ({ default: m.UserProfileModal })));

// ─── NAVIGATION ─────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Orientation", href: "/", external: false },
  { label: "Live Dashboard", href: "/dashboard", external: false },
  { label: "Resources", href: BIRD_SITES.resources.url, external: true },
  { label: "Privacy", href: "/privacy-policy.html", external: true },
] as const;

// ─── RequireAuth ────────────────────────────────────────────────────────────
// The BIRD Validation Survey is intentionally public — stakeholders must be
// able to submit without creating an account (see survey-submit's anon RLS
// policy). This guard exists for future admin-only routes (e.g. a raw
// response review page) and currently passes children through unconditionally
// while authentication is still loading or absent, redirecting nothing. It
// reads real auth state from useAuth() rather than being a no-op stub, so
// it's ready to gate a route the moment one needs it:
//
//   <RequireAuth><AdminReviewPage /></RequireAuth>
//
// To actually enforce it, uncomment the redirect below once an admin route
// exists — left inert here to avoid rejecting real stakeholder respondents.
export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // return <Navigate to="/" replace />; // enable once an admin-only route exists
    console.warn("[RequireAuth] Route reached without authentication — currently non-blocking.");
  }

  return <>{children}</>;
};

// ─── MAIN LAYOUT ────────────────────────────────────────────────────────────
const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { user, profile, isAuthenticated, isLoading: authLoading, signOut } = useAuthContext();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [contextPanelOpen, setContextPanelOpen] = useState(false);

  // Derive section ID for ContextPanel context-awareness
  const sectionId = useMemo(() => {
    const path = location.pathname;
    if (path.includes("section") || path === "/" || path === "/validation-survey") {
      const match = path.match(/section(\d+)/);
      return match ? `section${match[1]}` : "section0";
    }
    return undefined;
  }, [location.pathname]);

  // Hide global header/footer on survey route to prevent duplication with SurveyWizard's own chrome
  const isSurveyRoute = location.pathname === "/" || location.pathname === "/validation-survey";

  const userDisplayInfo = useMemo(() => {
    const email = user?.email || "";
    const name = profile?.full_name || email.split("@")[0] || "Respondent";
    const initials = (profile?.full_name || email)
      .split(/[\s@]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("") || "R";
    return { name, email, initials };
  }, [user, profile]);

  const handleSignOut = useCallback(async () => {
    await signOut();
    setShowProfileModal(false);
  }, [signOut]);

  // ── Auth loading screen ──
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
      
      {/* ═══════════════════════════════════════════════════════════════════════
          HEADER (hidden on survey route)
          ═══════════════════════════════════════════════════════════════════════ */}
      {!isSurveyRoute && (
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

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4">
              <nav className="flex items-center gap-1">
                {NAV_LINKS.map((l) => (
                  <a key={l.label}
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="px-3 py-2 text-xs font-medium text-[#ecfdf5]/70 hover:text-[#E8C560] rounded-lg hover:bg-white/5 transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
              
              <div className="h-6 w-px bg-[#C9A84C]/20" />
              
              <div className="flex items-center gap-2">
                {/* Context Panel Toggle */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setContextPanelOpen((v) => !v)}
                  className="text-[#ecfdf5]/60 hover:text-[#C9A84C] hover:bg-white/5 text-xs"
                >
                  {contextPanelOpen ? <PanelRightOpen className="w-4 h-4" /> : <PanelRightClose className="w-4 h-4" />}
                  <span className="ml-1 hidden lg:inline">Context</span>
                </Button>

                {/* Theme Toggle */}
                <Toggle
                  pressed={theme === "dark"}
                  onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="text-[#ecfdf5]/60 hover:text-[#C9A84C] hover:bg-white/5 data-[state=on]:text-[#C9A84C] data-[state=on]:bg-[#C9A84C]/10"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </Toggle>

                {/* Auth — dynamic: shows Sign In when logged out, avatar + Sign Out when authenticated */}
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

            {/* Mobile Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <Toggle
                pressed={theme === "dark"}
                onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-[#ecfdf5]/60 hover:text-[#C9A84C] hover:bg-white/5 data-[state=on]:text-[#C9A84C] data-[state=on]:bg-[#C9A84C]/10"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
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
                <a key={l.label}
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="px-2 py-2.5 text-sm text-[#ecfdf5]/80 hover:text-[#E8C560] transition-colors"
                  onClick={() => setMobileNavOpen(false)}
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
      )}

      {/* ── Main Content + Context Panel ── */}
      <div className="flex-1 flex relative">
        <main className="flex-1 min-w-0">{children}</main>

        {/* Context Panel Sidebar (desktop) */}
        {contextPanelOpen && !isSurveyRoute && (
          <>
            <aside className="hidden lg:block w-80 xl:w-96 border-l border-[#C9A84C]/15 bg-[#011a12]/90 backdrop-blur-md overflow-y-auto">
              <div className="p-4 sticky top-0">
                <ContextPanel sectionId={sectionId} showAll={!sectionId} compact={false} />
              </div>
            </aside>
            {/* Context Panel Drawer (mobile) */}
            <div className="lg:hidden fixed inset-0 z-50 flex">
              <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setContextPanelOpen(false)} />
              <div className="w-80 bg-[#011a12] border-l border-[#C9A84C]/15 overflow-y-auto">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-[#C9A84C]">Context & References</h3>
                    <button type="button" onClick={() => setContextPanelOpen(false)} className="p-1 rounded hover:bg-white/5">
                      <X className="w-4 h-4 text-[#ecfdf5]/60" />
                    </button>
                  </div>
                  <ContextPanel sectionId={sectionId} showAll={!sectionId} compact={true} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          FOOTER (hidden on survey route)
          ═══════════════════════════════════════════════════════════════════════ */}
      {!isSurveyRoute && (
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
      )}

      {/* ── Floating Elements ── */}
      <PlatformBadge />
      <FloatingAIAssistant plan={null} activeView={isSurveyRoute ? "survey" : (sectionId || "survey")} compact={true} />

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