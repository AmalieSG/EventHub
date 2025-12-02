"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ofetch } from "ofetch";
import type { EventWithRelations } from "@/app/api/events/eventsRepository";

type ApiOk<T> = { success: true; data: T };
type ApiError = { success: false; error: { code: string; message: string } };
type ApiResponse<T> = ApiOk<T> | ApiError;

type EventsContextValue = {
  events: EventWithRelations[];
  loading: boolean;
  error?: string;
};

const EventsContext = createContext<EventsContextValue | undefined>(undefined);

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<EventWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const res = await ofetch<ApiResponse<EventWithRelations[]>>(
          "/api/v1/events"
        );

        if (!("success" in res) || !res.success) {
          console.error("Failed to load events:", "error" in res ? res.error.message : res);
          if (!cancelled) {
            setEvents([]);
            setError("Failed to load events");
          }
          return;
        }

        if (!cancelled) {
          setEvents(res.data);
          setError(undefined);
        }
      } catch (e) {
        console.error("Failed to load events.", e);
        if (!cancelled) {
          setEvents([]);
          setError("Failed to load events");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <EventsContext.Provider value={{ events, loading, error }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEventsContext() {
  const ctx = useContext(EventsContext);
  if (!ctx) {
    throw new Error("useEventsContext must be used within an EventsProvider");
  }
  return ctx;
}
