import { EventCardList } from "./EventCardList"
import { EventWithHost } from "../hooks/useEventData"

interface EventListProps {
  events: EventWithHost[]
}

export function EventList({ events }: EventListProps) {
    return (
        <ul className="flex flex-col gap-4 list-none p-0">
            {events.map((event) => (
                <li key={event.id}>
                    <EventCardList event={event} />
                </li>
            ))}
        </ul>
    )
}