import { layout, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import  Home  from "@/app/pages/Home";
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

import AllEvents from "./app/pages/AllEvents"; 

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
   route("/contact-us", Contact),
   route("/settings", Settings),
   route("/profile", Profile),
   route("/search", Search),
   route("/create-event", CreateEvent),
   route("/registration", Registration),
   route("/login", Login),
   route("/events/:id", Event),
   route("/all-events", AllEvents)
  ]), 
 ],
 ),
]);