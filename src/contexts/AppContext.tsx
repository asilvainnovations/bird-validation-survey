import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  user: { email: string } | null;
  profile: { full_name?: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: false,
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user] = useState<AuthContextType["user"]>(null);
  const [profile] = useState<AuthContextType["profile"]>(null);
  const [isLoading] = useState(false);

  const signOut = async () => {
    // Wire to Supabase auth.signOut() when ready
  };

  return (
    <AuthContext.Provider value={{ user, profile, isAuthenticated: !!user, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);