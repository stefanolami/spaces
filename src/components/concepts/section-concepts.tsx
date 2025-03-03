import { MotionValue, useTransform, motion } from 'framer-motion'
import Link from 'next/link'
import { CONCEPTS } from '@/lib/data'
import { ConceptSection } from '@/lib/types'

const SectionConcepts = ({
	position,
	concept,
	scrollYProgress,
}: {
	position: number
	concept: ConceptSection
	scrollYProgress: MotionValue<number>
}) => {
	const scaleFromPct = (position - 1) / CONCEPTS.length
	const cardHeight = window.innerHeight
	const y = useTransform(scrollYProgress, [scaleFromPct, 1], [0, -cardHeight])
	return (
		<motion.div
			style={{
				height: cardHeight,
				y: position === CONCEPTS.length ? undefined : y,
			}}
			className={` ${concept.containerClasses} sticky top-0 flex w-full origin-top font-nunito`}
		>
			<div className="w-[90%] sm:w-3/4 md:w-1/2 lg:w-3/4 mx-auto flex flex-col lg:flex-row items-center justify-start h-full my-8 gap-8 lg:gap-16">
				<div
					className={`bg-orange-spaces/50 w-full h-2/5 ${
						position % 2 === 0 ? 'lg:order-1' : ''
					}`}
				></div>
				<div className="flex flex-col justify-center w-full gap-4 md:gap-5 lg:gap-6">
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
		</motion.div>
	)
}

export default SectionConcepts
