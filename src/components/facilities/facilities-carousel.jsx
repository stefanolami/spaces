'use client'

import { Carousel } from '@material-tailwind/react'
import Image from 'next/image'

export default function FacilitiesCarousel() {
	return (
		<Carousel className="relative w-full h-full">
			<img
				src="/placeholder-pic-spaces.png"
				alt="image 1"
				className="h-full w-full object-cover"
			/>
			<img
				src="/office-3.jpg"
				alt="image 2"
				className="h-full w-full object-cover"
			/>
			<img
				src="/catering.jpg"
				alt="image 3"
				className="h-full w-full object-cover"
			/>
		</Carousel>
	)
}
