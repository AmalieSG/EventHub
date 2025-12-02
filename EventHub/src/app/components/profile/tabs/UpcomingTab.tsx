import { useState, useMemo, useEffect } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon, Squares2X2Icon, Bars3Icon } from '@heroicons/react/24/outline'; 
import { useEventsContext } from '@/app/context/EventsProviderv2';
import { defaultFilters, FilterBar, FilterState } from '@/app/components/FilterBar';
import { EventList } from '@/app/components/cards/EventList';
import { EventCard } from '@/app/components/cards/EventCard';
import { getAddressLabel, getCity } from '@/app/lib/utils/eventView';

export function UpcomingTab() {
    const { events: allEvents, loading } = useEventsContext(); 

    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState<FilterState>(defaultFilters); 
    const [currentLayout, setCurrentLayout] = useState<'grid' | 'list'>('grid'); 
    
    const handleLayoutToggle = () => {
        setCurrentLayout(prevLayout => (prevLayout === 'grid' ? 'list' : 'grid'));
    };

    const handleApplyFilters = (filters: FilterState) => {
        setActiveFilters(filters);
    };

    if (loading) {
        return (
            <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
                <p className="text-center py-10">Loading upcoming events...</p>
            </article>
        );
    }
    

    const filteredEvents = useMemo(() => {
        if (allEvents.length === 0) return [];
        
        const now = new Date();
        const q = searchQuery.trim().toLowerCase();

        return allEvents.filter((event) => {
        
            const raw =
            event.eventStart instanceof Date
            ? event.eventStart
            : event.eventStart
            ? new Date(event.eventStart)
            : null;

            if (!raw || isNaN(raw.getTime())) return false;
            const isPast = raw < now;
            if (isPast) return false;

            const addressLabel = getAddressLabel(event).toLowerCase();
            const cityName = getCity(event);
            const cityLower = cityName.toLowerCase();
            const isOnline = addressLabel.includes("online");

            const matchesOnline = activeFilters.onlineOnly ? isOnline : true;

            const matchesCity =
                activeFilters.cities.length > 0
                ? activeFilters.cities.some(
                    (selectedCity) =>
                        cityLower === selectedCity.toLowerCase()
                    )
                : true;

            const matchesCategory =
                activeFilters.categories.length > 0
                ? activeFilters.categories.some(
                    (selectedCategory) =>
                        event.category?.toLowerCase() ===
                        selectedCategory.toLowerCase()
                )
            : true;

            const matchesSearch = q
                ? event.title.toLowerCase().includes(q) ||
                addressLabel.includes(q)
                : true;


            return matchesOnline && matchesCity && matchesCategory && matchesSearch;
        });
    }, [searchQuery, activeFilters, allEvents]);
    
    return (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">

            <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 flex-shrink-0">
                    Upcoming Events
                </h3>

                <menu className="flex w-full sm:w-auto gap-3">
                    
                    <form role="search" className="relative flex-grow sm:flex-grow-0">
                        <input
                            type="text"
                            placeholder="Search events ..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-80 pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-gray-50 text-sm focus:ring-red-500 focus:border-red-500"
                        />
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </form>
                
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
                        type="button"
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
                    <aside className="text-center p-10 bg-white rounded-xl shadow-md text-gray-500">
                        No upcoming events match your search criteria.
                    </aside>
                )}
            </section>
            
            <FilterBar 
                events={allEvents} 
                currentFilters={activeFilters} 
                onApplyFilters={handleApplyFilters}
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
            />
        </section>
    );
}