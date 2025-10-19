"use client";

import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

export function Navigation() {
  // State for controlling the mobile menu (Disclosure replacement)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State for controlling the desktop profile dropdown (Menu replacement)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  // Helper class function to apply active/default styles
  const classNames = (...classes: any) => classes.filter(Boolean).join(' ');

  const mobileLinkClasses = "block border-l-4 py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800";
  const activeMobileLinkClasses = "block border-l-4 border-indigo-600 bg-indigo-50 py-2 pr-4 pl-3 text-base font-medium text-indigo-700";

  return (
    <nav className="relative bg-white rounded-lg" aria-label="Global Navigation">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 justify-between">
          
          {/* Logo and Desktop Links */}
          <div className="flex px-2 lg:px-0">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto rounded-md"
              />
            </div>
            <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
              {/* Desktop Navigation Links */}
              <a
                href="#"
                className="inline-flex items-center border-b-2 border-indigo-600 px-1 pt-1 text-sm font-medium text-gray-900 transition duration-150"
              >
                Dashboard
              </a>
              <a
                href="http://localhost:5173/opprett-arrangement"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 transition duration-150"
                >
                  Opprett arrangement
              </a>
              <a
                href="#"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 transition duration-150"
              >
                Team
              </a>
              <a
                href="#"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 transition duration-150"
              >
                Projects
              </a>
              <a
                href="#"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 transition duration-150"
              >
                Calendar
              </a>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="grid w-full max-w-lg grid-cols-1 lg:max-w-xs">
              <input
                name="search"
                type="search"
                placeholder="Search"
                className="col-start-1 row-start-1 block w-full rounded-md bg-gray-50 border border-gray-300 py-1.5 pr-3 pl-10 text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm/6 transition duration-150"
              />
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400"
              />
            </div>
          </div>
          
          {/* Desktop Icons and Profile Dropdown */}
          <div className="hidden lg:ml-4 lg:flex lg:items-center">
            
            {/* Notifications Button */}
            <button
              type="button"
              className="relative shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition duration-150"
              aria-label="View notifications"
            >
              <span className="absolute -inset-1.5" />
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Profile Dropdown (Menu replacement) */}
            <div className="relative ml-4 shrink-0">
              {/* Menu Button */}
              <button 
                type="button" 
                onClick={toggleProfileMenu}
                className="relative flex rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition duration-150"
                aria-label="Open user menu"
                aria-expanded={isProfileMenuOpen}
              >
                <span className="absolute -inset-1.5" />
                <img
                  alt="User Profile"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-8 rounded-full bg-gray-100 outline -outline-offset-1 outline-black/5"
                />
              </button>

              {/* Menu Items (MenuItems replacement) */}
              <div
                className={classNames(
                  isProfileMenuOpen ? 'block' : 'hidden',
                  "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                )}
                role="menu"
              >
                <a 
                  href="#" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition duration-100"
                  role="menuitem"
                >
                  Your profile
                </a>
                <a 
                  href="#" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition duration-100"
                  role="menuitem"
                >
                  Settings
                </a>
                <a 
                  href="#" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition duration-100"
                  role="menuitem"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
          
          {/* Mobile Menu Button (lg:hidden) */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 transition duration-150"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="absolute -inset-0.5" />
              {isMobileMenuOpen ? (
                <XMarkIcon aria-hidden="true" className="block size-6" />
              ) : (
                <Bars3Icon aria-hidden="true" className="block size-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content (DisclosurePanel replacement) */}
      <div className={classNames(isMobileMenuOpen ? 'block' : 'hidden', "lg:hidden")}>
        <div className="space-y-1 pt-2 pb-3">
          {/* Mobile Navigation Links */}
          <a href="#" className={activeMobileLinkClasses}>Dashboard</a>
          <a href="#" className={mobileLinkClasses}>Team</a>
          <a href="#" className={mobileLinkClasses}>Projects</a>
          <a href="#" className={mobileLinkClasses}>Calendar</a>
        </div>
        <div className="border-t border-gray-200 pt-4 pb-3">
          <div className="flex items-center px-4">
            <div className="shrink-0">
              <img
                alt="User Profile"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="size-10 rounded-full bg-gray-100 outline -outline-offset-1 outline-black/5"
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">Tom Cook</div>
              <div className="text-sm font-medium text-gray-500">tom@example.com</div>
            </div>
            <button
              type="button"
              className="relative ml-auto shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition duration-150"
              aria-label="View notifications"
            >
              <span className="absolute -inset-1.5" />
              <BellIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-3 space-y-1">
            <a href="#" className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">Your profile</a>
            <a href="#" className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">Settings</a>
            <a href="#" className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">Sign out</a>
          </div>
        </div>
      </div>
    </nav>
  )
}