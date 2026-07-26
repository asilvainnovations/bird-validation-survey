import { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'login' | 'signup' | 'reset';
}

export function AuthModal({ isOpen, onClose, defaultView = 'login' }: AuthModalProps) {
  const [view, setView] = useState<'login' | 'signup' | 'reset'>(defaultView);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
    setSuccess('');
    setLoading(true);
    try {
      await signInWithGoogle();
      // OAuth redirect happens — no immediate success message needed
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Google sign-in failed';
      setError(message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md rounded-2xl border border-[#C9A84C]/20 bg-gradient-to-b from-[#022c22] to-[#011a12] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          type="button"
          onClick={onClose} 
          className="absolute right-4 top-4 text-[#ecfdf5]/40 hover:text-[#ecfdf5] transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#C9A84C] mb-2">
            {view === 'login' ? 'Welcome Back' : view === 'signup' ? 'Get Started' : 'Reset Password'}
          </h2>
          <p className="text-[#ecfdf5]/50 text-sm">
            {view === 'login' ? 'Sign in to access your BIRD account' : view === 'signup' ? 'Create your BIRD account' : 'Enter your email to reset password'}
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-red-300 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3 text-emerald-300 text-sm">
            {success}
          </div>
        )}

        {/* Google Sign In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full mb-4 flex items-center justify-center gap-2 rounded-xl border border-[#C9A84C]/20 bg-white/5 hover:bg-white/10 px-4 py-3 text-sm text-[#ecfdf5] transition-all disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#C9A84C]/20" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-[#022c22] px-2 text-[#ecfdf5]/40">or use email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {view === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-[#C9A84C]/70 mb-1.5 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ecfdf5]/30" size={16} />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Juan dela Cruz"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#011a12] border border-[#C9A84C]/20 text-[#ecfdf5] text-sm placeholder:text-[#ecfdf5]/20 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/30"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#C9A84C]/70 mb-1.5 uppercase tracking-wider">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ecfdf5]/30" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#011a12] border border-[#C9A84C]/20 text-[#ecfdf5] text-sm placeholder:text-[#ecfdf5]/20 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/30"
                required
              />
            </div>
          </div>

          {view !== 'reset' && (
            <div>
              <label className="block text-xs font-medium text-[#C9A84C]/70 mb-1.5 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ecfdf5]/30" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-[#011a12] border border-[#C9A84C]/20 text-[#ecfdf5] text-sm placeholder:text-[#ecfdf5]/20 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/30"
                  required={true}
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ecfdf5]/30 hover:text-[#ecfdf5]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E8C560] text-[#022c22] font-semibold py-3 hover:opacity-90 transition-all disabled:opacity-50"
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
            <>
              <button 
                type="button"
                onClick={() => { setView('signup'); setError(''); setSuccess(''); }} 
                className="text-[#C9A84C] hover:text-[#E8C560] transition-colors block mx-auto"
              >
                Don't have an account? Sign up
              </button>
              <button 
                type="button"
                onClick={() => { setView('reset'); setError(''); setSuccess(''); }} 
                className="text-[#ecfdf5]/40 hover:text-[#ecfdf5]/60 transition-colors block mx-auto"
              >
                Forgot password?
              </button>
            </>
          ) : view === 'signup' ? (
            <button 
              type="button"
              onClick={() => { setView('login'); setError(''); setSuccess(''); }} 
              className="text-[#C9A84C] hover:text-[#E8C560] transition-colors block mx-auto"
            >
              Already have an account? Sign in
            </button>
          ) : (
            <button 
              type="button"
              onClick={() => { setView('login'); setError(''); setSuccess(''); }} 
              className="text-[#C9A84C] hover:text-[#E8C560] transition-colors block mx-auto"
            >
              Back to sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
