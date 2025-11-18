"use client"

import React, { useEffect, useState } from 'react'
import { PriceBox } from '../components/PriceBox';
import { EventDetailBox } from '../components/EventDetailBox';
import EventDescription from '../components/EventDescription';
import ArtistLineup, { Artist } from '../components/ArtistLineup';
import type { EventWithRelations } from "@/app/api/events/eventsRepository";

interface EventProps {
    id: string;
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

                const response = await fetch(`http://localhost:5173/api/v1/events/${id}`)

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
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl text-gray-400">Loading event details...</p>
            </div>
        )
    }

    if (error || !event) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl text-red-500">{error || 'Event not found.'}</p>
            </div>
        )
    }

    // Get host name
    const hostName = event.host
        ? `${event.host.firstName} ${event.host.lastName}`
        : 'Unknown Host'

    // Format the event date
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
        price: event.price ? `$${event.price}` : 'Free',
        description: 'Event ticket',
        features: [
            'Entry to the event',
            'Access to main venue',
        ]
    }

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
        <div className="font-sans">
            <div className="relative w-full xl:w-full max-w-screen-2xl mx-auto h-96">
                <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src={event.imageUrl}
                    alt={`Image of ${event.title}`}
                />

                <div className="absolute mt-8 ml-5">
                    <span className="rounded-lg bg-black/70 text-white text-lg font-semibold px-6 py-5 uppercase tracking-widest shadow-md">
                        {event.category}
                    </span>
                </div>

                <div className="absolute inset-x-0 bottom-5 flex justify-center">
                    <div className="bg-black/30 py-6 px-12 w-full">
                        <h1 className="text-white text-5xl sm:text-6xl font-bold text-center">
                            {event.title}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
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
                    </div>

                    <div className="lg:col-span-1">
                        <PriceBox
                            price={priceData.price}
                            description={priceData.description}
                            features={priceData.features}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}