import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import Image from 'next/image'

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
		<nav className="fixed right-4 top-4 z-40 h-[calc(100vh_-_32px)] w-[calc(100%_-_32px)] overflow-hidden">
			<Logo />
			<LinksContainer />
		</nav>
	)
}

const LinksContainer = () => {
	return (
		<motion.div className="space-y-4 p-12 pl-4 md:pl-20">
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
	return (
		<motion.a
			initial={{ opacity: 0, y: -8 }}
			animate={{
				opacity: 1,
				y: 0,
				transition: {
					delay: 0.75 + idx * 0.125,
					duration: 0.5,
					ease: 'easeInOut',
				},
			}}
			exit={{ opacity: 0, y: -8 }}
			href={href}
			className="block text-5xl font-semibold text-white"
		>
			{children}
		</motion.a>
	)
}

const Logo = () => {
	// Temp logo from https://logoipsum.com/
	return (
		<motion.a
			initial={{ opacity: 0, y: -12 }}
			animate={{
				opacity: 1,
				y: 0,
				transition: { delay: 0.5, duration: 0.5, ease: 'easeInOut' },
			}}
			exit={{ opacity: 0, y: -12 }}
			href="#"
			className="grid h-12 w-36 place-content-center rounded-br-xl rounded-tl-xl bg-blue-spaces transition-colors hover:bg-violet-50"
		>
			<Image
				src="/header-logo.png"
				alt="Logo"
				width={100}
				height={38}
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
				style={{ top: 16, right: 16 }}
				className="fixed z-10 bg-orange-spaces rounded-xl"
			/>

			<motion.button
				initial={false}
				animate={active ? 'open' : 'closed'}
				onClick={() => setActive((pv) => !pv)}
				className={`group fixed right-4 top-4 z-50 h-10 w-10 bg-white/0 transition-all hover:bg-white/20 ${
					active ? 'rounded-bl-xl rounded-tr-xl' : 'rounded-xl'
				}`}
			>
				<motion.span
					variants={HAMBURGER_VARIANTS.top}
					className="absolute block h-1 w-8 bg-white rounded-sm"
					style={{ y: '-50%', left: '50%', x: '-50%' }}
				/>
				<motion.span
					variants={HAMBURGER_VARIANTS.middle}
					className="absolute block h-1 w-8 bg-white rounded-sm"
					style={{ left: '50%', x: '-50%', top: '50%', y: '-50%' }}
				/>
				<motion.span
					variants={HAMBURGER_VARIANTS.bottom}
					className="absolute block h-1 w-5 bg-white rounded-sm"
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
]

const UNDERLAY_VARIANTS = {
	open: {
		width: 'calc(100% - 32px)',
		height: 'calc(100vh - 32px)',
		transition: { type: 'spring', mass: 3, stiffness: 400, damping: 50 },
	},
	closed: {
		width: '40px',
		height: '40px',
		transition: {
			delay: 0.75,
			type: 'spring',
			mass: 3,
			stiffness: 400,
			damping: 50,
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
