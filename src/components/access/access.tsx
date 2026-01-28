import React from 'react'
import HeroAccess from './hero-access'
import Image from 'next/image'
import Map from './map'

const LIST_ITEMS = [
	{
		text: 'METRO STATION MAELBEEK: 60m',
		icon: '/access/metro-icon.png',
	},
	{
		text: 'TRAIN STATION BRUXELLES-LUXEMBOURG: 780m',
		icon: '/access/train-icon.png',
	},
	{
		text: 'TRAIN STATION BRUXELLES-SCHUMAN: 350m',
		icon: '/access/train-icon.png',
	},
	{
		text: 'TRAIN STATION BRUXELLES-MIDI (International trains): 5km',
		icon: '/access/train-icon.png',
	},
	{
		text: 'AIRPORT BRUSSELS-ZAVENTEM: 13km',
		icon: '/access/plane-icon.png',
	},
]

const Access = () => {
	return (
		<div>
			<HeroAccess />
			<div className="w-[90%] mx-auto max-w-[1000px] text-center mt-10 lg:mt-20 text-black-spaces">
				<p className="w-[90%] max-w-[1000px] mx-auto font-nunito text-sm md:text-base lg:text-xl mb-10 lg:mb-20 2xl:mt-32 text-midnight-spaces font-bold">
					Rue de la Loi 81A / Wetstraat 81A - 1040 Bruxelles /
					Brussels
				</p>
				<h2 className="font-robo font-bold uppercase text-lg lg:text-2xl">
					At the Heart of the EU District – Getting Here Is Easy:
				</h2>
				<ul className="w-fit mx-auto space-y-4 mt-10 mb-10 lg:mb-20">
					{LIST_ITEMS.map((item, index) => (
						<ListItems
							key={index}
							text={item.text}
							icon={item.icon}
						/>
					))}
				</ul>
				<h2 className="font-robo font-bold uppercase text-lg lg:text-2xl mb-10 lg:mb-20">
					..and how easy it is to get where you might need to be:
				</h2>
				<div className="relative w-full mb-10 lg:mb-28">
					{/* <Image
						src={'/access/access-map.png'}
						fill
						alt="map"
					/> */}
					<Map />
				</div>
			</div>
		</div>
	)
}

export default Access

const ListItems = ({ text, icon }: { text: string; icon: string }) => {
	return (
		<li className="flex flex-row items-center justify-start gap-2">
			<Image
				src={icon}
				width={25}
				height={25}
				alt="icon"
			/>
			<span className="block font-nunito text-sm lg:text-lg text-left">
				{text}
			</span>
		</li>
	)
}
