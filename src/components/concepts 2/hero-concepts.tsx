import Image from 'next/image'

const HeroConcepts = () => {
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
				CONCEPTS
			</h1>
		</div>
	)
}

export default HeroConcepts
