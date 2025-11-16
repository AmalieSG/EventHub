import { route } from "rwsdk/router";
import { eventsController } from "./eventsController";
import { methodNotAllowedResponse } from "@/app/lib/utils/response";

export const eventRoutes = [
  route("/", async (ctx) => {
    const method = ctx.request.method.toLowerCase();
    switch (method) {
      case "get":
        return eventsController.listEvents(ctx);
      case "post":
        return eventsController.createEvent(ctx);
      default:
        return methodNotAllowedResponse(["GET", "POST"]);
    }
  }),

  route("/:id", async (ctx) => {
    const method = ctx.request.method.toLowerCase();
    switch (method) {
      case "get":
        return eventsController.getEventById(ctx);
      case "put":
      case "patch":
        return eventsController.updateEvent(ctx);
      case "delete":
        return eventsController.deleteEvent(ctx);
      default:
        return methodNotAllowedResponse(["GET", "PUT", "PATCH", "DELETE"]);
    }
  }),

  route("/:id/create", async (ctx) => {
    if (ctx.request.method === "POST") {
      return eventsController.createEvent(ctx);
    }
    return methodNotAllowedResponse(["POST"]);
  }),
];