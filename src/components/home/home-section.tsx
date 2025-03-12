'use server'

import Link from 'next/link'
import CogsSvg from '../svgs/cogs'
import LaptopSvg from '../svgs/laptop'
import PhoneSvg from '../svgs/phone'
import HomeCard from './home-card'
import Image from 'next/image'
import PinSvg from '../svgs/pin'

const HomeSection = () => {
	return (
		<div className="w-full pt-8 md:pt-12 lg:pt-16">
			<h1 className="text-center font-robo text-black-spaces font-bold text-xl lg:text-2xl xl:text-3xl">
				EXPLORE OUR:
			</h1>
			<div className="my-8 w-[90%] md:my-16 sm:w-3/4 md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto grid grid-rows-3 md:grid-cols-3 md:grid-rows-1 gap-4">
				<HomeCard
					title="CONCEPTS"
					Icon={LaptopSvg}
					image="/office-1.jpg"
					link="/concepts"
				/>
				<HomeCard
					title="FACILITIES"
					Icon={PhoneSvg}
					image="/office-2.jpg"
					link="/facilities"
				/>
				<HomeCard
					title="SERVICES"
					Icon={CogsSvg}
					image="/catering.jpg"
					link="/services"
				/>
			</div>
			<h1 className="text-center font-robo text-black-spaces font-bold text-xl lg:text-2xl xl:text-3xl">
				EXPLORE YOUR:
			</h1>
			<div className="group my-8 w-[90%] sm:w-3/4 md:w-2/3 max-w-[550px] md:my-16 mx-auto">
				<Link
					className="w-full h-full"
					href="/access"
				>
					<div className=" w-full aspect-[10/9] md:aspect-[2/1] relative ">
						<div className="bg-black-spaces/30 absolute inset-0 z-20"></div>
						<Image
							src="/group-79.png"
							alt="Access"
							fill
							className="object-cover"
						/>
					</div>

					<div className="w-full h-12 lg:h-20 flex flex-row items-center justify-center gap-4 transition duration-300 ease-in-out bg-black-spaces md:group-hover:bg-orange-spaces text-white font-robo">
						<div className="relative w-8 h-8 lg:w-12 lg:h-12">
							<PinSvg className="transition duration-300 ease-in-out fill-orange-spaces md:group-hover:fill-black-spaces" />
						</div>
						<span className="font-bold text-lg lg:text-2xl">
							ACCESS
						</span>
					</div>
				</Link>
			</div>
		</div>
	)
}

export default HomeSection
