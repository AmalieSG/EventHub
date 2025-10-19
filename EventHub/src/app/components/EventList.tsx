import { EventCard } from "./EventCard"
import { Event } from "../types/Event"

interface EventListProps {
  events: Event[]
}

export function EventList({ events }: EventListProps) {
    return (
        <ul className="flex flex-col gap-4 list-none p-0">
            {events.map((event) => (
                <li key={event.id}>
                    <EventCard event={event} />
                </li>
            ))}
        </ul>
    )
}