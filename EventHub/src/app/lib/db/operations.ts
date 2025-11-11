// Hentet fra: https://github.com/mariuswallin/hiof-2025-webapp/blob/main/lectures/l-17/src/app/lib/db/operations.ts

import { ResultHandler } from "@/app/lib/utils/result";
import { Errors } from "@/app/types/errors";
import type { Result } from "@/app/types/result";

export async function executeDbOperation<T>(
  operation: () => Promise<T>
): Promise<Result<T>> {
  try {
    const result = await operation();
    return ResultHandler.success(result);
  } catch (error) {
    console.error("Database operation failed:", error);
    return ResultHandler.failure(error, Errors.INTERNAL_SERVER_ERROR);
  }
}
