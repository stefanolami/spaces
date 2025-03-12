import Image from 'next/image'

const HeroHome = () => {
	return (
		<div>
			<div className="bg-[#F3F3F3] w-full lg:h-[calc(100vh_-_120px)] py-8 md:py-6 xl:py-4">
				<div className="w-[90%] lg:w-auto lg:h-full aspect-[227/146] mx-auto max-w-[1000px] relative">
					<Image
						src="/group-79.png"
						alt="hero-home"
						fill
					/>
				</div>
			</div>
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
		</div>
	)
}

export default HeroHome
