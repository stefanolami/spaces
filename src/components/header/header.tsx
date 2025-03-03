'use client'

import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import NavDesktop from './nav-desktop'
import { NavMobile } from './nav-mobile'

export default function Header() {
	const { scrollY } = useScroll()

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
			<motion.div
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
					'fixed top-0 w-full text-white bg-blue-spaces z-50 h-16 xl:h-20'
				}
			>
				<div className="mx-auto w-[90%] max-w-[1200px] flex flex-row items-center justify-between h-full">
					<div className="flex items-center justify-center h-full">
						<Link
							className="w-[100px] md:w-[124px] xl:w-[150px] aspect-[462/175] relative"
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
				<div className="w-full h-5 md:h-7 xl:h-10 bg-black-spaces">
					<div className="mx-auto w-[90%] max-w-[1200px] h-full flex flex-row items-center justify-end gap-10">
						<span className="font-nunito text-xs md:text-base xl:text-lg">{`+32 (0) 485 382 221`}</span>
						<Link
							className="flex items-center h-5 md:h-7 xl:h-8 xl:hover:h-10 transition-transform hover:shadow-xl"
							href="/access"
						>
							<button className="h-full px-2 xl:px-5 bg-orange-spaces font-robo font-bold text-xs md:text-base xl:text-lg">
								BOOK NOW!
							</button>
						</Link>
					</div>
				</div>
			</motion.div>
		</>
	)
}
