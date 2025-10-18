import React from 'react'
import {PriceBox} from '../../components/PriceBox';
import EventDetailBox from '../../components/EventDetailBox';


export const EventDetail: React.FC = () => {

  const eventData = {
        date: 'FRI, OCT 25',
        time: '7:00 PM - 8:00 PM',
        locationName: 'City Central Auditorium, Oslo',
        address: 'Øvre Slottsgate 3, 0157 Oslo',
        organizerName: 'EventHub Norge',
        organizerDetails: 'Event organizer with a focus on quality and unity',
    };
    const priceData = {
        price: '$272',
        description: 'Full day pass (incl. lunch and coffee)',
        features: [
            'Access to all lectures', 
            'Lunch and coffee breaks included', 
            'Exclusive networking session'
        ]
    };

   return (
        <div className="font-sans">

            <div className="relative w-full xl:w-full max-w-screen-2xl mx-auto h-96">
                
                <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amF6enxlbnwwfHwwfHx8MA%3D%3D&auto=format" 
                />

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