// src/app/api/auth/authServerActions.ts
"use server";

import { authService } from "./authService";
import { Errors } from "@/app/types/errors";

import { clearSessionCookie, setSessionCookie } from "@/app/lib/auth/session";
import type { ServerResult } from "@/app/types/result";
import type { SafeUser, Session } from "@/db/schema";
import { requestInfo } from "rwsdk/worker";

export async function register(
  prevState: any,
  formData: FormData
): Promise<
  ServerResult<{
    user: SafeUser;
    session: Session;
  }>
> {
  try {
    const credentials = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const result = await authService.register(credentials);
    console.log("Registration result:", result);

    if (!result.success) {
      return {
        success: false,
        error: result.error.message,
        code: result.error.code,
        state: { username: credentials.username, email: credentials.email },
      };
    }

    // TODO: Could be abstracted to a util
    // Mutates the header so that the cookie is set
    const cookie = setSessionCookie(result.data.session.id);
    requestInfo.response.headers = {
      ...requestInfo.response.headers,
      "Set-Cookie": cookie,
    };
    return {
      success: true,
      data: {
        user: result.data.user,
        session: result.data.session,
      },
    };
  } catch (error) {
    console.error("Register action error:", error);
    return {
      success: false,
      error: "Registrering feilet",
      code: Errors.INTERNAL_SERVER_ERROR,
      state: Object.fromEntries(formData.entries()),
    };
  }
}

export async function login(
  prevState: any,
  formData: FormData
): Promise<
  ServerResult<{
    user: SafeUser;
    session: Session;
  }>
> {
  try {
    const credentials = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    const result = await authService.login(credentials);

    if (!result.success) {
      return {
        success: false,
        error: result.error.message,
        code: result.error.code,
        state: { username: credentials.username },
      };
    }

    // TODO: Could be abstracted to a util
    // Mutates the header so that the cookie is set
    const cookie = setSessionCookie(result.data.session.id);
    requestInfo.response.headers = {
      ...requestInfo.response.headers,
      "Set-Cookie": cookie,
    };
    return {
      success: true,
      data: {
        user: result.data.user,
        session: result.data.session,
      },
    };
  } catch (error) {
    console.error("Login action error:", error);
    return {
      success: false,
      error: "Innlogging feilet",
      code: Errors.INTERNAL_SERVER_ERROR,
      state: Object.fromEntries(formData.entries()),
    };
  }
}

export async function logout(): Promise<ServerResult<null>> {
  try {
    const sessionId = requestInfo.ctx.session?.id;

    const result = await authService.logout(sessionId);

    if (!result.success) {
      return {
        success: false,
        error: result.error.message,
        code: result.error.code,
      };
    }

    // Mutates the header so that the cookie is removed
    const cookie = clearSessionCookie();
    requestInfo.response.headers = {
      ...requestInfo.response.headers,
      "Set-Cookie": cookie,
    };
    return {
      success: true,
      data: null,
    };
  } catch (error) {
    console.error("Logout action error:", error);
    return {
      success: false,
      error: "Utlogging feilet",
      code: Errors.INTERNAL_SERVER_ERROR,
    };
  }
}