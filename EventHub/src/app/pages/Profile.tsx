'use client'

import { EventCardList } from "../components/EventCardList";
import { useEventsContext } from "../context/EventsProvider";

export function Profile() {
    const { events, loading } = useEventsContext();
    if (loading) {
        return <p className="text-center py-8">Loading events...</p>;
    }
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-6 sm:my-8 lg:my-10">
            <section className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
                <header className="flex flex-col sm:flex-row sm:items-center mb-4 gap-4">
                    <div className="flex items-center">
                        <figure className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-0 sm:mr-3 flex-shrink-0">AW</figure>
                        <div>
                            <h2 className="text-lg sm:text-xl font-semibold">Aaron Warner</h2>
                            <p className="text-gray-500 text-sm sm:text-base">Full-stack developer passionate about creating amazing experiences</p>
                            <p className="text-gray-500 text-sm sm:text-base">San Francisco, CA</p>
                            <p className="text-gray-500 text-sm sm:text-base">Joined March 2023</p>
                        </div>
                    </div>
                    <aside className="flex flex-wrap gap-2 sm:ml-auto">
                        <button className="text-gray-600 hover:text-black text-sm sm:text-base px-3 py-1 rounded hover:bg-gray-100">Edit Profile</button>
                        <button className="text-gray-600 hover:text-black text-sm sm:text-base px-3 py-1 rounded hover:bg-gray-100">Settings</button>
                    </aside>
                </header>
                <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div>
                        <p className="font-semibold text-base sm:text-lg">47</p>
                        <p className="text-gray-500 text-xs sm:text-sm">Events Attended</p>
                    </div>
                    <div>
                        <p className="font-semibold text-base sm:text-lg">12</p>
                        <p className="text-gray-500 text-xs sm:text-sm">Events Created</p>
                    </div>
                    <div>
                        <p className="font-semibold text-base sm:text-lg">3</p>
                        <p className="text-gray-500 text-xs sm:text-sm">Upcoming Events</p>
                    </div>
                    <div>
                        <p className="font-semibold text-base sm:text-lg">4.8</p>
                        <p className="text-gray-500 text-xs sm:text-sm">Average Rating</p>
                    </div>
                </section>
            </section>

            <section className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
                <nav className="flex flex-wrap gap-2 sm:gap-4 mb-4">
                    <button className="bg-gray-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base">Upcoming</button>
                    <button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base hover:bg-gray-100">My Events</button>
                    <button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base hover:bg-gray-100">Past Events</button>
                    <button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base hover:bg-gray-100">Saved</button>
                    <button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base hover:bg-gray-100">Achievements</button>
                </nav>
                <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                    <h3 className="text-lg sm:text-xl font-semibold">Upcoming Events</h3>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <input 
                            type="text" 
                            placeholder="Search events..." 
                            className="border rounded px-2 sm:px-3 py-1.5 text-sm sm:text-base flex-1 sm:flex-none" 
                        />
                        <button className="border rounded px-2 sm:px-3 py-1.5 text-sm sm:text-base hover:bg-gray-100">Filter</button>
                    </div>
                </header>
                <div className="grid grid-cols-1 gap-4">
                    {events.map((event) => (
                        <EventCardList key={event.id} event={event} />
                    ))}
                </div>
            </section>
        </div>
    );
}