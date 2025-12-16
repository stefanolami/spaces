import Image from 'next/image'

const HeroConcepts = () => {
	return (
		<div className="w-full h-[100vh] max-h-[900px] xl:max-h-[800px] 2xl:max-h-[750px] flex items-center justify-center relative select-none">
			<div className="absolute inset-0 z-20 bg-black-spaces/50"></div>
			<Image
				src="/hero/hero-concepts.jpeg"
				alt="Concepts"
				fill
				className="object-cover"
			/>
			<h1 className="font-robo z-30 text-4xl md:text-5xl lg:text-7xl font-bold text-center text-white-spaces mt-20">
				CONCEPTS
			</h1>
		</div>
	)
}

export default HeroConcepts
