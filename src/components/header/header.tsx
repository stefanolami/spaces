'use client'

import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import NavDesktop from './nav-desktop'
import { NavMobile } from './nav-mobile'
import { useBookingSheet } from '@/components/booking/booking-sheet-provider'

export default function Header() {
	const { scrollY } = useScroll()
	const { openBookingSheet } = useBookingSheet()

	const [hidden, setHidden] = useState(false)

	useMotionValueEvent(scrollY, 'change', (latest) => {
		const previous = scrollY.getPrevious()
		if (latest > previous! && latest > 200) {
			setHidden(true)
		} else {
			setHidden(false)
		}
	})

	return (
		<>
			<motion.header
				variants={{
					visible: {
						y: 0,
					},
					hidden: {
						y: '-100%',
					},
				}}
				animate={hidden ? 'hidden' : 'visible'}
				transition={{ duration: 0.3, ease: 'easeInOut' }}
				className={
					'fixed top-0 w-full text-white-spaces bg-eucalyptus-spaces z-30 h-16 xl:h-20'
				}
			>
				<div className="mx-auto w-[90%] max-w-[1200px] flex flex-row items-center justify-between h-full">
					<div className="flex items-center justify-center h-full">
						<Link
							className="w-[160px] md:w-[180px] xl:w-[200px] aspect-[912/230] relative cursor-pointer"
							href="/"
						>
							<Image
								src="/header-logo.png"
								alt="T&S Logo"
								fill
								sizes="(max-width: 640px) 35vw, 20vw"
								quality={100}
								loading="eager"
							/>
						</Link>
					</div>

					<NavDesktop />
					<NavMobile />
				</div>
				<div className="w-full h-7 md:h-7 xl:h-10 bg-black-spaces flex items-center justify-end">
					<div className="mx-auto w-[90%] max-w-[1200px]">
						<div className="h-full w-fit ml-auto">
							<button
								onClick={(e) => {
									e.preventDefault()
									openBookingSheet(
										{ sourcePath: '/header' },
										'booking'
									)
								}}
								className="w-full flex items-center h-6 md:h-7 xl:h-8 px-2 xl:px-5 bg-midnight-spaces border-2 border-midnight-spaces hover:border-coral-spaces font-robo font-bold text-xs md:text-base xl:text-lg xl:hover:scale-105 hover:shadow-xl"
							>
								MAKE REQUEST
							</button>
							{/* <Link
								className="w-full flex items-center h-6 md:h-7 xl:h-8"
								href="/get-quote"
								onClick={(e) => {
									e.preventDefault()
									openBookingSheet(
										{ sourcePath: '/header' },
										'availability'
									)
								}}
							>
								<button className="h-full w-full px-2 xl:px-5 bg-midnight-spaces border-2 border-midnight-spaces hover:border-coral-spaces font-robo font-bold text-xs md:text-base xl:text-lg xl:hover:scale-105 hover:shadow-xl">
									GET A QUOTE
								</button>
							</Link> */}
						</div>
					</div>
				</div>
			</motion.header>
		</>
	)
}
