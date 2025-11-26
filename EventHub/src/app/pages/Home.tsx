"use client";

import { useState, useMemo, useEffect } from 'react';
import { EventList } from '../components/EventList'
import type { EventWithRelations } from '../api/events/eventsRepository';
import { ofetch } from 'ofetch';
import { navigate } from "rwsdk/client";
import { SkeletonEventCard } from '../components/shared/SkeletonEventCard';
import { SearchBar } from '../components/shared/SearchBar';
import { BriefcaseIcon, MusicalNoteIcon, GlobeAltIcon, CakeIcon, TrophyIcon, FilmIcon, GlobeEuropeAfricaIcon, LightBulbIcon, PaintBrushIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';

type ApiOk<T> = { success: true; data: T };
type ApiErr = { success: false; error: { code: string; message: string } };
type ApiResponse<T> = ApiOk<T> | ApiErr;

export default function Home() {
    const [events, setEvents] = useState<EventWithRelations[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    
    const categoryIcons: Record<string, typeof BriefcaseIcon> = {
        business: BriefcaseIcon,
        music: MusicalNoteIcon,
        technology: GlobeAltIcon,
        "food and drink": CakeIcon,
        food: CakeIcon,
        culture: GlobeEuropeAfricaIcon,
        sport: TrophyIcon,
        art: PaintBrushIcon,
        entertainment: FilmIcon,
        social: PuzzlePieceIcon,
        workshop: LightBulbIcon,
    };

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await ofetch<ApiResponse<EventWithRelations[]>>(
                "/api/v1/events"
                );
                if (!cancelled && "success" in res && res.success) {
                    setEvents(res.data);
                }
            } catch (e) {
                console.error("Failed to load events:", e);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
        cancelled = true;
        };
    }, []);

    const popularEvents = useMemo(() => {
        if (!events.length) return [];

        const sorted = [...events].sort(
        (a, b) => (b.attendees?.length ?? 0) - (a.attendees?.length ?? 0)
        );

        return sorted.slice(0, 3);
    }, [events])

    function normalizeCategory(name: string): string {
        return name
            .trim()
            .toLowerCase()
            .replace(/&/g, "and")
            .replace(/\s+/g, " ").trim()
            .replace(/[-_]/g, " ")
            .replace(/[^a-z0-9 ]/g, "")
    }

    const categories = useMemo(() => {
        const counts = new Map<string, number>();
        for (const ev of events) {
            if (!ev.category) continue;
            const raw = normalizeCategory(ev.category);
            if (!raw) continue;

            const current = counts.get(raw) ?? 0;
            counts.set(raw, current + 1);
        }

        return Array.from(counts.entries()).map(([name, count]) => {
            const Icon =
            categoryIcons[name.toLowerCase()] ??
            BriefcaseIcon; 

            return { name, count, Icon };
        });
    }, [events]);


    function SkeletonEventList() {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(n => (
                <SkeletonEventCard key={n} />
                ))}
            </div>
        );
    }


     return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 font-sans">
            <section className="text-center mb-16">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                    Discover events in your area
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                    From concerts and workshops to networking events and food festivals - find perfect experiences that match your interests
                </p>

                <div className='flex justify-center'>
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                    />
                </div>
                
            </section>

            <section className="mb-16">
                <div className="flex justify-between px-4 items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Popular Events</h2>
                    <button 
                        onClick={() => navigate('/events')}
                        className="text-red-600 hover:text-black font-semibold transition duration-150"
                    >
                        View All Events
                    </button>
                </div>
             
                {loading ? (
                    <SkeletonEventList />
                ) : popularEvents.length > 0 ? (
                    <EventList 
                        events={popularEvents} 
                        layout="grid" 
                        action="join"
                        className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    />
                ) : (
                    <p className="text-gray-500">No events found.</p>
                )}
            </section>

            <hr className="my-10 border-gray-200" /> 
            
           
            <article className="mb-16 bg-gray-100 w-full p-8 rounded-xl">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                    Explore categories
                </h2>

                {categories.length === 0 ? (
                    <p className="text-center text-sm text-gray-500">
                        No categories available yet.
                    </p>
                ) : (
                    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                        {categories.map(({ name, Icon, count }) => (
                            <button
                                key={name}
                                type="button"
                                className="flex flex-col items-center p-4 bg-white border rounded-xl shadow-sm hover:shadow-lg transition duration-300 group"
                            >
                                <Icon
                                    className="w-7 h-7 mb-2 group-hover:scale-110 transition-transform"
                                    aria-hidden="true"
                                />
                                <p className="text-sm font-semibold text-gray-900 pb-1 uppercase text-center">
                                    {name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {count} {count === 1 ? "Event" : "Events"}
                                </p>
                            </button>
                        ))}
                    </section>
                )}
            </article>


            <hr className="my-10 border-gray-200" />
        </main>
    );
}