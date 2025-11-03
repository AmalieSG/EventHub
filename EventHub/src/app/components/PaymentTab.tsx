'use client'
import React, { useState } from 'react';
import { CreditCardIcon, SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline';


const SubscriptionStatus: React.FC<{ status: 'Active' | 'Inactive' | 'Pending Cancel'; date: string }> = ({ status, date }) => {
    let statusClass = '';
    let icon;

    if (status === 'Active') {
        statusClass = 'bg-green-100 text-green-800';
        icon = <SparklesIcon className="w-4 h-4 mr-1" />;
    } else if (status === 'Inactive') {
        statusClass = 'bg-red-100 text-red-800';
        icon = <XMarkIcon className="w-4 h-4 mr-1" />;
    } else {
        statusClass = 'bg-yellow-100 text-yellow-800';
        icon = <XMarkIcon className="w-4 h-4 mr-1" />;
    }

    return (
        <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium ${statusClass}`}>
            {icon}
            {status}
            {status === 'Active' && <span className="ml-2 text-xs text-gray-500"> | Renews {date}</span>}
            {(status === 'Pending Cancel' || status === 'Inactive') && <span className="ml-2 text-xs text-gray-500"> | Ends {date}</span>}
        </span>
    );
};

export function PaymentTab() {
    
    const [subscription, setSubscription] = useState({
        planName: 'Pro Monthly',
        price: '€19.99',
        status: 'Active' as 'Active' | 'Inactive' | 'Pending Cancel',
        nextBillingDate: '2025-12-03',
    });

    const [paymentMethod, setPaymentMethod] = useState({
        brand: 'Visa',
        last4: '4242',
        expiration: '12/26',
    });
    
   
    const handleManageSubscription = () => {
        console.log('Redirecting to subscription management portal...');
        alert('Action: Managing Subscription (e.g., changing plan)');
    };

    const handleUpdatePayment = () => {
        console.log('Opening payment method update form...');
        alert('Action: Updating Payment Method');
    };

    const handleCancelSubscription = () => {
        if (confirm('Are you sure you want to cancel your subscription?')) {
            console.log('Subscription cancellation initiated...');
            setSubscription(prev => ({ ...prev, status: 'Pending Cancel', nextBillingDate: '2025-12-03' }));
            alert('Subscription cancellation successful. It will end on ' + subscription.nextBillingDate);
        }
    };

    return (
        <main className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8">
            <section className="px-4 py-4 sm:px-6 lg:flex-auto lg:px-0">
                <section aria-labelledby="billing-heading" className="space-y-8">
                 
                    <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
                    <p className="text-sm text-gray-600 max-w-2xl">
                        View your current plan, manage your subscription, and update your payment details.
                    </p>

               
                    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4 border-b pb-4">
                            <SparklesIcon className="w-6 h-6 text-emerald-600" />
                            <h2 className="text-xl font-semibold text-gray-900">Your Subscription</h2>
                        </div>
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">Current Plan</dt>
                                <dd className="mt-1 text-sm text-gray-900 font-medium">{subscription.planName}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">Monthly Price</dt>
                                <dd className="mt-1 text-sm text-gray-900">{subscription.price}</dd>
                            </div>
                            <div className="sm:col-span-2">
                                <dt className="text-sm font-medium text-gray-500">Status</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    <SubscriptionStatus status={subscription.status} date={subscription.nextBillingDate} />
                                </dd>
                            </div>
                        </dl>
                        <div className="mt-6 pt-4 border-t flex justify-start gap-4">
                            <button
                                type="button"
                                onClick={handleManageSubscription}
                                className="rounded-lg border border-emerald-600 bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition duration-150 shadow-sm"
                            >
                                Change Plan
                            </button>
                            {subscription.status === 'Active' && (
                                <button
                                    type="button"
                                    onClick={handleCancelSubscription}
                                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150"
                                >
                                    Cancel Subscription
                                </button>
                            )}
                        </div>
                    </div>

               
                    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4 border-b pb-4">
                            <CreditCardIcon className="w-6 h-6 text-emerald-600" />
                            <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-900">
                                    {paymentMethod.brand} ending in {paymentMethod.last4}
                                </span>
                                <span className="text-xs text-gray-500">Expires {paymentMethod.expiration}</span>
                            </div>
                            <button
                                type="button"
                                onClick={handleUpdatePayment}
                                className="text-sm font-medium text-emerald-600 hover:text-emerald-800"
                            >
                                Update
                            </button>
                        </div>
                        <p className="mt-4 text-xs text-gray-500 pt-4 border-t">
                            Your payment method will be charged automatically on {subscription.nextBillingDate}.
                        </p>
                    </div>

                  
                    <div className="mt-4 text-left">
                        <button className="text-sm text-emerald-600 hover:text-emerald-800 font-medium">
                            View Billing History & Invoices
                        </button>
                    </div>

                </section>
            </section>
        </main>
    );
}