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
    // setup ctx here
    ctx;
  },
  render(Document, [
    // The 'layout' function applies the AppLayout to all routes listed inside it.
    layout(AppLayout, [
      route("/", Home),
     route("/about", About),
      //route("/contact", ContactPage),
      // Any route defined here will have the Header and Footer
    ]),

    // If you had an admin section with a *different* layout, you could nest it:
    /*
    prefix("/admin", [
      layout(AdminLayout, [
        route("/", AdminDashboard),
      ])
    ])
    */
  ])
]);
