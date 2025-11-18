// app/lib/auth/role.ts

import type { SafeUser, UserRole } from "@/db/schema";

// Type guards for role-based checks
export const isAdmin = (user: SafeUser | null): boolean => {
  return user?.role === "admin";
};

export const isUser = (user: SafeUser | null): boolean => {
  return user !== null;
};

export const hasRole = (user: SafeUser | null, role: UserRole): boolean => {
  if (!user) return false;
  if (role === "admin") return user.role === "admin";
  return true; // All authenticated users have "user" role
};

// Only admin can delete questions (for now)
export const canDeleteQuestion = (user: SafeUser | null): boolean => {
  if (!user) return false;
  return isAdmin(user);
};

// Only admin can edit questions (for now)
export const canEditQuestion = (user: SafeUser | null): boolean => {
  if (!user) return false;
  return isAdmin(user);
};

// Only admin can mutate questions (for now)
export const canMutateQuestion = (user: SafeUser | null): boolean => {
  if (!user) return false;
  return isAdmin(user);
};