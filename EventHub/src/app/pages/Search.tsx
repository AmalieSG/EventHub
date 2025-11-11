"use client";
/*
import { FilterBar } from "../components/FilterBar"
import { EventList } from "../components/EventList"
import { useEventsContext } from "../context/EventsProvider";

export function Search() {
    const { events, loading } = useEventsContext();

    if (loading) {
        return <p>Loading events...</p>
    }

    return (
        <section className="max-w-6xl mx-auto p-4">
            <FilterBar />

            <h1 className="mt-4 mb-3">
                <strong>“Concerts in Oslo”</strong>
            </h1>

            <p className="text-gray-600 mt-4 mb-3">
                {events.length} event(s) found 
            </p>

            <EventList events={events} />
        </section>
    )
}
*/

import { useEffect, useMemo, useState } from "react";
import { FilterBar } from "../components/FilterBar";
import { EventList } from "../components/EventList";
import { ofetch } from "ofetch";
import type { EventWithAttendees } from "@/app/api/events/eventsRepository";

type ApiOk<T> = { success: true; data: T };
type ApiErr = { success: false; error: { code: string; message: string } };
type ApiResponse<T> = ApiOk<T> | ApiErr;

export function Search() {
  const [events, setEvents] = useState<EventWithAttendees[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await ofetch<ApiResponse<EventWithAttendees[]>>("/api/v1/events");
        if (!cancelled && res && "success" in res && res.success) {
          setEvents(res.data);
        }
      } catch (e) {
        console.error("Failed to load events:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return events;
    return events.filter((e) =>
      [e.title, e.summary ?? "", e.description ?? "", e.category ?? "", e.address ?? ""]
        .some((field) => field.toLowerCase().includes(q))
    );
  }, [events, searchTerm]);

  if (loading) return <p>Loading events...</p>;

  return (
    <section className="max-w-6xl mx-auto p-4">
      <div>
        <label htmlFor="search" className="block text-sm font-medium text-gray-700">
          Search for events
        </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type to search..."
          className="search-input"
        />
      </div>

      <FilterBar />

      <h1 className="mt-4 mb-3">
        <strong>“{searchTerm}”</strong>
      </h1>

      <p className="text-gray-600 mt-4 mb-3">{filtered.length} event(s) found</p>

      <EventList events={filtered} />
    </section>
  );
}
