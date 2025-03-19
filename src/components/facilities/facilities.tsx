import HeroFacilities from './hero-facilities'
import Link from 'next/link'
import FacilitiesCard from './facilities-card'
import { FACILITIES } from '@/lib/data'

const FacilitiesComponent = () => {
	return (
		<>
			<HeroFacilities />
			<div className="w-full bg-white py-8 md:py-12 lg:py-16 font-nunito">
				<p className="w-[80%] mx-auto md:w-[70%] xl:w-[60%] max-w-[1000px]  font-nunito text-xs md:text-base lg:text-xl text-center text-black-spaces">
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
			<div className="relative max-w-[2000px] mx-auto">
				{FACILITIES.map((card, index) => (
					<FacilitiesCard
						key={index}
						card={card}
						position={index + 1}
					/>
				))}
			</div>
			<div className="w-full bg-white py-8 md:py-12 lg:py-16">
				<p className="w-[80%] mx-auto md:w-[70%] xl:w-[60%] max-w-[1000px]  font-nunito text-xs md:text-base lg:text-xl text-center text-black-spaces">
					Please note: All rooms except the relaxation room have large
					screens and video-conferencing capacities. All bookings
					include coffee, tea, water (flat and sparkling) and
					ice-cream included at no charge.
				</p>
			</div>
		</>
	)
}

export default FacilitiesComponent
