'use client'
import React, { useState } from 'react';
import { SettingsHeader } from '../components/SettingsHeader';
import { SettingsNav} from '../components/SettingsNav';
import { AccountTab} from '../components/AccountTab';
import { NotificationsTab } from '../components/NotificationsTab';
import { PrivacyTab } from '../components/PrivacyTab';
import {AppPreferencesTab } from '../components/AppPreferencesTab';
import { PaymentTab } from '../components/PaymentTab';
import {SupportTab} from '../components//SupportTab';
import { useAuth } from '../hooks/useAuth';




export const Settings = () => {
  const [activeTabName, setActiveTab] = useState<string>('Account');
  const {user} = useAuth();
  const renderTabContent = () => {
        if (activeTabName === 'Account') {
            return <AccountTab />;
        }
        if (activeTabName === 'Notifications') {
            return <NotificationsTab />;
        }
        if (activeTabName === 'Privacy & Security') {
            return <PrivacyTab />;
        }
        if (activeTabName === 'App Preferences') {
            return <AppPreferencesTab />;
        }
        if (activeTabName === 'Payment & Subscriptions') {
            return <PaymentTab/>;
        }
        if (activeTabName === 'Support & Info') {
            return <SupportTab/>;
        }
       
        return null;
        }
        
      
 return (
    <section className="h-full">
        <article>
            <SettingsHeader/>
        </article>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SettingsNav 
                activeTabName={activeTabName} 
                setActiveTab={setActiveTab} 
            />
        </nav>
        
        <section className="bg-gray-50 pb-20" >
            {renderTabContent()}
        </section>
    </section>
);
}
