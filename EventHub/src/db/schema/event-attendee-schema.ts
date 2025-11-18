import { int, integer, sqliteTable, text, uniqueIndex, index } from "drizzle-orm/sqlite-core";
import { events } from "./event-schema";
import { users } from "./user-schema";
import { relations } from "drizzle-orm/relations";

export const eventAttendees = sqliteTable('event_attendees', {
  eventId: integer('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  joinedAt: integer('joined_at', { mode: 'timestamp' }).notNull(),
}, (table) => ({
  uniqueIdx: uniqueIndex('event_attendees_event_user_uniq').on(table.eventId, table.userId),
  userIdx: index('event_attendees_user_idx').on(table.userId),
  eventIdx: index('event_attendees_event_idx').on(table.eventId),
}));


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

export type EventAttendee = typeof eventAttendees.$inferSelect;
export type CreateEventAttendee = typeof eventAttendees.$inferInsert;