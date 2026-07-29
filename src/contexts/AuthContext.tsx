// src/contexts/AuthContext.tsx
// BIRD 2026–2035 · Shared Supabase Auth Context
//
// src/hooks/useAuth.ts subscribes directly to supabase.auth.onAuthStateChange
// inside its own useEffect. Called from multiple components, that would mean
// multiple independent subscriptions and multiple copies of auth state. This
// file calls useAuth() ONCE, at the root (see App.tsx), and every consumer
// (AppLayout, RequireAuth) reads from context instead — a single source of
// truth for "is the user signed in," not a re-subscribed copy per component.
//
// Mirrors the existing AppContext.tsx Provider+hook pattern in this repo —
// deliberately its own file, not merged into AppContext.tsx, since the two
// contexts serve unrelated concerns (sidebar UI state vs. auth session state)
// and conflating them into one file is exactly what caused today's break.

import React, { createContext, useContext } from "react";
import { useAuth as useAuthState } from "@/hooks/useAuth";

type AuthContextType = ReturnType<typeof useAuthState>;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuthState();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components -- intentional Provider+hook pairing
export const useAuthContext = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within an <AuthProvider>. Wrap the app root in App.tsx.");
  }
  return ctx;
};