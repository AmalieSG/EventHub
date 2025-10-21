import { getAllEvents, getEventById } from "./eventsRepository"
import type { Event } from "@/app/types/event" 

export async function fetchAllEvents(): Promise<Event[]> {
  return getAllEvents()
}

export async function fetchEventById(id: number): Promise<Event | undefined> {
  return getEventById(id);
}
