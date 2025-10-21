"use client";

import { EventWithHost } from "../hooks/useEnrichedEvents";

interface EventCardProps {
  event: EventWithHost
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className=" overflow-hidden rounded-lg bg-white shadow-lg transition duration-300 hover:shadow-xl dark:bg-gray-800">
      <div className="h-48 w-full">
        <img
          src={event.imageUrl}
          alt={`Image of ${event.title}`}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="px-4 py-5 sm:p-6">
        
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-red-600 dark:text-red-400">
            {event.category}
          </p>
          <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            {event.date}
          </div>
        </div>
        
        <h3 className="text-xl font-bold leading-tight text-gray-900 dark:text-white line-clamp-2 mb-2">
          {event.title}
        </h3>

        <div className="flex flex-col space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <span className="mr-2">📍</span>
            <span>{event.location}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">⏰</span>
            <span>Doors {event.time} - Show {event.time}</span>
          </div>
        </div>

        <div className="my-4 border-t border-gray-100 dark:border-gray-700"></div>

        <a 
          href="/events/1" 
          className="mt-4 w-full block text-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:bg-red-500 dark:hover:bg-red-600"
        >
          View Details & Tickets
        </a>
        
      </div>
    </div>
  )
}