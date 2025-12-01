import { layout, prefix, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";
import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import  Home  from "@/app/pages/Home";
import {Event} from "@/app/pages/Event";
import { AppLayout } from './app/layouts/AppLayout' 
import { Search } from "./app/pages/Search";
import { CreateEvent } from "./app/pages/CreateEvent";
import { Login } from "./app/pages/Login";
import { Registration } from "./app/pages/Registration";
import { Settings } from "./app/pages/Settings";
import { Profile } from "./app/pages/Profile";
import { setupDb, type DB } from "./db";
import { env } from "cloudflare:workers";
import { eventRoutes } from "./app/api/events/eventsRoutes";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import { ContactUs } from './app/pages/ContactUs'; 
import type { AuthContext } from "@/app/types/auth";
import {
    hashPassword,
    verifyPassword,
} from "@/app/lib/auth/password";
import { authenticationMiddleware } from "@/app/middleware/authentication";
import { Logout } from "./app/pages/Logout";
import { requireAuth } from "@/app/middleware/authorization";

export type AppContext = {
  db: DB;
} & AuthContext;

export default defineApp([
 setCommonHeaders(),
 
 function setup({ ctx }) {
    ctx.db = setupDb(env.DB); 
  },
  authenticationMiddleware,

  route("/api/login", async ({ request, ctx }) => {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    try {
      const { email, password } = await request.json<{
        email?: string;
        password?: string;
      }>();

      if (!email || !password) {
        return Response.json(
          { success: false, error: "Missing email or password" },
          { status: 400 }
        );
      }

      const db = ctx.db;

      const user = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (!user) {
        return Response.json(
          { success: false, error: "Invalid email or password" },
          { status: 401 }
        );
      }

      const isPasswordValid = await verifyPassword(password, user.passwordHash);

      if (!isPasswordValid) {
        return Response.json(
          { success: false, error: "Invalid email or password" },
          { status: 401 }
        );
      }

      return Response.json({
        success: true,
        message: `Welcome, ${user.firstName}!`,
      });

    } catch (e: any) {
      return Response.json(
        { success: false, error: e.message },
        { status: 500 }
      );
    }
  }),
  prefix("/api/v1/events", eventRoutes),
  render(Document, [
    layout(AppLayout, [
    route("/", Home),
      route("/contact-us", ContactUs),
      route("/events", Search),
      route("/registration", Registration),
      route("/login", Login),
      route("/logout", Logout),
      route("/events/:id", Event),
      route("/settings", [requireAuth(), Settings as any]),
      route("/profile", [requireAuth(), Profile]),
      route("/create-event", [requireAuth(), CreateEvent]),   
    ]), 
  ],
  ),
]);
