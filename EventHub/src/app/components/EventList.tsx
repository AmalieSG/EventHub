import { EventCardList } from "./EventCardList"
import type { EventWithRelations } from "@/app/api/events/eventsRepository"

interface EventListProps {
  events: EventWithRelations[];
}

export function EventList({ events }: EventListProps) {
    
   return (
    <ul className="flex flex-col gap-4 list-none p-0">
      {events.map(event => (
        <li key={event.id}>
          <EventCardList event={event} />
        </li>
      ))}
    </ul>
  )
}
