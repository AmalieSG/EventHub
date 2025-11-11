// Hentet fra: https://github.com/mariuswallin/hiof-2025-webapp/blob/main/lectures/l-17/src/app/lib/utils/id.ts

import { nanoid } from "nanoid";

export const createId = (): string => {
  return nanoid();
};