'use client'
/* import { motion } from 'motion/react' */
import React from 'react'
import { ImagesSlider } from './images-slider'
const HeroHome = () => {
	const images = [
		'/hero/hero-1.png',
		'/hero/hero-map.jpg',
		'/hero/hero-3.png',
		'/hero/hero-4.png',
		'/hero/hero-5.png',
	]
	const texts = [
		'Your view',
		'Your access',
		'Your voice',
		'Your place of action',
		' ...within the heart of the EU',
	]
	const positions = ['top', 'top', 'center', 'center', 'top']
	const mobileUnderlineWords = [
		['view'],
		['access'],
		['voice'],
		['action'],
		['heart', 'EU'],
	]
	return (
		<ImagesSlider
			className=" w-full h-[100vh] py-8 md:py-6 xl:py-4 select-none"
			images={images}
			texts={texts}
			positions={positions}
			mobileUnderlineWords={mobileUnderlineWords}
		>
			{/* <motion.div
				initial={{
					opacity: 0,
					y: -80,
				}}
				animate={{
					opacity: 1,
					y: 0,
				}}
				transition={{
					duration: 0.6,
				}}
				className="z-50 flex flex-col justify-center items-center"
			>
				<motion.p
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4"
				>
					The hero section slideshow <br /> nobody asked for
				</motion.p>
			</motion.div> */}
		</ImagesSlider>
	)
}

export default HeroHome
