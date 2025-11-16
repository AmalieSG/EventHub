import { EventCardList } from "./EventCardList"
import { EventWithHost } from "../hooks/useEnrichedEvents"
import type { EventWithRelations } from "@/app/api/events/eventsRepository"

interface EventListProps {
  events: EventWithRelations[];
  layout?: 'grid' | 'list';
  action?: 'join' | 'remove' | 'edit' | 'ended';
  className?: string;
}

export function EventList({ events, layout = 'grid', action = 'join' }: EventListProps) {
  const listClasses = layout === 'grid'
    ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 list-none p-0"
    : "flex flex-col gap-4 list-none p-0"
    
   return (
    <ul className={listClasses}>
      {events.map(event => (
        <li key={event.id}>
          <EventCardList event={event} layout={layout} action={action} />
        </li>
      ))}
    </ul>
  )
}
