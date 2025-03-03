import HomeBox from './home-box'

const HomeSection = () => {
	return (
		<div className="bg-[#F3F3F3] w-full pt-8">
			<h1 className="text-center font-robo text-black-spaces font-bold text-base">
				EXPLORE OUR:
			</h1>
			<div className="mt-8">
				<HomeBox
					title={'CONCEPTS'}
					text={
						'We have a wide range of concepts for you to choose from.'
					}
					image={'/placeholder-pic-spaces.png'}
					firstLink={'/concepts'}
					secondLink={'/concepts'}
				/>
				<HomeBox
					title={'FACILITIES'}
					text={
						'We have a wide range of concepts for you to choose from.'
					}
					image={'/placeholder-pic-spaces.png'}
					firstLink={'/concepts'}
					secondLink={'/concepts'}
				/>
				<HomeBox
					title={'SERVICES'}
					text={
						'We have a wide range of concepts for you to choose from.'
					}
					image={'/placeholder-pic-spaces.png'}
					firstLink={'/concepts'}
					secondLink={'/concepts'}
				/>
				<HomeBox
					title={'ACCESS'}
					text={
						'We have a wide range of concepts for you to choose from.'
					}
					image={'/placeholder-pic-spaces.png'}
					firstLink={'/concepts'}
					secondLink={'/concepts'}
				/>
			</div>
		</div>
	)
}

export default HomeSection
