"use client";

import React, { useState, useMemo } from 'react';
import { EventCardList } from '../components/EventCardList';
import { FilterBar, FilterState, defaultFilters, LayoutType } from '../components/FilterBar';

import { EventWithHost } from "../hooks/useEnrichedEvents"; 




interface AllEventsProps {
 events: EventWithHost[]; 
}


const CURRENT_USER_ID = 'user-123'; 

const getEventAction = (event: EventWithHost, currentUserId: string | number): 'edit' | 'remove' | 'join' | 'ended' => {
 const eventDate = new Date(event.date);
 const now = new Date();

 
 if (eventDate < now) {
  return 'ended';
 }


 if (event.isCreatedByMe) {
  return 'edit';
 }
 

 return 'join'; 
};

export default function AllEvents({ events = [] }: AllEventsProps) {
 const [filters, setFilters] = useState<FilterState>(defaultFilters);
 const [layout, setLayout] = useState<LayoutType>('grid');
 const [isFilterOpen, setIsFilterOpen] = useState(false);

 const safeEvents = Array.isArray(events) ? events : [];

 const filteredEvents = useMemo(() => {
  return safeEvents.filter(event => {
   if (!event) return false; 
 
   if (filters.onlineOnly && !event.isOnline) return false;
   if (filters.cities.length && !filters.cities.includes(event.city)) return false;
   if (filters.categories.length && !filters.categories.includes(event.category)) return false;
   return true;
  });
 }, [events, filters, safeEvents]);

 return (
  <div className="w-full">
     
        <div className="flex justify-between items-center mb-4">
        
        </div>
        
   <div className={`grid ${layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}`}>
    {filteredEvents.map(event => {
   
     const actionType = getEventAction(event, CURRENT_USER_ID); 
     
     return (
      <EventCardList 
       key={event.id} 
       event={event} 
       layout={layout} 
       action={actionType} 
      />
     );
    })}
   </div>

   <FilterBar
    events={safeEvents}
    currentFilters={filters}
    onApplyFilters={setFilters}
    isFilterOpen={isFilterOpen}
    setIsFilterOpen={setIsFilterOpen}
   />
  </div>
 );
}