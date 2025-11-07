'use client'
import React from 'react';
import { InformationCircleIcon, LifebuoyIcon, DocumentTextIcon, BugAntIcon } from '@heroicons/react/24/outline';


interface InfoLink {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType; 
    href: string;
}


const supportLinks: InfoLink[] = [
    { 
        id: 'help_center', 
        title: 'Help Center & FAQ', 
        description: 'Find answers to common questions and tutorials on using the app.', 
        icon: LifebuoyIcon, 
        href: '/support/help-center' 
    },
    { 
        id: 'contact_support', 
        title: 'Contact Support Team', 
        description: 'Get in touch with a support agent for personalized assistance.', 
        icon: InformationCircleIcon, 
        href: '/support/contact' 
    },
    { 
        id: 'report_bug', 
        title: 'Report a Bug or Issue', 
        description: 'Help us improve by reporting any technical problems you encounter.', 
        icon: BugAntIcon, 
        href: '/support/report-bug' 
    },
];

const legalLinks: InfoLink[] = [
    { 
        id: 'terms', 
        title: 'Terms of Service', 
        description: 'The legal agreement governing your use of our service.', 
        icon: DocumentTextIcon, 
        href: '/legal/terms' 
    },
    { 
        id: 'privacy_policy', 
        title: 'Privacy Policy', 
        description: 'Learn how we collect, use, and protect your personal data.', 
        icon: DocumentTextIcon, 
        href: '/legal/privacy' 
    },
    { 
        id: 'license', 
        title: 'Software Licenses', 
        description: 'Details on the open source and third-party software used.', 
        icon: DocumentTextIcon, 
        href: '/legal/licenses' 
    },
];


const InfoLinkItem: React.FC<{ link: InfoLink }> = ({ link }) => {
    const Icon = link.icon;
    return (
        <a 
            href={link.href} 
            className="flex items-center justify-between py-4 border-b border-gray-50 last:border-b-0 group hover:bg-gray-50 transition duration-100 -mx-6 px-6 cursor-pointer"
        >
            <div className="flex items-start gap-4">
                <Icon className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition" aria-hidden="true" />
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900 group-hover:text-indigo-600">
                        {link.title}
                    </span>
                    <span className="text-xs text-gray-500 max-w-sm">{link.description}</span>
                </div>
            </div>
           
            <span className="text-indigo-600 text-sm font-medium ml-4">
                View
            </span>
        </a>
    );
};


export function SupportTab() {
    
   
    const appVersion = "1.7.3";

    return (
        <main className="py-8 mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8">
            <section className="px-4 py-4 sm:px-6 lg:flex-auto lg:px-0">
                <section aria-labelledby="support-heading" className="space-y-8">
                    
                    <h1 className="text-2xl font-bold text-gray-900">Support & Information</h1>
                    <p className="text-sm text-gray-600 max-w-2xl">
                        Find resources for help, view legal documents, and check the app version.
                    </p>

                   
                    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4 border-b pb-4">
                            <LifebuoyIcon className="w-6 h-6 text-indigo-600" />
                            <h2 className="text-xl font-semibold text-gray-900">Get Help</h2>
                        </div>
                        <ul role="list">
                            {supportLinks.map(link => (
                                <InfoLinkItem key={link.id} link={link} />
                            ))}
                        </ul>
                    </div>

                    
                    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4 border-b pb-4">
                            <DocumentTextIcon className="w-6 h-6 text-indigo-600" />
                            <h2 className="text-xl font-semibold text-gray-900">Legal</h2>
                        </div>
                        <ul role="list">
                            {legalLinks.map(link => (
                                <InfoLinkItem key={link.id} link={link} />
                            ))}
                        </ul>
                    </div>
                    
                   
                    <div className="pt-4 text-sm text-gray-500 flex justify-between max-w-lg">
                        <span className="font-medium text-gray-700">App Version</span>
                        <span>{appVersion}</span>
                    </div>

                </section>
            </section>
        </main>
    );
}