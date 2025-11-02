'use client'
import React, { useState } from 'react';
import { SettingsHeader } from '../components/SettingsHeader';
import {SettingsNav} from '../components/SettingsNav';
import {AccountTab} from '../components/AccountTab';
import { NotificationsTab } from '../components/NotificationsTab';
import { PrivacyTab } from '../components/PrivacyTab';



export const Settings: React.FC = () => {
  const [activeTabName, setActiveTab] = useState<string>('Account');

  const renderTabContent = () => {
        if (activeTabName === 'Account') {
            return <AccountTab />;
        }
        if (activeTabName === 'Notifications') {
            return <NotificationsTab />;
        }
        if (activeTabName === 'Security') {
            return <PrivacyTab />;
        }
        return null;
        }
        
      
  return (
    <div className="bg-gray-50 min-h-screen">
      <div> <SettingsHeader/></div>
     
      <SettingsNav 
            activeTabName={activeTabName} 
            setActiveTab={setActiveTab} 
        />

      <div>{renderTabContent()}</div>
    </div>
    
  );
}
