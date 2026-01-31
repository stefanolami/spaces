'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export const NavMobile = () => {
	const [active, setActive] = useState(false)

	return (
		<div className="md:hidden">
			<HamburgerButton
				active={active}
				setActive={setActive}
			/>
			<AnimatePresence>{active && <LinksOverlay />}</AnimatePresence>
		</div>
	)
}

const LinksOverlay = () => {
	return (
		<nav className="fixed right-3 top-3 z-40 h-auto w-[calc(100%_-_24px)] overflow-hidden">
			<Logo />
			<LinksContainer />
		</nav>
	)
}

const LinksContainer = () => {
	return (
		<motion.div className="space-y-5 p-12 ">
			{LINKS.map((l, idx) => {
				return (
					<NavLink
						key={l.title}
						href={l.href}
						idx={idx}
					>
						{l.title}
					</NavLink>
				)
			})}
		</motion.div>
	)
}

const NavLink = ({ children, href, idx }) => {
	const path = usePathname()
	return (
		<motion.a
			initial={{ opacity: 0, y: -8 }}
			animate={{
				opacity: 1,
				y: 0,
				transition: {
					delay: 0.5 + idx * 0.08,
					duration: 0.35,
					ease: 'easeInOut',
				},
			}}
			exit={{ opacity: 0, y: -8 }}
			href={href}
			className={`block text-4xl font-semibold font-nunito text-center ${
				path === href ? 'text-coral-spaces' : 'text-white'
			}`}
		>
			{children}
		</motion.a>
	)
}

const Logo = () => {
	return (
		<motion.a
			initial={{ opacity: 0, y: -12 }}
			animate={{
				opacity: 1,
				y: 0,
				transition: { delay: 0.35, duration: 0.35, ease: 'easeInOut' },
			}}
			exit={{ opacity: 0, y: -12 }}
			href="/"
			className="grid h-28 w-full place-content-center rounded-tl-xl bg-midnight-spaces"
		>
			<Image
				src="/header-logo-vertical.png"
				alt="Logo"
				width={150}
				height={57}
			/>
		</motion.a>
	)
}

const HamburgerButton = ({ active, setActive }) => {
	return (
		<>
			<motion.div
				initial={false}
				animate={active ? 'open' : 'closed'}
				variants={UNDERLAY_VARIANTS}
				style={{ top: 12, right: 12 }}
				className="fixed z-10 rounded-xl"
			/>
			<motion.button
				initial={false}
				animate={active ? 'open' : 'closed'}
				onClick={() => setActive((pv) => !pv)}
				className={`group fixed right-3 top-3 z-50 h-10 w-10 transition-all ${
					active ? 'rounded-bl-xl rounded-tr-xl' : 'rounded-xl'
				}`}
			>
				<motion.span
					variants={HAMBURGER_VARIANTS.top}
					className="absolute block h-1 w-7 bg-white-spaces rounded-sm"
					style={{ y: '-50%', left: '50%', x: '-50%' }}
				/>
				<motion.span
					variants={HAMBURGER_VARIANTS.middle}
					className="absolute block h-1 w-7 bg-white-spaces rounded-sm"
					style={{ left: '50%', x: '-50%', top: '50%', y: '-50%' }}
				/>
				<motion.span
					variants={HAMBURGER_VARIANTS.bottom}
					className="absolute block h-1 w-4 bg-white-spaces rounded-sm"
					style={{ x: '-50%', y: '50%' }}
				/>
			</motion.button>
		</>
	)
}

const LINKS = [
	{
		title: 'CONCEPTS',
		href: '/concepts',
	},
	{
		title: 'FACILITIES',
		href: '/facilities',
	},
	{
		title: 'SERVICES',
		href: '/services',
	},
	{
		title: 'ACCESS',
		href: '/access',
	},
	{
		title: 'PRICING',
		href: '/pricing',
	},
	{
		title: 'CONTACT US',
		href: '/contact-us',
	},
]

const UNDERLAY_VARIANTS = {
	open: {
		width: 'calc(100% - 24px)',
		height: '530px',
		transition: { type: 'spring', mass: 1.5, stiffness: 550, damping: 55 },
		backgroundColor: '#2D2D2D',
	},
	closed: {
		width: '40px',
		height: '40px',
		backgroundColor: '#53939D',
		transition: {
			delay: 0.35,
			type: 'spring',
			mass: 1.5,
			stiffness: 550,
			damping: 55,
		},
	},
}

const HAMBURGER_VARIANTS = {
	top: {
		open: {
			rotate: ['0deg', '0deg', '45deg'],
			top: ['35%', '50%', '50%'],
		},
		closed: {
			rotate: ['45deg', '0deg', '0deg'],
			top: ['50%', '50%', '35%'],
		},
	},
	middle: {
		open: {
			rotate: ['0deg', '0deg', '-45deg'],
		},
		closed: {
			rotate: ['-45deg', '0deg', '0deg'],
		},
	},
	bottom: {
		open: {
			rotate: ['0deg', '0deg', '45deg'],
			bottom: ['35%', '50%', '50%'],
			left: '50%',
		},
		closed: {
			rotate: ['45deg', '0deg', '0deg'],
			bottom: ['50%', '50%', '35%'],
			left: 'calc(50% + 6px)',
		},
	},
}
