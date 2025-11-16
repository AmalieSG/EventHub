import React, { useState } from 'react';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { EventWithHost } from "../hooks/useEnrichedEvents";
import type { EventWithRelations } from "@/app/api/events/eventsRepository";
import { da } from 'zod/v4/locales';

interface EventCardListProps {
  event: EventWithRelations;
  layout?: 'grid' | 'list';
  action?: 'join' | 'remove' | 'edit' | 'ended';
}

export function EventCardList({ event, layout = 'grid', action = 'join' }: EventCardListProps) {
    const date =
        event.eventStart instanceof Date
            ? event.eventStart
            : new Date(event.eventStart);
    const DateInfo = (
        <time dateTime={date.toISOString()} className="text-sm font-medium text-red-400">
            {date.toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })}
        </time>
    );
    const time = date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
    });
    const attendeeCount = event.attendees?.length ?? 0;
    const hostName = event.host
        ? `${event.host.firstName} ${event.host.lastName}`
        : "Unknown";
    const [isSaved, setIsSaved] = useState(event.isSavedByMe);
    const isGrid = layout === 'grid';

    const handleSave = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsSaved(1);
    };

    const handleActionClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (action === 'edit') console.log('Edit event', event.id);
        else if (action === 'ended') console.log('Event ended', event.id);
        else if (action === 'join') console.log('Join event', event.id);
        else if (action === 'remove') console.log('Remove event', event.id);
    };

    const listBgClasses = 'bg-gray-800 border-gray-700 transition-all duration-200';
    const gridBgClasses = 'bg-gray-800 border-gray-700 transition-all duration-200';
    const articleClasses = isGrid
        ? `border rounded-xl shadow-lg p-5 flex flex-col gap-4 ${gridBgClasses}`
        : `border rounded-xl shadow-md p-4 flex gap-6 items-center ${listBgClasses}`;

    const price = event.price ? String(event.price).trim() : undefined;
    const displayPrice = price && price !== '0';
    const formattedPrice = displayPrice ? `${price} $` : 'Free';

    const SaveButton = (
        <button
            onClick={handleSave}
            aria-label={isSaved ? "Unsave event" : "Save event"}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm shadow-lg
                        transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 z-10 hover:cursor-pointer
                        ${isSaved ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-white/90 text-gray-700 hover:bg-white/100 hover:text-red-600'}`}
        >
            {isSaved ? <HeartIconSolid className="h-5 w-5" /> : <HeartIconOutline className="h-5 w-5" />}
        </button>
    );

    const PriceInfo = (
        <p className="font-extrabold text-xl text-red-500">{formattedPrice}</p>
    );

    if (isGrid) {
        return (
            <main className={articleClasses} aria-label={`Event: ${event.title}`}>
                <div className="relative w-full h-48">
                    <img src={event.imageUrl} alt={`Image of ${event.title}`} className="w-full h-full object-cover rounded-lg" />
                    {SaveButton}
                </div>

                <section className="flex justify-between items-start pt-2 border-t border-gray-700/50">
                    <h2 className="text-xl font-bold text-white line-clamp-2 mr-4 h-[3.5rem] overflow-hidden">{event.title}</h2>
                    <span className="text-xs bg-red-600 px-3 py-1 rounded-full font-bold text-white flex-shrink-0 mt-1">{event.category}</span>
                </section>

                <p className="text-gray-300 line-clamp-2 h-[3rem] overflow-hidden">{event.summary}</p>

                <section className="flex flex-col gap-2 text-sm text-gray-400 mt-2 ">
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        <div className="flex items-center gap-1"><p className='text-red-400'>🗓️</p>{DateInfo}</div>
                        <div className="flex items-center gap-1"><p className='text-red-400'>⏰</p><p className='font-medium'>{time}</p></div>
                    </div>
                    <div className="flex items-center gap-1"><p className='text-red-400'>📍</p><address className="not-italic line-clamp-1">{event.address}</address></div>
                </section>

                <section className="flex justify-between items-center mt-4 pt-3 border-t border-gray-700/50">
                    <p className="text-sm text-gray-400 "><span className='font-bold text-white'>{attendeeCount}</span> attending</p>
                    {PriceInfo}
                </section>

                <p className="text-xs text-gray-500 ">Hosted by <span className='font-medium text-gray-400'>{hostName}</span></p>

                <section className="flex gap-3 mt-4 items-center">
                    <button
                        onClick={handleActionClick}
                        className={`flex-1 px-4 py-2 rounded-lg text-center text-white text-sm ${
                        action === 'ended'
                            ? 'bg-gray-400 cursor-default select-none'
                            : 'bg-red-600 hover:bg-red-700 transition duration-150 shadow-md cursor-pointer'
                        }`}
                    >
                        {action === 'edit' ? 'Edit' : action === 'remove' ? 'Remove' : action === 'ended' ? 'Event Ended' : 'Join'}
                    </button>
                    <a href={`/events/${event.id}`} className="rounded-lg border border-red-600 bg-gray-800 px-4 py-2 text-base font-medium text-white shadow-md hover:bg-gray-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 cursor-pointer">
                        See details
                    </a>
                </section>
            </main>
        );
    }


    return (
        <main className={articleClasses} aria-label={`Event: ${event.title}`}>
    <div className="flex w-full h-48">
        <div className="relative w-1/3 h-full overflow-hidden rounded-l-xl">
            <img
                src={event.imageUrl}
                alt={`Image of ${event.title}`}
                className="w-full h-full object-cover object-center"
            />
            {SaveButton}
        </div>

        <div className="flex-1 flex flex-col justify-between p-4">
            <section className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-extrabold text-white line-clamp-1 mr-4">{event.title}</h2>
                <span className="text-xs bg-gray-700 px-1 py-1 rounded-full px-10 py-2 bg-opacity-25  font-bold text-gray-200 flex-shrink-0">{event.category}</span>
            </section>
            <p className="text-gray-400 line-clamp-1 text-sm mb-3">{event.summary}</p>
            <section className="flex flex-col gap-y-1 text-xs text-gray-400">
                <div className="flex flex-wrap gap-x-4">
                    <div className="flex items-center font-medium"><span className="mr-1 text-red-400">⏰</span><p>{time}</p></div>
                    <div className="flex items-center"><span className="mr-1 text-red-400">🗓️</span>{DateInfo}</div>
                </div>
                <div className="flex items-center mt-1"><span className="mr-1 text-red-400">📍</span><address className="not-italic line-clamp-1 text-sm">{event.address}</address></div>
            </section>

            <section className="flex justify-between items-center mt-4 pt-3 border-t border-gray-700/50">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-400">Price:</span>
                    <p className="font-extrabold text-xl text-red-500">{formattedPrice}</p>
                </div>
                <div className="flex items-stretch gap-2">
                    <button
                        onClick={handleActionClick}
                        className={`font-bold w-32 h-10 flex flex-col sm:flex-row items-center justify-center rounded-lg text-white text-sm
${
                            action === 'ended'
                                ? 'bg-gray-400 cursor-default select-none'
                                : 'bg-red-600 hover:bg-red-700 transition duration-150 shadow-md cursor-pointer'
                        }`}
                    >
                        {action === 'edit' ? 'Edit' : action === 'remove' ? 'Remove' : action === 'ended' ? 'Event Ended' : 'Join'}
                    </button>
                    <a
                        href={`/events/${event.id}`}
                        className="w-32 h-10 flex flex-col sm:flex-row items-center justify-center rounded-lg border border-red-600 bg-gray-800 text-white shadow-md hover:bg-gray-700 transition duration-150"
                    >
                        See details
                    </a>
                </div>
            </section>
        </div>
    </div>
</main>

    );
}
