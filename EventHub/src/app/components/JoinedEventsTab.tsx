import React, { useState, useMemo, useEffect } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, Bars3Icon, Squares2X2Icon } from '@heroicons/react/24/outline'; // Added layout icons

import { EventList } from '../components/cards/EventList'; 
import { useEventsContext } from "../context/EventsProvider";
import { EventCard } from './cards/EventCard';


export function JoinedEventsTab() {
    const { events: allEvents, loading } = useEventsContext(); 
    
    
    const myEventsSeed = useMemo(() => {
        return allEvents.filter(event => event.isJoinedByMe === true);
    }, [allEvents]); 
 

    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({ onlineOnly: false, cities: [] as string[] });
    const [currentLayout, setCurrentLayout] = useState<'grid' | 'list'>('list'); // Changed to useState with setter
    
    const defaultFilters = { onlineOnly: false, cities: [] as string[] };

   
    const handleLayoutToggle = () => {
        setCurrentLayout(prevLayout => (prevLayout === 'grid' ? 'list' : 'grid'));
    };

    if (loading) {
        return (
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
                <p className="text-center py-10">Loading your events...</p>
            </main>
        );
    }

    const availableCities = useMemo(() => {
        const toCity = (address: string) => {
            if (!address) return '';
            if (address.toLowerCase().includes('online')) return 'Online';
            const [city] = address.split(',');
            return city.trim();
        };
        const unique = new Set<string>();
        myEventsSeed.forEach(e => {
            const c = toCity(e.address);
            if (c) unique.add(c);
        });
        return Array.from(unique);
    }, [myEventsSeed]); 


    const filteredEvents = useMemo(() => {
        const baseFilter = (event: typeof myEventsSeed[number]) => {
            const matchesOnline = filters.onlineOnly ? event.address.toLowerCase().includes('online') : true;
            const matchesCity = filters.cities.length > 0
                ? filters.cities.some(city => event.address.toLowerCase().includes(city.toLowerCase()))
                : true;
            return matchesOnline && matchesCity;
        };

        if (!searchQuery) {
            return myEventsSeed.filter(baseFilter);
        }
        const query = searchQuery.toLowerCase();
        return myEventsSeed.filter(event => {
            const matchesSearch =
                event.title.toLowerCase().includes(query) ||
                event.address.toLowerCase().includes(query);
            
            return matchesSearch && baseFilter(event);
        });
    }, [searchQuery, filters, myEventsSeed]);

    useEffect(() => {
        if (!isFilterOpen) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsFilterOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFilterOpen]);


   return (
        <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">

            <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 flex-shrink-0">
                    My Joined Events
                </h3>
                <menu className="flex w-full sm:w-auto gap-3">
                
                    <figure className="relative flex-grow sm:flex-grow-0">
                        <input
                            type="text"
                            placeholder="Search my events ..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-80 pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-gray-50 text-sm focus:ring-red-500 focus:border-red-500" 
                        />
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </figure>

                  
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
                </menu>
            </section>

            <section className="mb-20">
                {filteredEvents.length > 0 ? (
                    <EventList 
                    events={filteredEvents} 
                    Card={EventCard}
                    />
                ) : (
                    <figure className="text-center p-10 bg-white rounded-xl shadow-md text-gray-500">
                        No events found.
                    </figure>
                )}
            </section>
            
            {isFilterOpen && (
                <aside className="fixed inset-0 z-50">
                    <section
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setIsFilterOpen(false)}
                        aria-hidden="true"
                    />
                    
                    <section className="absolute inset-0 flex items-center justify-center p-4">
                        <article className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100" role="dialog" aria-modal="true" aria-labelledby="filter-modal-title">
                            
                            <nav className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                                <h4 id="filter-modal-title" className="text-base font-semibold text-gray-900">Filters</h4>
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                                >
                                    Close
                                </button>
                            </nav>
                            
                            <fieldset className="p-5 space-y-4">
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={filters.onlineOnly}
                                        onChange={(e) =>
                                            setFilters((prev) => ({ ...prev, onlineOnly: e.target.checked }))
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900" 
                                    />
                                    <span className="text-sm text-gray-800">Online events only</span>
                                </label>

                                <section>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Cities</label>
                                    <menu className="flex flex-wrap gap-2">
                                        {availableCities.map((city) => {
                                            const selected = filters.cities.includes(city);
                                            return (
                                                <button
                                                    key={city}
                                                    type="button"
                                                    onClick={() => {
                                                        setFilters((prev) => {
                                                            const current = prev?.cities || [];
                                                            const next = selected
                                                                ? current.filter(c => c !== city)
                                                                : [...current, city];
                                                            return { ...defaultFilters, ...(prev || {}), cities: next }; 
                                                        });
                                                    }}
                                                    className={`${selected ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-300 rounded-full px-3 py-1 text-sm cursor-pointer`}
                                                >
                                                    {city}
                                                </button>
                                            );
                                        })}
                                    </menu>
                                </section>
                            </fieldset>
                            
                            <nav className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
                                <button
                                    onClick={() => setFilters(defaultFilters)}
                                    className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
                                >
                                    Clear
                                </button>
                                <menu className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsFilterOpen(false)}
                                        className="px-4 py-2 text-sm rounded-full border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => setIsFilterOpen(false)}
                                        className="px-4 py-2 text-sm rounded-full bg-gray-900 text-white hover:bg-gray-800 cursor-pointer"
                                    >
                                        Apply
                                    </button>
                                </menu>
                            </nav>
                            
                        </article>
                    </section>
                </aside>
            )}
        </article>
    );
}

export default JoinedEventsTab;