import { drizzle } from "drizzle-orm/d1";
import { env } from "cloudflare:workers";
import type { D1Database } from "@cloudflare/workers-types";
import * as schema from "./schema";

const { DB } = env as { DB: D1Database };

export const db = drizzle(DB, { schema });