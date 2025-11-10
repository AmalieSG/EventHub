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
import type { EventsRepository, EventEntity } from "./eventsRepository";
import { CreateEventSchema, UpdateEventSchema } from "@/app/lib/schema/events";

export interface EventsService {
  list(): Promise<Result<EventEntity[]>>;
  get(id: string): Promise<Result<EventEntity>>;
  create(input: unknown): Promise<Result<EventEntity>>;
  update(id: string, input: unknown): Promise<Result<EventEntity>>;
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
      // enkel ID-sjekk (events.id er text/ulid/cuid)
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

        const result = await repo.create(validated);
        if (!result.success) {
          return ResultHandler.failure(
            result.error,
            Errors.INTERNAL_SERVER_ERROR
          );
        }
        return ResultHandler.success(result.data);
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

        // Sjekk at event finnes før vi oppdaterer
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

        const validated = UpdateEventSchema.parse(input);

        const result = await repo.update(id, validated);
        if (!result.success) {
          return ResultHandler.failure(
            result.error,
            Errors.INTERNAL_SERVER_ERROR
          );
        }
        if (!result.data) {
          return ResultHandler.failure("Event not found", Errors.NOT_FOUND);
        }

        return ResultHandler.success(result.data);
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
