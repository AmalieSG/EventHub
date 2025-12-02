import { useState, useMemo, useEffect } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, Bars3Icon, Squares2X2Icon } from '@heroicons/react/24/outline'; 
import { useEventsContext } from '@/app/context/EventsProviderv2';
import { EventWithRelations } from '@/app/api/events/eventsRepository';
import { getAddressLabel, getCity } from '@/app/lib/utils/eventView';
import { EventCard } from '../../cards/EventCard';
import { EventList } from '../../cards/EventList';
import { EventCardList } from '../../cards/EventCardList';

const MOCK_SAVED_EVENTS: EventWithRelations[] = [
  {
    id: "saved-1",
    title: "Frontend Workshop",
    description: "Hands-on React and TypeScript workshop.",
    summary: "Bring your laptop and build a small app.",
    eventStart: new Date("2025-04-01T18:00:00"),
    address: {
      id: "addr-1",
      formattedAddress:
        "MESH Youngstorget, Møllergata 6, 0179 Oslo, Norway",
      label: "Cowork Space, Oslo",
      city: "Oslo",
      area: null,
      country: "Norway",
      latitude: null,
      longitude: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any,
    price: 900,
    host: {
      id: 1,
      username: "user1",
      firstName: "Anna",
      lastName: "Andersen",
      email: "user1@example.com",
      passwordHash: "",
      phoneNumber: null,
      city: "Oslo",
      country: "Norway",
      profilePicture: null,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      isActive: 1,
      lastLoginAt: null,
      bio: "Tech enthusiast.",
    } as any,
    category: "Technology",
    imageUrl: "https://via.placeholder.com/600x400?text=Frontend+Workshop",
    includedFeatures: "Workshop materials,Coffee and snacks",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    status: "upcoming",
    addressId: "addr-1",
    hostId: 1,
    attendees: [],
    savedBy: [],
  } as EventWithRelations,
  {
    id: "saved-2",
    title: "Wine & Cheese Evening",
    description: "Tasting of selected wines and local cheeses.",
    summary: "Guided tasting with sommelier.",
    eventStart: new Date("2025-05-10T19:30:00"),
    address: {
      id: "addr-2",
      formattedAddress:
        "Vinbaren på Grand, Nedre Ole Bulls plass 1, 5012 Bergen, Norway",
      label: "Tasting Room, Bergen",
      city: "Bergen",
      area: null,
      country: "Norway",
      latitude: null,
      longitude: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any,
    price: 650,
    host: {
      id: 4,
      username: "user4",
      firstName: "David",
      lastName: "Dahl",
      email: "user4@example.com",
      passwordHash: "",
      phoneNumber: null,
      city: "Bergen",
      country: "Norway",
      profilePicture: null,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      isActive: 1,
      lastLoginAt: null,
      bio: "Food and wine lover.",
    } as any,
    category: "Food & Drink",
    imageUrl: "https://via.placeholder.com/600x400?text=Wine+%26+Cheese",
    includedFeatures: "Wine tasting,Cheese pairing",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    status: "upcoming",
    addressId: "addr-2",
    hostId: 4,
    attendees: [],
    savedBy: [],
  } as EventWithRelations,
];

type Filters = {
  onlineOnly: boolean;
  cities: string[];
};

const defaultFilters: Filters = {
  onlineOnly: false,
  cities: [],
};

export function SavedEventsTab() {
    const savedEvents = MOCK_SAVED_EVENTS;
    
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({ onlineOnly: false, cities: [] as string[] });
    const [currentLayout, setCurrentLayout] = useState<'grid' | 'list'>('grid'); 
    

    const handleLayoutToggle = () => {
        setCurrentLayout(prevLayout => (prevLayout === 'grid' ? 'list' : 'grid'));
    };


    if (loading) {
        return (
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
                <p className="text-center py-10">Loading your events...</p>
            </section>
        );
    }

    const availableCities = useMemo(() => {
        const unique = new Set<string>();
        savedEvents.forEach((e) => {
            const c = getCity(e);
            if (c) unique.add(c);
        });
        return Array.from(unique).sort();
    }, [savedEvents]); 


    const filteredEvents = useMemo(() => {
        const query = searchQuery.toLowerCase();
        if (savedEvents.length === 0) return [];

        return savedEvents.filter((event) => {
            const addressLabel = getAddressLabel(event).toLowerCase();
            const cityName = getCity(event).toLowerCase();
            const isOnline = addressLabel.includes('online');

            const matchesOnline = filters.onlineOnly ? isOnline : true;

            const matchesCities =
                filters.cities.length > 0
                    ? filters.cities.some(
                        (selectedCity) =>
                            cityName === selectedCity.toLowerCase()        
                    )
                : true;
        
            const matchesSearch = query
                ? event.title.toLowerCase().includes(query) ||
                    addressLabel.includes(query)
                : true;
            
            return matchesOnline && matchesCities && matchesSearch;
        });
    }, [searchQuery, filters, savedEvents]);

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
                <hgroup>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 flex-shrink-0">
                        Saved Events
                    </h3>
                    <p className='text-sm text-gray-500'>
                        Statick demo
                    </p>
                </hgroup>
                <menu role="list" className="flex w-full sm:w-auto gap-3">
                
                    <figure className="relative flex-grow sm:flex-grow-0">
                        <input
                            type="text"
                            placeholder="Search saved events ..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-80 pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-gray-50 text-sm focus:ring-red-500 focus:border-red-500" 
                        />
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </figure>

                    <button
                        type="button"
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
                currentLayout === "grid" ? (
                    // Grid: bare EventCard
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                    </div>
                ) : (
                    // Liste: EventList + EventCardList
                    <EventList events={filteredEvents} Card={EventCardList} />
                )
                ) : (
                <article className="text-center p-10 bg-white rounded-xl shadow-md text-gray-500">
                    No saved events found.
                </article>
                )}
            </section>

            
            {isFilterOpen && (
                <section className="fixed inset-0 z-50" aria-modal="true" role="dialog">
                    <figure
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setIsFilterOpen(false)}
                    />
                    <figure className="absolute inset-0 flex items-center justify-center p-4">
                        <article className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100">
                            <hgroup className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                                <h4 className="text-base font-semibold text-gray-900">Filters</h4>
                                <button
                                    type="button"
                                    onClick={() => setIsFilterOpen(false)}
                                    className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                                >
                                    Close
                                </button>
                            </hgroup>
                            <form className="p-5 space-y-4">
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
                                    <menu role="list" className="flex flex-wrap gap-2">
                                        {availableCities.map((city) => {
                                            const selected = filters.cities.includes(city);
                                            return (
                                                <li key={city}>
                                                    <button
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
                                                </li>
                                            );
                                        })}
                                    </menu>
                                </section>
                            </form>
                            <menu role="list" className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
                                <li>
                                    <button
                                        type="button"
                                        onClick={() => setFilters(defaultFilters)}
                                        className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
                                    >
                                        Clear
                                    </button>
                                </li>
                                <li className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsFilterOpen(false)}
                                        className="px-4 py-2 text-sm rounded-full border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        onClick={() => setIsFilterOpen(false)}
                                        className="px-4 py-2 text-sm rounded-full bg-gray-900 text-white hover:bg-gray-800 cursor-pointer"
                                    >
                                        Apply
                                    </button>
                                </li>
                            </menu>
                        </article>
                    </figure>
                </section>
            )}
        </article>
    );
}

export default SavedEventsTab;