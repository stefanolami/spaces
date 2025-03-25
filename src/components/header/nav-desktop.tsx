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
]

const NavDesktop = () => {
	const path = usePathname()
	return (
		<div
			id="desktop-nav"
			className="bg-blue-spaces hidden md:flex flex-row justify-between items-center h-full"
		>
			<nav className="grid grid-cols-4 gap-10 items-center text-center h-full font-robo md:text-xs xl:text-base font-normal">
				{LINKS.map((link, index) => (
					<Link
						key={index}
						className={`relative w-[80px] xl:w-[110px]
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
