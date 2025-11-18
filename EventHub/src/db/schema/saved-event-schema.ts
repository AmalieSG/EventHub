import {
  sqliteTable,
  text,
  int,
  integer,
  uniqueIndex,
  index,
} from "drizzle-orm/sqlite-core";
import { events } from "./event-schema";
import { users } from "./user-schema";
import { relations } from "drizzle-orm/relations";

export const savedEvents = sqliteTable('saved_events', {
  eventId: integer('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }), // Changed from text to integer
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  savedAt: integer('saved_at', { mode: 'timestamp' }).notNull(),
}, (table) => ({
  uniqueIdx: uniqueIndex('saved_events_event_user_uniq').on(table.eventId, table.userId),
  userIdx: index('saved_events_user_idx').on(table.userId),
  eventIdx: index('saved_events_event_idx').on(table.eventId),
}));

// Relations slik at du kan gjøre db.query.users.findFirst({ with: { savedEvents: true } })
export const savedEventsRelations = relations(savedEvents, ({ one }) => ({
  event: one(events, {
    fields: [savedEvents.eventId],
    references: [events.id],
  }),
  user: one(users, {
    fields: [savedEvents.userId],
    references: [users.id],
  }),
}));

export type SavedEvent = typeof savedEvents.$inferSelect;
export type NewSavedEvent = typeof savedEvents.$inferInsert;
