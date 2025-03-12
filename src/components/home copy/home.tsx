import HeroHome from './hero-home'
import HomeSection from './home-section'

const HomeComponent = () => {
	return (
		<>
			<div className="w-full h-[84px] md:h-[92px] xl:h-[120px] bg-[#F3F3F3]"></div>
			<HeroHome />
			<HomeSection />
		</>
	)
}

export default HomeComponent
