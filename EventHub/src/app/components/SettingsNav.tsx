import React, { useState } from 'react';
import {
  UserIcon, BellIcon, ShieldCheckIcon, AdjustmentsHorizontalIcon,
  CreditCardIcon, LifebuoyIcon
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Account', icon: UserIcon },
  { name: 'Notifications', icon: BellIcon },
  { name: 'Privacy & Security', icon: ShieldCheckIcon },
  { name: 'App Preferences', icon: AdjustmentsHorizontalIcon },
  { name: 'Payment & Subscriptions', icon: CreditCardIcon },
  { name: 'Support & Info', icon: LifebuoyIcon },
];


export const SettingsNav = () => {
  const [activeTab, setActiveTab] = useState('Account');
  return (
    <div className="bg-white p-6 shadow-md rounded-lg mx-8 mt-4 mb-4">
      <nav className="flex space-x-2 overflow-x-auto pb-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name; 

          const baseClasses = "flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap";
          const activeClasses = "bg-gray-100 text-gray-900 shadow-sm";
          const inactiveClasses = "text-gray-600 hover:bg-gray-50 hover:text-gray-900";

          return (
            <button
              key={item.name}
              
              onClick={() => setActiveTab(item.name)}
              className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};