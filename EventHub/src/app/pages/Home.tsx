"use client";

import React, { useState } from 'react';
import { useEventsContext } from "../context/EventsProvider";
import { EventList } from "../components/EventList";
import { Squares2X2Icon, Bars3Icon } from '@heroicons/react/24/outline';

type LayoutType = 'grid' | 'list';

export const Home = () => {
    const [layout, setLayout] = useState<LayoutType>('grid');

    const { events, loading } = useEventsContext();
    
    const toggleLayout = (newLayout: LayoutType) => {
        setLayout(newLayout);
    };

    if (loading) {
        return <p>Loading events...</p>;
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            
          
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-extrabold text-white">
                    Upcoming Events
                </h1>

              
                <div className="flex space-x-1 p-1 rounded-lg bg-gray-600">
                    <button
                        onClick={() => toggleLayout('grid')}
                        className={`px-4 py-2 rounded-md transition-colors duration-150 cursor-pointer ${
                            layout === 'grid' 
                                ? 'bg-red-600 text-white shadow-md' 
                                : 'text-gray-300 hover:bg-gray-500'
                        }`}
                        aria-label="View events in grid layout"
                    >
                        <Squares2X2Icon className="h-5 w-5" />
                    </button>
                    
                    <button
                        onClick={() => toggleLayout('list')}
                        className={`px-4 py-2 rounded-md transition-colors duration-150 cursor-pointer ${
                            layout === 'list' 
                                ? 'bg-red-600 text-white shadow-md' 
                                : 'text-gray-300 hover:bg-gray-500'
                        }`}
                        aria-label="View events in list layout"
                    >
                        <Bars3Icon className="h-5 w-5" />
                    </button>
                </div>
            </div>
            
           
            <EventList events={events} layout={layout} />
            
        </div>
    );
};