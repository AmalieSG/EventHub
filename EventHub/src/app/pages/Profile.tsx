'use client'
import { useState } from 'react';
import { UpcomingTab } from '../components/profile/tabs/UpcomingTab';
import { ProfileNav } from '../components/profile/ProfileNav';
import {ProfileHeader} from '../components/profile/ProfileHeader';
import {CreatedEventsTab} from '../components/profile/tabs/CreatedEventsTab';
import {JoinedEventsTab} from '..//components/profile/tabs/JoinedEventsTab';
import {PastEventsTab} from '../components/profile/tabs/PastEventsTab';
import {SavedEventsTab} from '../components/profile/tabs/SavedEventsTab';
import {AchievementsTab} from '../components/profile/tabs/AchievementsTab';
import { useCurrentUser } from '../hooks/useCurrentUser';

export const Profile = () => {
    const [activeTabName, setActiveTab] = useState<string>('Upcoming');
    const { user, loading, isAuthenticated } = useCurrentUser();
    
    const renderTabContent = () => {
        if (activeTabName === 'Upcoming') {
            return <UpcomingTab />;
        }
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
        return <p className="text-center py-8">Loading profile...</p>;
    }

    if (!isAuthenticated || !user) {
        return (
            <article className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-6 sm:my-8 lg:my-10'>
                <p className='text-center py-8 text-red-600'>
                    You must be logged in to view your profile.
                </p>
            </article>
        );
    }

    const stats = {
        eventsAttended: 5,
        eventsCreated: 3,
        upcomingEvents: 2,
    };

    return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-6 sm:my-8 lg:my-10">
        <article>
            <ProfileHeader user={user} stats={stats} />
            <nav className="max-w-7xl mx-auto mt-4">
                <ProfileNav 
                    activeTabName={activeTabName} 
                    setActiveTab={setActiveTab} 
                />
            </nav>
        </article>
        
        <section className="mt-6">
            {renderTabContent()}
        </section>
        
    </section>
);
};