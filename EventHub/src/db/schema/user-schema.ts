import { relations } from "drizzle-orm";
import { sqliteTable, text, int, integer } from "drizzle-orm/sqlite-core";
import { events } from "./event-schema";
import { eventAttendees } from "./event-attendee-schema";
import { savedEvents } from "./saved-event-schema";
import { createId } from "@/app/lib/utils/id";

export const users = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  phoneNumber: text("phone_number").unique(),
  city: text("city"),
  country: text("country"),
  profilePicture: text("profile_picture"),
  role: text("role", { enum: ["user", "admin"] })
    .notNull()
    .default("user"),
  createdAt: int("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdateFn(
    () => new Date()
  ),
  deletedAt: int("deleted_at", { mode: "timestamp" }),
  isActive: int("is_active", { mode: "boolean" })
    .notNull()
    .default(true),
  lastLoginAt: int("last_login_at", { mode: "timestamp" }),
});

export const usersRelations = relations(users, ({ many }) => ({
  eventsHosted: many(events),
  eventsAttending: many(eventAttendees),
  savedEvents: many(savedEvents),
}))

// Sessions table for server-side session management
export const sessions = sqliteTable("sessions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: int("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
}); 


export type User = typeof users.$inferSelect;
export type CreateUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type CreateSession = typeof sessions.$inferInsert;
export type SafeUser = Omit<User, "passwordHash">;
export type UserRole = "admin" | "user";