"use server";

import { getDb } from "@/db";
import { createEventsRepository } from "./eventsRepository";
import { createEventsService } from "./eventsService";
import { Errors } from "@/app/types/errors";
import { requestInfo } from "rwsdk/worker";
import type { ServerResult } from "@/app/types/result";

function getService() {
  const db = getDb();
  const repository = createEventsRepository(db);
  return createEventsService(repository);
}

export async function createEventAction(
  prevState: any,
  formData: FormData
): Promise<ServerResult<any, Record<string, any>>> {
  try {
    const service = getService();

    const user = (requestInfo as any).ctx?.user;
    const hostId = user?.id || 1;

    const startDate = formData.get("startDate") as string;
    const startTime = formData.get("startTime") as string;
    
    if (!startDate || !startTime) {
        return {
            success: false,
            error: "Dato og tid er påkrevd",
            code: Errors.VALIDATION_ERROR,
            state: Object.fromEntries(formData.entries()),
        };
    }

    const eventStart = new Date(`${startDate}T${startTime}`).getTime();

    const payload = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      eventStart: eventStart,
      address: "Online",
      price: 0,
      imageUrl: "https://placehold.co/600x400",
      summary: (formData.get("description") as string)?.substring(0, 100) || "",
      hostId: hostId,
    };

    const result = await service.create(payload);

    if (!result.success) {
      return {
        success: false,
        error: result.error.message,
        code: result.error.code,
        state: Object.fromEntries(formData.entries()),
      };
    }

    return {
      success: true,
      data: result.data,
    };

  } catch (error) {
    console.error("Create event action error:", error);
    return {
      success: false,
      error: "Kunne ikke opprette arrangementet",
      code: Errors.INTERNAL_SERVER_ERROR,
      state: Object.fromEntries(formData.entries()),
    };
  }
}
