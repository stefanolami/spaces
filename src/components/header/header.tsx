'use client'

import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import NavDesktop from './nav-desktop'
import NavMobile from './nav-mobile'

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
				'fixed top-0 w-full text-white bg-blue-spaces z-50 h-16 xl:h-24'
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
							sizes="(max-width: 640px) 40vw, 40vw"
							quality={100}
							loading="eager"
						/>
					</Link>
				</div>

				<NavDesktop />
				<NavMobile />
			</div>
		</motion.div>
	)
}
