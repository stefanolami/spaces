import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomeCard = ({
	Icon,
	image,
	title,
	link,
}: {
	Icon: React.ElementType
	image: string
	title: string
	link: string
}) => {
	return (
		<div className="group w-full flex flex-col">
			<Link
				className="w-full h-full"
				href={link}
			>
				<div className=" w-full aspect-[10/9] md:aspect-[9/10] relative ">
					<div className="bg-black-spaces/30 absolute inset-0 z-20"></div>
					<Image
						src={image}
						alt={title}
						fill
						className="object-cover"
					/>
				</div>

				<div className="w-full h-12 lg:h-20 flex flex-row items-center justify-center gap-4 transition duration-300 ease-in-out bg-black-spaces md:group-hover:bg-orange-spaces text-white font-robo">
					<div className="relative w-8 h-8 lg:w-12 lg:h-12">
						<Icon className="transition duration-300 ease-in-out fill-orange-spaces md:group-hover:fill-black-spaces" />
					</div>
					<span className="font-bold text-lg lg:text-2xl">
						{title}
					</span>
				</div>
			</Link>
		</div>
	)
}

export default HomeCard
