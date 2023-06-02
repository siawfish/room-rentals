'use client';

import { Fragment } from 'react';
import { usePathname, useParams } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { convertRouteToString } from '../utils/helpers';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ user }: { user: any }) {
  const pathname = usePathname();
  const params = useParams();

  const navigation = [
    { name: 'Features', subItems: [
      { name: 'Users', href: `/motels/${convertRouteToString(params?.id??"")}/users` },
      { name: 'Rentals', href: `/motels/${convertRouteToString(params?.id??"")}/rentals` },
      { name: 'Rooms', href: `/motels/${convertRouteToString(params?.id??"")}/rooms` },
      { name: 'Guests', href: `/motels/${convertRouteToString(params?.id??"")}/guests` }
    ] },
    { name: 'Financials', subItems: [
      { name: 'Refunds', href: `/motels/${convertRouteToString(params?.id??"")}/refunds` },
      { name: 'Expenses', href: `/motels/${convertRouteToString(params?.id??"")}/expenses` },
      { name: 'Payments', href: `/motels/${convertRouteToString(params?.id??"")}/payments` }
    ] },
  ];

  const subLinks = navigation.map((item) => item?.subItems?.map((subItem) => subItem?.href))

  const showNavLinks = () => {
    if(pathname === '/motels') return false;
    if(pathname === '/motels/form') return false;
    return true;
  }

  const id = params?.id;

  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Image 
                    width={32}
                    height={32}
                    src="/assets/images/logo.jpeg"
                    alt="logo"
                    className="rounded-full"
                  />
                </div>
                {
                  showNavLinks?.() &&
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    <a
                      key={`Dashboard`}
                      href={`/motels/${convertRouteToString(id as string)}`}
                      className={classNames(
                        pathname === `/motels/${convertRouteToString(id as string)}`
                          ? 'border-slate-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                      )}
                      aria-current={pathname === `/motels/${convertRouteToString(id as string)}` ? 'page' : undefined}
                    >
                      {`Dashboard`}
                    </a>
                    {
                      navigation.map((item, i) => (
                        <Menu key={item?.name} as="div" className="h-full relative">
                          <Menu.Button as={Fragment}>
                            <a
                              key={item?.name}
                              href={`#`}
                              className={classNames(
                                subLinks?.[i].includes(convertRouteToString(pathname))
                                  ? 'border-slate-500 text-gray-900'
                                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-full'
                              )}
                              aria-current={subLinks?.[i].includes(convertRouteToString(pathname)) ? 'page' : undefined}
                            >
                              {item?.name}
                            </a>
                          </Menu.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {
                                item?.subItems?.map((subItem) => (
                                  <Menu.Item key={subItem?.name}>
                                    {({ active }) => (
                                      <a
                                        href={subItem?.href}
                                        className={classNames(
                                          pathname === subItem?.href ? 'bg-gray-100' : '',
                                          'block px-4 py-2 text-sm text-gray-700'
                                        )}
                                      >
                                        {subItem?.name}
                                      </a>
                                    )}
                                  </Menu.Item>
                                ))
                              }
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      ))
                    }
                  </div>
                }
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <div className="flex items-center px-4">
                        <div className="mr-3">
                          <div className="text-start text-base font-medium text-gray-800">
                            {`${user.first_name} ${user.other_names}`}
                          </div>
                          <div className="text-sm font-medium text-gray-500">
                            {user.email}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <Image
                            className="h-8 w-8 rounded-full"
                            src={user.image || 'https://avatar.vercel.sh/leerob'}
                            height={32}
                            width={32}
                            alt={`${user.first_name} ${user.other_names} avatar`}
                          />
                        </div>
                      </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="right-0 absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {user ? (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'flex w-full px-4 py-2 text-sm text-gray-700'
                              )}
                              onClick={() => signOut()}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'flex w-full px-4 py-2 text-sm text-gray-700'
                              )}
                              onClick={() => signIn('github')}
                            >
                              Sign in
                            </button>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden focus:outline-none active:outline-none outline-none">
            {
              showNavLinks?.() &&
              <div className="space-y-1 pt-2 pb-3">
                <Disclosure.Button
                  key={`Dashboard`}
                  as="a"
                  href={`/motels/${convertRouteToString(id as string)}`}
                  className={classNames(
                    pathname === `/motels/${convertRouteToString(id as string)}`
                      ? 'bg-slate-50 border-slate-500 text-slate-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  )}
                  aria-current={pathname === `/motels/${convertRouteToString(id as string)}` ? 'page' : undefined}
                >
                  {`Dashboard`}
                </Disclosure.Button>
                {
                  navigation?.[0].subItems?.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        pathname === item.href
                          ? 'bg-slate-50 border-slate-500 text-slate-700'
                          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                        'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                      )}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))
                }
                {
                  navigation?.[1].subItems?.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        pathname === item.href
                          ? 'bg-slate-50 border-slate-500 text-slate-700'
                          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                        'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                      )}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))
                }
              </div>
            }
            <div className="border-t border-gray-200 pt-4 pb-3">
              {user ? (
                <>
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <Image
                        className="h-8 w-8 rounded-full"
                        src={user.image || 'https://avatar.vercel.sh/leerob'}
                        height={32}
                        width={32}
                        alt={`${user.first_name} ${user.other_names} avatar`}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {`${user.first_name} ${user.other_names}`}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <button
                      onClick={() => signOut()}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-3 space-y-1">
                  <button
                    onClick={() => signIn('github')}
                    className="flex w-full px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Sign in
                  </button>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
