import { sqliteTable, text, real, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm/relations";
import { createId } from "@/app/lib/utils/id";
import { events } from "./event-schema";

export const addresses = sqliteTable("addresses", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  label: text("label"),
  formattedAddress: text("formatted_address")
    .notNull(),
  city: text("city"),
  area: text("area"),
  country: text("country"),
  latitude: real("lat"),
  longitude: real("lng"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$onUpdateFn(() => new Date()), 
});

export const addressesRelations = relations(addresses, ({ many }) => ({
  events: many(events),
}));

export type Address = typeof addresses.$inferSelect;
export type CreateAddress = typeof addresses.$inferInsert;
