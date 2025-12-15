import Image from 'next/image'

const HeroFacilities = () => {
	return (
		<div className="relative w-full h-[100vh] max-h-[900px] xl:max-h-[800px] 2xl:max-h-[750px] flex items-center justify-center select-none">
			<div className="absolute inset-0 z-20 bg-black-spaces/50"></div>

			<Image
				src="/hero/hero-facilities.png"
				alt="Facilities hero"
				fill
				className="object-cover"
				priority
			/>

			<h1 className="font-robo z-30 text-4xl md:text-5xl lg:text-7xl xl:text-6xl 2xl:text-6xl font-bold text-center text-white-spaces mt-20">
				FACILITIES
			</h1>
		</div>
	)
}

export default HeroFacilities
