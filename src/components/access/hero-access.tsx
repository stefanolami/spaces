import Image from 'next/image'

const HeroAccess = () => {
	return (
		<div className="w-full h-screen flex items-center justify-center relative">
			<div className="absolute inset-0 z-20 bg-black-spaces/50"></div>
			<Image
				src="/hero/hero-2.png"
				alt="Facilities hero"
				fill
				className="object-cover"
			/>
			<h1 className="font-robo z-30 text-4xl md:text-5xl lg:text-7xl font-bold text-center text-white mt-20">
				ACCESS
			</h1>
		</div>
	)
}

export default HeroAccess
