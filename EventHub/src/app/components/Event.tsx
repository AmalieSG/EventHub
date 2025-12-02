"use client"

import React, { useEffect, useState } from 'react'
import { PriceBox } from '../components/PriceBox';
import { EventDetailBox } from '../components/EventDetailBox';
import EventDescription from '../components/EventDescription';
import ArtistLineup, { Artist } from '../components/ArtistLineup';
import type { EventWithRelations } from "@/app/api/events/eventsRepository";

interface EventProps {
    id: number;
}

export function EventDetail({ id }: EventProps) {
    const [event, setEvent] = useState<EventWithRelations | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!id) return
        console.log(id);
        async function loadEvent() {
            try {
                setLoading(true)
                setError(null)

                const apiUrl = import.meta.env.VITE_API_URL;
                const response = await fetch(`${apiUrl}/api/v1/events/${id}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch event')
                }

                const result = await response.json() as { success: boolean; data: EventWithRelations }
                const { data } = result
                const eventData: EventWithRelations = data
                console.log(eventData);
                setEvent(eventData)
            } catch (err) {
                console.error('Error loading event:', err)
                setError(err instanceof Error ? err.message : 'Failed to load event')
                setEvent(null)
            } finally {
                setLoading(false)
            }
        }

        loadEvent()
    }, [id])

    if (loading) {
        return (
            <section className="flex items-center justify-center min-h-screen">
                <p className="text-xl text-gray-400">Loading event details...</p>
            </section>
        )
    }

    if (error || !event) {
        return (
            <section className="flex items-center justify-center min-h-screen">
                <p className="text-xl text-red-500">{error || 'Event not found.'}</p>
            </section>
        )
    }

    const hostName = event.host
        ? `${event.host.firstName} ${event.host.lastName}`
        : 'Unknown Host'

    const eventDate = new Date(event.eventStart)
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    }).toUpperCase()

    const formattedTime = eventDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })

    const eventData = {
        date: formattedDate,
        time: formattedTime,
        locationName: event.address,
        address: event.address,
        organizerName: hostName,
        organizerDetails: `Hosted by ${hostName}`,
    }

    const priceData = {
        price: '$189',
        description: 'Full day pass (incl. lunch and coffee)',
        features: [
            'Entry to the "Global Rhythms Night', 
            'Access to main performance hall', 
            'Complimentary drink upon arrival',
            "Free Appetizers Included",
            "Exclusive digital program guide",
            "Post-show artist meet & greet (limited availability)"
        ]
    };

    const descriptionData = [
        event.description
    ]

    const JazzLineup: Artist[] = [
        {
            name: 'The Global Rhythms Ensemble',
            description: 'A groundbreaking collective blending Cuban son, West African kora, and modern harmonic jazz.',
            role: 'Headliner',
        },
        {
            name: 'Lena Al-Mali',
            description: 'Oslo-based vocalist and composer known for her soulful, cinematic approach to traditional Arabic maqam.',
            role: 'Special Guest',
        },
        {
            name: 'Jonas Dahl Trio',
            description: 'A powerful Scandinavian piano trio focused on experimental, boundary-pushing improvisation.',
            role: 'Opening Act',
        },
        {
            name: 'Samba-Groove Collective',
            description: 'A vibrant, high-energy septet fusing traditional Brazilian samba and Bossa Nova with heavy modern funk rhythms.',
            role: 'Special Guest',
        }
    ]

    return (
        <article className="font-sans">
            <figure className="relative w-full xl:w-full max-w-screen-2xl mx-auto h-96">
                <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src={event.imageUrl}
                    alt={`Image of ${event.title}`}
                />

                <span className="absolute mt-8 ml-5">
                    <mark className="rounded-lg bg-black/70 text-white text-lg font-semibold px-6 py-5 uppercase tracking-widest shadow-md">
                        {event.category}
                    </mark>
                </span>

                <span className="absolute inset-x-0 bottom-5 flex justify-center">
                    <hgroup className="bg-black/30 py-6 px-12 w-full">
                        <h1 className="text-white text-5xl sm:text-6xl font-bold text-center">
                            {event.title}
                        </h1>
                    </hgroup>
                </span>
            </figure>

            <section className="max-w-7xl mx-auto px-4 mt-8">
                <p className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <span className="lg:col-span-2">
                        <EventDetailBox
                            date={eventData.date}
                            time={eventData.time}
                            locationName={eventData.locationName}
                            address={eventData.address}
                            organizerName={eventData.organizerName}
                            organizerDetails={eventData.organizerDetails}
                        />

                        <EventDescription
                            title="About the Event"
                            content={descriptionData}
                        />

                        <ArtistLineup artists={JazzLineup} />
                    </span>

                    <aside className="lg:col-span-1">
                        <PriceBox
                            price={priceData.price}
                            description={priceData.description}
                            features={priceData.features}
                        />
                    </aside>
                </p>
            </section>
        </article>
    )
}

export default EventDetail;