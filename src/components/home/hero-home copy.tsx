import Image from 'next/image'

const HeroHome = () => {
	return (
		<div>
			<div className="bg-[#F3F3F3] w-full lg:h-[calc(100vh_-_120px)] py-8 md:py-6 xl:py-4">
				<div className="w-[90%] lg:w-auto lg:h-full aspect-[227/146] mx-auto relative">
					<Image
						src="/group-79.png"
						alt="hero-home"
						fill
					/>
				</div>
			</div>
		</div>
	)
}

export default HeroHome
