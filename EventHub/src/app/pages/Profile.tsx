'use client'

import {
  BellIcon,
  CreditCardIcon,
  CubeIcon,
  FingerPrintIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'

import React, { useState } from 'react';

const secondaryNavigation = [
  { name: 'General', href: '#', icon: UserCircleIcon, current: true },
  { name: 'Security', href: '#', icon: FingerPrintIcon, current: false },
  { name: 'Notifications', href: '#', icon: BellIcon, current: false },
  { name: 'Plan', href: '#', icon: CubeIcon, current: false },
  { name: 'Billing', href: '#', icon: CreditCardIcon, current: false },
  { name: 'Team members', href: '#', icon: UsersIcon, current: false },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}



// hentet

export function Profile() {

const [firstName, setFirstName] = useState('Aaron');
  const [lastName, setLastName] = useState('Warner');
  const [email, setEmail] = useState('aaronwarner@outlook.com');
  const [phoneNumber, setPhoneNumber] = useState('+47 123 45 678');
  const [aboutMe, setAboutMe] = useState(
    'A music-loving person from Oslo who enjoys discovering new events!'
  );
  const [location, setLocation] = useState('Oslo, Norge');
  const [interests, setInterests] = useState(['Music', 'Sport', 'Art', 'Food']);

  return (
    <section className="mx-auto max-w-7xl pt-8 lg:flex lg:gap-x-16 lg:px-8">
      <h1 className="sr-only">General Settings</h1>

      <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0">
        <nav className="flex px-4 sm:px-6 lg:px-0 overflow-x-auto" aria-label="Secondary navigation">
          <ul role="list" className="flex flex-wrap gap-x-3 gap-y-1 lg:flex-col">
            {secondaryNavigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                    'group flex gap-x-3 rounded-md py-2 pr-3 pl-2 text-sm/6 font-semibold',
                  )}
                >
                  <item.icon
                    aria-hidden="true"
                    className={classNames(
                      item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                      'size-6 shrink-0',
                    )}
                  />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="px-4 py-4 sm:px-6 lg:flex-auto lg:px-0">
       <section aria-labelledby="profile-heading" className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-sm text-gray-600">Manage your personal information and preferences</p>
        <h2 id="profile-heading" className="text-lg font-semibold text-gray-800">Profile</h2>

        <form className="space-y-6">
          {/* Profile Picture */}
          <fieldset>
            <legend className="text-sm font-medium text-gray-700 mb-2">Profile Picture</legend>
            <div className="flex items-center gap-4">
              <div className="size-16 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl">
                AW
              </div>
              <div>
                <label htmlFor="profile-picture" className="block text-sm text-gray-600 mb-1">
                  Change picture (JPG, PNG, GIF, max 5MB)
                </label>
                <input
                  type="file"
                  id="profile-picture"
                  accept=".jpg,.jpeg,.png,.gif"
              className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </fieldset>

          {/* Personal Info */}
          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                defaultValue="Aaron"
                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                defaultValue="Warner"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                defaultValue="aaronwarner@outlook.com"
                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                defaultValue="+47 123 45 678"
                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </fieldset>

          {/* About Me */}
          <div>
            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
              About Me
            </label>
            <textarea
              id="about"
              rows={3}
              defaultValue="A music-loving person from Oslo who enjoys discovering new events!"
               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              defaultValue="Oslo, Norge"
               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Interests */}
          <fieldset>
            <legend className="text-sm font-medium text-gray-700 mb-2">Interests</legend>
            <ul className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <li
                  key={index}
                  className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700"
                >
                  {interest}
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200"
                >
                  + Add more
                </button>
              </li>
            </ul>
          </fieldset>

          <footer className="pt-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </footer>
        </form>
      </section>
      </main>
    </section>
  )
}
