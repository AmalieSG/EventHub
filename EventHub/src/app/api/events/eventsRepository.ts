import { events } from "@/app/data/events" 
import type { Event } from "@/app/types/Event" 

export async function getAllEvents(): Promise<Event[]> {
  return events
}
