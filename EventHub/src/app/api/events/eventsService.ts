/*import { getAllEvents, getEventById } from "./eventsRepository"
import type { Event } from "@/app/types/event" 

export async function fetchAllEvents(): Promise<Event[]> {
  return getAllEvents()
}

export async function fetchEventById(id: number): Promise<Event | undefined> {
  return getEventById(id);
}*/

// src/app/api/events/eventsService.ts

import { z } from "zod";
import { eventsRepository } from "./eventsRepository";
import { ResultHandler } from "@/app/lib/utils/result";
import { Errors } from "@/app/types/errors";
import type { Result } from "@/app/types/result";
import type { EventsRepository, EventWithAttendees } from "./eventsRepository";
import { CreateEventSchema, UpdateEventSchema } from "@/app/lib/schema/events";

export interface EventsService {
  list(): Promise<Result<EventWithAttendees[]>>;
  get(id: string): Promise<Result<EventWithAttendees>>;
  create(input: unknown): Promise<Result<EventWithAttendees>>;
  update(id: string, input: unknown): Promise<Result<EventWithAttendees>>;
  remove(id: string): Promise<Result<void>>;
}

export function createEventsService(repo: EventsRepository): EventsService {
  return {
    async list() {
      const result = await repo.findMany();
      if (!result.success) {
        return ResultHandler.failure(result.error, Errors.INTERNAL_SERVER_ERROR);
      }
      return ResultHandler.success(result.data);
    },

    async get(id: string) {
      if (!id || typeof id !== "string") {
        return ResultHandler.failure("Invalid event ID", Errors.VALIDATION_ERROR);
      }

      const result = await repo.findById(id);
      if (!result.success) {
        return ResultHandler.failure(result.error, Errors.INTERNAL_SERVER_ERROR);
      }
      if (!result.data) {
        return ResultHandler.failure("Event not found", Errors.NOT_FOUND);
      }

      return ResultHandler.success(result.data);
    },

    async create(input: unknown) {
      try {
        const validated = CreateEventSchema.parse(input);

        const created = await repo.create(validated);
        if (!created.success) {
          return ResultHandler.failure(
            created.error,
            Errors.INTERNAL_SERVER_ERROR
          );
        }

        const refreshed = await repo.findById(created.data.id);

        if (!refreshed.success) {
          return ResultHandler.failure(
            refreshed.error,
            Errors.INTERNAL_SERVER_ERROR
          );
        }

        if (!refreshed.data) {
          return ResultHandler.failure(
            "Created event not found", 
            Errors.NOT_FOUND
          );
        }

        return ResultHandler.success(refreshed.data);
      } catch (err) {
        if (err instanceof z.ZodError) {
          return ResultHandler.failure(
            `Validation failed: ${z.flattenError(err)}`,
            Errors.BAD_REQUEST
          );
        }
        return ResultHandler.failure(
          "Failed to create event",
          Errors.INTERNAL_SERVER_ERROR
        );
      }
    },

    async update(id: string, input: unknown) {
      try {
        if (!id || typeof id !== "string") {
          return ResultHandler.failure("Invalid event ID", Errors.VALIDATION_ERROR);
        }

        const existing = await repo.findById(id);
        if (!existing.success) {
          return ResultHandler.failure(
            existing.error,
            Errors.INTERNAL_SERVER_ERROR
          );
        }
        if (!existing.data) {
          return ResultHandler.failure(
            "Event not found", 
            Errors.NOT_FOUND
          );
        }

        const validated = UpdateEventSchema.parse(input);

        const updated = await repo.update(id, validated);
        
        if (!updated.success) {
          return ResultHandler.failure(updated.error, Errors.INTERNAL_SERVER_ERROR);
        }
        if (!updated.data) {
          return ResultHandler.failure("Event not found", Errors.NOT_FOUND);
        }

        const refreshed = await repo.findById(id);
        if (!refreshed.success) {
          return ResultHandler.failure(refreshed.error, Errors.INTERNAL_SERVER_ERROR);
        }
        if (!refreshed.data) {
          return ResultHandler.failure(
            "Failed to load updated event",
            Errors.INTERNAL_SERVER_ERROR
          );
        }

        return ResultHandler.success(refreshed.data);
      } catch (err) {
        if (err instanceof z.ZodError) {
          return ResultHandler.failure(
            `Validation failed: ${z.flattenError(err)}`,
            Errors.BAD_REQUEST
          );
        }
        return ResultHandler.failure(
          "Failed to update event",
          Errors.INTERNAL_SERVER_ERROR
        );
      }
    },

    async remove(id: string) {
      if (!id || typeof id !== "string") {
        return ResultHandler.failure("Invalid event ID", Errors.VALIDATION_ERROR);
      }

      // Valgfritt: sjekk eksisterer
      const existing = await repo.findById(id);
      if (!existing.success) {
        return ResultHandler.failure(
          existing.error,
          Errors.INTERNAL_SERVER_ERROR
        );
      }
      if (!existing.data) {
        return ResultHandler.failure("Event not found", Errors.NOT_FOUND);
      }

      const result = await repo.remove(id);
      if (!result.success) {
        return ResultHandler.failure(result.error, Errors.INTERNAL_SERVER_ERROR);
      }

      return ResultHandler.success(undefined);
    },
  };
}

// Singleton instans – samme mønster som i eksemplet
export const eventsService = createEventsService(eventsRepository);
