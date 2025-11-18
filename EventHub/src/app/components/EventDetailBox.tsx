import React from 'react';
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid';

type Artist = {
    name: string;
    description: string;
    role: string;
};

interface PriceBoxProps {
    price: string;
    description: string;
    features: string[];
}

const PriceBox: React.FC<PriceBoxProps> = ({ price, description, features }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-indigo-100 sticky top-4">
            <h3 className="text-4xl font-extrabold text-indigo-600 mb-2">{price}</h3>
            <p className="text-sm text-gray-500 mb-4">{description}</p>

            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition duration-150 shadow-md transform hover:scale-[1.01] mb-6">
                Buy Tickets Now
            </button>

            <ul className="space-y-3 text-gray-700">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <svg className="h-6 w-6 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-md">{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

interface EventDetailBoxProps {
    date: string;
    time: string;
    locationName: string;
    address: string;
    organizerName: string;
    organizerDetails: string;
}

export const EventDetailBox: React.FC<EventDetailBoxProps> = (props) => {

    return (
        <section className="bg-white p-6 rounded-xl shadow-lg mb-8" aria-labelledby="event-details-heading">

            <h2 id="event-details-heading" className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">
                Event Details
            </h2>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 pb-4 mb-4 border-b border-gray-200 text-gray-700">

                <div className="flex items-start">
                    <CalendarIcon className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <dt className="sr-only">Date</dt>
                    <dd className="font-medium text-sm">
                        {props.date}
                    </dd>
                </div>

                <div className="flex items-start">
                    <ClockIcon className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <dt className="sr-only">Time</dt>
                    <dd className="font-medium text-sm">
                        {props.time}
                    </dd>
                </div>

            </dl>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">

                <div className="flex items-start">
                    <MapPinIcon className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800">{props.locationName}</h3>
                        <address className="not-italic text-sm text-gray-600 mt-1">
                            {props.address ? props.address.split('\n').map((line, index) => (
                                <React.Fragment key={index}>{line}<br /></React.Fragment>
                            )) : 'No address available'}
                        </address>
                    </div>
                </div>

                <div className="flex items-start">
                    <UsersIcon className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800">{props.organizerName}</h3>
                        <p className="text-sm text-gray-600 mt-1">{props.organizerDetails}</p>
                    </div>
                </div>

            </div>
        </section>
    );
};


interface EventDescriptionProps {
    title: string;
    content: string[];
}

const EventDescription: React.FC<EventDescriptionProps> = ({ title, content }) => {
    return (
        <section className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">{title}</h2>
            <div className="space-y-4 text-gray-700 text-lg">
                {content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
        </section>
    );
};


interface ArtistLineupProps {
    artists: Artist[];
}

const ArtistLineup: React.FC<ArtistLineupProps> = ({ artists }) => {
    return (
        <section className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Artist Lineup</h2>
            <ul className="space-y-8">
                {artists.map((artist, index) => (
                    <li key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 size-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                            {artist.name.charAt(0)}
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-xl font-semibold text-gray-900">{artist.name}</h3>
                            <p className="text-sm font-medium text-indigo-600 mb-1 uppercase tracking-wider">{artist.role}</p>
                            <p className="text-gray-600">{artist.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};


