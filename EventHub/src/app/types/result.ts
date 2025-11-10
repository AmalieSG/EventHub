// /src/app/types/result.ts

import { type ErrorCode, type ResultError } from "./errors";

// Successful data response type (no pagination)
export type ResultData<T> = {
  success: true;
  data: T;
};

// Result pattern for service/repo responses
export type Result<T> = ResultData<T> | ResultError;

// Helpers to construct results
export type ResultFn = {
  success: <T>(data: T) => ResultData<T>;
  failure: (error: unknown, code: ErrorCode) => ResultError;
};

// Generic server action result (no sessions/pagination)
export type ServerResult<T, U extends Record<string, unknown> = {}> =
  | { success: true; data: T }
  | {
      success: false;
      error: string;
      code?: string;
      fieldErrors?: Record<string, string[]>;
      state?: U;
    };
