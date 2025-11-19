'use client'
import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { LockClosedIcon, EyeSlashIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

interface SecuritySetting {
    id: number;
    title: string;
    description: string;
    enabled: boolean;
    disabled?: boolean;
}

interface SecurityToggleProps {
    setting: SecuritySetting;
    onToggle: (id: number, enabled: boolean) => void;
}

const SecurityToggle: React.FC<SecurityToggleProps> = ({ setting, onToggle }) => {
    return (
        <li className="flex items-center justify-between py-4 border-b border-gray-50 last:border-b-0">
            <div className="flex flex-col">
                <span className={classNames(
                    "text-sm font-medium text-gray-900",
                    setting.disabled ? "text-gray-400" : "text-gray-900"
                )}>
                    {setting.title}
                </span>
                <span className="text-xs text-gray-500 max-w-sm">{setting.description}</span>
            </div>
            <Switch
                checked={setting.enabled}
                disabled={setting.disabled}
                onChange={(enabled) => onToggle(setting.id, enabled)}
                className={classNames(
                    setting.enabled ? 'bg-emerald-600' : 'bg-gray-200',
                    setting.disabled 
            ? 'cursor-not-allowed opacity-50' 
            : '', 
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



export function PrivacyTab() {
    
   
    const [privacySettings, setPrivacySettings] = useState<SecuritySetting[]>([
        { id: 'profile_visibility', title: 'Public Profile Visibility', description: 'Allow anyone to see your profile details and activity.', enabled: true },
        { id: 'discoverability', title: 'Allow Discovery by Email/Phone', description: 'Allow other users to find you if they have your contact information.', enabled: false },
        { id: 'activity_sharing', title: 'Share Activity Status', description: 'Let contacts see when you are currently active in the app.', enabled: true },
    ]);

    const [securitySettings, setSecuritySettings] = useState<SecuritySetting[]>([
        { id: '2fa', title: 'Two-Factor Authentication (2FA)', description: 'Add an extra layer of security to your account. (Recommended)', enabled: false },
        { id: 'login_alerts', title: 'Email Alerts for New Logins', description: 'Receive an email every time your account is logged into from a new device.', enabled: true },
        { id: 'strong_password', title: 'Require Strong Password', description: 'Enforce strong password rules for all linked accounts.', enabled: true, disabled: true },
    ]);

 
    const handleToggle = (categoryId: 'privacy' | 'security', id: number, enabled: boolean) => {
        const setter = categoryId === 'privacy' ? setPrivacySettings : setSecuritySettings;
        
        setter(prevSettings => 
            prevSettings.map(setting => 
                setting.id === id ? { ...setting, enabled } : setting
            )
        );
    };

    return (
        <main className="mx-auto max-w-7xl pt-8 lg:flex lg:gap-x-16 lg:px-8">
            <section className="px-4 py-4 sm:px-6 lg:flex-auto lg:px-0">
                <section aria-labelledby="security-heading" className="space-y-8">
                    <h1 className="text-2xl font-bold text-gray-900">Privacy & Security</h1>
                    <p className="text-sm text-gray-600 max-w-2xl">
                        Manage who can see your information and protect your account from unauthorized access.
                    </p>

                   
                    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4 border-b pb-4">
                            <EyeSlashIcon className="w-6 h-6 text-emerald-600" />
                            <h2 className="text-xl font-semibold text-gray-900">Privacy Controls</h2>
                        </div>
                        <ul role="list" className="divide-y divide-gray-100">
                            {privacySettings.map(setting => (
                                <SecurityToggle 
                                    key={setting.id} 
                                    setting={setting} 
                                    onToggle={(id, enabled) => handleToggle('privacy', id, enabled)} 
                                />
                            ))}
                        </ul>
                    </div>

                   
                    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4 border-b pb-4">
                            <ShieldCheckIcon className="w-6 h-6 text-emerald-600" />
                            <h2 className="text-xl font-semibold text-gray-900">Account Security</h2>
                        </div>
                        <ul role="list" className="divide-y divide-gray-100">
                            {securitySettings.map(setting => (
                                <SecurityToggle 
                                    key={setting.id} 
                                    setting={setting} 
                                    onToggle={(id, enabled) => handleToggle('security', id, enabled)} 
                                />
                            ))}
                        </ul>
                        <div className="mt-4 pt-4 border-t text-right">
                            <button className="text-sm text-emerald-600 hover:text-indigo-800 font-medium cursor-pointer">
                                View Connected Devices
                            </button>
                        </div>
                    </div>

                  
                    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Data Management</h2>
                        <p className="text-sm text-gray-500 mb-4">
                            Control and download your account data.
                        </p>
                        <div className="flex justify-start gap-4">
                            <button
                                type="button"
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150 cursor-pointer"
                            >
                                Download My Data
                            </button>
                            <button
                                type="button"
                                className="rounded-lg border border-red-500 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition duration-150 cursor-pointer"
                            >
                                Deactivate Account
                            </button>
                        </div>
                    </div>

                  
                    <footer className="pt-4 flex justify-start">
                        <button
                            type="button"
                            className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 transition duration-150 shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-500/50 cursor-pointer"
                            onClick={() => console.log('Saving privacy and security changes...')}
                        >
                            Save Settings
                        </button>
                    </footer>
                </section>
            </section>
        </main>
    );
}
