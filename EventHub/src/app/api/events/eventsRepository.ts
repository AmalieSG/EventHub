/*import { events } from "@/app/data/events" 
import type { Event } from "@/app/types/event" 

export async function getAllEvents(): Promise<Event[]> {
  return events
}

export async function getEventById(id: number): Promise<Event | undefined> {
  return events.find((event) => event.id === id)
}*/

// src/app/api/events/eventsRepository.ts

import { eq } from "drizzle-orm";
import type { DB } from "@/db";
import { events } from "@/db/schema";
import { executeDbOperation } from "@/app/lib/db/operations"; // behold denne om du har den
import { getDb } from "@/db";
import type { Result } from "@/app/types/result";

// Typer basert på Drizzle-skjema
export type EventEntity = typeof events.$inferSelect;
export type EventCreateInput = Omit<typeof events.$inferInsert, "id" | "createdAt" | "updatedAt" | "deletedAt"> & {
  // eventStart kan komme som Date i service – Drizzle konverterer til timestamp
  eventStart: Date | string | number;
};
export type EventUpdateInput = Partial<Omit<typeof events.$inferInsert, "id" | "createdAt" | "deletedAt">> & {
  eventStart?: Date | string | number;
};

// Offentlig kontrakt brukt av service
export interface EventsRepository {
  findMany(): Promise<Result<EventEntity[]>>;
  findById(id: string): Promise<Result<EventEntity | null>>;
  create(data: EventCreateInput): Promise<Result<EventEntity>>;
  update(id: string, data: EventUpdateInput): Promise<Result<EventEntity | null>>;
  remove(id: string): Promise<Result<void>>;
}

export function createEventsRepository(db: DB): EventsRepository {
  return {
    // Hent alle events (uten pagination)
    async findMany() {
      return executeDbOperation(async () => {
        const rows = await db.select().from(events).orderBy(events.eventStart);
        return rows as EventEntity[];
      });
    },

    // Hent ett event
    async findById(id: string) {
      return executeDbOperation(async () => {
        const row = await db.query.events.findFirst({
          where: (e, { eq }) => eq(e.id, id),
        });
        return (row as EventEntity) ?? null;
      });
    },

    // Opprett event
    async create(data: EventCreateInput) {
      return executeDbOperation(async () => {
        const insertData: typeof events.$inferInsert = {
          // id genereres av events.$defaultFn(createId)
          title: data.title,
          description: data.description,
          summary: data.summary,
          // Drizzle (mode: "timestamp") tåler Date | number
          eventStart:
            data.eventStart instanceof Date
              ? data.eventStart
              : new Date(data.eventStart),
          address: data.address,
          price: data.price,
          hostId: data.hostId,
          category: data.category,
          imageUrl: data.imageUrl,
          status: data.status ?? "upcoming",
          createdAt: new Date(),
          // updatedAt settes av $onUpdateFn i schema ved oppdatering
        };

        const [created] = await db.insert(events).values(insertData).returning();
        return created as EventEntity;
      });
    },

    // Oppdater event
    async update(id: string, data: EventUpdateInput) {
      return executeDbOperation(async () => {
        const updateData: Partial<typeof events.$inferInsert> = {};

        if (data.title !== undefined) updateData.title = data.title;
        if (data.description !== undefined) updateData.description = data.description;
        if (data.summary !== undefined) updateData.summary = data.summary;
        if (data.eventStart !== undefined) {
          updateData.eventStart =
            data.eventStart instanceof Date
              ? data.eventStart
              : new Date(data.eventStart);
        }
        if (data.address !== undefined) updateData.address = data.address;
        if (data.price !== undefined) updateData.price = data.price;
        if (data.hostId !== undefined) updateData.hostId = data.hostId;
        if (data.category !== undefined) updateData.category = data.category;
        if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;
        if (data.status !== undefined) updateData.status = data.status;

        const [updated] = await db
          .update(events)
          .set(updateData)
          .where(eq(events.id, id))
          .returning();

        return (updated as EventEntity) ?? null;
      });
    },

    // Slett event
    async remove(id: string) {
      return executeDbOperation(async () => {
        const [deleted] = await db
          .delete(events)
          .where(eq(events.id, id))
          .returning({ id: events.id });

        if (!deleted) {
          throw new Error("Event not found");
        }

        return undefined;
      });
    },
  };
}

// Singleton for enkel bruk
export const eventsRepository = createEventsRepository(await getDb());
