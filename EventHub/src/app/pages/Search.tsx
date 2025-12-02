"use client";

import { useEffect, useMemo, useState } from "react";
import { ofetch } from "ofetch";
import { FilterBar, FilterState, defaultFilters } from "../components/FilterBar";
import { EventList } from "../components/EventList";
import type { EventWithRelations } from "@/app/api/events/eventsRepository";
import { FunnelIcon } from "lucide-react";

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
    
    return events.filter((e) => {
      // Search filter
      const matchesSearch = !q || 
        [e.title, e.summary ?? "", e.description ?? "", e.category ?? "", e.address ?? ""]
          .some((field) => field.toLowerCase().includes(q));
      
      // Apply FilterBar filters
      const isOnline = e.address?.toLowerCase().includes('online') || false;
      const city = e.address?.split(',')[0]?.trim() || '';
      
      const matchesOnline = filters.onlineOnly ? isOnline : true;
      const matchesCity = filters.cities.length > 0
        ? filters.cities.some(selectedCity => city.toLowerCase() === selectedCity.toLowerCase())
        : true;
      const matchesCategory = filters.categories.length > 0
        ? filters.categories.includes(e.category)
        : true;
      
      return matchesSearch && matchesOnline && matchesCity && matchesCategory;
    });
  }, [events, searchTerm, filters]);

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto px-4 py-8">
        <p>Loading events…</p>
      </section>
    );
  }

  function handleClear(event: React.MouseEvent): void {
    setSearchTerm("");
    setFilters(defaultFilters);
  }


  return (
    <section className="max-w-5xl mx-auto px-4 py-8 space-y-6">
    
      <article className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      
        <section>
          <p className="text-sm text-gray-500">
            {filteredEvents.length} Event(er) funnet
          </p>
          {searchTerm && (
            <p className="text-sm text-gray-600">
              Søkeresultater for{" "}
              <span className="font-semibold">"{searchTerm}"</span>
            </p>
          )}
        </section>
        
       
        <nav className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 p-1">
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
        </nav>
      </article>

      
      <aside className="flex row gap-5">
        <button 
          onClick={() => setIsFilterOpen(true)} 
          className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm shadow-sm hover:bg-gray-100 transition duration-150 flex-shrink-0 cursor-pointer"
        >
          <FunnelIcon className="h-4 w-4" />
          Open Filter
        </button>
        <button 
          type="button" 
          onClick={handleClear}
          className="flex items-center gap-1.5 px-4 py-2 bg-red-600 border border-gray-200 text-white rounded-full text-sm shadow-sm transition duration-150 flex-shrink-0 cursor-pointer"
        >
          Nullstill filter
        </button> 
      </aside>
      
     
      <section className="space-y-4">
        {filteredEvents.length === 0 ? (
          <p className="text-sm text-gray-500">
            Fant ingen eventer som matcher søket ditt.
          </p>
        ) : (
          <EventList events={filteredEvents} />
        )}
      </section>

      <FilterBar
        events={events}
        currentFilters={filters}
        onApplyFilters={setFilters}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />
    </section>
  );
}

export default Search;