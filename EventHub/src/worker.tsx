import { layout, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/Home";
import {EventDetail} from "@/app/pages/EventDetail";
import { AppLayout } from './app/layouts/AppLayout' 
import { About } from "./app/pages/About";
import { Events } from "./app/pages/Events";
import { Search } from "./app/pages/Search";
import { Profile } from "./app/pages/Profile";

export type AppContext = {};

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    // setup ctx here
    ctx;
  },

  render(Document, [
    layout(AppLayout, [
      route("/", Home),
      route("/about", About),
      route("/events", Events),
      route("/profile", Profile),
      route("/search", Search),
      route("/events/:id", EventDetail as any),
    ]), 
  ],
  ),
]);