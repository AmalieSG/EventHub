export const EventCardEventPage = ({ event }) => {
  return (
    // <article> is perfect for self-contained content like an event listing.
    // The aria-labelledby links the article to its main heading for accessibility.
    <article 
      className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 p-6 border-1 border-gray-300 rounded-xl "
      aria-labelledby={`event-title-${event.id}`}
    >
      {/* Visual Placeholder (Semantic HTML for an image that isn't loaded yet) */}
      <div className="flex-shrink-0 w-[120px] h-[120px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm rounded-md">
        {/* If you had an actual image, you'd use <img src={event.imageUrl} alt={event.title} /> */}
        300 × 300
      </div>

      {/* Event Details Section */}
      <div className="flex-grow">
        {/* The event title is the primary heading for this article */}
        <h3 id={`event-title-${event.id}`} className="text-lg font-semibold text-gray-900 mb-1">
          {event.title}
        </h3>
        
        {/* A semantic element for a tag/category */}
        <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800">
          {event.category}
        </span>

        {/* The description of the event */}
        <p className="text-gray-600 mt-2 mb-4">
          {event.description}
        </p>

        {/* Use <dl> (description list) for metadata like date, time, location, attendees */}
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <dt className="sr-only">Date</dt> {/* Visually hidden but good for screen readers */}
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <dd>{event.date}</dd>
          </div>
          <div className="flex items-center space-x-2">
            <dt className="sr-only">Time</dt>
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <dd>{event.time}</dd>
          </div>
          <div className="flex items-center space-x-2">
            <dt className="sr-only">Location</dt>
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <dd>{event.location}</dd>
          </div>
          <div className="flex items-center space-x-2">
            <dt className="sr-only">Attendees</dt>
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M7 11c0 2.761 2.239 5 5 5s5-2.239 5-5-2.239-5-5-5-5 2.239-5 5z" />
            </svg>
            <dd>{event.attendees}</dd>
          </div>
          <div className="flex items-center space-x-2">
            <dt className="sr-only">Host</dt>
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <dd>Hostet av {event.host}</dd>
          </div>
        </dl>
      </div>

      {/* Action Buttons and Price */}
      <div className="flex-shrink-0 flex flex-col space-y-2">
        <button 
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-label={`Join ${event.title}`} // Provide a descriptive label for screen readers
        >
          Bli Med
        </button>
        <button 
          className=" px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-label={`View details for ${event.title}`}
        >
        <a href="/events/1">Se Detaljer</a>
        </button>
        {/* <data> element is good for machine-readable values */}
        <data value={event.priceValue} className="text-lg font-bold text-gray-900 mt-2">
          {event.priceDisplay}
        </data>
      </div>
    </article>
  );
};