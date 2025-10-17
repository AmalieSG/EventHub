import { layout, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";
import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/Home";
import { AppLayout } from './app/layouts/AppLayout' 
import { About } from "./app/pages/About";

export type AppContext = {};

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    ctx;
  },

  render(Document, [
    layout(AppLayout, [
      route("/", Home),
      route("/about", About),
    ]), 
  ],
  )
]);