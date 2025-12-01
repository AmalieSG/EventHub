"use client";

import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";
import type { EventWithRelations } from "@/app/api/events/eventsRepository";

interface EventCardProps {
    event: EventWithRelations;
}

export function EventCard({ event }: EventCardProps) {
    const eventDate = new Date(event.eventStart);

    const formattedDate = eventDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    const formattedTime = eventDate.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const location =
        event.address?.label ||
        event.address?.city ||
        "Location TBA";

    return (
        <article className="bg-white rounded-xl shadow p-4 flex flex-col">
            <figure className="rounded-lg h-40 w-full mb-4 overflow-hidden">
                <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="h-full w-full object-cover"
                />
            </figure>

            <section className="flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {event.title}
                </h3>

                <div className="flex items-center text-sm text-gray-600 mb-2">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    <span>
                        {formattedDate} – {formattedTime}
                    </span>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    <span className="line-clamp-1">{location}</span>
                </div>
            </section>

            <section className="mt-auto">
                <a
                    href={`/events/${event.id}`}
                    className="block bg-black text-white w-full py-3 rounded-md font-semibold text-center hover:bg-gray-800 transition"
                >
                    View Event
                </a>
            </section>
        </article>
    );
}
