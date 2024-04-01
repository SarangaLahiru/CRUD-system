import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import FadeIn from 'react-fade-in';


const users = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },

]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function DefaultLayout() {

  const {user,token,setUser,notification,setToken} = useStateContext();
  const [load,setload]=useState(false);
  const navigate=useNavigate();




  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')

      .then(() => {
        setUser({})
        setToken(null)


      })

  }

  useEffect(() => {

    setload(true)

    axiosClient.get('/user')


      .then(({data}) => {
         setUser(data)
         setload(false)

      })
  }, [])

  if(!token){
    return <Navigate to="/login"/>

  }



  return(
    <>



  {!load &&


   <FadeIn>




   <div className="min-h-full">

   <Disclosure as="nav" className="bg-gray-800">

     {({ open }) => (
       <>

 <FadeIn>
 {notification &&

 <p className="alert alert-success">{notification}</p>

 }
 </FadeIn>

         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="flex h-16 items-center justify-between">

             <div className="flex items-center">

               <div className="flex-shrink-0">

                 <img
                   className="h-8 w-8"
                   src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                   alt="Your Company"
                 />
               </div>
               <div className="hidden md:block">

                 <div className="ml-10 flex items-baseline space-x-4">
                   {navigation.map((item) => (
                     <a
                       key={item.name}
                       href={item.href}
                       className={classNames(
                         item.current
                           ? 'bg-gray-900 text-white'
                           : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                         'rounded-md px-3 py-2 text-sm font-medium'
                       )}
                       aria-current={item.current ? 'page' : undefined}
                     >
                       {item.name}
                     </a>
                   ))}
                 </div>
               </div>
             </div>
             <div className="hidden md:block">
               <div className="ml-4 flex items-center md:ml-6">
                 <button
                   type="button"
                   className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                 >
                   <span className="absolute -inset-1.5" />
                   <span className="sr-only">View notifications</span>
                   <BellIcon className="h-6 w-6" aria-hidden="true" />
                 </button>



                 {/* Profile dropdown */}
                 <Menu as="div" className="relative ml-3">
                   <div>
                     <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                       <span className="absolute -inset-1.5" />
                       <span className="sr-only">Open user menu</span>
                       <img className="h-8 w-8 rounded-full" src={users.imageUrl} alt="" />
                     </Menu.Button>
                   </div>
                   <Transition
                     as={Fragment}
                     enter="transition ease-out duration-100"
                     enterFrom="transform opacity-0 scale-95"
                     enterTo="transform opacity-100 scale-100"
                     leave="transition ease-in duration-75"
                     leaveFrom="transform opacity-100 scale-100"
                     leaveTo="transform opacity-0 scale-95"
                   >
                     <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                       {userNavigation.map((item) => (
                         <Menu.Item key={item.name}>
                           {({ active }) => (
                             <a
                               href={item.href}
                               className={classNames(
                                 active ? 'bg-gray-100' : '',
                                 'block px-4 py-2 text-sm text-gray-700'
                               )}
                             >
                               {item.name}
                             </a>
                           )}

                         </Menu.Item>
                       ))}
                       <a href='#' className= 'block px-4 py-2 text-sm text-gray-700' onClick={onLogout}>
                               sign out
                       </a>
                     </Menu.Items>
                   </Transition>
                 </Menu>
               </div>
             </div>


             <div className="-mr-2 flex md:hidden">
               {/* Mobile menu button */}
               <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                 <span className="absolute -inset-0.5" />
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

         <Disclosure.Panel className="md:hidden">
           <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
             {navigation.map((item) => (
               <Disclosure.Button
                 key={item.name}
                 as="a"
                 href={item.href}
                 className={classNames(
                   item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                   'block rounded-md px-3 py-2 text-base font-medium'
                 )}
                 aria-current={item.current ? 'page' : undefined}
               >
                 {item.name}
               </Disclosure.Button>
             ))}
           </div>
           <div className="border-t border-gray-700 pb-3 pt-4">
             <div className="flex items-center px-5">
               <div className="flex-shrink-0">
                 <img className="h-10 w-10 rounded-full" src={users.imageUrl} alt="" />
               </div>
               <div className="ml-3">
                 <div className="text-base font-medium leading-none text-white">{user.name}</div>
                 <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
               </div>
               <button
                 type="button"
                 className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
               >
                 <span className="absolute -inset-1.5" />
                 <span className="sr-only">View notifications</span>
                 <BellIcon className="h-6 w-6" aria-hidden="true" />
               </button>
             </div>
             <div className="mt-3 space-y-1 px-2">
               {userNavigation.map((item) => (
                 <Disclosure.Button
                   key={item.name}
                   as="a"
                   href={item.href}
                   className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                 >
                   {item.name}
                 </Disclosure.Button>
               ))}
             </div>
           </div>
         </Disclosure.Panel>
       </>
     )}
   </Disclosure>


   <header className="bg-white shadow">

     <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

       <h1 className="text-3xl font-bold tracking-tight text-gray-900">Hi! {user.name} Dashboard</h1>
       <button onClick={()=>navigate('/new')} type="button" class="btn btn-success absolute right-10 -mt-10">Add new users</button>
     </div>

   </header>

   <main>
     <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{/* Your content */}</div>
   </main>

 </div>

 <FadeIn>
 <Outlet/>
 </FadeIn>
   </FadeIn>


   }

{load &&

<div role="status" className='mt-10'>
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 m-auto" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>

   }




</>
)
}
