"use server"

import ArtistLineup, { Artist } from '../components/ArtistLineup';
import { EventDetail } from '../components/Event';
import type { RequestInfo } from "rwsdk/worker";

export async function Event({ params }: RequestInfo) {

    const eventData = {
        date: 'FRI, OCT 25',
        time: '7:00 PM - 8:00 PM',
        locationName: 'City Central Auditorium, Oslo',
        address: 'Øvre Slottsgate 3, 0157 Oslo',
        organizerName: 'The Blue Note Club',
        organizerDetails: 'The legendary Blue Note brand, committed to excellence and innovation in live jazz performance worldwide.',
    };
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

    const category = 'Music';
    
    const descriptionData = [
        "Join us for an unforgettable evening where the improvisational spirit of jazz meets the vibrant, compelling rhythms of the world. The Future of Jazz: Global Rhythms Night is a showcase of musical innovation, celebrating jazz as a truly global language shaped by migration, collaboration, and boundary-pushing artists. ",
        "Experience a sonic journey that moves beyond traditional borders, blending contemporary jazz with powerful traditions from Latin America, Africa, the Caribbean, and Europe. This event brings together world-class musicians who are not just playing jazz—they are expanding it, infusing it with hypnotic global percussion, storytelling, and fiery instrumental passion.",
        "Whether you're a lifelong jazz aficionado or simply looking for an evening of truly original and soulful music, prepare for a performance that is both technically brilliant and physically thrilling. Discover the next chapter of jazz where every beat tells a global story. "
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
    
    ];

   return (
       <EventDetail id={params.id} />
    );
};
