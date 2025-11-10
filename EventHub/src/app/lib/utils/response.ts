// /src/app/lib/utils/response.ts

import { Errors, type ErrorCode } from "@/app/types/errors";

// Base headers for API responses
const baseHeaders = {
  "Content-Type": "application/json",
  "Cache-Control": "public, max-age=300",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
};

export function createErrorResponse(
  code: ErrorCode,
  message: string,
  status: number
): Response {
  const errorResponse: {
    success: false;
    error: { 
        code: string, 
        message: string 
    };
  } = {
    success: false,
    error: {
        code,
        message,
    },
  }
  return new Response(JSON.stringify(errorResponse), {
    status,
    headers: { ...baseHeaders, "Cache-Control": "no-cache" },
  });
}

export const createSuccessResponse = <T>({
  data,
  status = 200,
  headers = {},
}: {
  data: T;
  status?: Response["status"];
  headers?: RequestInit["headers"];
}) => {
  const response = {
    success: true,
    data,
  };

  return new Response(JSON.stringify(response), {
    status,
    headers: { ...baseHeaders, ...headers },
  });
};

export function methodNotAllowedResponse(allowedMethods: string[]) {
  return new Response(
    JSON.stringify({
      success: false,
      error: {
        code: Errors.METHOD_NOT_ALLOWED,
        message: "Method not allowed for this endpoint",
      },
    }),
    {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        Allow: allowedMethods.join(", "),
      },
    }
  );
}

export function codeToStatus(code: ErrorCode): number {
  switch (code) {
    case Errors.INTERNAL_SERVER_ERROR:
      return 500;
    case Errors.NOT_FOUND:
      return 404;
    case Errors.BAD_REQUEST:
      return 400;
    case Errors.FORBIDDEN:
      return 403;
    case Errors.NOT_UNIQUE:
    case Errors.CONFLICT:
      return 409;
    case Errors.VALIDATION_ERROR:
      return 422;
    case Errors.RATE_LIMITED:
      return 429;
    case Errors.UNAUTHORIZED:
      return 401;
    case Errors.NOT_IMPLEMENTED:
      return 501;
    default:
      return 500;
  }
}

  return new Response(
    JSON.stringify({
      success: false,
      error: {
        code: Errors.UNAUTHORIZED,
        message: "Authentication required",
      },
    }),
    {
      status: 401,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export function createAuthorizationResponse() {
  return new Response(
    JSON.stringify({
      success: false,
      error: {
        code: Errors.FORBIDDEN,
        message: "Insufficient permissions",
      },
    }),
    {
      status: 403,
      headers: { "Content-Type": "application/json" },
    }
  );
}
*/