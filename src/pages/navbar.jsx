/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  ChartBarIcon,
  CursorClickIcon,
  DocumentReportIcon,
  MenuIcon,
  RefreshIcon,
  ShieldCheckIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline'

const solutions = [
  {
    name: 'Analytics',
    description: 'Get a better understanding of where your traffic is coming from.',
    href: '#',
    icon: ChartBarIcon,
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '#',
    icon: CursorClickIcon,
  },
  { name: 'Security', description: "Your customers' data will be safe and secure.", href: '#', icon: ShieldCheckIcon },
  {
    name: 'Integrations',
    description: "Connect with third-party tools that you're already using.",
    href: '#',
    icon: ViewGridIcon,
  },
  {
    name: 'Automations',
    description: 'Build strategic funnels that will drive your customers to convert',
    href: '#',
    icon: RefreshIcon,
  },
  {
    name: 'Reports',
    description: 'Get detailed reports that will help you make more informed decisions ',
    href: '#',
    icon: DocumentReportIcon,
  },
]
const resources = [
  {
    name: 'Help Center',
    description: 'Get all of your questions answered in our forums or contact support.',
    href: '#',
  },
  { name: 'Guides', description: 'Learn how to maximize our platform to get the most out of it.', href: '#' },
  { name: 'Events', description: 'See what meet-ups and other events we might be planning near you.', href: '#' },
  { name: 'Security', description: 'Understand how we take your privacy seriously.', href: '#' },
]

export default function Navbar() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">

        <Popover className="relative bg-transparent">
          <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1 text-white font-jura text-2xl">
              <span>alknos</span>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-black rounded-md p-2 inline-flex items-center justify-center text-gray-300 hover:text-gray-50 hover:bg-gray-500 duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden md:flex space-x-10">
              <Popover className="relative">
                {({ open }) => (
                  <>

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
                            {solutions.map((solution) => (
                              <a
                                key={solution.name}
                                href={solution.href}
                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                              >
                                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                                  <solution.icon className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <div className="ml-4">
                                  <p className="text-base font-raleway font-semibold text-gray-50">{solution.name}</p>
                                  <p className="mt-1 text-sm font-raleway text-gray-300">{solution.description}</p>
                                </div>
                              </a>
                            ))}
                          </div>
                          <div className="p-5 bg-gray-50 sm:p-8">
                            <a href="." className="-m-3 p-3 flow-root rounded-md hover:bg-gray-100">
                              <div className="flex items-center">
                                <div className="text-base font-medium text-gray-300">Enterprise</div>
                                <span className="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-indigo-100 text-indigo-800">
                                  New
                                </span>
                              </div>
                              <p className="mt-1 text-sm text-gray-50">
                                Empower your entire team with even more advanced tools.
                              </p>
                            </a>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              <a href="." className="text-sm  font-light text-gray-50 hover:text-gray-300 duration-200">
                Planes
              </a>
              <a href="." className="text-sm  font-light text-gray-50 hover:text-gray-300 duration-200">
                Nosotros
              </a>
              <a href="." className="text-sm  font-light text-gray-50 hover:text-gray-300 duration-200">
                Contáctanos
              </a>

            </Popover.Group>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <a href="." className="whitespace-nowrap text-sm font-light text-gray-50 hover:text-gray-300">
                Regístrate
              </a>

              <a
                href="."
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center m-4 p-1 rounded-md shadow-sm text-sm  font-medium text-white bg-transparent"
                rounded-md>
                <span className='block text-white px-4 py-2 text-sm font-light rounded-md bg-black'>Inicia Sesión</span>
              </a>
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-transparent divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5">
                  <div className="flex items-center justify-between">
                    <div>

                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-black rounded-md p-2 inline-flex items-center justify-center text-gray-300 hover:text-gray-50 hover:bg-gray-700 duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid grid-cols-1 gap-7">
                      {solutions.map((solution) => (
                        <a
                          key={solution.name}
                          href={solution.href}
                          className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white">
                            <solution.icon className="h-6 w-6" aria-hidden="true" />
                          </div>
                          <div className="ml-4 text-base font-medium text-gray-300">{solution.name}</div>
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
                <div className="py-6 px-5">
                  <div className="grid grid-cols-2 gap-4">
                    <a href="." className="text-base font-medium text-gray-300 hover:text-gray-700">
                      Pricing
                    </a>

                    <a href="." className="text-base font-medium text-gray-300 hover:text-gray-700">
                      Docs
                    </a>

                    <a href="." className="text-base font-medium text-gray-300 hover:text-gray-700">
                      Enterprise
                    </a>
                    {resources.map((resource) => (
                      <a
                        key={resources.name}
                        href={resource.href}
                        className="text-base font-medium text-gray-300 hover:text-gray-700"
                      >
                        {resource.name}
                      </a>
                    ))}
                  </div>
                  <div className="mt-6">
                    <a
                      href="."
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-800 duration-300"
                    >
                      Regístrate
                    </a>
                    <p className="mt-6 text-center text-base font-medium text-gray-50">
                      ¿Ya estás registrado?{' '}
                      <a
                        href="."
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-black hover:text-white  hover:bg-gray-700 duration-300"
                      >
                        Inicia sesión
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </div>
  )
}