'use client'
import React, { useState } from 'react';
import { UpcomingTab } from '../components/UpcomingTab';
import { ProfileNav } from '../components/ProfileNav';
import {ProfileHeader} from '../components/ProfileHeader'

import { EventCardList } from "../components/EventCardList";
import { useEventsContext } from "../context/EventsProvider";

export const Profile = () => {
    const [activeTabName, setActiveTab] = useState<string>('Upcoming');
    const { events, loading } = useEventsContext();
    const renderTabContent = () => {
            if (activeTabName === 'Upcoming') {
                return <UpcomingTab />;
            }
            // if (activeTabName === 'My Events') {
            //     return <MyEventsTab />;
            // }
            // if (activeTabName === 'Past Events') {
            //     return <PastEventsTab />;
            // }
            // if (activeTabName === 'Saved') {
            //     return <SavedTab />;
            // }
            // if (activeTabName === 'Achievements') {
            //     return <AchievementsTab/>;
            // }
           
            return null;
        }
    if (loading) {
        return <p className="text-center py-8">Loading events...</p>;
    }
    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-6 sm:my-8 lg:my-10">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
                <ProfileHeader />
                <div className="max-w-7xl mx-auto mt-4">
                    <ProfileNav 
                        activeTabName={activeTabName} 
                        setActiveTab={setActiveTab} 
                    />
                </div>
            </div>
            
           
            <div className="mt-6">
                {renderTabContent()}
            </div>
            
        </main>
    );
};