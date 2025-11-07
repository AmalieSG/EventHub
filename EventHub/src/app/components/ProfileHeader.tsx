
import { MapPinIcon, CalendarIcon, PencilIcon,Cog6ToothIcon } from '@heroicons/react/24/outline';

export function ProfileHeader() {
  return(
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-6 sm:my-8 lg:my-10">
      <section className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow mb-6">
          <header className="flex flex-col sm:flex-row sm:items-center mb-4 gap-4">
              <div className="flex items-center">
                  <figure className="w-[5rem] h-[5rem] bg-gray-200 rounded-full flex items-center justify-center mr-0 sm:mr-3 flex-shrink-0">AW</figure>
                  <div>
                      <h2 className=" mb-2 text-lg sm:text-xl font-semibold">Aaron Warner</h2>
                      
                      <p className=" mb-2 text-gray-500 text-sm sm:text-base">Full-stack developer passionate about creating amazing experiences</p>
                      <section className="flex gap-2 items-center text-gray-500 text-sm sm:text-baseflex flex-col gap-2 md:flex-row md:gap-10 items-start md:items-center text-gray-500 text-sm sm:text-base">
                        <div className="flex items-center gap-1">
                          <MapPinIcon className="w-4 h-4" />
                          <p>San Francisco, CA</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          <p>Joined March 2023</p>
                        </div>
                      </section>
                      
                  </div>
              </div>
              <aside className="flex flex-wrap gap-4 sm:ml-auto">
                  <button className="flex items-center justify-center w-36 gap-2 border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 text-sm sm:text-base px-4 py-2 rounded-full">
                      <PencilIcon className="w-5 h-5" /> 
                      Edit Profile
                  </button>
                  
                  <a href="/settings">
                      <button className="flex items-center justify-center w-36 gap-2 border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 text-sm sm:text-base px-4 py-2 rounded-full">
                          <Cog6ToothIcon className="w-5 h-5" />
                          Settings
                      </button>
                  </a>
              </aside>
          </header>
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                  <p className="font-semibold text-base sm:text-lg">47</p>
                  <p className="text-gray-500 text-xs sm:text-sm">Events Attended</p>
              </div>
              <div>
                  <p className="font-semibold text-base sm:text-lg">12</p>
                  <p className="text-gray-500 text-xs sm:text-sm">Events Created</p>
              </div>
              <div>
                  <p className="font-semibold text-base sm:text-lg">3</p>
                  <p className="text-gray-500 text-xs sm:text-sm">Upcoming Events</p>
              </div>
              <div>
                  <p className="font-semibold text-base sm:text-lg">4.8</p>
                  <p className="text-gray-500 text-xs sm:text-sm">Average Rating</p>
              </div>
          </section>
      </section>

    
</main>

  )
}





