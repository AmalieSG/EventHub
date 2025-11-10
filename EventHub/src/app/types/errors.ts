// app/types/errors.ts

// Base error codes
export const Errors = {
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  NOT_FOUND: "NOT_FOUND",
  BAD_REQUEST: "BAD_REQUEST",
  FORBIDDEN: "FORBIDDEN",
  NOT_UNIQUE: "NOT_UNIQUE",
  RATE_LIMITED: "RATE_LIMITED",
  METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED",
  UNAUTHORIZED: "UNAUTHORIZED",
  NOT_IMPLEMENTED: "NOT_IMPLEMENTED",
  CONFLICT: "CONFLICT",
  VALIDATION_ERROR: "VALIDATION_ERROR",
} as const;

export type ErrorCode = keyof typeof Errors;

// Base error structure
export type Err = {
  code: ErrorCode;
  message: string;
};

export type ResultError = {
  success: false;
  error: Err;
};