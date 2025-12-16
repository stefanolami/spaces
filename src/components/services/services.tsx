import Link from 'next/link'
import HeroServices from './hero-services'
import Image from 'next/image'

const LIST_ITEMS = [
	'Camera team to capture your event (video or static)',
	'Dog walking services',
	'Limousine or general pick-up services',
	'Dry cleaning',
	'Gym access (offsite)',
	'Give-aways or meeting paraphernalia with your logo',
]

const EQUIPMENT_ITEMS = [
	{
		title: 'Screens',
		desc: 'Available in each room except in the relaxation break-out room. Included in price.',
		icon: '/services/screen-icon.png',
	},
	{
		title: 'Conference system',
		desc: 'Available in each room except in the relaxation break-out room. Included in price.',
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
	return (
		<div>
			<HeroServices />
			<div className="text-black-spaces">
				<div className="text-center">
					<p className="w-[90%] max-w-[1000px] mx-auto text-midnight-spaces font-nunito font-bold text-sm md:text-base lg:text-lg xl:text-xl my-10 lg:my-20 2xl:my-32">
						Our services from the necessary to the extraordinary to
						support your requirements.
					</p>
					<div className="relative w-full aspect-[16/4] lg:aspect-[20/3] flex items-center justify-center">
						<div className="absolute inset-0 z-20 bg-black-spaces/30"></div>
						<Image
							src="/services/services-1.jpg"
							alt="Concepts"
							fill
							className="object-cover"
						/>
						<div className="z-20 text-white-spaces flex flex-col items-center justify-center">
							<h2 className="font-robo font-bold uppercase text-xl lg:text-3xl">
								Facility-related equipment
							</h2>
						</div>
					</div>
					<p className="w-[90%] font-nunito text-xs md:text-base lg:text-xl text-center italic mt-6 lg:mt-10 2xl:mt-20 max-w-[800px] mx-auto">
						These are included, or can be specifically requested
						through the{' '}
						<Link
							href="/concepts"
							className="text-eucalyptus-spaces font-bold"
						>
							booking system
						</Link>{' '}
						or through the{' '}
						<Link
							href="/services"
							className="text-eucalyptus-spaces font-bold"
						>
							request for a quote
						</Link>{' '}
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
					src="/services/services-2.jpg"
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
					Dare us to satisfy your tastes. We have a long list of
					various catering services to offer, from warm buffet to cold
					cuts, from Brazilian cuisine and Scandic specialities to
					Japanese flavours. We can also organize a wine tasting, a
					mixologist for delicious cocktails, or a barista to make
					that cappuccino extra special.
				</p>
				<p className="italic">
					Keep in mind, we offer coffee, tea and water (flat and
					sparkling) at no charge.
				</p>
			</div>
			<div className="relative w-full aspect-[16/4] lg:aspect-[20/3] flex items-center justify-center">
				<div className="absolute inset-0 z-20 bg-black-spaces/30"></div>
				<Image
					src="/services/services-3.jpg"
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
					If you do not find what you need on the list below,
					challenge us to satisfy your requirements.
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
					Our sister company Time&Place Consulting can help you
					organize your event from a 360-perspective, from
					pre-planning and execution to post-event activities. This
					includes inviting the right audience and speakers to
					developing multi-channel communication tools so that you get
					your message through. You can find more details{' '}
					<Link
						href="https://timeandplaceconsulting.com/service/event-organisation"
						className="text-eucalyptus-spaces font-bold"
					>
						here
					</Link>
					. Let us know and we will get you in touch.
				</p>
			</div>
		</div>
	)
}

export default Services

const ListItem = ({ text }: { text: string }) => {
	return (
		<li className="flex flex-row items-center gap-2 justify-start text-xs md:text-sm lg:text-lg font-nunito text-left text-black-spaces mb-2 lg:mb-3">
			<Image
				src="/services/checkmark-icon.png"
				width={20}
				height={20}
				className=""
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
