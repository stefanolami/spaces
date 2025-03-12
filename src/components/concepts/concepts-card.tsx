import Link from 'next/link'
import { ConceptSection } from '@/lib/types'
import Image from 'next/image'

const ConceptsCard = ({
	position,
	concept,
}: {
	position: number
	concept: ConceptSection
}) => {
	return (
		<div className={` ${concept.containerClasses} flex w-full font-nunito`}>
			<div className="w-full grid grid-cols-2 h-full">
				<div
					className={`w-full aspect-[5/4] relative ${
						position % 2 === 0 ? 'lg:order-1' : ''
					}`}
				>
					<Image
						src={concept.image}
						alt={concept.title}
						fill
						className="object-cover"
					/>
				</div>
				<div className="flex flex-col justify-center w-3/4 mx-auto gap-4 md:gap-5 lg:gap-6">
					<h2 className="text-base md:text-lg lg:text-xl font-semibold w-full text-balance">
						{concept.title}
					</h2>
					<p className="text-sm md:text-sm lg:text-base text-justify">
						{concept.text}
					</p>
					<Link
						className={`${
							concept.buttonClasses
						} w-28 md:w-36 md:h-7 lg:w-48 lg:h-8 h-5 font-nunito font-bold text-xs md:text-base lg:text-lg rounded-md shadow-md hover:shadow-lg ${
							position % 2 === 0
								? 'ml-auto lg:ml-0 lg:mr-auto'
								: 'mr-auto lg:mr-0 lg:ml-auto'
						}`}
						href={concept.link}
					>
						<button
							className={` w-full h-full flex items-center justify-center `}
						>
							GET A QUOTE
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default ConceptsCard
