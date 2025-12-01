"use server"

import { EventDetail } from '../components/Event';
import type { RequestInfo } from "rwsdk/worker";

export async function Event({ params }: RequestInfo) {
   return (
       <EventDetail id={params.id} />
    );
};
