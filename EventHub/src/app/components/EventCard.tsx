"use client";

export default function EventCard() {
  return (
    <div className=" overflow-hidden rounded-lg bg-white shadow-lg transition duration-300 hover:shadow-xl dark:bg-gray-800">
      
      {/* 1. Image/Visual Section (Optional but Recommended) */}
      <div className="h-48 w-full">
        {/* Placeholder for an event image */}
        <img
          src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amF6enxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500"
          alt="A vibrant concert crowd under stage lights"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="px-4 py-5 sm:p-6">
        
        {/* 2. Date and Category Tag */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-red-600 dark:text-red-400">
            Music & Concerts
          </p>
          <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            FRI, OCT 25
          </div>
        </div>
        
        {/* 3. Title */}
        <h3 className="text-xl font-bold leading-tight text-gray-900 dark:text-white line-clamp-2 mb-2">
          The Future of Jazz: Global Rhythms Night
        </h3>

        {/* 4. Location and Time */}
        <div className="flex flex-col space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            {/* Simple Location Icon (or use an SVG like Heroicons) */}
            <span className="mr-2">📍</span>
            <span>City Central Auditorium, Oslo</span>
          </div>
          <div className="flex items-center">
            {/* Simple Time Icon */}
            <span className="mr-2">⏰</span>
            <span>Doors 7:00 PM - Show 8:00 PM</span>
          </div>
        </div>

        {/* 5. Separator (Optional) */}
        <div className="my-4 border-t border-gray-100 dark:border-gray-700"></div>

        {/* 6. Call to Action (CTA) */}
        <a 
          href="/events/jazz-night-oslo-2025" 
          className="mt-4 w-full block text-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:bg-red-500 dark:hover:bg-red-600"
        >
          View Details & Tickets
        </a>
        
      </div>
    </div>
  )
}