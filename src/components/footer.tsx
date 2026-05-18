'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BsFacebook, BsLinkedin, BsInstagram } from 'react-icons/bs'

const Footer = () => {
	const path = usePathname()

	return (
		<footer className="w-full">
			<div className="w-full py-6 lg:py-10 bg-black-spaces font-nunito">
				<div className="md:hidden text-xs text-white flex flex-col items-center gap-2 mb-3">
					<div className="flex flex-row items-center justify-center gap-4">
						<span>+32 (0) 485 382 221</span>
						<span>|</span>
						<a
							href="mailto:contact@timeandspaces.org"
							className="hover:underline"
						>
							contact@timeandspaces.org
						</a>
					</div>
					<span className="block">
						Rue de la Loi 81A - 1040 Brussels, Belgium
					</span>
				</div>
				<div className="w-[90%] max-w-[1200px] mx-auto h-full flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between">
					<div className="flex flex-col items-center gap-12">
						<nav className="mt-4 hidden md:grid grid-cols-6 gap-6 lg:gap-10 items-center text-center h-full font-robo text-sm font-normal text-white">
							{LINKS.map((link, index) => (
								<Link
									key={index}
									className={`relative w-[80px] xl:w-[110px]
                                ${
									path == link.path
										? 'active-link text-eucalyptus-spaces'
										: 'hover:scale-105 transition-transform'
								}
                                `}
									href={link.path}
								>
									{link.name}
								</Link>
							))}
						</nav>
						<div className="flex flex-row justify-center gap-4 my-4 md:my-0">
							{SOCIAL_LINKS.map((link, index) => (
								<Link
									className="w-5 h-5 md:w-6 md:h-6 xl:w-8 xl:h-8 rounded-full flex items-center justify-center bg-white-spaces text-black-spaces hover:scale-110 transition-transform"
									key={index}
									href={link.path}
									target="_blank"
									rel="noopener noreferrer"
								>
									<link.icon className="text-xs md:text-sm xl:text-lg" />
								</Link>
							))}
						</div>
					</div>
					<div className="">
						<div className="flex flex-row md:flex-col gap-4 md:gap-1 items-center md:items-end justify-center">
							{POLICIES_LINKS.map((link, index) => (
								<Link
									className=" text-[10px] md:text-sm text-white"
									key={index}
									href={link.path}
								>
									{link.name}
								</Link>
							))}
						</div>
						<span className="text-white-spaces mt-4 hidden md:block text-sm lg:text-base text-right">
							<span className="block">
								Rue de la Loi 81A - 1040 Brussels, Belgium
							</span>
							+32 (0) 485 382 221 -{' '}
							<a
								href="mailto:contact@timeandspaces.org"
								className="hover:underline"
							>
								contact@timeandspaces.org
							</a>
						</span>
					</div>
				</div>
			</div>
			<div className="w-full h-auto py-2 md:h-12 md:py-0 xl:h-14 bg-eucalyptus-spaces">
				<div className="h-full flex items-center justify-center text-center  text-[8px] md:text-sm xl:text-base italic text-white">
					<p>
						© 2025 Time&Spaces - pillar of Time&Place Group. All
						rights reserved.
					</p>
				</div>
			</div>
			<div className="bg-brown-spaces text-black-spaces  hidden">
				<div className="lg:text-left text-beje-spaces"></div>
			</div>
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
		name: 'TERMS AND CONDITIONS',
		path: '/terms-and-conditions',
	},
	{
		name: 'PRIVACY POLICY',
		path: '/privacy-policy',
	},
]

const SOCIAL_LINKS = [
	{
		icon: BsFacebook,
		path: 'https://www.facebook.com/profile.php?id=61581445200111',
	},
	{
		icon: BsLinkedin,
		path: 'https://www.linkedin.com/company/time-spaces/?viewAsMember=true',
	},
	{
		icon: BsInstagram,
		path: 'https://www.instagram.com/time.spaces/',
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
	{
		name: 'PRICING',
		path: '/pricing',
	},
	{
		name: 'CONTACT US',
		path: '/contact-us',
	},
]
