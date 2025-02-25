import Link from 'next/link'
import path from 'path'
import { BsTwitterX, BsFacebook, BsLinkedin, BsInstagram } from 'react-icons/bs'

const Footer = () => {
	return (
		<footer className="w-full">
			<div className="w-full h-6 bg-black-spaces">
				<div className="w-[90%] mx-auto h-full flex flex-row items-center justify-end gap-6">
					{POLICIES_LINKS.map((link, index) => (
						<Link
							className="font-nunito text-[10px] text-white"
							key={index}
							href={link.path}
						>
							{link.name}
						</Link>
					))}
				</div>
			</div>
			<div className="w-full h-16 bg-blue-spaces">
				<div className="w-[90%] mx-auto flex flex-row items-center justify-between h-full gap-2">
					<div className="h-full flex flex-col items-center justify-start">
						<div className="flex flex-row justify-center gap-4 mt-4">
							{SOCIAL_LINKS.map((link, index) => (
								<Link
									className="w-5 h-5 rounded-full flex items-center justify-center bg-white"
									key={index}
									href={link.path}
								>
									<link.icon className="text-xs text-blue-spaces" />
								</Link>
							))}
						</div>
					</div>
					<div className="h-full flex flex-col items-end justify-end mb-4 text-right font-nunito text-[8px] italic text-white">
						<p>© 2025 Time&Spaces - pillar of Time&Place Group</p>
						<p>All rights reserved</p>
					</div>
				</div>
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
