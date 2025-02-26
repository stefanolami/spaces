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
			<div className="w-[90%] mx-auto flex flex-col items-center justify-start h-full my-8 gap-8">
				<div className="bg-orange-spaces/50 w-full h-2/5"></div>
				<div className="flex flex-col justify-center w-full space-y-4">
					<h2 className="text-base font-semibold w-full text-balance">
						{concept.title}
					</h2>
					<p className="text-sm text-justify">{concept.text}</p>
					<Link href={concept.link}>
						<button
							className={`${
								concept.buttonClasses
							} w-28 h-5 font-nunito font-bold text-xs rounded-md shadow-md hover:shadow-lg ${
								position % 2 === 0 ? 'ml-auto' : 'mr-auto'
							}`}
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
