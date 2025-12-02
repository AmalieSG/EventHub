import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid';

interface EventDetailBoxProps {
    date: string;
    time: string;
    locationName: string;
    address: string;
    organizerName: string;
    organizerDetails: string;
}

export function EventDetailBox(props: EventDetailBoxProps) {

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
                                <span key={index}>{line}<br /></span>
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


