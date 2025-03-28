'use client'

import { useRef } from 'react'
import HeroConcepts from './hero-concepts'
import { useScroll } from 'framer-motion'
import ConceptsCard from './concepts-card'
import { CONCEPTS } from '@/lib/data'

const Concepts = () => {
	const ref = useRef(null)
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start start', 'end start'],
	})

	return (
		<>
			<HeroConcepts />
			<div
				ref={ref}
				className="relative "
			>
				{CONCEPTS.map((concept, index) => (
					<ConceptsCard
						key={index}
						concept={concept}
						scrollYProgress={scrollYProgress}
						position={index + 1}
					/>
				))}
			</div>
		</>
	)
}

export default Concepts
