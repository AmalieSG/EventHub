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
        <aside className="bg-white p-6 rounded-xl shadow-lg border border-indigo-100 sticky top-4">
            
            <h3 className="text-4xl font-extrabold text-indigo-600 mb-2">{price}</h3>
            <p className="text-sm text-gray-500 mb-4">{description}</p>

            <a href="#buy" role="button" className="w-full block text-center bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition duration-150 shadow-md transform hover:scale-[1.01] mb-6">
                Buy Tickets Now
            </a>

            <section aria-label="Features Included">
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
            </section>
        </aside>
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
        <article className="bg-white p-6 rounded-xl shadow-lg mb-8" aria-labelledby="event-details-heading">

            <section>
                <h2 id="event-details-heading" className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">
                    Event Details
                </h2>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 pb-4 mb-4 border-b border-gray-200 text-gray-700">

                <figure className="flex items-start">
                    <CalendarIcon className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <figcaption className="font-medium text-sm">
                        <dt className="sr-only">Date</dt>
                        <dd>{props.date}</dd>
                    </figcaption>
                </figure>

                <figure className="flex items-start">
                    <ClockIcon className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <figcaption className="font-medium text-sm">
                        <dt className="sr-only">Time</dt>
                        <dd>{props.time}</dd>
                    </figcaption>
                </figure>

            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">

                <figure className="flex items-start">
                    <MapPinIcon className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <figcaption>
                        <h3 className="text-sm font-semibold text-gray-800">{props.locationName}</h3>
                        <address className="not-italic text-sm text-gray-600 mt-1">
                            {props.address ? props.address.split('\n').map((line, index) => (
                                <React.Fragment key={index}>{line}<br /></React.Fragment>
                            )) : 'No address available'}
                        </address>
                    </figcaption>
                </figure>

                <figure className="flex items-start">
                    <UsersIcon className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <figcaption>
                        <h3 className="text-sm font-semibold text-gray-800">{props.organizerName}</h3>
                        <p className="text-sm text-gray-600 mt-1">{props.organizerDetails}</p>
                    </figcaption>
                </figure>

            </section>
        </article>
    );
};


interface EventDescriptionProps {
    title: string;
    content: string[];
}

const EventDescription: React.FC<EventDescriptionProps> = ({ title, content }) => {
    return (
        <article className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <header>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">{title}</h2>
            </header>
            
            <section className="space-y-4 text-gray-700 text-lg">
                {content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </section>
        </article>
    );
};


interface ArtistLineupProps {
    artists: Artist[];
}

const ArtistLineup: React.FC<ArtistLineupProps> = ({ artists }) => {
    return (
        <section className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Artist Lineup</h2>
            </section>
            <ul className="space-y-8">
                {artists.map((artist, index) => (
                    <li key={index} className="flex items-start space-x-4">
                     
                        <figure className="flex-shrink-0 size-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                            {artist.name.charAt(0)}
                        </figure>
                        
                        <article className="flex-grow">
                            <header>
                                <h3 className="text-xl font-semibold text-gray-900">{artist.name}</h3>
                                <p className="text-sm font-medium text-indigo-600 mb-1 uppercase tracking-wider">{artist.role}</p>
                            </header>
                            <p className="text-gray-600">{artist.description}</p>
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    );
};


