import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { StratLogo } from '@/components/branding/Logo';
import { PlatformBadge } from '@/components/branding/PlatformBadge';
import { AuthModal } from '@/components/auth/AuthModal';
import { useTheme } from '@/components/theme-provider';
import { Toggle } from '@/components/ui/toggle';
import { Loader2, LogIn, LogOut, Menu, X, Sun, Moon } from 'lucide-react';

// ─── SURVEY CORE ────────────────────────────────────────────────────────────
import SurveyWizard from './strategic/SurveyWizard';

// ─── STATIC COMPANION PAGES (served from /public) ───────────────────────────
const NAV_LINKS = [
  { label: 'Orientation', href: '/survey-orientation.html' },
  { label: 'Live Dashboard', href: '/survey-dashboard.html' },
  { label: 'Resources', href: '/resources.html' },
  { label: 'Privacy', href: '/privacy-policy.html' },
] as const;

// ─── MAIN LAYOUT ────────────────────────────────────────────────────────────
const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { user, profile, isAuthenticated, isLoading: authLoading, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const userDisplayInfo = React.useMemo(() => {
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

  const handleSignOut = async () => {
    await signOut();
  };

  // ── Full-screen loader while auth session initializes ──
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#011a12] flex flex-col items-center justify-center p-6">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-[#C9A84C] shadow-2xl border border-white/20 animate-pulse">
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
    <div className="min-h-screen bg-[#011a12] text-[#ecfdf5] flex flex-col">
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 border-b border-[#C9A84C]/15 bg-[#022c22]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          
          {/* Logo */}
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

          {/* Desktop Nav & Actions */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex items-center gap-1">
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

              {/* Auth State */}
              {authLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#C9A84C]" />
              ) : isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-end mr-1">
                    <span className="text-xs font-medium text-[#ecfdf5] truncate max-w-[120px]">
                      {userDisplayInfo.name}
                    </span>
                    <span className="text-[10px] text-[#ecfdf5]/50 truncate max-w-[120px]">
                      {userDisplayInfo.email}
                    </span>
                  </div>
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
              <a
                key={l.href}
                href={l.href}
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

        {/* ── Survey ── */}
  <main className="flex-1">
    <SurveyWizard /> {/* <-- Rendered here */}
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

      {/* ── Auth Modal ── */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
};

export default AppLayout;
