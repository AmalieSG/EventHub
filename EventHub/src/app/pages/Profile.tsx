'use client'
import React, { useState } from 'react';
// import { UpcomingTab } from '../components/UpcomingTab';
import { ProfileNav } from '../components/ProfileNav';
import {ProfileHeader} from '../components/ProfileHeader';
import {CreatedEventsTab} from '../components/CreatedEventsTab';
import {JoinedEventsTab} from '..//components/JoinedEventsTab';
import {PastEventsTab} from '../components/PastEventsTab';
import {SavedEventsTab} from '../components/SavedEventsTab';
import {AchievementsTab} from '../components/AchievementsTab';

import { useEventsContext } from "../context/EventsProvider";

export const Profile = () => {
    const [activeTabName, setActiveTab] = useState<string>('Upcoming');
    const {loading } = useEventsContext();
    const renderTabContent = () => {
/*             if (activeTabName === 'Upcoming') {
                return <UpcomingTab />;
            } */
            if (activeTabName === 'Created Events') {
                return <CreatedEventsTab />;
            }
            if (activeTabName === 'Joined Events') {
                return <JoinedEventsTab />;
            }
            if (activeTabName === 'Past Events') {
                return <PastEventsTab />;
            }
            if (activeTabName === 'Saved') {
                return <SavedEventsTab />;
            }
            if (activeTabName === 'Achievements') {
                return <AchievementsTab/>;
            }
           
            return null;
        }
    if (loading) {
        return <p className="text-center py-8">Loading events...</p>;
    }
    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-6 sm:my-8 lg:my-10">
            <div>
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