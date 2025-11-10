import { relations } from "drizzle-orm";
import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { events } from "./event-schema";
import { eventAttendees } from "./event-attendee-schema";

export const users = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phoneNumber: text("phone_number").unique(),
  city: text("city"),
  country: text("country"),
  profilePicture: text("profile_picture"),
  passwordHash: text("password_hash").notNull(),
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
});

export const usersRelations = relations(users, ({ many }) => ({
  eventsHosted: many(events),
  eventsAttending: many(eventAttendees),
}))


export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;