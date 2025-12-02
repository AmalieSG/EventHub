'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { EventList } from '../components/EventList'
import { BriefcaseIcon, MusicalNoteIcon, GlobeAltIcon, CakeIcon, FaceSmileIcon, TrophyIcon } from '@heroicons/react/24/solid';
import { FilterBar, FilterState, defaultFilters, LayoutType } from '../components/FilterBar';
//import { useEventsContext } from "../context/EventsProvider";
import type { EventWithRelations } from '../api/events/eventsRepository';
import { ofetch } from 'ofetch';
import { navigate } from "rwsdk/client";

const categories= [
    { name: 'BUSINESS', count: 23, icon: BriefcaseIcon },
    { name: 'MUSIC', count: 26, icon: MusicalNoteIcon },
    { name: 'TECHNOLOGY', count: 15, icon: GlobeAltIcon },
    { name: 'FOOD & DRINK', count: 18, icon: CakeIcon }, 
    { name: 'CULTURE', count: 12, icon: FaceSmileIcon }, 
    { name: 'SPORT', count: 29, icon: TrophyIcon }, 
];

type ApiOk<T> = { success: true; data: T };
type ApiErr = { success: false; error: { code: string; message: string } };
type ApiResponse<T> = ApiOk<T> | ApiErr;

export default function Home() {
    const [events, setEvents] = useState<EventWithRelations[]>([]);
    const [loading, setLoading] = useState(true);
    
    const [filters, setFilters] = useState<FilterState>(defaultFilters);
    const [layout, setLayout] = useState<LayoutType>('grid');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
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

    const popularEvents = events.slice(0, 3);

    function handleSearch(event: React.MouseEvent): void {
        if (searchQuery.trim()) {
        navigate(`/search?search=${encodeURIComponent(searchQuery)}`);
    }
    }

    if (loading) return <p>Loading events...</p>;

    return (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 font-sans">
            <section className="text-center mb-16">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                    Discover events in your area
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                    From concerts and workshops to networking events and food festivals - find perfect experiences that match your interests
                </p>
                <form className="flex justify-center" role="search">
                    <p className="relative w-full max-w-xl">
                        <input
                            type="text"
                            placeholder="Search for events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-5 pr-14 py-3 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-gray-800 focus:border-gray-800"
                        />
                        <button 
                            type="submit" 
                            onClick={handleSearch}
                            className="absolute right-0 top-0 h-full px-5 bg-red-600 text-white rounded-r-lg hover:bg-black hover:cursor-pointer transition duration-150"
                        >
                            Search
                        </button>
                    </p>
                </form>
            </section>

            <section className="mb-16">
                <p className="flex justify-between px-4 items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Popular Events</h2>
                    <a 
                        href="/all-events"
                        className="text-sm font-semibold text-gray-700 hover:text-black transition duration-150"
                    >
                        See all events
                    </a>
                </p>
                
                {popularEvents.length > 0 ? (
                    <EventList 
                        events={popularEvents} 
                        layout="grid" 
                        action="join"
                        className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    />
                ) : (
                    <p className="text-gray-500">No popular events to display.</p>
                )}
            </section>

            <hr className="my-10 border-gray-200" /> 
            
            <nav aria-label="Explore event categories" className="mb-16 bg-gray-100 w-full p-8 rounded-xl">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                    Explore categories
                </h2>
                <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map(cat => (
                        <li key={cat.name}>
                            <a 
                                href={`/category/${cat.name.toLowerCase()}`}
                                className="flex flex-col items-center p-4 bg-gray-800 border rounded-xl shadow-sm hover:shadow-lg transition duration-300 group "
                            >
                                <p className="p-3 mb-2 bg-gray-200 text-gray-800 rounded-xl text-2xl transition">
                                    <cat.icon className="w-8 h-8" />
                                </p>
                                <h3 className="text-sm font-semibold text-gray-200 pb-2 uppercase text-center">
                                    {cat.name}
                                </h3>
                                <p className="cursor-pointer hover:bg-gray-200 hover:text-gray-800 font-bold transition duration-300 group text-xs text-gray-200 bg-red-600 py-3 px-10 rounded-xl mt-0.5">
                                    {cat.count} Events
                                </p>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <hr className="my-10 border-gray-200" />
            
        </section>
    );
}