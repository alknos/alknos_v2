import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  CogIcon,
  ClockIcon,
  CreditCardIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  CalculatorIcon,
  ArrowsRightLeftIcon,
  ViewfinderCircleIcon,
  Battery50Icon,
  BoltIcon,
  SignalIcon,
  ChartPieIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'
import Image from 'next/image'
import user_profile from './homepageComponent/user_profile.jpg'


function NavigationDesktop() {
  const router = useRouter()
  const navigation = [
    { name: 'Inicio', href: '/homepage', icon: HomeIcon, current: router.pathname === '/homepage' },
    { name: 'Búsqueda', href: '/searchCompound', icon: MagnifyingGlassIcon, current: router.pathname === '/searchCompound' },
    { name: 'Estequiometría', href: '/sty-calculator', icon: CalculatorIcon, current: router.pathname === '/sty-calculator' },
    { name: 'Detección', href: '/detection', icon: ViewfinderCircleIcon, current: router.pathname === '/detection' },
    { name: 'Reacciones', href: '/inorganic-calculator', icon: ArrowsRightLeftIcon, current: router.pathname === '/inorganic-calculator' },
    { name: 'Celdas Galvánicas', href: '/galvanicCells', icon: Battery50Icon, current: router.pathname === '/galvanicCells' },
    { name: 'Electrólisis', href: '/electrolisis', icon: BoltIcon, current: router.pathname === '/electrolisis' },
    { name: 'Ondas', href: '/waves', icon: SignalIcon, current: router.pathname === '/waves' },
    { name: 'Fórmula Empirica', href: '/empiricalFormulae', icon: ChartPieIcon, current: router.pathname === '/empiricalFormulae' },
    { name: 'Acidez', href: '/acidity', icon: BeakerIcon, current: router.pathname === '/acidity' },

  ]


  return (
    <nav className="flex-1 px-2 mt-5 space-y-1">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={classNames(
            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
          )}
        >
          <item.icon
            className={classNames(
              item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
              'mr-3 flex-shrink-0 h-6 w-6'
            )}
            aria-hidden="true"
          />
          {item.name}
        </Link>
      ))}
    </nav>
  )
}

function NavigationMobile() {
  const router = useRouter()
  const navigation = [
    { name: 'Inicio', href: '/homepage', icon: HomeIcon, current: router.pathname === '/homepage' },
    { name: 'Búsqueda', href: '/searchCompound', icon: MagnifyingGlassIcon, current: router.pathname === '/searchCompound' },
    { name: 'Estequiometría', href: '/sty-calculator', icon: CalculatorIcon, current: router.pathname === '/sty-calculator' },
    { name: 'Detección', href: '/detection', icon: ViewfinderCircleIcon, current: router.pathname === '/detection' },
    { name: 'Reacciones', href: '/inorganic-calculator', icon: ArrowsRightLeftIcon, current: router.pathname === '/inorganic-calculator' },
    { name: 'Celdas Galvánicas', href: '/galvanicCells', icon: Battery50Icon, current: router.pathname === '/galvanicCells' },
    { name: 'Electrólisis', href: '/electrolisis', icon: BoltIcon, current: router.pathname === '/electrolisis' },
    { name: 'Ondas', href: '/waves', icon: SignalIcon, current: router.pathname === '/waves' },
    { name: 'Fórmula Empirica', href: '/empiricalFormulae', icon: ChartPieIcon, current: router.pathname === '/empiricalFormulae' },
    { name: 'Acidez', href: '/acidity', icon: BeakerIcon, current: router.pathname === '/acidity' },

  ]

  return (
    <nav className="px-2 mt-5 space-y-1">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={classNames(
            item.current
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
          )}
        >
          <item.icon
            className={classNames(
              item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
              'mr-4 flex-shrink-0 h-6 w-6'
            )}
            aria-hidden="true"
          />
          {item.name}
        </Link>
      ))}
    </nav>
  )
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Navhome(props) {
  const [username, setUsername] = useState('');
  const [completeName, setCompleteName] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const cookies = new Cookies();
    setUsername(cookies.get('username'));
    console.log(username);
    if(username == null){
      window.location.href = 'http://macsafe.gerdoc.com:3000/login';
    }
    setCompleteName(cookies.get('complete_name'));
  }, [username]);

  const handleLogout = () => {
    const cookies = new Cookies();
    cookies.remove('username')
    cookies.remove('complete_name')
    cookies.remove('token')
    window.location.href = 'http://macsafe.gerdoc.com:3000/';
  };

  return (
    <>
      <div className='min-h-full'>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex flex-col flex-1 w-full max-w-xs bg-gray-800">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 pt-2 -mr-12">
                      <button
                        type="button"
                        className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="w-6 h-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                    <div className="flex items-center flex-shrink-0 px-4">
                      <img
                        className="w-auto h-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>

                    <NavigationMobile />

                  </div>
                  <div className="flex flex-shrink-0 p-4 bg-gray-700">
                    <Link href="#" className="flex-shrink-0 block group">
                      <div className="flex items-center">
                        <div>
                          <Image
                            className="inline-block w-10 h-10 rounded-full"
                            src={user_profile}
                            alt=""
                            unoptimized
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-white">{completeName}</p>
                          <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">{username}</p>
                        </div>
                      </div>
                    </Link>

                  </div>
                  <div className="p-4 bg-gray-700">
                <button
                  className="px-4 py-2 font-bold text-white duration-300 bg-green-500 rounded hover:bg-green-700"
                  onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-1 min-h-0 bg-gray-800">
            <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <img
                  className="w-auto h-8"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>

              <NavigationDesktop />

            </div>
            <div className="flex flex-shrink-0 p-4 bg-gray-700">
              <a href="#" className="flex-shrink-0 block w-full group">
                <div className="flex items-center">
                  <div>
                    <Image
                      className="inline-block rounded-full h-9 w-9"
                      src={user_profile}
                      alt=""
                      unoptimized
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">{completeName}</p>
                    <p className="text-sm font-medium text-gray-400">{username}</p>
                  </div>
                </div>
              </a>
            </div>
            <div className="p-4 bg-gray-700">
                <button
                  className="px-4 py-2 font-bold text-white duration-300 bg-green-500 rounded hover:bg-green-700"
                  onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </div>
          </div>
          
        </div>

        <div className="flex flex-col flex-1 md:pl-64">
          <div className="sticky top-0 z-10 pt-1 pl-1 bg-gray-100 sm:pl-3 sm:pt-3 md:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              {props.children}
            </div>
          </main>
        </div>
      </div>
    </>

  )
}

export default Navhome;