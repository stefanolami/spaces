import HeroConcepts from './hero-concepts'
import ConceptsCard from './concepts-card'
import { CONCEPTS } from '@/lib/data'
import Link from 'next/link'

const Concepts = () => {
	return (
		<>
			<HeroConcepts />
			<div className="w-full bg-black-spaces py-8 md:py-12 lg:py-16">
				<p className="w-[80%] mx-auto md:w-[70%] xl:w-[60%] max-w-[1000px]  font-nunito text-xs md:text-base lg:text-xl text-center text-white">
					Our{' '}
					<Link
						href="/facilities"
						className="text-orange-spaces font-bold"
					>
						facilities
					</Link>{' '}
					can be mixed and matched to various concepts for your needs.
					And, our{' '}
					<Link
						href="/services"
						className="text-orange-spaces font-bold"
					>
						services
					</Link>{' '}
					will make the most of the facilities.
				</p>
			</div>
			<div className="relative md:grid md:grid-rows-3">
				{CONCEPTS.map((concept, index) => (
					<ConceptsCard
						key={index}
						concept={concept}
						position={index + 1}
					/>
				))}
			</div>
			<div className="w-full bg-black-spaces py-8 md:py-12 lg:py-16">
				<p className="w-[80%] mx-auto md:w-[70%] xl:w-[60%] max-w-[1000px]  font-nunito text-xs md:text-base lg:text-xl text-center text-white">
					Our{' '}
					<Link
						href="/facilities"
						className="text-orange-spaces font-bold"
					>
						facilities
					</Link>{' '}
					can be mixed and matched to various concepts for your needs.
					And, our{' '}
					<Link
						href="/services"
						className="text-orange-spaces font-bold"
					>
						services
					</Link>{' '}
					will make the most of the facilities.
				</p>
			</div>
			<div className="w-full bg-orange-spaces h-[2px]"></div>
		</>
	)
}

export default Concepts
