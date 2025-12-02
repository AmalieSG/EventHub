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
  eventId: text('event_id')
    .notNull()
    .references(() => events.id, { onDelete: 'cascade' }),
  
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  savedAt: integer('saved_at', { mode: 'timestamp' }).notNull(),
}, (table) => ({
  uniqueIdx: uniqueIndex('saved_events_event_user_uniq').on(
    table.eventId, 
    table.userId
  ),
  userIdx: index('saved_events_user_idx').on(table.userId),
  eventIdx: index('saved_events_event_idx').on(table.eventId),
}));

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
