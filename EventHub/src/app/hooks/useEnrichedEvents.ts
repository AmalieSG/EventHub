"use client";

import { useEffect, useState } from "react"
import { User } from "../types/user"
import { fetchAllEvents } from "../api/events/eventsService"
import { fetchAllUsers } from "../api/users/usersService"
import { Event } from "../types/event"

export interface EventWithHost extends Event {
  host: User | undefined
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
        const host = userData.find((u) => u.id === event.hostId)
        const attendeeCount = event.attendeeIds.length

        return { ...event, host, attendeeCount }
      })

      setEvents(mapped)
      setLoading(false)
    }

    loadData()
  }, [])

  return { events, loading }
}
