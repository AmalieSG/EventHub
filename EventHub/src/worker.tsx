import { layout, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/Home";
import {Event} from "@/app/pages/Event";
import { AppLayout } from './app/layouts/AppLayout' 
import { About } from "./app/pages/About";
import { Search } from "./app/pages/Search";
import { Settings} from "./app/pages/Settings";

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
      route("/events/:id", Event as any),
      route("/search", Search),
      route("/settings", Settings as any ),
    ]), 
  ],
  ),
]);