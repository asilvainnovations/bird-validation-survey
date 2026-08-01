// src/components/auth/AuthModal.tsx
import { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'login' | 'signup' | 'reset';
}

// Google's official four-color "G" mark. lucide-react has no brand icons,
// and using a plain lock/mail icon for "Continue with Google" would be
// unrecognizable — this is the one place an inline brand SVG is warranted.
function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

export function AuthModal({ isOpen, onClose, defaultView = 'login' }: AuthModalProps) {
  const [view, setView] = useState<'login' | 'signup' | 'reset'>(defaultView);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const { signIn, signUp, resetPassword, signInWithGoogle } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (view === 'login') {
        await signIn(email, password);
        setSuccess('Signed in successfully!');
        setTimeout(onClose, 1000);
      } else if (view === 'signup') {
        await signUp(email, password, fullName);
        setSuccess('Account created! Please check your email to confirm.');
      } else if (view === 'reset') {
        await resetPassword(email);
        setSuccess('Password reset link sent to your email.');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setGoogleLoading(true);
    try {
      // This redirects the browser to Google and back — it does not resolve
      // with a session here. The onAuthStateChange listener in useAuth picks
      // up the session once the redirect completes, so there's nothing to
      // await/setSuccess for on this line; only a thrown error (e.g. the
      // Google provider isn't enabled in the Supabase dashboard) is handled.
      await signInWithGoogle();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Could not start Google sign-in';
      setError(message);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md rounded-2xl border border-[#C9A84C]/30 bg-white dark:border-[#C9A84C]/20 dark:bg-gradient-to-b dark:from-[#022c22] dark:to-[#011a12] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 dark:text-white/40 dark:hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <h2 className="font-cinzel text-2xl font-bold text-[#1B4D3E] dark:text-[#C9A84C] mb-2">
            {view === 'login' ? 'Welcome Back' : view === 'signup' ? 'Get Started' : 'Reset Password'}
          </h2>
          <p className="text-slate-500 dark:text-white/50 text-sm">
            {view === 'login'
              ? 'Sign in to access your strategic plans'
              : view === 'signup'
                ? 'Create your BIRD account'
                : 'Enter your email to reset password'}
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-300 dark:bg-red-500/10 dark:border-red-500/30 p-3 text-red-700 dark:text-red-300 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg bg-green-50 border border-green-300 dark:bg-green-500/10 dark:border-green-500/30 p-3 text-green-700 dark:text-green-300 text-sm flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 dark:bg-green-400" />
            {success}
          </div>
        )}

        {/* ── Google OAuth ──
            GMAIL_OAUTH_CLIENT_ID / GMAIL_OAUTH_CLIENT_SECRET are configured
            in the Supabase Dashboard (Authentication → Providers → Google),
            not here — see the detailed comment in useAuth.ts's
            signInWithGoogle(). This button only triggers the redirect. */}
        {view !== 'reset' && (
          <>
            <button
              type="button"
              onClick={handleGmailSignIn}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-lg border border-slate-300 dark:border-white/15 bg-white dark:bg-white/5 text-slate-700 dark:text-white/90 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {googleLoading ? (
                <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
              ) : (
                <>
                  <GmailIcon />
                  Continue with Gmail
                </>
              )}
            </button>

            <div className="flex items-center gap-3 my-5">
              <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
              <span className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-white/30">or</span>
              <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
            </div>
          </>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {view === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-[#1B4D3E]/80 dark:text-[#C9A84C]/70 mb-1.5 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30" size={16} />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Juan dela Cruz"
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[#022c22] dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#1B4D3E]/80 dark:text-[#C9A84C]/70 mb-1.5 uppercase tracking-wider">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[#022c22] dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50"
                required
              />
            </div>
          </div>

          {view !== 'reset' && (
            <>
              <div>
                <label className="block text-xs font-medium text-[#1B4D3E]/80 dark:text-[#C9A84C]/70 mb-1.5 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30" size={16} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-10 pr-10 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[#022c22] dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:text-white/30 dark:hover:text-white transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {view === 'login' && (
                <div className="text-right -mt-2">
                  <button
                    type="button"
                    onClick={() => { setView('reset'); setError(''); setSuccess(''); }}
                    className="text-xs text-[#1B4D3E] dark:text-[#C9A84C] hover:text-[#0d2e22] dark:hover:text-[#E8C560] transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#C9A84C] text-[#022c22] font-bold hover:bg-[#E8C560] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
            ) : (
              <>
                {view === 'login' ? 'Sign In' : view === 'signup' ? 'Create Account' : 'Send Reset Link'}
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2 text-sm">
          {view === 'login' ? (
            <button
              onClick={() => { setView('signup'); setError(''); setSuccess(''); }}
              className="text-[#1B4D3E] dark:text-[#C9A84C] hover:text-[#0d2e22] dark:hover:text-[#E8C560] transition-colors"
            >
              Don&apos;t have an account? Sign up
            </button>
          ) : view === 'signup' ? (
            <button
              onClick={() => { setView('login'); setError(''); setSuccess(''); }}
              className="text-[#1B4D3E] dark:text-[#C9A84C] hover:text-[#0d2e22] dark:hover:text-[#E8C560] transition-colors"
            >
              Already have an account? Sign in
            </button>
          ) : (
            <button
              onClick={() => { setView('login'); setError(''); setSuccess(''); }}
              className="text-[#1B4D3E] dark:text-[#C9A84C] hover:text-[#0d2e22] dark:hover:text-[#E8C560] transition-colors"
            >
              Back to sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
