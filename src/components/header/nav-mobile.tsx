'use client'

import { motion, MotionConfig } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

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

export default function NavMobile() {
	const [active, setActive] = useState(false)

	const path = usePathname()

	useEffect(() => {
		if (active) {
			document.body.classList.add('overflow-y-hidden')
		} else {
			document.body.classList.remove('overflow-y-hidden')
		}
	}, [active])

	return (
		<div className="md:hidden flex flex-row font-unna">
			{/* <MobileLocaleSwitcher /> */}
			<MotionConfig
				transition={{
					duration: 0.4,
					ease: 'easeInOut',
				}}
			>
				<motion.button
					initial={false}
					onClick={() => setActive((pv) => !pv)}
					className="relative h-10 w-10 ml-3 rounded-full z-50 bg-primary-light scale-90"
					animate={active ? 'open' : 'closed'}
				>
					<motion.span
						className="absolute h-1 w-6 bg-white rounded-sm"
						style={{
							left: '50%',
							top: '34%',
							x: '-50%',
							y: '-50%',
						}}
						variants={{
							open: {
								rotate: ['0deg', '0deg', '45deg'],
								top: ['34%', '50%', '50%'],
							},
							closed: {
								rotate: ['45deg', '0deg', '0deg'],
								top: ['50%', '50%', '34%'],
							},
						}}
					/>
					<motion.span
						className="absolute h-1 w-6 bg-white rounded-sm"
						style={{
							left: '50%',
							top: '50%',
							x: '-50%',
							y: '-50%',
						}}
						variants={{
							open: {
								rotate: ['0deg', '0deg', '-45deg'],
							},
							closed: {
								rotate: ['-45deg', '0deg', '0deg'],
							},
						}}
					/>
					<motion.span
						className="absolute h-1 w-6 bg-white rounded-sm"
						style={{
							left: '50%',
							bottom: '34%',
							x: '-50%',
							y: '50%',
						}}
						variants={{
							open: {
								rotate: ['0deg', '0deg', '45deg'],
								left: '50%',
								bottom: ['34%', '50%', '50%'],
							},
							closed: {
								rotate: ['45deg', '0deg', '0deg'],
								left: '50%',
								bottom: ['50%', '50%', '34%'],
							},
						}}
					/>
				</motion.button>
				<motion.div>
					<motion.div
						className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 backdrop-blur flex flex-col justify-around items-center"
						initial={false}
						animate={active ? 'open' : 'closed'}
						variants={{
							open: {
								x: 0,
								opacity: 1,
								pointerEvents: 'auto',
							},
							closed: {
								x: '100%',
								opacity: 0,
								pointerEvents: 'none',
							},
						}}
					>
						<nav className="flex flex-col justify-center gap-6 items-center text-lg text-white font-robo">
							{LINKS.map((link, index) => (
								<Link
									key={index}
									href={link.path}
									onClick={() => setActive(false)}
									className={`${
										path == link.path
											? 'font-bold text-orange-spaces'
											: ''
									}`}
								>
									{link.name}
								</Link>
							))}
						</nav>
					</motion.div>
				</motion.div>
			</MotionConfig>
		</div>
	)
}
