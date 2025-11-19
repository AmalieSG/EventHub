"use client";

import { createContext, useState, useCallback, type ReactNode, useEffect } from "react";
import type { SafeUser } from "@/db/schema";

export interface AuthContextType {
  user: SafeUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: SafeUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
  initialUser?: SafeUser | null;
}

export function AuthProvider({
  children,
  initialUser = null,
}: AuthProviderProps) {
  const [user, setUser] = useState<SafeUser | null>(initialUser);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const cookies = document.cookie.split('; ');
    const sessionCookie = cookies.find(row => row.startsWith('sessionId='));
    const id = sessionCookie ? sessionCookie.split('=')[1] : null;
    setSessionId(id);
  }, []);
  // Login handler oppdaterer user state
  const login = useCallback((newUser: SafeUser) => {
    setUser(newUser);
  }, []);

  // Logout handler nullstiller state og redirecter
  const logout = useCallback(() => {
    setUser(null);
    // Redirect til login page etter logout
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    login,
    logout,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
}