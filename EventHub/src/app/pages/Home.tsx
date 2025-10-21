<<<<<<< HEAD
=======
"use client";
>>>>>>> origin/main

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

      {/*
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

        <EventCard />
        <EventCard />
        <EventCard />
<<<<<<< HEAD
        <EventCard />
        <EventCard />
        <EventCard />

      </section>

       <h1 className="text-3xl font-extrabold text-gray-900 my-10">
        Popular Events 
      </h1>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

        <EventCard />
        <EventCard />
        <EventCard />
=======
        {/* Add more cards to see the grid in action /}
>>>>>>> origin/main
        <EventCard />
        <EventCard />
        <EventCard />

      </section>*/}

      <ul>
        {events.map((event) => (
          <li key={event.id} className="mb-4">
            <EventCard event={event} />
          </li>
        ))}
      </ul>     
        
    </div>
  )
};