'use client'

import { useRef } from 'react'
import HeroConcepts from './hero-concepts'
import { useScroll } from 'framer-motion'
import SectionConcepts from './section-concepts'
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
					<SectionConcepts
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
