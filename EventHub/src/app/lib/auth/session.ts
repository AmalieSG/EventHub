// src/app/lib/auth/session.ts

import { getDb } from "@/db";
import { sessions, users } from "@/db/schema";
import { eq, and, gt, lt } from "drizzle-orm";
import { createId } from "@/app/lib/utils/id";
import type { Session, SafeUser } from "@/db/schema";
import type { Result } from "@/app/types/result";
import { ResultHandler } from "@/app/lib/utils/result";
import { Errors } from "@/app/types/errors";

// TODO: Could also be a system variables .env
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 dager
export const SESSION_COOKIE_NAME = "hiof_webapp";

// Create a new session
export async function createSession(userId: number): Promise<Result<Session>> {
  try {
    const db = await getDb();
    const sessionId = createId();
    const expiresAt = new Date(Date.now() + SESSION_DURATION);

    const [session] = await db
      .insert(sessions)
      .values({
        id: sessionId,
        userId,
        expiresAt,
      })
      .returning();

    return ResultHandler.success(session);
  } catch (error) {
    console.error("Error creating session:", error);
    return ResultHandler.failure(
      "Failed to create session",
      Errors.INTERNAL_SERVER_ERROR
    );
  }
}

// Get session and user data
export async function getSession(
  sessionId: string
): Promise<Result<{ session: Session; user: SafeUser } | null>> {
  try {
    const db = await getDb();
    const result = await db
      .select({
        session: sessions,
        user: users,
      })
      .from(sessions)
      .innerJoin(users, eq(sessions.userId, users.id)) // Join with users table
      .where(
        and(
          eq(sessions.id, sessionId),
          gt(sessions.expiresAt, new Date()), // Check if session is still valid
          eq(users.isActive, true) // Check if user is active
        )
      )
      .limit(1); // Limit to 1 result (should not be more than 1)

    if (result.length === 0) {
      return ResultHandler.success(null);
    }

    const { session, user } = result[0];

    // Oppdater last login time
    await db
      .update(users)
      .set({ lastLoginAt: new Date() })
      .where(eq(users.id, user.id));

    return ResultHandler.success({ session, user });
  } catch (error) {
    console.error("Error getting session:", error);
    return ResultHandler.failure(
      "Failed to get session",
      Errors.INTERNAL_SERVER_ERROR
    );
  }
}

// Delete a session (logout)
export async function deleteSession(sessionId: string): Promise<Result<void>> {
  try {
    const db = await getDb();

    await db.delete(sessions).where(eq(sessions.id, sessionId));

    return ResultHandler.success(undefined);
  } catch (error) {
    console.error("Error deleting session:", error);
    return ResultHandler.failure(
      "Failed to delete session",
      Errors.INTERNAL_SERVER_ERROR
    );
  }
}

// Cleanup expired sessions
export async function cleanupExpiredSessions(): Promise<Result<number>> {
  try {
    const db = await getDb();

    const deleted = await db
      .delete(sessions)
      .where(lt(sessions.expiresAt, new Date()))
      .returning({ id: sessions.id });

    return ResultHandler.success(deleted.length);
  } catch (error) {
    console.error("Error cleaning up sessions:", error);
    return ResultHandler.failure(
      "Failed to cleanup sessions",
      Errors.INTERNAL_SERVER_ERROR
    );
  }
}

// Session cookie configuration
export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to true in production, meaning cookies are only sent over HTTPS
    sameSite: "lax",
    maxAge: SESSION_DURATION / 1000, // Convert to seconds
    path: "/",
  };
}

// Helper function to extract session ID from cookies
export function extractSessionFromCookies(cookieHeader: string): string | null {
  const cookies = cookieHeader.split(";").map((c) => c.trim());

  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === SESSION_COOKIE_NAME) {
      return decodeURIComponent(value);
    }
  }

  return null;
}

// Helper function to set session cookie
export function setSessionCookie(sessionId: string): string {
  const options = getSessionCookieOptions();

  const baseCookie = [
    `${SESSION_COOKIE_NAME}=${encodeURIComponent(sessionId)}`,
    `Max-Age=${options.maxAge}`,
    `Path=${options.path}`,
    `SameSite=${options.sameSite}`,
  ];

  if (options.httpOnly) baseCookie.push("HttpOnly");
  if (options.secure) baseCookie.push("Secure");

  return baseCookie.join("; ");
}

// Helper function to clear session cookie
export function clearSessionCookie(): string {
  const options = getSessionCookieOptions();

  const baseCookie = [
    `${SESSION_COOKIE_NAME}=; Max-Age=0`,
    `Path=${options.path}`,
    `SameSite=${options.sameSite}`,
  ];

  if (options.httpOnly) baseCookie.push("HttpOnly");
  if (options.secure) baseCookie.push("Secure");

  return baseCookie.join("; ");
}