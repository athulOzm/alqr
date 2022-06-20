import { Fragment } from 'react'
import { Tab } from '@headlessui/react'
import { BellIcon, HeartIcon, HomeIcon, MenuIcon, ShoppingCartIcon, UserIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link';

const current = 'home';
const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl: ' ',
}

import { Router, useRouter } from 'next/router'

 
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Master({children, footer, search, category}) {

    const router = useRouter();


	const handleClick = (e) => {
		e.preventDefault()
		router.push('/')
	  }
	  
  return (<Tab.Group>

<Tab.Panels className="w-full h-screen">
	  <Tab.Panel>
	  	<header>
		<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
			{
				category ? <h1 className="text-3xl font-bold text-c4 mt-3 flex">{category}</h1> : <h1 className="text-3xl font-bold text-c4 mt-3 flex">Alhsn Club Mess</h1>
			}

			{search && <form>   
				<label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
				<div className="relative">
					<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
						<svg className="w-5 h-5 text-c6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
					</div>
					<input  type="search" id="default-search" className="mt-4 block p-4 py-2 pl-10 w-full text-md text-gray-100 bg-c5 rounded-lg border border-c5 placeholder-c6::placeholder	 focus:ring-purple-500 focus:border-purple-500 place" placeholder="Search" required />

				</div>
			</form> }
		</div>
		</header>

		{children}

		
		
	  </Tab.Panel>
















	  
	  <Tab.Panel>
		<header className="bg-white shadow">
			<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
				<h1 className="text-3xl font-bold text-gray-900">fav</h1>
			</div>
			</header>
			<main>
			<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					aa
			</div>
			</main>
	  </Tab.Panel>
	  <Tab.Panel>Content 3</Tab.Panel>
	  <Tab.Panel>Conte</Tab.Panel>
	</Tab.Panels>

	
	{footer && <Tab.List className="flex justify-between fixed bottom-0 w-full z-50 text-c4 bg-c2">
	  <div className="w-full pt-2 py-2" >
		  <a className='w-full pt-2 py-2' onClick={handleClick}>
	  	<UserIcon className="h-8 w-7 m-auto" fill="currentColor" color='#929292'/>
		  </a>
	  </div>

	  <Tab className="w-full pt-2 py-2">
	  	 <HomeIcon className="h-8 w-7 m-auto" fill="currentColor" color='purple' />
	  </Tab>
	  
	  <Tab className="w-full pt-2 py-2">
	  	<ShoppingCartIcon className="h-8 w-7 m-auto" fill="currentColor" color='#929292'/>
	  </Tab>
	  <Tab className="w-full pt-2 py-2">
	  	<HeartIcon className="h-8 w-7 m-auto" fill="currentColor" color='#929292'/>
	  </Tab>
	</Tab.List> }
 
	
	
  </Tab.Group>
  )
}
