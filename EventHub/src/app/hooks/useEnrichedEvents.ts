/*"use client";

import { useEffect, useState } from "react"
import { User } from "../types/user"
import { fetchAllEvents } from "../api/events/eventsService"
import { fetchAllUsers } from "../api/users/usersService"
import { Event } from "../types/event"

export interface EventWithHost extends Event {
  host: User | null
  attendeeCount: number
}

export function useEnrichedEvents() {
  const [events, setEvents] = useState<EventWithHost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const [eventData, userData] = await Promise.all([
        fetchAllEvents(),
        fetchAllUsers(),
      ])
      const mapped = eventData.map((event) => {
        const host = userData.find((u) => u.id === event.hostId) || null
        const attendeeCount = event.attendeeIds.length

        return { 
          ...event, 
          host, 
          attendeeCount 
        }
      })

      setEvents(mapped)
      setLoading(false)
    }

    loadData()
  }, [])

  return { events, loading }
}
*/

// src/app/hooks/useEnrichedEvents.ts
export type RawEvent = {
  id: string;
  title: string;
  description: string;
  summary: string;
  imageUrl: string;
  category: string;
  address: string;
  eventStart: string | number | Date;
  price: number;
};

export type EventWithHost = {
  id: string;
  title: string;
  shortDescription: string;
  imageUrl: string;
  category: string;
  address: string;
  date: Date;
  time: string;
  price: number;
  attendeeCount: number;
  host?: { firstName: string; lastName: string } | null;
};

export function useEnrichedEvents(raw: RawEvent[]): EventWithHost[] {
  return raw.map((e) => {
    const date =
      e.eventStart instanceof Date ? e.eventStart : new Date(e.eventStart);
    return {
      id: e.id,
      title: e.title,
      shortDescription: e.summary || e.description.slice(0, 140),
      imageUrl: e.imageUrl,
      category: e.category,
      address: e.address,
      date,
      time: date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      price: e.price,
      attendeeCount: 0,
      host: null,
    };
  });
}
