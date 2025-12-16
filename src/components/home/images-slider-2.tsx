'use client'

import { cn } from '@/lib/utils'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

export const ImagesSlider = ({
	images,
	texts,
	positions,
	children,
	overlay = true,
	overlayClassName,
	className,
	autoplay = true,
	direction = 'up',
}: {
	images: string[]
	texts: string[]
	positions: string[]
	children?: React.ReactNode
	overlay?: React.ReactNode
	overlayClassName?: string
	className?: string
	autoplay?: boolean
	direction?: 'up' | 'down'
}) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isReady, setIsReady] = useState(false)
	const prefersReducedMotion = useReducedMotion()

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex + 1 === images.length ? 0 : prevIndex + 1
		)
	}

	// Decode utility to ensure image is fully decoded before swap
	const decodeImage = (src: string) => {
		return new Promise<void>((resolve) => {
			const img = new window.Image()
			img.src = src
			if ('decode' in img && typeof img.decode === 'function') {
				img.decode()
					.then(() => resolve())
					.catch(() => resolve())
			} else {
				img.onload = () => resolve()
				img.onerror = () => resolve()
			}
		})
	}

	// Prepare first image and opportunistically preload the next
	useEffect(() => {
		let cancelled = false
		const prepare = async () => {
			if (!images?.length) return
			await decodeImage(images[0])
			if (!cancelled) setIsReady(true)
			const nextIdx = (0 + 1) % images.length
			decodeImage(images[nextIdx])
		}
		prepare()
		return () => {
			cancelled = true
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	useEffect(() => {
		// autoplay with visibility guard
		let interval: NodeJS.Timeout | undefined
		const start = () => {
			if (!autoplay) return
			interval = setInterval(() => {
				handleNext()
			}, 5000)
		}
		const stop = () => {
			if (interval) clearInterval(interval)
			interval = undefined
		}
		const handleVisibility = () => {
			if (document.hidden) stop()
			else start()
		}
		start()
		document.addEventListener('visibilitychange', handleVisibility)
		return () => {
			document.removeEventListener('visibilitychange', handleVisibility)
			stop()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [autoplay])

	// Preload the next image after index updates
	useEffect(() => {
		if (!images?.length) return
		const nextIdx = (currentIndex + 1) % images.length
		decodeImage(images[nextIdx])
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentIndex])

	const slideVariants = {
		initial: {
			opacity: 0,
			x: '100%',
		},
		visible: {
			x: '0%',
			opacity: 1,
			transition: {
				duration: 1,
				ease: [0.645, 0.045, 0.355, 1.0],
			},
		},
		upExit: {
			opacity: 0,
			x: '-100%',
			transition: {
				duration: 1,
				ease: [0.645, 0.045, 0.355, 1.0],
			},
		},
		downExit: {
			opacity: 1,
			x: '150%',
			transition: {
				duration: 1,
			},
		},
	}

	const areImagesLoaded = isReady

	return (
		<div
			className={cn(
				'overflow-hidden h-full w-full relative flex items-center justify-center',
				className
			)}
			style={{
				perspective: '1000px',
			}}
		>
			{areImagesLoaded && children}
			{areImagesLoaded && overlay && (
				<div
					className={cn(
						'absolute inset-0 bg-black/50 z-40',
						overlayClassName
					)}
				/>
			)}

			{areImagesLoaded && (
				<AnimatePresence initial={false}>
					<motion.div
						key={currentIndex}
						initial="initial"
						animate="visible"
						exit={direction === 'up' ? 'upExit' : 'downExit'}
						variants={slideVariants}
						className="absolute inset-0 transform-gpu will-change-transform"
					>
						<Image
							src={images[currentIndex]}
							alt=""
							fill
							sizes="100vw"
							priority={currentIndex === 0}
							quality={85}
							style={{
								objectFit: 'cover',
								objectPosition:
									positions[currentIndex] || 'center',
							}}
						/>
					</motion.div>
				</AnimatePresence>
			)}
			{areImagesLoaded && (
				<AnimatePresence>
					<motion.div
						key={currentIndex}
						initial={{
							opacity: 0,
							x: prefersReducedMotion ? 0 : -300,
							y: prefersReducedMotion ? 0 : 8,
						}}
						animate={{
							opacity: 1,
							x: 0,
							y: 0,
							transition: {
								duration: prefersReducedMotion ? 0.3 : 0.5,
								delay: 1,
							},
						}}
						exit={{
							opacity: 0,
							x: prefersReducedMotion ? 0 : 300,
							y: prefersReducedMotion ? 0 : -6,
							transition: {
								duration: prefersReducedMotion ? 0.3 : 0.5,
								delay: 0,
							},
						}}
						className="absolute bottom-[17%] z-50 text-white-spaces text-center font-robo font-bold transform-gpu will-change-transform"
						style={{ transform: 'translateZ(40px)' }}
					>
						{/* Wrapper to align underline with text width */}
						<div className="relative inline-block">
							{/* Base text layer */}
							<h1 className="relative z-10 text-5xl lg:text-6xl xl:text-7xl font-bold uppercase text-white-spaces/80 tracking-[0.01em]">
								{texts[currentIndex]}
							</h1>

							{/* Revealed text layer via moving clip-path (right -> left) */}
							<motion.h1
								aria-hidden
								initial={{
									clipPath:
										'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
								}}
								animate={{
									clipPath: prefersReducedMotion
										? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
										: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
									transition: {
										duration: prefersReducedMotion
											? 0.2
											: 0.8,
										delay: 1.05,
										ease: [0.22, 1, 0.36, 1],
									},
								}}
								exit={{
									clipPath:
										'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
									transition: { duration: 0.3 },
								}}
								className="pointer-events-none absolute inset-0 z-20 text-5xl lg:text-6xl xl:text-7xl font-bold uppercase text-white-spaces tracking-[0.01em] will-change-[clip-path]"
							/>

							{/* Underline – back layer (under text) */}
							<motion.span
								aria-hidden
								initial={{
									x: prefersReducedMotion ? 0 : '120%',
									scaleX: 1,
								}}
								animate={{
									x: 0,
									scaleX: prefersReducedMotion
										? 1
										: [1, 1.15, 1],
									transition: {
										duration: prefersReducedMotion
											? 0.2
											: 0.9,
										delay: 1.05,
										ease: [0.22, 1, 0.36, 1],
									},
								}}
								exit={{
									x: prefersReducedMotion ? 0 : '-100%',
									transition: { duration: 0.3 },
								}}
								className="pointer-events-none absolute -left-2 -bottom-2 z-40 h-[10px] w-[110%] bg-eucalyptus-spaces"
							/>

							{/* Underline – front layer (slight overlap over descenders) */}
							<motion.span
								aria-hidden
								initial={{
									x: prefersReducedMotion ? 0 : '130%',
									scaleX: 1,
								}}
								animate={{
									x: 0,
									scaleX: prefersReducedMotion
										? 1
										: [1, 1.12, 1],
									transition: {
										duration: prefersReducedMotion
											? 0.2
											: 0.9,
										delay: 1.08,
										ease: [0.22, 1, 0.36, 1],
									},
								}}
								exit={{
									x: prefersReducedMotion ? 0 : '-100%',
									transition: { duration: 0.3 },
								}}
								className="pointer-events-none absolute left-0 -bottom-[6px] z-30 h-[40px] w-[115%] bg-coral-spaces/90 mix-blend-overlay opacity-80"
							/>
						</div>
					</motion.div>
				</AnimatePresence>
			)}
		</div>
	)
}
