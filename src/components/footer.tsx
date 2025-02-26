'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BsTwitterX, BsFacebook, BsLinkedin, BsInstagram } from 'react-icons/bs'

const Footer = () => {
	const path = usePathname()

	return (
		<footer className="w-full">
			<div className="w-full h-6 md:h-28 bg-black-spaces">
				<div className="w-[90%] max-w-[1200px] mx-auto h-full flex flex-row items-center justify-end md:justify-between">
					<nav className="hidden md:grid grid-cols-4 gap-10 items-center text-center h-full font-robo text-sm font-normal text-white">
						{LINKS.map((link, index) => (
							<Link
								key={index}
								className={`relative w-[80px] xl:w-[110px]
                                ${
									path == link.path
										? 'active-link text-orange-spaces'
										: 'hover:scale-105 transition-transform'
								}
                                `}
								href={link.path}
							>
								{link.name}
							</Link>
						))}
					</nav>
					<div className="flex flex-row md:flex-col gap-4 md:gap-1 items-center md:items-end justify-center">
						{POLICIES_LINKS.map((link, index) => (
							<Link
								className="font-nunito text-[10px] md:text-sm text-white"
								key={index}
								href={link.path}
							>
								{link.name}
							</Link>
						))}
					</div>
				</div>
			</div>
			<div className="w-full h-16 md:h-12 xl:h-14 bg-blue-spaces">
				<div className="w-[90%] max-w-[1200px]  mx-auto flex flex-row items-center justify-between h-full gap-2">
					<div className="h-full flex flex-col items-center justify-start md:justify-center">
						<div className="flex flex-row justify-center gap-4 mt-4 md:mt-0">
							{SOCIAL_LINKS.map((link, index) => (
								<Link
									className="w-5 h-5 md:w-6 md:h-6 xl:w-8 xl:h-8 rounded-full flex items-center justify-center bg-white"
									key={index}
									href={link.path}
								>
									<link.icon className="text-xs md:text-sm xl:text-lg text-blue-spaces" />
								</Link>
							))}
						</div>
					</div>
					<div className="h-full flex flex-col md:flex-row items-end md:items-center justify-end mb-4 md:mb-0 text-right font-nunito text-[8px] md:text-sm xl:text-base italic text-white md:space-x-2">
						<p>© 2025 Time&Spaces - pillar of Time&Place Group.</p>
						<p> All rights reserved.</p>
					</div>
				</div>
			</div>
			<div className="hidden"></div>
		</footer>
	)
}

export default Footer

const POLICIES_LINKS = [
	{
		name: 'COOKIE USE',
		path: '/cookie-use',
	},
	{
		name: 'PRIVACY POLICY',
		path: '/privacy-policy',
	},
	{
		name: 'TERMS AND CONDITIONS',
		path: '/terms-and-conditions',
	},
]

const SOCIAL_LINKS = [
	{
		icon: BsFacebook,
		path: 'https://facebook.com/',
	},
	{
		icon: BsTwitterX,
		path: 'https://twitter.com/',
	},
	{
		icon: BsLinkedin,
		path: 'https://linkedin.com/',
	},
	{
		icon: BsInstagram,
		path: 'https://instagram.com/',
	},
]

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
