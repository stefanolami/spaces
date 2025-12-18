'use client'

import { Carousel } from '@material-tailwind/react'
import Image from 'next/image'

export default function FacilitiesCarousel({ images }) {
	return (
		<Carousel className="relative w-full h-full">
			{images.map((image, index) => (
				<div
					key={index}
					className="relative w-full h-full"
				>
					<Image
						src={image}
						alt={`Facility Image ${index + 1}`}
						fill
						priority={index === 0}
						sizes="(max-width: 768px) 100vw, 50vw"
						quality={60}
						placeholder="empty"
						className="object-cover"
					/>
				</div>
			))}
		</Carousel>
	)
}
