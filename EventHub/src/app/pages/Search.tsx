"use client";
/*
import React, { useState, useMemo, useEffect } from 'react';
import { Squares2X2Icon, Bars3Icon, FunnelIcon } from '@heroicons/react/24/outline';
import { EventList } from '../components/EventList';
import { FilterBar, FilterState, defaultFilters, LayoutType } from '../components/FilterBar';
import { useEventsContext } from "../context/EventsProvider";

export default function Search() {
    const { events, loading } = useEventsContext();
    const [filters, setFilters] = useState<FilterState>(defaultFilters);
    const [layout, setLayout] = useState<LayoutType>('grid');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentLayout, setCurrentLayout] = useState<'grid' | 'list'>('grid'); 
    const handleLayoutToggle = () => {
        setCurrentLayout(prevLayout => (prevLayout === 'grid' ? 'list' : 'grid'));
    };
    

    const filteredEvents = useMemo(() => {
        const baseFilter = (event: typeof events[number]) => {
            const matchesOnline = filters.onlineOnly ? event.isOnline : true;
            const matchesCity = filters.cities.length > 0
                ? filters.cities.includes(event.city)
                : true;
            const matchesCategory = filters.categories.length > 0
                ? filters.categories.includes(event.category)
                : true;
            const matchesSearch = searchQuery
                ? event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  (event.city && event.city.toLowerCase().includes(searchQuery.toLowerCase()))
                : true;
            return matchesOnline && matchesCity && matchesCategory && matchesSearch;
        };
        return events.filter(baseFilter);
    }, [events, filters, searchQuery]);

    useEffect(() => {
        if (!isFilterOpen) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setIsFilterOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFilterOpen]);

    if (loading) return <p className="p-5">Loading events...</p>;

    const availableCities = useMemo(() => {
        const unique = new Set<string>();
        events.forEach(e => { if (e.city) unique.add(e.city); });
        return Array.from(unique);
    }, [events]);

    const availableCategories = useMemo(() => {
        const unique = new Set<string>();
        events.forEach(e => { if (e.category) unique.add(e.category); });
        return Array.from(unique);
    }, [events]);

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-3xl font-extrabold text-black flex-shrink-0">
                    Search
                </h1>
                
                <div className="flex w-full sm:w-auto gap-3">
                    <input
                        type="text"
                        placeholder="Search events ..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full sm:w-80 pl-3 pr-4 py-2 border border-gray-200 rounded-full bg-gray-50 text-sm focus:ring-red-500 focus:border-red-500"
                    />
                  
                    <button
                        onClick={handleLayoutToggle}
                        className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm shadow-sm hover:bg-gray-100 transition duration-150 flex-shrink-0 cursor-pointer"
                    >
                        
                        {currentLayout === 'grid' ? (
                            <Bars3Icon className="h-4 w-4" /> 
                        ) : (
                            <Squares2X2Icon className="h-4 w-4" /> 
                        )}
                        {currentLayout === 'grid' ? 'List View' : 'Grid View'}
                    </button>

                    <button 
                        onClick={() => setIsFilterOpen(true)} 
                        className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm shadow-sm hover:bg-gray-100 transition duration-150 flex-shrink-0 cursor-pointer"
                    >
                        <FunnelIcon className="h-4 w-4" />
                        Filter
                    </button>
                </div>
            </div>

            <div className="mb-20">
            {filteredEvents.length > 0 ? (
                <EventList 
                events={filteredEvents}  
                layout={currentLayout} 
                action="join" 
                />
            ) : (
                <div className="text-center p-10 bg-white rounded-xl shadow-md text-gray-500">
                    No events match your search criteria.
                </div>
            )}
            </div>
            

            <FilterBar
                events={events}
                currentFilters={filters}
                onApplyFilters={setFilters}
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
            />
        </div>
    );
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
