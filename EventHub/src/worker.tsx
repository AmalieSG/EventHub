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
import { setupDb, type DB } from "./db";
import { env } from "cloudflare:workers";

export interface Env {
  DB: D1Database;
}

export type AppContext = {
  db: DB;
};

export default defineApp([
  setCommonHeaders(),
  
  async function setup({ctx}) {
    ctx.db = await setupDb(env.DB)
  },

  render(Document, [
    layout(AppLayout, [
      route("/", Home),
      route("/contact-us", Contact),
      route("/settings", Settings),
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
