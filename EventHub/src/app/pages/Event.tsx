import { useState } from 'react'
import {PriceBox} from '../components/PriceBox';
import {EventDetailBox} from '../components/EventDetailBox';
import EventDescription from '../components/EventDescription';
import ArtistLineup, { Artist } from '../components/ArtistLineup';
import { useEventsContext } from '../context/EventsProvider';


export const Event = () => {
    
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
        <div className="font-sans">

            <div className="relative w-full xl:w-full max-w-screen-2xl mx-auto h-96">
                <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amF6enxlbnwwfHwwfHx8MA%3D%3D&auto=format" 
                />

                <div className="absolute mt-8 ml-5">
                    <span className="rounded-lg  bg-black/70 text-white text-lg font-semibold px-6 py-5 uppercase tracking-widest shadow-md">
                        {category}
                    </span>
                </div>

                <div className="absolute inset-x-0 bottom-5 flex justify-center">
                    <div className="bg-black/30 py-6 px-12 w-full">
                        <h1 className="text-white text-5xl sm:text-6xl font-bold text-center">
                            The Future of Jazz: Global Rhythms Night
                        </h1>
                    </div>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 mt-8"> 
                <>
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
                </>
            </div>
            
        </div>
    );
};
