import { events} from "@/app/data/events" 
import type { Event } from "@/app/types/event" 

export async function getAllEvents(): Promise<Event[]> {
  return events
}

export async function getEventById(id: number): Promise<Event | undefined> {
  return events.find((event) => event.id === id)
}
