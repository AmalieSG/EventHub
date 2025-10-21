'use client'
import React, { useState } from 'react';

import {
 CameraIcon,
 MapIcon,
 MusicalNoteIcon,
 AcademicCapIcon,
 PaintBrushIcon,
 SparklesIcon
} from '@heroicons/react/24/outline'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export function AccountTab() {

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

      <main className="px-4 py-4 sm:px-6 lg:flex-auto lg:px-0">
       <section aria-labelledby="profile-heading" className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-sm text-gray-600">Manage your personal information and preferences</p>
        <h2 id="profile-heading" className="text-lg font-semibold text-gray-800">Profile</h2>

        <form className="space-y-6">
          {/* Profile Picture */}
        <fieldset>
  <legend className="text-sm font-medium text-gray-700 mb-2">Profile Picture</legend>
  
  <div className="size-16 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl mb-4">
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
      className="max-w-xs rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
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
                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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