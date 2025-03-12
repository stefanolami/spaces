import HomeCard from './home-card'

const HomeSection = () => {
	return (
		<div className="w-full pt-8 md:pt-12 lg:pt-16">
			<h1 className="text-center font-robo text-black-spaces font-bold text-base md:text-lg lg:text-2xl xl:text-3xl">
				EXPLORE OUR:
			</h1>
			<div className="my-8 md:my-16 md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto grid grid-rows-4 md:grid-cols-2 md:grid-rows-1 gap-4">
				<HomeCard
					title={'CONCEPTS'}
					/* image={'/placeholder-pic-spaces.png'} */
					link={'/concepts'}
				/>
				<HomeCard
					title={'FACILITIES'}
					/* image={'/placeholder-pic-spaces.png'} */
					link={'/concepts'}
				/>
				<HomeCard
					title={'SERVICES'}
					/* image={'/placeholder-pic-spaces.png'} */
					link={'/concepts'}
				/>
			</div>
		</div>
	)
}

export default HomeSection
