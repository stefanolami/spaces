'use client'

import { Carousel } from '@material-tailwind/react'
import Image from 'next/image'

export default function FacilitiesCarousel({ images }) {
	return (
		<Carousel className="relative w-full h-full">
			{images.map((image, index) => (
				<img
					key={index}
					src={image}
					alt={`Facility Image ${index + 1}`}
					sizes="(max-width: 768px) 100vw, 50vw"
					className="h-full w-full object-cover"
				/>
			))}
		</Carousel>
	)
}
