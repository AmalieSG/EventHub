'use client'

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/hooks/useAuth';


const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'All events', href: '/search' },
  { name: 'Contact us', href: '/contact-us' },
];

const loginNavigationItems = [
  { name: 'Login', href: '/login' },
  { name: 'Registration', href: '/registration' },
];

const userNavigationItems = [
  { name: 'Your profile', href: '/profile' },
  { name: 'Settings', href: '/settings' },
  { name: 'Sign out', href: '/logout' },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}


export function Navigation() {
  const [currentPath, setCurrentPath] = useState<string>('')
  const { isAuthenticated, user } = useAuth();

  const menu = isAuthenticated
    ? [...navigationItems, { name: 'Create event', href: '/create-event' }]
    : navigationItems;

  useEffect(() => {
    const updatePath = () => setCurrentPath(window.location.pathname)
    updatePath()
    window.addEventListener('popstate', updatePath)
    return () => window.removeEventListener('popstate', updatePath)
  }, [])


  return (
    <header className="bg-white font-sans">

      <Disclosure as="nav" className="relative bg-white">

        <div className="mx-auto max-w-7xl">

          <div className="flex h-16 justify-between items-center">

            <section aria-label="Primary Navigation and Logo" className="flex items-center">

              <a href="/" className="flex shrink-0 items-center">
                <img
                  alt="EventHub Logo"
                  src="/images/EventHub.png"
                  className="h-8 w-auto"
                />
              </a>


              <ul className="hidden lg:ml-6 lg:flex lg:space-x-8" role="list">
                {menu.map((item) => {
                  const isActive = currentPath === item.href
                  return (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={classNames(
                          isActive
                            ? 'border-indigo-600 text-gray-900'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                          'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </section>

            <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
              <form className="grid w-full max-w-lg grid-cols-1 lg:max-w-xs" role="search">


                <label htmlFor="global-search" className="sr-only">
                  Search the entire site
                </label>


                <input
                  id="global-search"
                  name="search"
                  type="search"
                  placeholder="Search"
                  className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />

                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400"
                />
              </form>
            </div>


            <section aria-label="User Controls" className="flex items-center space-x-4">


              <div className="flex items-center lg:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-600">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                </DisclosureButton>
              </div>


              <div className="hidden lg:flex lg:items-center">


                <button
                  type="button"
                  className="relative shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
                  aria-label="View notifications"
                >
                  <span className="absolute -inset-1.5" />
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>


                <Menu as="div" className="relative ml-4 shrink-0">
                  <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    {isAuthenticated ? (
                      <img
                        alt="User Profile"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="size-8 rounded-full bg-gray-100 outline -outline-offset-1 outline-black/5"
                      />
                    ) : (
                      <UserIcon className="cursor-pointer size-8 rounded-full text-gray-400 " />

                    )}
                  </MenuButton>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    {isAuthenticated ?
                      userNavigationItems.map((item) => (
                        <MenuItem key={item.name}>
                          {({ focus }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                focus ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </MenuItem>
                      ))
                      :
                      loginNavigationItems.map((item) => (
                        <MenuItem key={item.name}>
                          {({ focus }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                focus ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </MenuItem>
                      ))
                    }
                  </MenuItems>
                </Menu>
              </div>
            </section>

          </div>
        </div>


        <DisclosurePanel className="lg:hidden">

          <ul className="space-y-1 pt-2 pb-3" role="list">
            {menu.map((item) => {
              const isActive = currentPath === item.href
              return (
                <li key={item.name}>
                  <DisclosureButton
                    as="a"
                    href={item.href}
                    className={classNames(
                      isActive
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800',
                      'block border-l-4 py-2 pr-4 pl-3 text-base font-medium'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.name}
                  </DisclosureButton>
                </li>
              )
            })}
          </ul>


          <section aria-label="Mobile User Profile" className="border-t border-gray-200 pt-4 pb-3">

            {isAuthenticated ? (
              <div className="flex items-center px-4">


                <img
                  alt="Tom Cook"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-10 rounded-full bg-gray-100 outline -outline-offset-1 outline-black/5"
                />

                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user?.firstName} {user?.lastName} </div>
                  <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                </div>


                <button
                  type="button"
                  className="relative ml-auto shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
                  aria-label="View notifications"
                >
                  <span className="absolute -inset-1.5" />
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>
              </div>) :
              (



                null



              )

            }


            <ul className="mt-3 space-y-1" role="list">
              {isAuthenticated ? (
                userNavigationItems.map((item) => (
                  <li key={item.name}>
                    <DisclosureButton
                      as="a"
                      href={item.href}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      {item.name}
                    </DisclosureButton>
                  </li>
                ))

              ) :

                loginNavigationItems.map((item) => (
                  <li key={item.name}>
                    <DisclosureButton
                      as="a"
                      href={item.href}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      {item.name}
                    </DisclosureButton>
                  </li>
                ))



              }
            </ul>
          </section>

        </DisclosurePanel>
      </Disclosure>
    </header>
  );
}