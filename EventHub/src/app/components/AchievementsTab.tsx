import React, { useEffect, useMemo, useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  TrophyIcon, 
  LockClosedIcon, 
  CheckCircleIcon, 
  ArrowPathIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

// --- Type Definitions ---
type AchievementStatus = 'Completed' | 'In Progress' | 'Locked';

interface AchievementType {
  id: number;
  title: string;
  description: string;
  status: AchievementStatus;
  progress: number;
}

// Mock data for achievements
const achievementsInitial: AchievementType[] = [
  { 
    id: 1, 
    title: 'First Step Forward', 
    description: 'Attend your very first event on EventHub.', 
    status: 'Completed', 
    progress: 100,
  },
  { 
    id: 2, 
    title: 'City Explorer', 
    description: 'Save events in three different major cities.', 
    status: 'In Progress', 
    progress: 66,
  },
  { 
    id: 3, 
    title: 'Master Planner', 
    description: 'Plan and schedule five events in a single month.', 
    status: 'In Progress', 
    progress: 20,
  },
  { 
    id: 4, 
    title: 'Digital Native', 
    description: 'Attend ten online-only events.', 
    status: 'Locked', 
    progress: 0,
  },
  { 
    id: 5, 
    title: 'Community Builder', 
    description: 'Invite five friends to the platform.', 
    status: 'Completed', 
    progress: 100,
  },
];

const ACHIEVEMENT_STATUSES: AchievementStatus[] = ['Completed', 'In Progress', 'Locked'];

// --- Achievement Card Component ---
const AchievementCard: React.FC<{ achievement: AchievementType }> = ({ achievement }) => {
  let statusColor = 'text-gray-900';
  let badgeClasses = 'bg-gray-100 text-gray-700';
  let progressColor = 'bg-gray-300';
  let statusIcon = <LockClosedIcon className="w-5 h-5 text-gray-400" />;

  if (achievement.status === 'Completed') {
    statusColor = 'text-green-600';
    badgeClasses = 'bg-green-100 text-green-700 font-semibold';
    progressColor = 'bg-green-500';
    statusIcon = <CheckCircleIcon className="w-5 h-5 fill-green-500 text-white" />;
  } else if (achievement.status === 'In Progress') {
    statusColor = 'text-yellow-600';
    badgeClasses = 'bg-yellow-100 text-yellow-700';
    progressColor = 'bg-yellow-500';
    statusIcon = <ArrowPathIcon className="w-5 h-5 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />;
  }
  
  const progressText = achievement.status === 'Completed' 
    ? 'Achieved!' 
    : achievement.status === 'In Progress' 
      ? `${achievement.progress}% Complete` 
      : 'Locked';

  return (
    <div className="flex bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 p-5 border border-gray-100">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full border-4 border-white shadow-md mr-4" style={{ backgroundColor: achievement.status === 'Locked' ? '#E5E7EB' : '#D1D5DB' }}>
        {statusIcon}
      </div>

      <div className="flex-grow flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-1">
            <h4 className="text-lg font-semibold text-gray-900">
              {achievement.title}
            </h4>
            <span className={`text-xs px-2 py-0.5 rounded-full ${badgeClasses}`}>
              {achievement.status}
            </span>
        </div>
        
        <p className="text-sm text-gray-500 mb-3">{achievement.description}</p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${progressColor}`} 
            style={{ width: `${achievement.progress}%` }}
          />
        </div>
        <p className={`text-xs mt-1 font-medium ${statusColor}`}>
          {progressText}
        </p>
      </div>

      <div className="flex flex-col justify-center items-end ml-4 space-y-2">
        {achievement.status === 'Completed' ? (
            <button 
                className="w-28 text-center px-4 py-2 text-xs sm:text-sm font-medium text-white bg-green-600 rounded-full shadow hover:bg-green-500 transition duration-150 cursor-pointer"
                onClick={() => console.log('Share achievement:', achievement.id)}
            >
                <ShareIcon className="w-4 h-4 inline-block mr-1"/> Share
            </button>
        ) : (
            <button className="w-28 text-center px-4 py-2 text-xs sm:text-sm font-medium text-white bg-gray-900 rounded-full shadow hover:bg-white hover:text-black transition duration-150 cursor-pointer">
                Details
            </button>
        )}
      </div>
    </div>
  );
};

// --- Main Achievements Tab Component ---
interface FiltersType {
  status: AchievementStatus[];
}

export function AchievementsTab() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const defaultFilters: FiltersType = { status: [] };
  const [filters, setFilters] = useState<FiltersType>(defaultFilters);
  const [achievements] = useState<AchievementType[]>(achievementsInitial);

  const filteredAchievements: AchievementType[] = useMemo(() => {
    const base = achievements.filter((achievement) => {
      // Filter by Status
      const matchesStatus = filters.status.length > 0
        ? filters.status.includes(achievement.status)
        : true;
      return matchesStatus;
    });

    if (!searchQuery) return base;
    
    // Filter by Search Query
    const query = searchQuery.toLowerCase();
    return base.filter((achievement) =>
      achievement.title.toLowerCase().includes(query) || achievement.description.toLowerCase().includes(query)
    );
  }, [searchQuery, filters, achievements]);

  // Handle escape key to close filter modal
  useEffect(() => {
    if (!isFilterOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFilterOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFilterOpen]);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 flex items-center gap-2 flex-shrink-0">
          <TrophyIcon className="w-6 h-6 text-yellow-600"/> My Achievements
        </h3>
        <div className="flex w-full sm:w-auto gap-3">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              placeholder="Search achievements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-80 pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm shadow-sm hover:bg-gray-100 transition duration-150 flex-shrink-0 cursor-pointer"
          >
            <FunnelIcon className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-20">
        {filteredAchievements.length > 0 ? (
          filteredAchievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))
        ) : (
          <div className="text-center p-10 bg-white rounded-xl shadow-md text-gray-500">
            {'No achievements match your search or filter criteria.'}
          </div>
        )}
      </div>

      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsFilterOpen(false)}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h4 className="text-base font-semibold text-gray-900">Filter by Status</h4>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  Close
                </button>
              </div>
              <div className="p-5 space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <div className="flex flex-wrap gap-2">
                  {ACHIEVEMENT_STATUSES.map((status) => {
                    const selected = filters.status.includes(status);
                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => {
                          setFilters((prev) => {
                            const current = prev.status || [];
                            const next = selected
                              ? current.filter((s) => s !== status)
                              : [...current, status];
                            return { ...prev, status: next };
                          });
                        }}
                        className={`${selected ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-300 rounded-full px-3 py-1 text-sm cursor-pointer transition duration-150`}
                      >
                        {status}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => setFilters(defaultFilters)}
                  className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  Clear
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="px-4 py-2 text-sm rounded-full bg-gray-900 text-white hover:bg-gray-800 cursor-pointer"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default AchievementsTab;