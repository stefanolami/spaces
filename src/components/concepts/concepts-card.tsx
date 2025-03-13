import Link from 'next/link'
import { ConceptsCardType } from '@/lib/types'
import Image from 'next/image'

const ConceptsCard = ({
	position,
	concept,
}: {
	position: number
	concept: ConceptsCardType
}) => {
	return (
		<div className={` ${concept.containerClasses} flex w-full font-nunito`}>
			<div className="w-full flex flex-col md:grid md:grid-cols-2 h-full">
				<div
					className={`w-full h-44 md:h-full relative ${
						position % 2 === 0 ? 'md:order-1' : ''
					}`}
				>
					<Image
						src={concept.image}
						alt={concept.title}
						fill
						className="object-cover"
					/>
				</div>
				<div className="flex flex-col justify-center w-3/4 mx-auto max-w-[600px] py-8 md:py-12 lg:py-20 xl:py-36 gap-4 md:gap-5 lg:gap-6">
					<h2
						className={`text-base md:text-lg lg:text-xl font-bold w-full text-balance text-center md:text-left`}
					>
						{concept.title}
					</h2>
					<p className="text-sm md:text-sm lg:text-base text-center md:text-justify">
						{concept.text}
					</p>
					<Link
						className={`${concept.buttonClasses} my-4 w-28 md:w-36 md:h-7 lg:w-48 lg:h-8 h-5 font-nunito font-bold text-xs md:text-base lg:text-lg rounded-md shadow-md hover:shadow-lg mx-auto`}
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
