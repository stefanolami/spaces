import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const LINKS = [
	{
		name: 'CONCEPTS',
		path: '/concepts',
	},
	{
		name: 'FACILITIES',
		path: '/facilities',
	},
	{
		name: 'SERVICES',
		path: '/services',
	},
	{
		name: 'ACCESS',
		path: '/access',
	},
	{
		name: 'PRICING',
		path: '/pricing',
	},
	{
		name: 'CONTACT US',
		path: '/contact-us',
	},
]

const NavDesktop = () => {
	const path = usePathname()
	return (
		<div
			id="desktop-nav"
			className="bg-eucalyptus-spaces hidden md:flex flex-row justify-between items-center h-full"
		>
			<nav className="grid grid-cols-6 gap-2 lg:gap-6 items-center text-center h-full font-robo md:text-xs xl:text-base font-normal">
				{LINKS.map((link, index) => (
					<Link
						key={index}
						className={`relative 
                                ${
									path == link.path
										? 'active-link'
										: 'hover:scale-105'
								}
                                `}
						href={link.path}
					>
						{link.name}
					</Link>
				))}
			</nav>
			{/* <DesktopLocaleSwitcher /> */}
		</div>
	)
}

export default NavDesktop
