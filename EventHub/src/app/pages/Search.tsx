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

// src/app/pages/Search.tsx

import { useEffect, useMemo, useState } from "react";
import { FilterBar } from "../components/FilterBar";
import { EventList } from "../components/EventList";
import { useEnrichedEvents, type RawEvent } from "../hooks/useEnrichedEvents";
import { ofetch } from "ofetch";

type ApiResponse<T> = { success: true; data: T } | { success: false; error: { code: string; message: string } };

export function Search() {
  const [raw, setRaw] = useState<RawEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await ofetch<ApiResponse<RawEvent[]>>("/api/v1/events", {
          method: "GET",
        });

        if (!cancelled && res && "success" in res && res.success) {
          setRaw(res.data);
        }
      } catch (e) {
        
        console.error("Failed to load events:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const enriched = useEnrichedEvents(raw);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return enriched;
    return enriched.filter((e) =>
      [e.title, e.shortDescription, e.category, e.address]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(q))
    );
  }, [enriched, searchTerm]);

  if (loading) {
    return <p>Loading events...</p>;
  }

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
