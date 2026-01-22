'use client'

import { Carousel } from '@material-tailwind/react'
import Image from 'next/image'

export default function FacilitiesCarousel({ images }) {
	return (
		<Carousel
			className="relative w-full h-full"
			navigation={({ setActiveIndex, activeIndex, length }) => (
				<div className="absolute bottom-4 left-2/4 z-20 flex -translate-x-2/4 gap-2">
					{new Array(length).fill('').map((_, i) => (
						<span
							key={i}
							className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
								activeIndex === i
									? 'w-8 bg-white'
									: 'w-4 bg-white/50'
							}`}
							onClick={() => setActiveIndex(i)}
						/>
					))}
				</div>
			)}
		>
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
