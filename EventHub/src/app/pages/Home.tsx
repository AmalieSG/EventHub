"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Squares2X2Icon, Bars3Icon, FunnelIcon } from '@heroicons/react/24/outline';
import { EventList } from '../components/EventList';
import { FilterBar, FilterState, defaultFilters, LayoutType } from '../components/FilterBar';
import { useEventsContext } from "../context/EventsProvider";

export default function Home() {
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

    if (loading) return <p>Loading events...</p>;

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
                    Upcoming Events
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
                    No upcoming events match your search criteria.
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
