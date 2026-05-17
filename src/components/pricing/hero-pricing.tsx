import Image from 'next/image'

const HeroPricing = () => {
	return (
		<div className="w-full h-[60vh] max-h-[650px] flex items-center justify-center relative select-none">
			<div className="absolute inset-0 z-20 bg-black-spaces/40"></div>
			<Image
				src="/hero/hero-map.jpg"
				alt="Pricing"
				fill
				priority
				className="object-cover"
			/>
			<h1 className="font-robo z-20 text-5xl lg:text-6xl xl:text-7xl font-bold text-center text-white-spaces">
				PRICING
			</h1>
		</div>
	)
}

export default HeroPricing
