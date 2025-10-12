import { defineScript } from "rwsdk/worker";
import { drizzle } from "drizzle-orm/d1";
import { users } from './schema';

export default defineScript(async ({ env }) => {
  const db = drizzle(env.DB);

  // Insert a user
  await db.insert(users).values({
    name: "Test user",
    email: "test@testuser.io",
  });

  // Verify the insert by selecting all users
  const result = await db.select().from(users).all();

  console.log("🌱 Finished seeding");

  return Response.json(result);
});