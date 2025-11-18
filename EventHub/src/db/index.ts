import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "./schema";
import { requestInfo } from "rwsdk/worker";

let dbInstance: DrizzleD1Database<typeof schema> | null = null;

export function setupDb(d1Database: D1Database): DrizzleD1Database<typeof schema> {
  if (dbInstance) {
    return dbInstance;
  }
  dbInstance = drizzle(d1Database, { schema });
  return dbInstance;
}

export function getDb(): DrizzleD1Database<typeof schema> {
  if (requestInfo?.ctx?.db) {
    return requestInfo.ctx.db;
  }
  
  if (dbInstance) {
    return dbInstance;
  }
  
  throw new Error("Database not initialized. Make sure setupDb is called in middleware.");
}

export type DB = DrizzleD1Database<typeof schema>;