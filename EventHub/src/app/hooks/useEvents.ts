import { useEffect, useState } from "react"
import { fetchAllEvents } from "../api/events/eventsService"
import { Event } from "../types/event"

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const data = await fetchAllEvents()
      setEvents(data)
      setLoading(false)
    }
    load()
  }, [])

  return { events, loading }
}
