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
		<div className="w-full">
			<div className="w-[80%] mx-auto md:w-[70%] xl:w-[60%] max-w-[1000px] my-8 md:my-12 lg:my-16">
				<p className="font-nunito text-[12px] md:text-[16px] lg:text-[20px] leading-[14px] md:leading-[18px] lg:leading-[22px] text-justify">
					We provide strategic meeting and event locations. Launched
					in March 2025, our first location is at the heart of EU
					decision-making in Brussels. Our focus is on providing the
					right spaces for your place of action; from board meeting to
					conferences, and expert round-tables to trainings. We also
					provide 360°-office support assistance and with a team of
					dedicated experts, the full spectrum of event management
					services. Our ultimate aims: A perfect fit and memorable.
				</p>
			</div>
			<h1 className="text-center font-robo text-black-spaces font-bold text-xl lg:text-2xl xl:text-3xl">
				EXPLORE OUR:
			</h1>
			<div className="my-8 w-[90%] md:my-16 sm:w-3/4 md:w-4/5 lg:w-3/4 xl:w-2/3 max-w-[1200px] mx-auto grid grid-rows-3 md:grid-cols-3 md:grid-rows-1 gap-4">
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
							src="/hero-map.png"
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
			<div className="grid grid-rows-2 gap-3 mt-16 md:mt-20 lg:mt-32 xl:mt-36 mb-20 md:grid-cols-2 md:gap-4 mx-auto w-fit">
				<Link
					href="/booking"
					className="w-full h-full"
				>
					<button className="w-full h-full bg-orange-spaces flex items-center justify-center font-nunito font-bold text-base md:text-lg lg:text-xl xl:text-2xl text-white px-6 md:px-8 lg:px-10 xl:px-12 py-2 lg:py-3 xl:py-4 shadow-md hover:shadow-lg hover:scale-105">
						BOOK NOW
					</button>
				</Link>
				<Link
					href="/"
					className="w-full h-full"
				>
					<button className="w-full h-full bg-black-spaces flex items-center justify-center font-nunito font-bold text-base md:text-lg lg:text-xl xl:text-2xl text-white px-6 md:px-8 lg:px-10 xl:px-12 py-2 lg:py-3 xl:py-4 shadow-md hover:shadow-lg hover:scale-105">
						GET A QUOTE
					</button>
				</Link>
			</div>
		</div>
	)
}

export default HomeSection
