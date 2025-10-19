import { FilterBar } from "../components/FilterBar"
import { EventList } from "../components/EventList"

export function Search() {
    const events = [
        {
            id: 1,
            title: "Klassisk Konsert - Oslo Filharmonien",
            description: "Opplev en magisk kveld med Beethoven og Mozart på programmet.",
            date: "19. sept",
            time: "18:00",
            location: "Oslo Konserthus, Oslo",
            price: 250,
            attendees: 890,
            host: "Oslo Filharmonien",
            category: "Musikk",
            createdAt: "2024-08-15T10:00:00Z"
        },
        {
            id: 2,
            title: "Indie Folk Konsert - Aurora Live",
            description: "Aurora holder intimkonsert i Oslo. Akustisk versjon av hennes største hits.",
            date: "25. sept",
            time: "20:30",
            location: "Sentrum Scene, Oslo",
            price: 150,
            attendees: 445,
            host: "Sentrum Scene",
            category: "Musikk",
            createdAt: "2024-08-15T10:00:00Z"
        },
        {
            id: 3,
            title: "Electronic Night - DJ Konsert",
            description: "Beste DJs i Oslo samles for en natt med elektronisk musikk og dans.",
            date: "21. sept",
            time: "22:00",
            location: "Jaeger Club, Oslo",
            price: 399,
            attendees: 156,
            host: "Jaeger Club",
            category: "Musikk",
            createdAt: "2024-08-15T10:00:00Z"
        }
    ]

    return (
        <div className="max-w-6xl mx-auto p-4">
            <section aria-label="Filtrering">
                <FilterBar />
            </section>

            <h1 className="mt-4 mb-3">
                <strong>“Concerts in Oslo”</strong>
            </h1>

            <p className="text-gray-600 mt-4 mb-3">
                {events.length} event(s) found 
            </p>

            <section aria-label="Arrangementsliste">
                <EventList events={events} />
            </section>
        </div>
    )
}
