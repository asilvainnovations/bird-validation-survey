// src/components/auth/RequireAuth.tsx
// BIRD 2026–2035 · Route guard
//
// Rewritten 2026-08-02. Two problems with the previous version, both fixed
// here:
//   1. It called supabase.auth.getSession()/onAuthStateChange directly, in
//      its own independent useEffect — exactly the "multiple independent
//      subscriptions" problem AuthContext.tsx's own header comment describes
//      this app's architecture as being built to avoid. Now reads from
//      useAuthContext() instead, the single shared source of truth.
//   2. It redirected unauthenticated visitors to `/login` — a route that
//      doesn't exist anywhere in this app's routes (see App.tsx). This app's
//      auth UX is modal-based (AppLayout's "Sign In" button opens
//      <AuthModal>), not page-based — there was never a login page for that
//      redirect to land on. Now redirects to "/" with router state that
//      AppLayout reads to have BIRD AI proactively open and explain the
//      sign-in requirement, rather than sending visitors to a dead route.

import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) {
    // Matches AppLayout's own branded full-screen loader rather than a bare
    // unstyled string, so a mid-auth-check redirect doesn't feel jarring.
    return (
      <div className="min-h-screen bg-[#011a12] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/"
        state={{ requireSignIn: true, from: location }}
        replace
      />
    );
  }

  return <>{children}</>;
}
