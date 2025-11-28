"use client";

import { useEffect, useMemo, useState } from "react";
import { ofetch } from "ofetch";
import { EventList } from "../components/EventList";
import type { EventWithRelations } from "@/app/api/events/eventsRepository";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { defaultFilters, filterAndSortEvents, FilterState, getAvailableCategories, getAvailableCities } from "@/app/lib/utils/filtering";
import { FilterBar } from "../components/filter/FilterBar";
import { ActiveFilters } from "../components/filter/ActiveFilters";
import { SkeletonEventCard } from "../components/shared/SkeletonEventCard";

type ApiOk<T> = { success: true; data: T };
type ApiErr = { success: false; error: { code: string; message: string } };
type ApiResponse<T> = ApiOk<T> | ApiErr;

type ViewMode = "list" | "map";

export function Search() {
  const [events, setEvents] = useState<EventWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const q =
      url.searchParams.get("q") ??
      url.searchParams.get("events") ??
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
        console.error("Failed to load events.", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const availableCities = useMemo(
    () => getAvailableCities(events),
    [events]
  )

  const availableCategories = useMemo(
    () => getAvailableCategories(events),
    [events]
  )

  const filteredEvents = useMemo(
    () => filterAndSortEvents(events, searchTerm, filters),
    [events, searchTerm, filters]
  )
    
  function SkeletonEventList() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(n => (
          <SkeletonEventCard key={n} />
        ))}
      </div>
    );
  }
  

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {filteredEvents.length} Event(s) found
          </p>
          {searchTerm && (
            <p className="text-sm text-gray-600">
              Searched{" "}
              <span className="font-semibold">"{searchTerm}"</span>
            </p>
          )}
        </div>
      </header>

      <section className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <FilterBar
            filters={filters}
            onChangeFilters={setFilters}
            availableCities={availableCities}
            availableCategories={availableCategories}
          />

          <div className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white p-1 self-end md:self-auto mt-1 md:mt-0">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 text-xs sm:text-sm rounded-full transition ${
                viewMode === "list"
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              List
            </button>
            <button
              type="button"
              onClick={() => setViewMode("map")}
              className={`px-3 py-1.5 text-xs sm:text-sm rounded-full transition ${
                viewMode === "map"
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              disabled
            >
              Map
            </button>
          </div>
        </div>

        <ActiveFilters filters={filters} onChangeFilters={setFilters} />
      </section>

      <section className="space-y-4">
        {loading ? (
          <SkeletonEventList />
        ) : filteredEvents.length === 0 ? (
          <p className="text-sm text-gray-500">
            No events found matching your criteria{" "}
            <FaceFrownIcon className="inline w-5 h-5" />
          </p>
        ) : (
          <EventList events={filteredEvents} />
        )}
      </section>
    </div>
  );
}