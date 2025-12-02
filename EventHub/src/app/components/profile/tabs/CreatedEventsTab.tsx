import { useState, useMemo, useEffect, use } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, Bars3Icon, Squares2X2Icon } from '@heroicons/react/24/outline'; 
import { EventList } from '../../cards/EventList';
import { EventCard } from '../../cards/EventCard';
import { useCurrentUser } from '@/app/hooks/useCurrentUser';
import { EventWithRelations } from '@/app/api/events/eventsRepository';
import { getAddressLabel, getCity } from '@/app/lib/utils/eventView';
import { EventCardList } from '../../cards/EventCardList';
import { useEventsContext } from '@/app/context/EventsProviderv2';

type Filters = {
    onlineOnly: boolean;
    cities: string[];
};

const defaultFilters: Filters = {
    onlineOnly: false,
    cities: [],
};

export function CreatedEventsTab() {
    const { user, loading: userLoading, isAuthenticated } = useCurrentUser();
    const { events: allEvents, loading: eventsLoading } = useEventsContext();
    
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState<Filters>(defaultFilters);
    const [currentLayout, setCurrentLayout] = useState<'grid' | 'list'>('grid'); 
    
    const handleLayoutToggle = () => {
        setCurrentLayout(prevLayout => (prevLayout === 'grid' ? 'list' : 'grid'));
    };

    const myEvents = useMemo<EventWithRelations[]>(() => {
        if (!user) return [];
        return allEvents.filter(event => event.host?.id === user.id);
    }, [allEvents, user]);

    const availableCities = useMemo(() => {
        const uniqueCities = new Set<string>();

        myEvents.forEach((event) => {
        const city = getCity(event);
        if (city) {
            uniqueCities.add(city);
        }
        });
        return Array.from(uniqueCities).sort();
    }, [myEvents]); 

    
    const filteredEvents = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (myEvents.length === 0) return [];

        return myEvents.filter((event) => {
            const addressLabel = getAddressLabel(event).toLowerCase();
            const cityName = getCity(event);
            const cityLower = cityName.toLowerCase();
            const isOnline = addressLabel.includes("online");

            const matchesOnline = filters.onlineOnly ? isOnline : true;

            const matchesCity =
                filters.cities.length > 0
                ? filters.cities.some(
                    (selectedCity) =>
                        cityLower === selectedCity.toLowerCase()
                    )
                : true;

            const matchesSearch = q
                ? event.title.toLowerCase().includes(q) || 
                    addressLabel.includes(q)
                : true;
                
            return matchesOnline && matchesCity && matchesSearch;
        });
    }, [searchQuery, filters, myEvents]);

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

    if (userLoading || eventsLoading) {
        return (
            <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
                <p className="text-center py-10">Loading your events...</p>
            </article>
        );
    }

    if (!isAuthenticated || !user) {
        return (
            <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
                <p className="text-center py-10 text-red-600">
                    You must be logged in to view this tab.
                </p>
            </article>
        );
    }

    return (
        <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 flex-shrink-0">
                    My Events
                </h3>
                <div className="flex w-full sm:w-auto gap-3">
                
                    <div className="relative flex-grow sm:flex-grow-0">
                        <input
                            type="text"
                            placeholder="Search my events ..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-80 pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-gray-50 text-sm focus:ring-red-500 focus:border-red-500" 
                        />
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>

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
                    <button onClick={() => setIsFilterOpen(true)} className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm shadow-sm hover:bg-gray-100 transition duration-150 flex-shrink-0 cursor-pointer">
                        <FunnelIcon className="h-4 w-4" />
                        Filter
                    </button>
                </div>
            </div>

            <div className="mb-20">
                {filteredEvents.length > 0 ? (
                    currentLayout === "grid" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <EventList
                            events={filteredEvents}
                            Card={EventCardList}
                        />
                    )
                ) : (
                    <div className="text-center p-10 bg-white rounded-xl shadow-md text-gray-500">
                        No events found.
                    </div>
                )}
            </div>

            
            {isFilterOpen && (
                <div className="fixed inset-0 z-50">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setIsFilterOpen(false)}
                    />
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100">
                            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                                <h4 className="text-base font-semibold text-gray-900">Filters</h4>
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                                >
                                    Close
                                </button>
                            </div>
                            <div className="p-5 space-y-4">
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={filters.onlineOnly}
                                        onChange={(e) =>
                                            setFilters((prev) => ({ ...defaultFilters, ...(prev || {}), onlineOnly: e.target.checked }))
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900" 
                                    />
                                    <span className="text-sm text-gray-800">Online events only</span>
                                </label>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Cities</label>
                                    <div className="flex flex-wrap gap-2">
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
                                    </div>
                                </div>
                            </div>
                            <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
                                <button
                                    onClick={() => setFilters(defaultFilters)}
                                    className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
                                >
                                    Clear
                                </button>
                                <div className="flex items-center gap-2">
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
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </article>
    );
}
