import React from 'react'
import HeroFacilities from './hero-facilities'
import Link from 'next/link'
import FacilitiesCard from './facilities-card'

const FacilitiesComponent = () => {
	return (
		<>
			<HeroFacilities />
			<div className="font-nunito">
				<div className="w-[80%] mx-auto md:w-[70%] xl:w-[60%] max-w-[1000px] my-8 md:my-12 lg:my-16">
					<p className="font-nunito text-xs md:text-base lg:text-xl text-center">
						Our facilities can be mixed and matched to various{' '}
						<Link
							href="/concepts"
							className="text-blue-spaces font-bold"
						>
							concepts
						</Link>{' '}
						for your needs. And, our{' '}
						<Link
							href="/services"
							className="text-blue-spaces font-bold"
						>
							services
						</Link>{' '}
						will make the most of the facilities.
					</p>
				</div>
				<div className="bg-[#F3F3F3] pt-8 md:pt-12 lg:pt-16">
					<h1 className="text-center font-robo text-black-spaces font-bold text-base md:text-lg lg:text-2xl xl:text-3xl mb-8 md:mb-12 lg:mb-16">
						EXPLORE OUR:
					</h1>
					<div className="">
						{CARDS.map((card, index) => (
							<FacilitiesCard
								card={card}
								position={index + 1}
								key={index}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

const CARDS = [
	{
		title: 'Board and Conference Room',
		text: 'Our heart-piece of our facilities allows for up to 20 persons in a board room or up to 40 people in a conference (panel or keynote) setting with a possibility to have only chairs, stand-up tables or a mix.',
		image: '/placeholder-pic-spaces.png',
		firstLink: '/',
		secondLink: '/',
		price: '1000',
		subText:
			'*Coffee, tea, water (flat and sparkling) and ice-cream included at no charge.',
	},
	{
		title: 'Board and Conference Room',
		text: 'Our heart-piece of our facilities allows for up to 20 persons in a board room or up to 40 people in a conference (panel or keynote) setting with a possibility to have only chairs, stand-up tables or a mix.',
		image: '/placeholder-pic-spaces.png',
		firstLink: '/',
		secondLink: '/',
		price: '1000',
		subText:
			'*Coffee, tea, water (flat and sparkling) and ice-cream included at no charge.',
	},
	{
		title: 'Board and Conference Room',
		text: 'Our heart-piece of our facilities allows for up to 20 persons in a board room or up to 40 people in a conference (panel or keynote) setting with a possibility to have only chairs, stand-up tables or a mix.',
		image: '/placeholder-pic-spaces.png',
		firstLink: '/',
		secondLink: '/',
		price: '1000',
		subText:
			'*Coffee, tea, water (flat and sparkling) and ice-cream included at no charge.',
	},
	{
		title: 'Board and Conference Room',
		text: 'Our heart-piece of our facilities allows for up to 20 persons in a board room or up to 40 people in a conference (panel or keynote) setting with a possibility to have only chairs, stand-up tables or a mix.',
		image: '/placeholder-pic-spaces.png',
		firstLink: '/',
		secondLink: '/',
		price: '1000',
		subText:
			'*Coffee, tea, water (flat and sparkling) and ice-cream included at no charge.',
	},
]

export default FacilitiesComponent
