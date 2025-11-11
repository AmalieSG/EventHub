// src/app/api/events/eventsHandler.ts

import { CreateEventSchema, UpdateEventSchema } from "@/app/lib/schema/events";
import { eventsRepository } from "./eventsRepository";
import {
  createSuccessResponse,
  createErrorResponse,
  codeToStatus,
} from "@/app/lib/utils/response";
import { Errors } from "@/app/types/errors";
import type { RequestInfo } from "rwsdk/worker";
import { z } from "zod";

// GET: /api/v1/events (all events)
export async function listEvents(_ctx: RequestInfo) {
  try {
    const result = await eventsRepository.findMany();

    if (!result.success) {
      const { error } = result;
      const { message, code } = error;
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
}

// GET: /api/v1/events/:id (one event with attendees)
export async function getEventById(ctx: RequestInfo) {
  try {
    const { id } = ctx.params as { id: string };

    const result = await eventsRepository.findById(id);

    if (!result.success) {
      const {error } = result;
      const { message, code } = error;
      return createErrorResponse(
        code || Errors.INTERNAL_SERVER_ERROR,
        message,
        codeToStatus(code)
      );
    }

    if (!result.data) {
      return createErrorResponse(Errors.NOT_FOUND, "Event not found", 404);
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
}

// POST: /api/v1/events (create event)
export async function createEventHandler(ctx: RequestInfo) {
  try {
    const body = await ctx.request.json();
    const validated = CreateEventSchema.parse(body);

    const result = await eventsRepository.create(validated);

    if (!result.success) {
      const { error } = result;
      const { message, code } = error;
      return createErrorResponse(
        code || Errors.INTERNAL_SERVER_ERROR,
        message,
        codeToStatus(code)
      );
    }

    const refreshed = await eventsRepository.findById(result.data.id);
    if (!refreshed.success || !refreshed.data) {
      return createErrorResponse(
        Errors.INTERNAL_SERVER_ERROR,
        "Failed to retrieve the created event.",
        500
      );
    }

    return createSuccessResponse({ data: refreshed.data, status: 201 });
  } catch (error) {
    console.error("Error in createEventHandler:", error);
    return createErrorResponse(
      Errors.INTERNAL_SERVER_ERROR,
      "An unexpected error occurred. Please try again later.",
      500
    )
  }
}

// PUT/PATCH: /api/v1/events/:id (update event)
export async function updateEventHandler(ctx: RequestInfo) {
  try {
    const { id } = ctx.params as { id: string };
    const body = await ctx.request.json();
    const validated = UpdateEventSchema.parse(body);

    const result = await eventsRepository.update(id, validated);

    if (!result.success) {
      const { message, code } = result.error;
      return createErrorResponse(
        code || Errors.INTERNAL_SERVER_ERROR,
        message,
        codeToStatus(code)
      );
    }

    if (!result.data) {
      return createErrorResponse(Errors.NOT_FOUND, "Event not found", 404);
    }

    const refreshed = await eventsRepository.findById(id);
    if (!refreshed.success || !refreshed.data) {
      return createErrorResponse(
        Errors.INTERNAL_SERVER_ERROR,
        "Failed to retrieve the updated event.",
        500
      );
    }

    return createSuccessResponse({ data: refreshed.data });
  } catch (error) {
    console.error("Error in updateEventHandler:", error);
    return createErrorResponse(
      Errors.INTERNAL_SERVER_ERROR,
      "An unexpected error occurred. Please try again later.",
      500
    );
  }
}

// DELETE: /api/v1/events/:id — delete event
export async function deleteEventHandler(ctx: RequestInfo) {
  try {
    const { id } = ctx.params as { id: string };

    const result = await eventsRepository.remove(id);

    if (!result.success) {
      const { message, code } = result.error;
      return createErrorResponse(
        code || Errors.INTERNAL_SERVER_ERROR,
        message,
        codeToStatus(code)
      );
    }

    return createSuccessResponse({ data: null, status: 204 });
  } catch (error) {
    console.error("Error in deleteEventHandler:", error);
    return createErrorResponse(
      Errors.INTERNAL_SERVER_ERROR,
      "An unexpected error occurred. Please try again later.",
      500
    );
  }
}
