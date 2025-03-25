'use client'
/* import { motion } from 'motion/react' */
import React from 'react'
import { ImagesSlider } from './images-slider'
const HeroHome = () => {
	const images = ['/hero/hero-test-map.png', '/hero/hero-test-eu.png']
	const texts = ['Your access', ' ...within the heart of the EU']
	return (
		<ImagesSlider
			className=" w-full h-[calc(100vh_-_84px)] md:h-[calc(100vh_-_92px)] lg:h-[calc(100vh_-_120px)] py-8 md:py-6 xl:py-4"
			images={images}
			texts={texts}
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
