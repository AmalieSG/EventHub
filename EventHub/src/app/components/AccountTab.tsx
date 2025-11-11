'use client'
import { useState, useRef, useCallback } from 'react';
import { CameraIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface InterestModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentInterests: string[];
  setInterests: React.Dispatch<React.SetStateAction<string[]>>;
}


const AVAILABLE_INTERESTS = [
  'Music', 'Sport', 'Art', 'Food','Reading', 'Photography', 'Hiking', 'Cooking', 'Gardening', 'Travel', 'Fitness',
  'Coding', 'History', 'Movies', 'Gaming', 'Writing', 'Languages', 'Science',
  'Technology', 'DIY', 'Meditation', 'Volunteering', 'Design', 'Finance'
];


export function InterestModal({ 
  isOpen, 
  onClose, 
  currentInterests, 
  setInterests 
}: InterestModalProps): React.JSX.Element | null { 
  
  if (!isOpen) return null;

  const handleToggleInterest = (interest:string) => {
    setInterests(prevInterests => {
      if (prevInterests.includes(interest)) {
        
        return prevInterests.filter(i => i !== interest);
      } else {
      
        return [...prevInterests, interest];
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-70 flex items-center justify-center p-4 transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto transform scale-100 transition-transform duration-300 ease-out">
      
        <div className="flex items-center justify-between p-5 border-b border-gray-200 sticky top-0 bg-white">
          <h3 className="text-xl font-semibold text-gray-900">
            Select Your Interests
          </h3>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-900 rounded-full p-1 transition cursor-pointer"
            onClick={onClose}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-600">Click to add or remove interests from your profile.</p>
          <div className="flex flex-wrap gap-3">
            {AVAILABLE_INTERESTS.map((interest) => {
              const isSelected = currentInterests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleToggleInterest(interest)}
                  className={`
                    inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition duration-200
                    ${isSelected 
                      ? 'bg-emerald-600 text-white shadow-md hover:bg-emerald-700'
                      : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-emerald-50 hover:border-emerald-300'
                    }
                    cursor-pointer
                  `}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        
        <div className="p-4 border-t border-gray-200 flex justify-end sticky bottom-0 bg-white">
          <button
            type="button"
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 transition duration-150 shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-500/50 cursor-pointer"
            onClick={onClose}
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}

export function AccountTab() {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [interests, setInterests] = useState(['Music', 'Sport', 'Art', 'Food']);
  
  const handleButtonClick = () => {
      fileInputRef.current?.click();
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (fileInputRef.current) {
          fileInputRef.current.value = ''; 
      }
      console.log('File selected, but not processed as requested.');
  };
  const handleRemovePicture = () => {
      console.log('Remove picture clicked, but no state is managed as requested.');
  };

  return (

    <main className="mx-auto max-w-7xl pt-8 lg:flex lg:gap-x-16 lg:px-8">
    
      <section className="px-4 py-4 sm:px-6 lg:flex-auto lg:px-0">
        <section aria-labelledby="profile-heading" className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-sm text-gray-600">Manage your personal information and preferences</p>


          <form className="space-y-6">

            <fieldset>
              <legend className="sr-only text-sm font-medium text-gray-700 mb-2">Profile Picture</legend>

              <div className="flex items-start gap-6">
                {/* Updated this div to an img tag with the provided source */}
                <img 
                    className="size-16 rounded-full object-cover flex-shrink-0"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                    alt="Current Profile"
                />

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      id="profile-picture-hidden"
                      ref={fileInputRef}
                      accept=".jpg,.jpeg,.png,.gif"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                
                    <button
                      type="button"
                      onClick={handleButtonClick} 
                      className="rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 inline-flex items-center gap-2 cursor-pointer"
                    >
                      <CameraIcon className="w-4 h-4" />
                      Change Profile Picture
                    </button>
                    
                  </div>

                  

                  <p className="mt-2 text-sm text-gray-500">
                      JPG, PNG or GIF. Max 5MB.
                  </p>
                </div>
              </div>

              
            </fieldset>

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

            <div>
              <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                About Me
              </label>
              <textarea
                id="about"
                rows={3}
                defaultValue="Full-stack developer passionate about creating amazing experiences"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                defaultValue="San Francisco, CA"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <fieldset>
              <legend className="text-sm font-medium text-gray-700 mb-2">Interests</legend>
              <ul className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <li
                    key={index}
                    className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700"
                  >
                    {interest}
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 cursor-pointer"
                  >
                    + Add more
                  </button>
                </li>
              </ul>
            </fieldset>

            <footer className="pt-6">
              <button
                type="submit"
                className="rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                Save Changes
              </button>
                <InterestModal
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                currentInterests={interests} 
                setInterests={setInterests} 
                /> 
            </footer>

          </form>
        </section>
        
      </section>
      
    </main>
  )
}