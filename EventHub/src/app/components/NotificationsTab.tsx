'use client'
import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { EnvelopeIcon, BellAlertIcon } from '@heroicons/react/24/outline';

interface NotificationSetting {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
    disabled?: boolean;
}
function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

interface NotificationToggleProps {
    setting: NotificationSetting;
    onToggle: (id: string, enabled: boolean) => void;
}

const NotificationToggle: React.FC<NotificationToggleProps> = ({ setting, onToggle }) => { 
  return (
  
        <li className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
            <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">{setting.title}</span>
                <span className="text-xs text-gray-500 max-w-sm">{setting.description}</span>
            </div>
            <Switch
                checked={setting.enabled}
                onChange={(enabled) => onToggle(setting.id, enabled)}
                className={classNames(
                    setting.enabled ? 'bg-emerald-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2'
                )}
            >
                <span className="sr-only">Enable setting for {setting.title}</span>
                <span
                    className={classNames(
                        setting.enabled ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                />
            </Switch>
        </li>
    );


  };
export function NotificationsTab() {
   
    const [emailSettings, setEmailSettings] = useState<NotificationSetting[]>([
        { id: 'event_updates_email', title: 'Event Updates', description: 'Get notifications when events you are interested in are updated.', enabled: true },
        { id: 'new_matches_email', title: 'New Matches', description: 'Be notified when new people match your interests in your area.', enabled: false },
        { id: 'inactivity_reminders_email', title: 'Inactivity Reminders', description: 'Occasional reminders to check out new events.', enabled: true },
    ]);

    const [pushSettings, setPushSettings] = useState<NotificationSetting[]>([
        { id: 'messages_push', title: 'Direct Messages', description: 'Receive push notifications for new messages.', enabled: true },
        { id: 'rsvp_status_push', title: 'RSVP Status Changes', description: 'Updates on your reservation status for booked events.', enabled: true },
        { id: 'recommendations_push', title: 'Personalized Recommendations', description: 'Alerts for recommended events based on your activity.', enabled: false },
    ]);
    const handleToggle = (categoryId: 'email' | 'push', id: string, enabled: boolean) => {
        const setter = categoryId === 'email' ? setEmailSettings : setPushSettings;
        
        setter(prevSettings => 
            prevSettings.map(setting => 
                setting.id === id ? { ...setting, enabled } : setting
            )
        );
    };
return (
        <main className="mx-auto max-w-7xl pt-8 lg:flex lg:gap-x-16 lg:px-8">
            <section className="px-4 py-4 sm:px-6 lg:flex-auto lg:px-0">
                <section aria-labelledby="notification-heading" className="space-y-8">
                    <h1 className="text-2xl font-bold text-gray-900">Notification Preferences</h1>
                    <p className="text-sm text-gray-600 max-w-2xl">
                        Control how you receive updates and alerts about events, messages, and recommendations. 
                        Adjust your settings for both email and push notifications below.
                    </p>

                    
                    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4 border-b pb-4">
                            <EnvelopeIcon className="w-6 h-6 text-emerald-600" />
                            <h2 className="text-xl font-semibold text-gray-900">Email Notifications</h2>
                        </div>
                        <ul role="list" className="divide-y divide-gray-100">
                            {emailSettings.map(setting => (
                                <NotificationToggle 
                                    key={setting.id} 
                                    setting={setting} 
                                    onToggle={(id, enabled) => handleToggle('email', id, enabled)} 
                                />
                            ))}
                        </ul>
                    </div>

                    
                    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4 border-b pb-4">
                            <BellAlertIcon className="w-6 h-6 text-emerald-600" />
                            <h2 className="text-xl font-semibold text-gray-900">Push Notifications</h2>
                        </div>
                        <ul role="list" className="divide-y divide-gray-100">
                            {pushSettings.map(setting => (
                                <NotificationToggle 
                                    key={setting.id} 
                                    setting={setting} 
                                    onToggle={(id, enabled) => handleToggle('push', id, enabled)} 
                                />
                            ))}
                        </ul>
                    </div>

                   
                    <footer className="pt-4 flex justify-start">
                        <button
                            type="button"
                            className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 transition duration-150 shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
                            onClick={() => console.log('Saving notification changes...')}
                        >
                            Save Preferences
                        </button>
                    </footer>
                </section>
            </section>
        </main>
    );
}
