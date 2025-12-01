"use server"

import type { RequestInfo } from "rwsdk/worker";
import { EventDetail } from "../components/event-page/Event";

export async function Event({ params} : RequestInfo) {
    return <EventDetail id={params.id} />;    
}