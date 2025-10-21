"use client";

import EventCard from "../components/EventCard";
import { useEventsContext } from "../context/EventsProvider";

export const Home = () => {
  const { events, loading } = useEventsContext();
  if (loading) {
    return <p>Loading events...</p>;
  }

  return (

    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
        Upcoming Events
      </h1>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
            <EventCard key={event.id} event={event} />
        ))}
      </section>

      
        
    </div>
  )
};