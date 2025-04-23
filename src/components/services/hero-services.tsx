import Image from 'next/image'

const HeroServices = () => {
	return (
		<div className="w-full h-screen flex items-center justify-center relative">
			<div className="absolute inset-0 z-20 bg-black-spaces/50"></div>
			<Image
				src="/office-1.jpg"
				alt="Concepts"
				fill
				className="object-cover"
			/>
			<h1 className="font-robo z-30 text-4xl md:text-5xl lg:text-7xl font-bold text-center text-white">
				Services
			</h1>
		</div>
	)
}

export default HeroServices
