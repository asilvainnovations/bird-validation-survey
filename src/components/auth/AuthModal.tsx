import { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

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

  const { signIn, signUp, resetPassword } = useAuth();

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md rounded-2xl border border-[#C9A84C]/20 bg-gradient-to-b from-[#022c22] to-[#011a12] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-white/40 hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#E8C560] mb-2">
            {view === 'login' ? 'Welcome Back' : view === 'signup' ? 'Get Started' : 'Reset Password'}
          </h2>
          <p className="text-white/60 text-sm">
            {view === 'login' ? 'Sign in to access your strategic plans' : view === 'signup' ? 'Create your BIRD account' : 'Enter your email to reset password'}
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {view === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-[#C9A84C]/80 mb-1.5 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Juan dela Cruz"
                  className="w-full pl-10 py-2.5 rounded-lg bg-white/5 border border-white/10 text-[#ecfdf5] placeholder:text-white/40 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-all"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#C9A84C]/80 mb-1.5 uppercase tracking-wider">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-10 py-2.5 rounded-lg bg-white/5 border border-white/10 text-[#ecfdf5] placeholder:text-white/40 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-all"
                required
              />
            </div>
          </div>

          {view !== 'reset' && (
            <div>
              <label className="block text-xs font-medium text-[#C9A84C]/80 mb-1.5 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-white/5 border border-white/10 text-[#ecfdf5] placeholder:text-white/40 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-all"
                  required={true}
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-[#C9A84C] text-[#011a12] font-bold text-sm hover:bg-[#E8C560] transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
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
              <button onClick={() => { setView('signup'); setError(''); setSuccess(''); }} className="text-[#C9A84C] hover:text-[#E8C560] transition-colors font-medium">
                Don't have an account? Sign up
              </button>
              <br />
              <button onClick={() => { setView('reset'); setError(''); setSuccess(''); }} className="text-white/60 hover:text-white transition-colors">
                Forgot password?
              </button>
            </>
          ) : view === 'signup' ? (
            <button onClick={() => { setView('login'); setError(''); setSuccess(''); }} className="text-[#C9A84C] hover:text-[#E8C560] transition-colors font-medium">
              Already have an account? Sign in
            </button>
          ) : (
            <button onClick={() => { setView('login'); setError(''); setSuccess(''); }} className="text-[#C9A84C] hover:text-[#E8C560] transition-colors font-medium">
              Back to sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
