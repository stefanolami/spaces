'use client'

import HeroServices from './hero-services'
import Image from 'next/image'
import { useBookingSheet } from '../booking/booking-sheet-provider'

const LIST_ITEMS = [
	'Camera team to capture your event (photo or video)',
	'General transportation services',
	'Interpretation',
	'Live streaming',
	'Dry cleaning',
	'Branded giveaways or meeting paraphernalia with your logo',
]

const EQUIPMENT_ITEMS = [
	{
		title: 'Screens',
		desc: 'Available in all rooms except the Relaxation Breakout Room, and included in the booking price.',
		icon: '/services/screen-icon.png',
	},
	{
		title: 'Conference system',
		desc: 'Available in all rooms except the Relaxation Breakout Room, and included in the booking price.',
		icon: '/services/conf-icon.png',
	},
	{
		title: 'Microphone & speakers',
		desc: 'Available upon request.',
		icon: '/services/mic-icon.png',
	},
	{
		title: 'Whiteboard',
		desc: 'Available upon request.',
		icon: '/services/board-icon.png',
	},
]

const Services = () => {
	const { openBookingSheet } = useBookingSheet()
	return (
		<div>
			<HeroServices />
			<div className="text-black-spaces">
				<div className="text-center">
					<p className="w-[90%] max-w-[1000px] mx-auto text-midnight-spaces font-nunito font-bold text-sm md:text-base lg:text-lg xl:text-xl my-10 lg:my-20 2xl:my-32">
						We offer services ranging from the essential to the
						exceptional to meet your every need.
					</p>
					<div className="relative w-full aspect-[16/4] lg:aspect-[20/3] flex items-center justify-center">
						<div className="absolute inset-0 z-20 bg-black-spaces/30"></div>
						<Image
							src="/services/services-1.png"
							alt="Concepts"
							fill
							className="object-cover"
						/>
						<div className="z-20 text-white-spaces flex flex-col items-center justify-center">
							<h2 className="font-robo font-bold uppercase text-xl lg:text-3xl">
								Facility equipment
							</h2>
						</div>
					</div>
					<p className="w-[90%] font-nunito text-xs md:text-base lg:text-xl text-center italic mt-6 lg:mt-10 2xl:mt-20 max-w-[800px] mx-auto">
						Equipment is either included or can be requested through
						the{' '}
						<span
							onClick={(e) => {
								e.preventDefault()
								openBookingSheet(
									{ sourcePath: '/services' },
									'booking',
								)
							}}
							className="text-coral-spaces font-bold cursor-pointer"
						>
							make request
						</span>{' '}
						form.
					</p>
				</div>
				<div className="w-[90%] max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 grid-rows-4 md:grid-rows-2 gap-6 lg:gap-8 mt-10 md:mt-16 lg:mt-20">
					{EQUIPMENT_ITEMS.map((item, index) => (
						<EquipmentItems
							key={index}
							title={item.title}
							desc={item.desc}
							icon={item.icon}
						/>
					))}
				</div>
			</div>
			<div className="relative w-full aspect-[16/4] lg:aspect-[20/3] flex items-center justify-center mt-6 lg:mt-10 2xl:mt-20">
				<div className="absolute inset-0 z-20 bg-black-spaces/30"></div>
				<Image
					src="/services/services-2.png"
					alt="Concepts"
					fill
					className="object-cover"
				/>
				<div className="z-20 text-white-spaces flex flex-col items-center justify-center">
					<h2 className="font-robo font-bold uppercase text-xl lg:text-3xl">
						Catering services
					</h2>
				</div>
			</div>
			<div className="w-4/5 max-w-[1000px] mx-auto space-y-2 lg:space-y-4 my-6 lg:my-10 2xl:my-20 text-center text-xs md:text-sm lg:text-lg">
				<p className="">
					We offer a wide range of catering options to suit every
					taste, from warm buffets and cold cuts to international
					specialties. Additional experiences can be arranged, such as
					wine tastings, a mixologist for cocktails, or a barista for
					specialty coffee.
				</p>
				<p className="italic">
					Standard coffee, tea, and still or sparkling water are
					always included at no extra charge.
				</p>
			</div>
			<div className="relative w-full aspect-[16/4] lg:aspect-[20/3] flex items-center justify-center">
				<div className="absolute inset-0 z-20 bg-black-spaces/30"></div>
				<Image
					src="/services/services-3.png"
					alt="Concepts"
					fill
					className="object-cover"
				/>
				<div className="z-20 text-white-spaces flex flex-col items-center justify-center">
					<h2 className="font-robo font-bold uppercase text-xl lg:text-3xl">
						Additional Services
					</h2>
				</div>
			</div>
			<div className="w-4/5 max-w-[1000px] mx-auto  my-6 lg:my-10 2xl:my-20 text-center text-xs md:text-sm lg:text-lg">
				<p className="">
					If you don’t see what you need listed below, let us
					know—we’ll do our best to meet your requirements
				</p>
				<ul className="mt-8 lg:mt-12 w-fit mx-auto lg:grid xl:grid-cols-2 xl:gap-x-4">
					{LIST_ITEMS.map((item, index) => (
						<ListItem
							key={index}
							text={item}
						/>
					))}
				</ul>
			</div>
			<div className="relative w-full aspect-[16/4] lg:aspect-[20/3] flex items-center justify-center mt-6 lg:mt-10">
				<div className="absolute inset-0 z-20 bg-black-spaces/30"></div>
				<Image
					src="/services/services-4.png"
					alt="Concepts"
					fill
					className="object-cover"
				/>
				<div className="z-20 text-white-spaces flex flex-col items-center justify-center">
					<h2 className="font-robo font-bold uppercase text-xl lg:text-3xl">
						Event Management Services
					</h2>
				</div>
			</div>
			<div className="w-4/5 max-w-[1000px] mx-auto space-y-2 lg:space-y-4 my-6 lg:my-10 2xl:my-20 text-center text-xs md:text-sm lg:text-lg">
				<p className="">
					Our sister company, Time&Place Consulting, provides full
					360° event management—from pre-planning and execution to
					post-event follow-up. Services include audience and speaker
					invitations, as well as the development of multi-channel
					communication tools to ensure your message reaches its
					target. For more details, let us know, and we’ll connect you
					with their team.{' '}
					{/* <Link
						href="https://timeandplaceconsulting.com/service/event-organisation"
						className="text-eucalyptus-spaces font-bold"
					>
						here
					</Link>
					. Let us know and we will get you in touch. */}
				</p>
			</div>
		</div>
	)
}

export default Services

const ListItem = ({ text }: { text: string }) => {
	return (
		<li className="flex flex-row items-start gap-2 justify-start text-xs md:text-sm lg:text-lg font-nunito text-left text-black-spaces mb-2 lg:mb-3">
			<Image
				src="/services/checkmark-icon.png"
				width={20}
				height={20}
				className="mt-1"
				alt="screen icon"
			/>
			<span>{text}</span>
		</li>
	)
}

const EquipmentItems = ({
	title,
	desc,
	icon,
}: {
	title: string
	desc: string
	icon: string
}) => {
	return (
		<div className="flex flex-row items-start justify-start">
			<Image
				src={icon}
				width={40}
				height={40}
				className="mt-2 lg:w-12 lg:h-12"
				alt="screen icon"
			/>
			<div className="flex flex-col items-start justify-start ml-4">
				<span className="font-extrabold font-nunito text-lg lg:text-2xl text-midnight-spaces">
					{title}
				</span>
				<span className="font-nunito text-xs lg:text-base">{desc}</span>
			</div>
		</div>
	)
}
