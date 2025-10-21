<<<<<<< HEAD
import { EventCardEventPage } from "../components/EventCardEventPage";

const eventData = [
    {
        id: 'e1',
        title: 'Klassisk Konsert - Oslo Filharmonien',
        category: 'Musikk',
        description: 'Opplev en magisk kveld med Oslo Filharmonien. Beethoven og Mozart på programmet.',
        date: '19. sept',
        time: '18:00',
        location: 'Oslo Konserthus, Oslo',
        attendees: '890 deltakere',
        host: 'Oslo Filharmonien',
        priceValue: 250,
        priceDisplay: '$ 250',
    },
    {
        id: 'e2',
        title: 'Indie Folk Konsert - Aurora Live',
        category: 'Musikk',
        description: 'Aurora holder intimkonsert i Oslo. Akustisk versjon av hennes største hits.',
        date: '25. sept',
        time: '20:00',
        location: 'Sentrum Scene, Oslo',
        attendees: '345 deltakere',
        host: 'Aurora',
        priceValue: 350,
        priceDisplay: '$ 350',
    },
    // ... more events
];

export const Search = () => {

    return (

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
                Søkeside
            </h1>

            <section aria-labelledby="event-results-heading" className="mx-auto mt-6 bg-white rounded-lg">
                <h2 id="event-results-heading" className="sr-only">Event Search Results</h2>
                <div>
                    <p className="text-gray-700 mb-4">
                        <span className="font-semibold">{eventData.length}</span> Event(er) funnet
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                        Søkeresultater for "konsert Oslo"
                    </p>
                </div>
            
                    {eventData.map(event => (
                        <EventCardEventPage key={event.id} event={event} />
                    ))}
             
            </section>

        </div>
    )
};
=======
"use client";

import { FilterBar } from "../components/FilterBar"
import { EventList } from "../components/EventList"
import { useEventsContext } from "../context/EventsProvider";

export function Search() {
    const { events, loading } = useEventsContext();

    if (loading) {
        return <p>Loading events...</p>
    }

    return (
        <section className="max-w-6xl mx-auto p-4">
            <FilterBar />

            <h1 className="mt-4 mb-3">
                <strong>“Concerts in Oslo”</strong>
            </h1>

            <p className="text-gray-600 mt-4 mb-3">
                {events.length} event(s) found 
            </p>

            <EventList events={events} />
        </section>
    )
}
>>>>>>> origin/main
