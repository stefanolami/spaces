import HeroHome from './hero-home'
import HomeSection from './home-section'

const HomeComponent = () => {
	return (
		<>
			<div className="w-full h-[84px] md:h-[92px] xl:h-[120px] bg-black-spaces"></div>
			<HeroHome />
			<HomeSection />
		</>
	)
}

export default HomeComponent
