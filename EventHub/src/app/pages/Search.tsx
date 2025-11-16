"use client";

import { useEffect, useMemo, useState } from "react";
import { ofetch } from "ofetch";
import { FilterBar } from "../components/FilterBar";
import { EventList } from "../components/EventList";
import type { EventWithRelations } from "@/app/api/events/eventsRepository";

type ApiOk<T> = { success: true; data: T };
type ApiErr = { success: false; error: { code: string; message: string } };
type ApiResponse<T> = ApiOk<T> | ApiErr;

type ViewMode = "list" | "map";

export function Search() {
  const [events, setEvents] = useState<EventWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const q =
      url.searchParams.get("q") ??
      url.searchParams.get("search") ??
      url.searchParams.get("query") ??
      "";
    setSearchTerm(q);
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await ofetch<ApiResponse<EventWithRelations[]>>(
          "/api/v1/events"
        );
        if (!cancelled && "success" in res && res.success) {
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

  const filteredEvents = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return events;

    return events.filter((e) =>
      [e.title, e.summary ?? "", e.description ?? "", e.category ?? "", e.address ?? ""]
        .some((field) => field.toLowerCase().includes(q))
    );
  }, [events, searchTerm]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <p>Loading events…</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {filteredEvents.length} Event(er) funnet
          </p>
          {searchTerm && (
            <p className="text-sm text-gray-600">
              Søkeresultater for{" "}
              <span className="font-semibold">“{searchTerm}”</span>
            </p>
          )}
        </div>

        <div className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 p-1">
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`px-3 py-1.5 text-xs sm:text-sm rounded-full transition ${
              viewMode === "list"
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-white"
            }`}
          >
            Liste
          </button>
          <button
            type="button"
            onClick={() => setViewMode("map")}
            className={`px-3 py-1.5 text-xs sm:text-sm rounded-full transition ${
              viewMode === "map"
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-white"
            }`}
            disabled
          >
            Kart
          </button>
        </div>
      </header>

      <section className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
        <FilterBar />
      </section>

      <section className="space-y-4">
        {filteredEvents.length === 0 ? (
          <p className="text-sm text-gray-500">
            Fant ingen eventer som matcher søket ditt.
          </p>
        ) : (
          <EventList
            events={filteredEvents}
            />
        )}
      </section>
    </div>
  );
}

export default Search;


/*
import { useEffect, useMemo, useState } from "react";
import { FilterBar } from "../components/FilterBar";
import { EventList } from "../components/EventList";
import { ofetch } from "ofetch";
import type { EventWithRelations } from "@/app/api/events/eventsRepository";

type ApiOk<T> = { success: true; data: T };
type ApiErr = { success: false; error: { code: string; message: string } };
type ApiResponse<T> = ApiOk<T> | ApiErr;

export function Search() {
  const [events, setEvents] = useState<EventWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await ofetch<ApiResponse<EventWithRelations[]>>("/api/v1/events");
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

      {/*<FilterBar />*}

      <h1 className="mt-4 mb-3">
        <strong>“{searchTerm}”</strong>
      </h1>

      <p className="text-gray-600 mt-4 mb-3">{filtered.length} event(s) found</p>

      <EventList events={filtered} />
    </section>
  );
}*/
