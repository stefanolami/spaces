import HeroFacilities from './hero-facilities'
import Link from 'next/link'
import FacilitiesCard from './facilities-card'
import { FACILITIES } from '@/lib/data'

const FacilitiesComponent = () => {
	return (
		<>
			<HeroFacilities />
			<div className="w-full bg-white-spaces my-10 lg:my-20 3xl:my-32 font-nunito">
				<p className="w-[80%] mx-auto md:w-[70%] xl:w-[60%] max-w-[1000px]  font-nunito text-xs md:text-base lg:text-xl text-center text-midnight-spaces font-bold">
					Our facilities can be tailored and combined to suit a wide
					range of{' '}
					<Link
						href="/concepts"
						className="text-coral-spaces font-bold"
					>
						concepts
					</Link>{' '}
					, and our{' '}
					<Link
						href="/services"
						className="text-coral-spaces font-bold"
					>
						services
					</Link>{' '}
					are designed to suit your requirements.
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
			<div className="w-full bg-white-spaces my-10 lg:my-20 3xl:my-32">
				<p className="w-[80%] mx-auto md:w-[70%] xl:w-[60%] max-w-[1000px]  font-nunito text-xs md:text-base lg:text-xl text-center text-black-spaces">
					Please note: All rooms except the relaxation room have large
					screens and video-conferencing capacities. All bookings
					include coffee, tea, and water (flat and sparkling) at no
					charge.
				</p>
			</div>
		</>
	)
}

export default FacilitiesComponent
