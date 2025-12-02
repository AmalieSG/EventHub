"use client";

import { useEffect, useState } from "react";
import type { SafeUser } from "@/db/schema";
import { getCurrentUser } from "../api/auth/authServerActions";
import type { ServerResult } from "../types/result";

type CurrentUserResult = ServerResult<SafeUser>;

export function useCurrentUser() {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);

        const res = (await getCurrentUser()) as CurrentUserResult;

        if (!cancelled && res.success) {
          setUser(res.data);
        }
      } catch (err) {
        console.error("useCurrentUser – failed to load user:", err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { user, loading, isAuthenticated: !!user };
}
