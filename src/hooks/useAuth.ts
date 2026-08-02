import { useState, useEffect, useCallback } from 'react';
import { supabase, EDGE_FUNCTIONS } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  organization: string | null;
  job_title: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  notification_preferences: Record<string, boolean> | null;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    profile: null,
    isLoading: true,
    isAuthenticated: false,
    isAdmin: false,
  });

  const checkAdmin = useCallback(async (email: string): Promise<boolean> => {
    try {
      const { data } = await supabase
        .from('admins')
        .select('email')
        .eq('email', email.toLowerCase())
        .maybeSingle();
      return !!data;
    } catch {
      return false;
    }
  }, []);

  const fetchProfile = useCallback(async (userId: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (!data) {
        const { data: newProfile } = await supabase
          .from('user_profiles')
          .insert({
            id: userId,
            email,
            full_name: null,
            organization: null,
            job_title: null,
            phone: null,
            avatar_url: null,
            notification_preferences: {
              welcome_email: true,
              kpi_alerts: true,
              weekly_digest: true,
              stale_plan_reminders: true,
            },
          })
          .select()
          .maybeSingle();
        return newProfile as UserProfile;
      }

      if (error) throw error;
      return data as UserProfile;
    } catch (error) {
      console.error('Error fetching/creating profile:', error);
      return null;
    }
  }, []);

  const logVisit = useCallback(async (userId: string | null, email: string | null) => {
    try {
      const ua = navigator.userAgent;
      let device = 'Desktop';
      if (/mobile/i.test(ua)) device = 'Mobile';
      else if (/tablet|ipad/i.test(ua)) device = 'Tablet';
      await supabase.from('visit_logs').insert({
        user_id: userId,
        email,
        page: window.location.pathname,
        device,
        location: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
      });
    } catch {
      // best-effort logging
    }
  }, []);

  // ── Transactional email (best-effort, never blocks auth) ───────────────────
  // Posts to the email-notifications Edge Function
  // (EDGE_FUNCTIONS.EMAIL_NOTIFICATIONS resolves to
  // https://lydsisparsmvextskevw.supabase.co/functions/v1/email-notifications
  // when VITE_SUPABASE_URL is set to that project). The payload shape here
  // — { type: 'welcome', email, name } — matches WelcomePayload in
  // supabase/functions/email-notifications/index.ts exactly; the previous
  // version of this function sent `{ to: email }`, which the Edge Function's
  // `if (!payload.email)` check would have silently rejected every time.
  const sendWelcomeEmail = useCallback(async (email: string, name?: string) => {
    try {
      await fetch(EDGE_FUNCTIONS.EMAIL_NOTIFICATIONS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'welcome',
          email,
          name: name || email.split('@')[0],
        }),
      });
    } catch {
      // Silently fail — email is not critical for signup/login completion
    }
  }, []);

  // Google OAuth's first SIGNED_IN event fires for both brand-new and
  // returning users; profile.full_name is passed through for future use in
  // distinguishing them (e.g. by created_at), but is not required today since
  // a duplicate welcome email is a low-cost failure mode compared to missing
  // one entirely.
  const sendWelcomeEmailIfFirstSession = useCallback((email: string, fullName: string | null) => {
    void fullName;
    sendWelcomeEmail(email, fullName || undefined);
  }, [sendWelcomeEmail]);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const profile = await fetchProfile(session.user.id, session.user.email!);
          const isAdmin = await checkAdmin(session.user.email!);
          setAuthState({
            user: session.user,
            session,
            profile,
            isLoading: false,
            isAuthenticated: true,
            isAdmin,
          });
          logVisit(session.user.id, session.user.email!);
        } else {
          setAuthState({
            user: null, session: null, profile: null,
            isLoading: false, isAuthenticated: false, isAdmin: false,
          });
          logVisit(null, null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const profile = await fetchProfile(session.user.id, session.user.email!);
          const isAdmin = await checkAdmin(session.user.email!);
          setAuthState({
            user: session.user, session, profile,
            isLoading: false, isAuthenticated: true, isAdmin,
          });
          // A Google OAuth sign-in lands here (not in signUp()/signIn() below,
          // since the redirect completes outside those functions), so this is
          // also where a first-time Google login should get its welcome email.
          if (event === 'SIGNED_IN' && profile) {
            sendWelcomeEmailIfFirstSession(session.user.email!, profile.full_name);
          }
        } else {
          setAuthState({
            user: null, session: null, profile: null,
            isLoading: false, isAuthenticated: false, isAdmin: false,
          });
        }
      }
    );

    return () => { subscription.unsubscribe(); };
  }, [fetchProfile, checkAdmin, logVisit, sendWelcomeEmailIfFirstSession]);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName } },
    });
    if (error) throw error;

    if (data?.user) {
      sendWelcomeEmail(email, fullName);
    }

    return data;
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  /** Magic-link / OTP sign-in via email */
  const signInWithMagicLink = async (email: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/` },
    });
    if (error) throw error;
    return data;
  };

  // ── Gmail OAuth ─────────────────────────────────────────────────────────
  // IMPORTANT: GMAIL_OAUTH_CLIENT_ID / GMAIL_OAUTH_CLIENT_SECRET /
  // GOOGLE_REFRESH_TOKEN / CALLBACK_URL are NOT referenced anywhere in this
  // file, or anywhere in frontend code, on purpose. Supabase Auth handles the
  // entire GMAIL OAuth handshake server-side:
  //   Supabase Dashboard → Authentication → Providers → Google →
  //     Client ID:     GMAIL_OAUTH_CLIENT_ID
  //     Client Secret: GMAIL_OAUTH_CLIENT_SECRET
  //   (GOOGLE_REFRESH_TOKEN is not a Supabase Auth provider field — that's
  //   only needed if a server-side job calls Google APIs directly, e.g.
  //   sending mail via the Gmail API. It has no place in a login flow and
  //   must never be embedded in this repo or shipped to the browser.)
  //   Redirect / callback URL (already provided by Supabase, matches yours):
  //     https://lydsisparsmvextskevw.supabase.co/auth/v1/callback
  //   That value also needs to be added to the "Authorized redirect URIs"
  //   list in the Google Cloud Console OAuth client, not pasted into code.
  // The client only needs to call signInWithOAuth() below; Supabase redirects
  // to Google, Google redirects back to CALLBACK_URL, and Supabase completes
  // the session — which fires the onAuthStateChange listener above.
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
        queryParams: { access_type: 'offline', prompt: 'consent' },
      },
    });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  };

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!authState.user) throw new Error('Not authenticated');
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', authState.user.id)
      .select()
      .maybeSingle();
    if (error) throw error;
    setAuthState((prev) => ({ ...prev, profile: data as UserProfile }));
    return data;
  };

  const refreshProfile = async () => {
    if (!authState.user) return;
    const profile = await fetchProfile(authState.user.id, authState.user.email!);
    setAuthState((prev) => ({ ...prev, profile }));
  };

  return {
    ...authState,
    signUp, signIn, signInWithMagicLink, signInWithGoogle, signOut,
    resetPassword, updatePassword, updateProfile, refreshProfile,
  };
};
