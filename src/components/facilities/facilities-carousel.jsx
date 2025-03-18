'use client'

import { Carousel } from '@material-tailwind/react'
import Image from 'next/image'

export default function FacilitiesCarousel() {
	return (
		<Carousel className="relative w-full h-full">
			<img
				src="/room-1.jpg"
				alt="image 1"
				className="h-full w-full object-cover"
			/>
			<img
				src="/room-2.jpg"
				alt="image 2"
				className="h-full w-full object-cover"
			/>
			<img
				src="/room-3.jpg"
				alt="image 3"
				className="h-full w-full object-cover"
			/>
		</Carousel>
	)
}
