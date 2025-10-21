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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [location, setLocation] = useState('');

  const [interests, setInterests] = useState<string[]>([]); 

return(
  <section className="bg-white mx-auto min-h-[60vh] shadow-lg rounded-xl p-6 max-w-7xl pt-8 px-4 sm:px-6 lg:px-8">
    <div className="size-16 rounded-full bg-gray-200 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                  
                </div>
    <div>
                  <label htmlFor="profile-picture" className="block text-sm text-gray-600 mb-1">
                    Upload new photo (JPG, PNG, GIF, max 5MB)
                  </label>
                  <input
                    type="file"
                    id="profile-picture"
                    accept=".jpg,.jpeg,.png,.gif"
                    className="max-w-xs rounded-md bg-indigo-300 px-4 py-2 text-white text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
                  />
                </div>
        
  </section>
  
)}