import { MapPinIcon, CalendarIcon, PencilIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { SafeUser } from '@/db/schema';

interface ProfileHeaderProps {
  user: SafeUser | null;
  stats?: {
    eventsAttended: number;
    eventsCreated: number;
    upcomingEvents: number;
  }
}

export function ProfileHeader({user, stats} : ProfileHeaderProps) {
  const fullName = `${user?.firstName} ${user?.lastName}`;
  const displayName =
    user?.username?.trim() && user.username !== fullName
      ? user.username
      : fullName;
  const cityCountry = 
  [
    user?.city, 
    user?.country
  ]
  .filter(Boolean)
  .join(', ') ??
  "Location not set";
  const joinedDateLabel = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
      })
    : '-';
  const bio = 
      user?.bio?.trim() ??
      'This user has not added a bio yet.';
  const profilePicture = 
      user?.profilePicture ??
      'https://www.unspash.com/collections/220339/portrait-placeholder';

  return (
        <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-6 sm:my-8 lg:my-10 font-sans">
            <section className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-2xl mb-6 border border-gray-700">
                <figure className="flex flex-col sm:flex-row sm:items-center mb-4 gap-4">
                    <section className="flex items-center">
                    
                        <img 
                            className="w-[5rem] h-[5rem] rounded-full object-cover mr-0 sm:mr-3 flex-shrink-0" 
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                            alt="Aaron Warner profile"
                        />
                        <figcaption>
                            <h2 className="mb-2 text-lg sm:text-xl font-semibold text-white">{displayName} </h2>
                            <p className="mb-2 text-gray-400 text-sm sm:text-base ml-4 ">{bio}</p>
                            
                            <section className="ml-4 flex flex-col gap-2 md:flex-row md:gap-10 items-start md:items-center text-gray-400 text-sm sm:text-base">
                                <figure className="flex items-center gap-1">
                                    <MapPinIcon className="w-4 h-4 text-gray-500" />
                                    <p>{cityCountry}</p>
                                </figure>
                                <figure className="flex items-center gap-1">
                                    <CalendarIcon className="w-4 h-4 text-gray-500" />
                                    <p>Joined {joinedDateLabel}</p>
                                </figure>
                            </section>
                        </figcaption>
                    </section>
                    <aside className="flex flex-wrap gap-4 sm:ml-auto">
                        <a href="/settings">
                            <button className="flex items-center justify-center w-36 gap-2 border border-red-700 bg-red-600 text-gray-200 shadow-sm hover:bg-red-700 text-sm sm:text-base px-4 py-2 rounded-full cursor-pointer transition duration-150">
                                <Cog6ToothIcon className="w-5 h-5" />
                                Settings
                            </button>
                        </a>
                    </aside>
                </figure>
                
                <menu role="list" className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center border-t border-gray-700 pt-4 mt-4">
                    <li>
                        <p className="font-semibold text-base sm:text-lg text-white">{stats?.eventsAttended ?? '-'}</p>
                        <p className="text-gray-400 text-xs sm:text-sm">Events Attended</p>
                    </li>
                    <li>
                        <p className="font-semibold text-base sm:text-lg text-white">{stats?.eventsCreated ?? '-'}</p>
                        <p className="text-gray-400 text-xs sm:text-sm">Events Created</p>
                    </li>
                    <li>
                        <p className="font-semibold text-base sm:text-lg text-white">{stats?.upcomingEvents ?? '-'}</p>
                        <p className="text-gray-400 text-xs sm:text-sm">Upcoming Events</p>
                    </li>
                    <li>
                        <p className="font-semibold text-base sm:text-lg text-white">4.8</p>
                        <p className="text-gray-400 text-xs sm:text-sm">Average Rating</p>
                    </li>
                </menu>
            </section>
        </article>
    );
}