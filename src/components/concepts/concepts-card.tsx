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
					<Link href={concept.link}>
						<button
							className={`w-36 h-8 mx-auto mt-4 md:w-40 md:h-10 lg:w-48 bg-white text-black-spaces hover:scale-105 transition-scale-standard  flex items-center justify-center p-2 text-xs md:text-sm lg:text-base font-bold shadow-md hover:shadow-lg`}
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
