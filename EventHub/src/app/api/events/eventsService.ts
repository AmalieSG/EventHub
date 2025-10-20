import { getAllEvents } from "./eventsRepository"
import type { Event } from "@/app/types/event" 

export async function fetchAllEvents(): Promise<Event[]> {
  return getAllEvents()
}
