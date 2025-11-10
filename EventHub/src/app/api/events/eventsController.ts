// src/app/api/events/eventsController.ts

import {
  createSuccessResponse,
  createErrorResponse,
  codeToStatus,
} from "@/app/lib/utils/response";
import { Errors } from "@/app/types/errors";
import type { RequestInfo } from "rwsdk/worker";
import { eventsService, type EventsService } from "./eventsService";

export function createEventsController(service: EventsService) {
  return {
    // GET: /api/v1/events => List all events
    async listEvents(_ctx: RequestInfo) {
      try {
        const result = await service.list();

        if (!result.success) {
          const { code, message } = result.error;
          return createErrorResponse(
            code || Errors.INTERNAL_SERVER_ERROR,
            message,
            codeToStatus(code)
          );
        }

        return createSuccessResponse({ data: result.data });
      } catch (error) {
        console.error("Error in listEvents:", error);
        return createErrorResponse(
          Errors.INTERNAL_SERVER_ERROR,
          "An unexpected error occurred. Please try again later.",
          500
        );
      }
    },

    // GET: /api/v1/events/:id => Get a specific event by ID
    async getEventById(ctx: RequestInfo) {
      try {
        const { id } = ctx.params as { id: string };

        const result = await service.get(id);

        if (!result.success) {
          const { code, message } = result.error;
          return createErrorResponse(
            code || Errors.INTERNAL_SERVER_ERROR,
            message,
            codeToStatus(code)
          );
        }

        return createSuccessResponse({ data: result.data });
      } catch (error) {
        console.error("Error in getEventById:", error);
        return createErrorResponse(
          Errors.INTERNAL_SERVER_ERROR,
          "An unexpected error occurred. Please try again later.",
          500
        );
      }
    },

    // POST: /api/v1/events => Create a new event
    async createEvent(ctx: RequestInfo) {
      try {
        const payload = await ctx.request.json();

        const result = await service.create(payload);

        if (!result.success) {
          const { code, message } = result.error;
          return createErrorResponse(
            code || Errors.INTERNAL_SERVER_ERROR,
            message,
            codeToStatus(code)
          );
        }

        return createSuccessResponse({ data: result.data, status: 201 });
      } catch (error) {
        console.error("Error in createEvent:", error);

        if (error instanceof SyntaxError) {
          return createErrorResponse(
            Errors.VALIDATION_ERROR,
            "Invalid JSON in request body",
            400
          );
        }

        return createErrorResponse(
          Errors.INTERNAL_SERVER_ERROR,
          "An unexpected error occurred. Please try again later.",
          500
        );
      }
    },

    // PUT/PATCH: /api/v1/events/:id => Update a specific event
    async updateEvent(ctx: RequestInfo) {
      try {
        const { id } = ctx.params as { id: string };
        const payload = await ctx.request.json();

        const result = await service.update(id, payload);

        if (!result.success) {
          const { code, message } = result.error;
          return createErrorResponse(
            code || Errors.INTERNAL_SERVER_ERROR,
            message,
            codeToStatus(code)
          );
        }

        return createSuccessResponse({ data: result.data });
      } catch (error) {
        console.error("Error in updateEvent:", error);

        if (error instanceof SyntaxError) {
          return createErrorResponse(
            Errors.VALIDATION_ERROR,
            "Invalid JSON in request body",
            400
          );
        }

        return createErrorResponse(
          Errors.INTERNAL_SERVER_ERROR,
          "An unexpected error occurred. Please try again later.",
          500
        );
      }
    },

    // DELETE: /api/v1/events/:id => Delete a specific event
    async deleteEvent(ctx: RequestInfo) {
      try {
        const { id } = ctx.params as { id: string };

        const result = await service.remove(id);

        if (!result.success) {
          const { code, message } = result.error;
          return createErrorResponse(
            code || Errors.INTERNAL_SERVER_ERROR,
            message,
            codeToStatus(code)
          );
        }

        // 204 No Content
        return createSuccessResponse({ data: null, status: 204 });
      } catch (error) {
        console.error("Error in deleteEvent:", error);
        return createErrorResponse(
          Errors.INTERNAL_SERVER_ERROR,
          "An unexpected error occurred. Please try again later.",
          500
        );
      }
    },
  };
}

export const eventsController = createEventsController(eventsService);
