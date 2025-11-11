/*import { events } from "@/app/data/events" 
import type { Event } from "@/app/types/event" 

export async function getAllEvents(): Promise<Event[]> {
  return events
}

export async function getEventById(id: number): Promise<Event | undefined> {
  return events.find((event) => event.id === id)
}*/

import { eq } from "drizzle-orm";
import type { DB } from "@/db";
import { CreateEvent, eventAttendees, events, UpdateEvent, users } from "@/db/schema";
import type { Event, EventAttendee, User } from "@/db/schema";
import { executeDbOperation } from "@/app/lib/db/operations";
import { getDb } from "@/db";
import type { Result } from "@/app/types/result";

export interface EventWithRelations extends Event {
  attendees: EventAttendee[];
  host: Pick<User, "id" | "firstName" | "lastName" | "email" | "profilePicture"> | null;
}

export interface EventsRepository {
  findMany(): Promise<Result<EventWithRelations[]>>;
  findById(id: string): Promise<Result<EventWithRelations | null>>;
  create(data: CreateEvent): Promise<Result<Event>>;
  update(id: string, data: UpdateEvent): Promise<Result<Event | null>>;
  remove(id: string): Promise<Result<void>>;
}

export function createEventsRepository(db: DB): EventsRepository {
  return {
    async findMany() {
      return executeDbOperation(async () => {
        const rows = await db
        .select({
          event: events, 
          attendee: eventAttendees,
          host: users,
        })
        .from(events)
        .leftJoin(eventAttendees, eq(eventAttendees.eventId, events.id))
        .leftJoin(users, eq(users.id, events.hostId))
        .orderBy(events.eventStart);

      const map = rows.reduce<Record<string, EventWithRelations>>((acc, row) => {
        const ev = row.event as Event;
        const attendee = row.attendee as EventAttendee | null;
        const hostRow = row.host as User | null;

        if (!acc[ev.id]) {
          acc[ev.id] = { 
            ...ev, 
            attendees: [],
            host: hostRow
              ? {
                  id: hostRow.id,
                  firstName: hostRow.firstName,
                  lastName: hostRow.lastName,
                  email: hostRow.email,
                  profilePicture: hostRow.profilePicture,
                }
              : null,
          };
        }
        if (attendee) acc[ev.id].attendees.push(attendee);

        if (!acc[ev.id].host && hostRow) {
            acc[ev.id].host = {
            id: hostRow.id,
            firstName: hostRow.firstName,
            lastName: hostRow.lastName,
            email: hostRow.email,
            profilePicture: hostRow.profilePicture,
          };
        }

        return acc;

      }, {})
        return Object.values(map);
      });
    },

    async findById(id: string) {
      return executeDbOperation(async () => {
        const row = await db.query.events.findFirst({
          where: (e, { eq }) => eq(e.id, id),
          with: { 
            attendees: true,
            host: true,
          },
        });

        if (!row) return null;

        const full: EventWithRelations = {
          ...(row as Event),
          attendees: row.attendees as EventAttendee[],
          host: row.host
            ? {
                id: row.host.id,
                firstName: row.host.firstName,
                lastName: row.host.lastName,
                email: row.host.email,
                profilePicture: row.host.profilePicture,
              }
            : null,
        }
        
        return full ?? null;
      });
    },

    async create(data: CreateEvent) {
      return executeDbOperation(async () => {
        const [created] = await db
        .insert(events)
        .values({
          title: data.title,
          description: data.description,
          summary: data.summary,
          eventStart: data.eventStart,
          address: data.address,
          price: data.price,
          hostId: data.hostId,
          category: data.category,
          imageUrl: data.imageUrl,
          status: data.status ?? "upcoming",
        })
        .returning();

        return created as Event;
      });
    },

    async update(id: string, data: UpdateEvent) {
      return executeDbOperation(async () => {
        const [updated] = await db
          .update(events)
          .set({
            ...(data.title !== undefined && { title: data.title }),
            ...(data.description !== undefined && { description: data.description }),
            ...(data.summary !== undefined && { summary: data.summary }),
            ...(data.eventStart !== undefined && { eventStart: data.eventStart }),
            ...(data.address !== undefined && { address: data.address }),
            ...(data.price !== undefined && { price: data.price }),
            ...(data.category !== undefined && { category: data.category }),
            ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
            ...(data.status !== undefined && { status: data.status }),
            ...(data.hostId !== undefined && { hostId: data.hostId }),
          })
          .where(eq(events.id, id))
          .returning();

        return (updated as Event) ?? null;
      });
    },

    async remove(id: string) {
      return executeDbOperation(async () => {
        const [deleted] = await db
          .delete(events)
          .where(eq(events.id, id))
          .returning({ id: events.id });

        if (!deleted) throw new Error("Event not found");
        return undefined;
      });
    },
  };
}

export const eventsRepository = createEventsRepository(await getDb());
