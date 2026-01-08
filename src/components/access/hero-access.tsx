import Image from 'next/image'

const HeroAccess = () => {
	return (
		<div className="w-full h-[100vh] max-h-[900px] xl:max-h-[800px] 2xl:max-h-[750px] flex items-center justify-center relative select-none bg-white overflow-hidden">
			<div className="absolute inset-0 z-20 bg-black-spaces/30"></div>
			<Image
				src="/hero/hero-map.jpg"
				alt="Facilities hero"
				fill
				className="object-cover lg:object-contain object-center mt-10"
			/>
			<h1 className="font-robo z-20 text-5xl lg:text-6xl xl:text-7xl font-bold text-center text-white-spaces mt-96">
				ACCESS
			</h1>
		</div>
	)
}

export default HeroAccess
