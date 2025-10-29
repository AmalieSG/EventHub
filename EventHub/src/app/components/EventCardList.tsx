import { EventWithHost } from "../hooks/useEnrichedEvents"

interface EventCardProps {
  event: EventWithHost
}

export function EventCardList({ event }: EventCardProps) {
    return (
        <article
        className="bg-white border rounded-xl shadow-sm p-5 flex flex-col gap-3"
        aria-label={`Event: ${event.title}`}
        >
            <img src={event.imageUrl} alt={`Image of ${event.title}`} className="w-full h-48 object-cover rounded-lg" />
            
            <section className="flex justify-between items-start">
                <h2 className="text-lg font-semibold">
                    {event.title}
                </h2>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                    {event.category}
                </span>
            </section>

            <p className="text-gray-600">
                {event.shortDescription}
            </p>

            <section className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                <time dateTime={event.date.toISOString()}>
                    {event.date.toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    })}
                </time>
                <p> 
                    {event.time}
                </p>
                <address className="not-italic"> 
                    {event.address}
                </address>
            </section>

            <section className="flex justify-between items-center mt-3">
                <p className="text-sm text-gray-500">
                    {event.attendeeCount} attending
                </p>
                <p className="font-semibold">
                    ${event.price}
                </p>
            </section>

            <p className="text-xs text-gray-400">
                Hosted by{" "} 
                {event.host
                    ? `${event.host.firstName} ${event.host.lastName}`
                    : "Unknown"}
            </p>

            <section className="flex gap-2 mt-3">
                <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
                    Join
                </button>
                <button className="border border-gray-400 px-4 py-2 rounded-md hover:bg-gray-100">
                    See details
                </button>
            </section>
        </article>
    )
}
