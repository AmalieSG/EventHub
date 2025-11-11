"use client";
import React, { useState } from 'react';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

import { EventWithHost } from "../hooks/useEnrichedEvents";

interface EventCardProps {
    event: EventWithHost
}

export default function EventCard({ event }: EventCardProps) {

    const [isSaved, setIsSaved] = useState(event.isSavedByMe);

    const price = event.price ? String(event.price).trim() : undefined;
    const displayPrice = price && price !== '0';


    const handleSave = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();


        setIsSaved(prev => !prev);
    };

    return (
       <main className="rounded-xl bg-gray-700 border border-gray-600 overflow-hidden transition duration-300 ease-in-out hover:shadow-2xl hover:border-red-600">
            <section className="relative h-48 w-full">
                <img
                    src={event.imageUrl}
                    alt={`Image of ${event.title}`}
                    className="h-full w-full object-cover rounded-t-xl"
                />


                <button
                    onClick={handleSave}
                    aria-label={isSaved ? "Unsave event" : "Save event"}
                    className={`
                        absolute top-3 right-3 p-2 rounded-full shadow-lg transition duration-200 cursor-pointer
                        ${isSaved
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-gray-200/90 text-gray-700 hover:bg-white/100 hover:text-red-600'
                        }
                    `}
                >
                    {isSaved ? (
                        <HeartIconSolid className="h-6 w-6" />
                    ) : (
                        <HeartIconOutline className="h-6 w-6" />
                    )}
                </button>
            </section>

            <section className="px-5 py-5 ">

                <div className="flex items-center justify-between mb-3">
                    <span className='text-xs bg-red-600 px-3 py-1 rounded-full font-bold text-white'>
                        {event.category}
                    </span>
                    <time dateTime={event.date.toISOString()} className="text-sm font-semibold text-gray-300">
                        {event.date.toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </time>
                </div>

                <h3 className="text-2xl font-extrabold leading-snug text-white line-clamp-2 mb-3 max-h-14 overflow-hidden">
                    {event.title}
                </h3>

                <div className="flex flex-col space-y-2 text-sm text-gray-400">
                    <div className="flex items-center">
                        <span className="mr-2 text-red-400">📍</span>
                        <span className='line-clamp-1'>{event.location}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="mr-2 text-red-400">⏰</span>
                        <span>{event.time}</span>
                    </div>
                </div>

                <div className="my-5 border-t border-gray-700 "></div>

                <div className="flex justify-between items-center mb-5">
                    <span className="text-sm font-medium text-gray-400">
                        Price:
                    </span>
                    <p className="text-2xl font-extrabold text-red-500 ">
                        {displayPrice ? `${price} $` : 'Free'}
                    </p>
                </div>

                <a
                    href="/events/1"
                    className="w-full block text-center rounded-lg border border-transparent bg-red-600 px-4 py-3 text-base font-semibold text-white shadow-lg hover:bg-red-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 cursor-pointer"
                >
                    View Event Details
                </a>

            </section>
        </main>
    );
}