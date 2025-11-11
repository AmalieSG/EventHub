import { layout, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";
import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/Home";
import {Event} from "@/app/pages/Event";
import { AppLayout } from './app/layouts/AppLayout' 
import { About } from "./app/pages/About";
import { Search } from "./app/pages/Search";
import { CreateEvent } from "./app/pages/CreateEvent";
import { Login } from "./app/pages/Login";
import { Registration } from "./app/pages/Registration";
import { Settings } from "./app/pages/Settings";
import { Profile } from "./app/pages/Profile";
import { Contact } from "./app/components/Contactus";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

export type AppContext = {};

async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    // setup ctx here
    ctx;
  },

  route("/api/register", async ({ request }) => {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    try {
      const { name, email, password } = await request.json<{
        name?: string;
        email?: string;
        password?: string;
      }>();

      if (!name || !email || !password) {
        return Response.json(
          { success: false, error: "Missing name, email or password" },
          { status: 400 }
        );
      }

      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (existingUser) {
        return Response.json(
          { success: false, error: "The email is already registered" },
          { status: 409 }
        );
      }

      const passwordHash = await hashPassword(password);

      await db.insert(users).values({
        name: name,
        email: email,
        passwordHash: passwordHash,
      });

      return Response.json({ success: true, message: "User registered" });

    } catch (e: any) {
      return Response.json(
        { success: false, error: e.message },
        { status: 500 }
      );
    }
  }),


  route("/api/login", async ({ request }) => {
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
        message: `Welcome, ${user.name}!`,
      });

    } catch (e: any) {
      return Response.json(
        { success: false, error: e.message },
        { status: 500 }
      );
    }
  }),

  render(Document, [
    layout(AppLayout, [
      route("/", Home),
      route("/contact-us", Contact),
      //midlertidig fiks
      route("/settings", Settings as any),
      route("/profile", Profile),
      route("/search", Search),
      route("/create-event", CreateEvent),
      route("/registration", Registration),
      route("/login", Login),
      route("/events/:id", Event),
    ]), 
  ],
  ),
]);
