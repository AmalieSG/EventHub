// src/app/middleware/authentication.ts

import type { AppContext } from "@/worker";
import { extractSessionFromCookies, getSession } from "@/app/lib/auth/session";

/**
 * Authentication middleware that runs on all requests
 * Sets ctx.user and ctx.session based on session cookie
 */
export async function authenticationMiddleware({
  ctx,
  request,
}: {
  ctx: AppContext;
  request: Request;
}) {
  // Default - no user logged in
  ctx.user = null;
  ctx.session = null;

  try {
    // Get session cookie
    const cookies = request.headers.get("cookie");
    if (!cookies) {
      return;
    }

    const sessionId = extractSessionFromCookies(cookies);
    if (!sessionId) {
      return;
    }

    // Get session and user data
    const sessionResult = await getSession(sessionId);

    if (!sessionResult.success || !sessionResult.data) {
      return;
    }

    const { session, user } = sessionResult.data;

    // Set context
    ctx.user = user;
    ctx.session = session;
  } catch (error) {
    console.error("Authentication middleware error:", error);
    // On error, treat as unauthorized (fail securely)
    ctx.user = null;
    ctx.session = null;
  }
}