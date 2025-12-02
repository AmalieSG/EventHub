/*"use client";
import { createContext, useContext, ReactNode } from "react"
import { EventWithHost, useEnrichedEvents } from "../hooks/useEnrichedEvents"
import { EventWithRelations } from "@/app/api/events/eventsRepository"

interface EventContextType {
  events: EventWithHost[]
  loading: boolean
}

const EventContext = createContext<EventContextType | undefined>(undefined)

export function EventsProvider({ children }: { children: ReactNode }) {
  const { events, loading } = useEnrichedEvents()
  
  return (
    <EventContext.Provider value={{ events, loading }}>
      {children}
    </EventContext.Provider>
  )
}

export function useEventsContext() {
  const context = useContext(EventContext)
  if (!context) {
    throw new Error("useEventsContext must be used within an EventsProvider")
  }
  return context
}*/