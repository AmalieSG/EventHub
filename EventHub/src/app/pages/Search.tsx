"use client";

import { FilterBar } from "../components/FilterBar"
import { EventList } from "../components/EventList"
import { useEventData } from "../hooks/useEventData"

export function Search() {
    const { events, loading } = useEventData()

    if (loading) {
        return <p>Loading events...</p>
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <FilterBar />

            <h1 className="mt-4 mb-3">
                <strong>“Concerts in Oslo”</strong>
            </h1>

            <p className="text-gray-600 mt-4 mb-3">
                {events.length} event(s) found 
            </p>

            <EventList events={events} />
        </div>
    )
}
