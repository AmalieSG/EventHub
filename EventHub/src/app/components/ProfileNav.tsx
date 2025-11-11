
import React from 'react'; 


const navItems = [
  { name: 'Upcoming' },
  { name: 'My Events' },
  { name: 'Past Events' },
  { name: 'Saved'},
  { name: 'Achievements'}
];

interface ProfileNavProps {
  activeTabName: string;
  setActiveTab: (name: string) => void;
}


export const ProfileNav: React.FC<ProfileNavProps> = ({ activeTabName, setActiveTab}) => {
  
  return (
    <div className="bg-white p-2 shadow-md rounded-3xl p-2  mx-8 mt-4 mb-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-4">

      <nav className="flex space-x-4 overflow-x-auto">
        {navItems.map((item) => {
         
          
  
          const isActive = activeTabName === item.name;

          const baseClasses = "w-full text-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer";
          const activeClasses = "bg-gray-100 text-gray-900 shadow-sm";
          const inactiveClasses = "text-gray-600 hover:bg-gray-50 hover:text-gray-900";

          return (
            <button
              key={item.name}
             
              onClick={() => setActiveTab(item.name)} 
              className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
