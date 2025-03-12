'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

const HomeCard = ({
	image,
	title,
	text,
	firstLink,
	secondLink,
}: {
	image: string
	title: string
	text: string
	firstLink: string
	secondLink: string
}) => {
	return (
		<div
			className="relative w-full aspect-square bg-cover bg-center pb-6 font-nunito"
			style={{
				backgroundImage: `url(${image})`,
			}}
		>
			<div className="absolute inset-0 bg-black-spaces/60"></div>
			<div className="relative z-10 flex flex-col items-center justify-end gap-4 h-full text-center text-white px-4">
				<motion.h1
					initial={{ opacity: 0, y: -30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="text-lg lg:text-xl xl:text-2xl font-extrabold"
				>
					{title}
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: -30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.5 }}
					className="text-sm lg:text-base xl:text-lg lg:w-3/4 mx-auto"
				>
					{text}
				</motion.p>
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.8 }}
					className="grid grid-cols-2 gap-4"
				>
					<Link href={firstLink}>
						<button className="bg-orange-spaces hover:bg-orange-spaces/80 text-white font-bold py-2 px-4 rounded text-sm w-full">
							GET A QUOTE
						</button>
					</Link>
					<Link href={secondLink}>
						<button className="bg-black-spaces hover:bg-black-spaces/80 text-white font-bold py-2 px-4 rounded text-sm w-full">
							FIND MORE
						</button>
					</Link>
				</motion.div>
			</div>
		</div>
	)
}

export default HomeCard
