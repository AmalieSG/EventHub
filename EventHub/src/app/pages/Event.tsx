"use server"

import type { RequestInfo } from "rwsdk/worker";
import { EventDetail } from "../components/event/Event";

export async function Event({ params} : RequestInfo) {
    return <EventDetail id={params.id} />;    
}