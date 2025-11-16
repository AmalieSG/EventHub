import {
    sqliteTable,
    text,
    int,
    integer,
    index,
} from "drizzle-orm/sqlite-core";
import { users } from "./user-schema";
import { relations } from "drizzle-orm/relations";
import { createId } from "@/app/lib/utils/id";
import { eventAttendees } from "./event-attendee-schema";
import { savedEvents } from "./saved-event-schema";

export const events = sqliteTable("events", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => createId()),
    title: text("title").notNull(),
    description: text("description").notNull(),
    summary: text("summary").notNull(),
    eventStart: integer("eventStart", { mode: "timestamp" }).notNull(),
    address: text("address").notNull(),
    price: integer("price").notNull(),
    hostId: int("hostId")
        .notNull()
        .references(() => users.id, {
            onDelete: "cascade",
        }),
    category: text("category").notNull(),
    imageUrl: text("imageUrl").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdateFn(
        () => new Date()
    ),
    deletedAt: integer("deleted_at", { mode: "timestamp" }),
    status: text("status", {
        enum: ["upcoming", "ongoing", "ended", "cancelled"],
    })
    .notNull()
    .default("upcoming")
    },
    (table) => [
        index("events_host_idx").on(table.hostId),
        index("events_start_idx").on(table.eventStart),
        index("events_status_idx").on(table.status),
    ]
);

export const eventsRelations = relations(events, ({ one, many }) => ({
  host: one(users, {
    fields: [events.hostId],
    references: [users.id],
  }),
  attendees: many(eventAttendees),
  savedBy: many(savedEvents),
}));

export type Event = typeof events.$inferSelect;
export type CreateEvent = typeof events.$inferInsert;
export type UpdateEvent = Partial<typeof events.$inferInsert>;