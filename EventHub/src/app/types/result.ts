// Hentet fra: https://github.com/mariuswallin/hiof-2025-webapp/blob/main/lectures/l-17/src/app/types/result.ts

import { type ErrorCode, type ResultError } from "./errors";

export type ResultData<T> = {
  success: true;
  data: T;
};

export type Result<T> = ResultData<T> | ResultError;

export type ResultFn = {
  success: <T>(data: T) => ResultData<T>;
  failure: (error: unknown, code: ErrorCode) => ResultError;
};

export type ServerResult<T, U extends Record<string, unknown> = {}> =
  | { success: true; data: T }
  | {
      success: false;
      error: string;
      code?: string;
      fieldErrors?: Record<string, string[]>;
      state?: U;
    };
