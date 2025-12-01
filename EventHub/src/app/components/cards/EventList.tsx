import type { EventWithRelations } from "@/app/api/events/eventsRepository"

interface EventListProps {
  events: EventWithRelations[];
  Card: React.ComponentType<{ event: EventWithRelations }>; // <- Foreslått av GitHub Copilot
}

export function EventList({ events, Card }: EventListProps) {
    
   return (
    <ul className="flex flex-col gap-4 list-none p-0">
      {events.map(event => (
        <li key={event.id}>
          <Card event={event} />
        </li>
      ))}
    </ul>
  )
}
