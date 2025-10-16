import React from 'react'
import {PriceBox} from '../../components/PriceBox';
import EventDetailBox from '../../components/EventDetailBox';

const EventDetail: React.FC = () => {

  const eventData = {
        date: 'Saturday, 12. Oct',
        time: '18:00 - 20:00',
        locationName: 'Oslo Kongressenter',
        address: 'Youngs gate 11\n0181 Oslo, Norway',
        organizerName: 'EventHub Norge',
        organizerDetails: 'Event arrangør med fokus på kvalitet og samhold.',
    };
    const priceData = {
        price: '2.990 kr',
        description: 'Full dagspass (inkl. lunsj og kaffe)',
        features: [
            'Tilgang til alle foredrag', 
            'Lunsj og kaffepauser inkludert', 
            'Eksklusiv nettverksmingling'
        ]
    };

   return (
        <div className="max-w-4xl mx-auto p-4 font-[Inter]">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                Arrangementsdetaljer: {eventData.locationName}
            </h1>

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
        </div>
    );
};

export default EventDetail;
