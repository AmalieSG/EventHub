import { int, integer, sqliteTable, text, uniqueIndex, index } from "drizzle-orm/sqlite-core";
import { events } from "./event-schema";
import { users } from "./user-schema";
import { relations } from "drizzle-orm/relations";

export const eventAttendees = sqliteTable("event_attendees", {
    eventId: text("event_id")
        .notNull()
        .references(() => events.id, { onDelete: "cascade" }),
    userId: int("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    joinedAt: integer("joined_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
}, (table) => ([
    uniqueIndex("event_attendees_event_user_uniq")
        .on(table.eventId, table.userId),
    index("event_attendees_user_idx").on(table.userId),
    index("event_attendees_event_idx").on(table.eventId),
]));

export const eventAttendeesRelations = relations(eventAttendees, ({ one }) => ({
    event: one(events, {
        fields: [eventAttendees.eventId],
        references: [events.id],
    }),
    user: one(users, {
        fields: [eventAttendees.userId],
        references: [users.id],
    })
}))