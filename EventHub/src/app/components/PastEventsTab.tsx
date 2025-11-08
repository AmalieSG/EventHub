import React, { useEffect, useMemo, useState } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon,
  MapPinIcon,
  ChatBubbleLeftEllipsisIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

const sharedImage = "https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amF6enxlbnwwfHwwfHx8MA%3D%3D&auto=format";

const pastEvents = [
  { id: 201, title: "Design Leaders Summit", date: "Sep 10, 2025", location: "San Francisco, CA", imageUrl: sharedImage },
  { id: 202, title: "Product Strategy Bootcamp", date: "Aug 22, 2025", location: "Austin, TX", imageUrl: sharedImage },
  { id: 203, title: "Remote Team Retreat", date: "Jul 14, 2025", location: "Online Event", imageUrl: sharedImage },
  { id: 204, title: "AI Ethics Roundtable", date: "Jun 2, 2025", location: "New York, NY", imageUrl: sharedImage },
];

export const PastEventsCard: React.FC<{ event: (typeof pastEvents)[number] }> = ({ event }) => (
  <div className="flex bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 p-4 border border-gray-100">
    <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden mr-4">
      <img
        src={event.imageUrl}
        alt={event.title}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "https://placehold.co/200x200/94A3B8/FFFFFF?text=Event+Img";
        }}
      />
    </div>

    <div className="flex-grow flex flex-col justify-between py-1">
      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{event.title}</h4>
      <div className="space-y-1 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 flex-shrink-0" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPinIcon className="w-4 h-4 flex-shrink-0" />
          <span>{event.location}</span>
        </div>
      </div>
    </div>

    <div className="flex flex-col justify-center items-end ml-4 space-y-2">
      <button className="w-36 text-center inline-flex items-center justify-center gap-1 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-gray-900 rounded-full shadow hover:bg-white hover:text-black transition duration-150 cursor-pointer">
        <PhotoIcon className="w-4 h-4" />
        View Recap
      </button>
      <button className="w-36 text-center inline-flex items-center justify-center gap-1 px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 transition duration-150 cursor-pointer">
        <ChatBubbleLeftEllipsisIcon className="w-4 h-4" />
        Leave Review
      </button>
    </div>
  </div>
);

export function PastEventsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ onlineOnly: false, cities: [] as string[] });
  const defaultFilters = { onlineOnly: false, cities: [] as string[] };

  const availableCities = useMemo(() => {
    const toCity = (location: string) => {
      if (!location) return "";
      if (location.toLowerCase().includes("online")) return "Online";
      const [city] = location.split(",");
      return city.trim();
    };
    const unique = new Set<string>();
    pastEvents.forEach((event) => {
      const city = toCity(event.location);
      if (city) unique.add(city);
    });
    return Array.from(unique);
  }, []);

  const filteredEvents = useMemo(() => {
    const matchesFilters = (event: (typeof pastEvents)[number]) => {
      const matchesOnline = filters.onlineOnly ? event.location.toLowerCase().includes("online") : true;
      const matchesCity = filters.cities.length > 0
        ? filters.cities.some((city) => event.location.toLowerCase().includes(city.toLowerCase()))
        : true;
      return matchesOnline && matchesCity;
    };

    const base = pastEvents.filter(matchesFilters);

    if (!searchQuery) return base;
    const query = searchQuery.toLowerCase();
    return base.filter((event) =>
      event.title.toLowerCase().includes(query) || event.location.toLowerCase().includes(query)
    );
  }, [searchQuery, filters]);

  useEffect(() => {
    if (!isFilterOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFilterOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFilterOpen]);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 flex-shrink-0">Past Events</h3>
        <div className="flex w-full sm:w-auto gap-3">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              placeholder="Search past events ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-80 pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm shadow-sm hover:bg-gray-100 transition duration-150 flex-shrink-0 cursor-pointer"
          >
            <FunnelIcon className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-20">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => <PastEventsCard key={event.id} event={event} />)
        ) : (
          <div className="text-center p-10 bg-white rounded-xl shadow-md text-gray-500">
            No past events match your filters.
          </div>
        )}
      </div>

      {isFilterOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsFilterOpen(false)} />
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
                    className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer"
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
                                ? current.filter((c) => c !== city)
                                : [...current, city];
                              return { ...defaultFilters, ...(prev || {}), cities: next };
                            });
                          }}
                          className={`${selected ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-white text-gray-700 hover:bg-gray-50"} border border-gray-300 rounded-full px-3 py-1 text-sm cursor-pointer`}
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
    </main>
  );
}


export default PastEventsTab;
