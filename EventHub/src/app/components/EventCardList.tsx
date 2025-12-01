import type { EventWithRelations } from "@/app/api/events/eventsRepository";
import { CalendarIcon, ClockIcon, MapPinIcon, UserGroupIcon } from "@heroicons/react/24/outline";

interface EventCardListProps {
  event: EventWithRelations;
}

export function EventCardList({ event }: EventCardListProps) {
    const displayAddress: string =
        event.address?.formattedAddress ??
        event.address?.label ??
        "Address not available";
    
    const rawDate =
        event.eventStart instanceof Date
            ? event.eventStart
            : event.eventStart
            ? new Date(event.eventStart)
            : null;
            
    const isValidDate = rawDate && !isNaN(rawDate.getTime());
    
    const dateLabel = isValidDate
        ? rawDate!.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
        : "Date TBA";

    const timeLabel = isValidDate
        ? rawDate!.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
        : "Time TBA";

    const attendeeCount = event.attendees?.length ?? 0;
    
    const hostName = event.host
        ? `${event.host.firstName} ${event.host.lastName}`
        : "Unknown host";

    const price = event.price ?? 0;
    const formattedPrice = price === 0 ? "Free" : `$ ${price}`;

    return (
        <article
        className="flex items-stretch gap-6 rounded-3xl border border-gray-200 bg-white px-6 py-5 shadow-sm"
        aria-label={`Event: ${event.title}`}
        >
            <figure className="flex h-40 w-40 flex-shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 text-xl font-semibold">
                {event.imageUrl ? (
                    <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="h-full w-full rounded-2xl object-cover"
                    />
                    ) : (
                        <span>300 × 300</span>
                )}
            </figure>

            <section className="flex flex-1 flex-col gap-3">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-base font-semibold text-gray-900">
                        {event.title}
                        </h2>

                        {event.summary && (
                        <p className="mt-1 text-sm text-gray-700">{event.summary}</p>
                        )}
                    </div>

                    {event.category && (
                        <span className="inline-flex items-center rounded-full bg-gray-200 px-4 py-1 text-xs font-semibold text-gray-800">
                            {event.category}
                        </span>
                    )}
                </div>

                <section
                aria-label="Date, time and location"
                className="mt-1 flex flex-wrap gap-x-8 gap-y-1 text-xs text-gray-700"
                >
                    <p className="flex items-center gap-2">
                        <CalendarIcon className="h-4 text-gray-500" aria-hidden="true" />
                        <time className="font-semibold">{dateLabel}</time>
                    </p>

                    <p className="flex items-center gap-2">
                        <ClockIcon className="h-4 text-gray-500" aria-hidden="true" />
                        <span className="font-semibold">{timeLabel}</span>
                    </p>

                    <div className="flex items-center gap-2">
                        <MapPinIcon className="h-4 text-gray-500" aria-hidden="true" />
                        <address className="not-italic text-xs text-gray-700 line-clamp-1">
                            {displayAddress}
                        </address>
                    </div>
                </section>

                <section aria-label="Host and participants" className="mt-1 text-xs text-gray-600">
                    <UserGroupIcon className="inline h-4 text-gray-500 mr-1" aria-hidden="true" />
                    <p className="flex items-center gap-2">
                        <span>
                        <span className="font-semibold">{attendeeCount}</span> participants
                        </span>
                    </p>

                    <p className="mt-1">
                        Hosted by{" "}
                        <span className="font-medium text-gray-800">{hostName}</span>
                    </p>
                </section>
            </section>

            <aside className="flex w-40 flex-col items-stretch justify-between text-right">
                <div className="flex flex-col gap-3">
                    <a
                        // logikk kommer
                        /*href={`/events/${event.id}/join`}*/
                        className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-900"
                    >
                        Join
                    </a>

                    <a
                        href={`/events/${event.id}`}
                        className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                    >
                        See details
                    </a>
                </div>

                <p className="mt-4 text-right text-sm font-semibold text-gray-900">
                    {formattedPrice}
                </p>
            </aside>
        </article>
    );
}
