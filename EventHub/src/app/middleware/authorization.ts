// src/app/middleware/authorization.ts

import type { AppContext } from "@/worker";
import type { UserRole } from "@/db/schema";

import { Errors } from "@/app/types/errors";
import { hasRole } from "@/app/lib/auth/role";

// Require authentication
export function requireAuth() {
  return ({ ctx }: { ctx: AppContext }): Response | void => {
    if (!ctx.user) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: Errors.UNAUTHORIZED,
            message: "Authentication required",
          },
        }),
        {
          status: 302,
          headers: { Location: "/login" },
        }
      );
    }

    if (!ctx.user.isActive) {
      return new Response(
        JSON.stringify({
          error: {
            code: Errors.FORBIDDEN,
            message: "Account deactivated",
          },
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  };
}

// Require role
export function requireRole(role: UserRole) {
  return ({ ctx }: { ctx: AppContext }): Response | void => {
    if (!ctx.user) {
      return new Response(null, {
        status: 302,
        headers: { Location: "/login" },
      });
    }

    if (!hasRole(ctx.user, role)) {
      return new Response(
        JSON.stringify({
          error: {
            code: Errors.FORBIDDEN,
            message: "Utilstrekkelige rettigheter",
          },
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  };
}

// Require admin role
export function requireAdmin() {
  return requireRole("admin");
}