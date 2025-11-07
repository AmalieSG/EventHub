import React, { useState, useMemo } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';



interface EventCardProps {
  event: {
    id: number;
    title: string;
    date: string;
    location: string;
    imageUrl: string;
  };
}

const EventCardList: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="flex bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 p-4 border border-gray-100">
      
    
      <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden mr-4">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover" 
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src='https://placehold.co/200x200/94A3B8/FFFFFF?text=Event+Img'; }}
        />
      </div>

    
      <div className="flex-grow flex flex-col justify-between py-1">
        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
          {event.title}
        </h4>
        
        
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
        <button className="w-28 text-center px-4 py-2 text-xs sm:text-sm font-medium text-white bg-gray-900 rounded-full shadow hover:bg-white hover:text-black transition duration-150">
          View Details
        </button>
        <button className="w-28 text-center px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 transition duration-150">
          Leave Event
        </button>
      </div>

    </div>
  );
};


const initialEvents = [
  { id: 1, title: 'Tech Conference 2025', date: 'Dec 15, 2025 at 9:00 AM', location: 'San Francisco, CA', imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amF6enxlbnwwfHwwfHx8MA%3D%3D&auto=format' },
  { id: 2, title: 'Design Workshop', date: 'Dec 20, 2025 at 2:00 PM', location: 'New York, NY', imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amF6enxlbnwwfHwwfHx8MA%3D%3D&auto=format' },
  { id: 3, title: 'Startup Pitch Night', date: 'Jan 5, 2026 at 6:30 PM', location: 'Austin, TX', imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amF6enxlbnwwfHwwfHx8MA%3D%3D&auto=format' },
  { id: 4, title: 'Remote Work Summit', date: 'Feb 10, 2026 at 10:00 AM', location: 'Online Event', imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amF6enxlbnwwfHwwfHx8MA%3D%3D&auto=format' },
];

export function UpcomingTab() {
  const [searchQuery, setSearchQuery] = useState('');


  const filteredEvents = useMemo(() => {
    if (!searchQuery) {
      return initialEvents;
    }
    const query = searchQuery.toLowerCase();
    return initialEvents.filter(event =>
      event.title.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query)
    );
  }, [searchQuery]);


  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 flex-shrink-0">
          Upcoming Events
        </h3>
        <div className="flex w-full sm:w-auto gap-3">
        
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              placeholder="Search events ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-80 pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

   
          <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm shadow-sm hover:bg-gray-100 transition duration-150 flex-shrink-0">
            <FunnelIcon className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

 
      <div className="grid grid-cols-1 gap-6 mb-20">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCardList key={event.id} event={event} />
          ))
        ) : (
          <div className="text-center p-10 bg-white rounded-xl shadow-md text-gray-500">
            No upcoming events match your search criteria.
          </div>
        )}
      </div>
    </main>
  );
}