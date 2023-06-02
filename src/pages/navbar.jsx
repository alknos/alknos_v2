/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  ListBulletIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto">
          <Popover className="relative">
            {({ open }) => (
              <>
                <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
                  <div className="flex justify-start lg:w-0 lg:flex-1 text-black font-jura text-2xl">
                    <Link href="/">
                      <span>alknos</span>
                    </Link>
                  </div>
                  <div className="-mr-2 -my-2 md:hidden">
                    <Popover.Button className="bg-black rounded-md p-2 inline-flex items-center justify-center text-gray-300 hover:text-gray-50 hover:bg-gray-500 duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                      <span className="sr-only">Open menu</span>
                      <ListBulletIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                  <Popover.Group as="nav" className="hidden md:flex space-x-10">
                    <Link href="/#prices" scroll={true} className="text-sm font-light text-black hover:text-gray-600 duration-200">
                      Planes
                    </Link>
                    <br />
                    <Link href="/about" className="text-sm font-light text-black hover:text-gray-600 duration-200">
                      Nosotros
                    </Link>
                    <br />
                    <Link href="/contacts" className="text-sm font-light text-black hover:text-gray-600 duration-200">
                      Contáctanos
                    </Link>
                    <br />
                    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                      <Link href="/register" className="whitespace-nowrap text-sm font-light text-black hover:text-gray-600 duration-200">
                        Regístrate
                      </Link>
                      <Link href="/login" className="ml-8 whitespace-nowrap inline-flex items-center justify-center m-4 p-1 rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 rounded-md">
                        <span className="block text-white px-4 py-2 text-sm font-light rounded-md bg-blue-900">Inicia Sesión</span>
                      </Link>
                    </div>
                  </Popover.Group>


                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform w-screen max-w-md lg:max-w-2xl lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="relative grid gap-6 bg-zinc-900 px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                        {/* Add your menu items here */}
                      </div>
                      <div className="p-5 bg-gray-50 sm:p-8">

                        <Link href="/#prices" scroll={true} className="text-sm  font-light text-black hover:text-gray-600 duration-200">
                          Planes
                        </Link>
                        <Link href="/about" className="text-sm  font-light text-black hover:text-gray-600 duration-200">
                          Nosotros
                        </Link>
                        <Link href="/contacts" className="text-sm  font-light text-black hover:text-gray-600 duration-200">
                          Contáctanos
                        </Link>


                        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                          <Link href="/register" className="whitespace-nowrap text-sm font-light text-black hover:text-gray-600 duration-200">
                            Regístrate
                          </Link>

                          <Link
                            href="/login"
                            className="ml-8 whitespace-nowrap inline-flex items-center justify-center m-4 p-1 rounded-md shadow-sm text-sm  font-medium text-white bg-transparent"
                            rounded-md>
                            <span className='block text-white px-4 py-2 text-sm font-light rounded-md bg-blue-900'>Inicia Sesión</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      </div>
    </div>
  )
}
