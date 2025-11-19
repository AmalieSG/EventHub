// src/app/context/AuthProvider.tsx
"use client";
import { createContext, useState, useCallback, type ReactNode } from "react";
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

  // Login handler updates user state
  const login = useCallback((newUser: SafeUser) => {
    setUser(newUser);
  }, []);

  // Logout handler clears state and redirects
  const logout = useCallback(() => {
    setUser(null);
    // Redirect to login page after logout
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