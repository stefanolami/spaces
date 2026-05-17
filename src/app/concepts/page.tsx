import Concepts from '@/components/concepts/concepts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Concepts | Time&Spaces',
	description:
		'Explore our strategic concepts for meetings and events: tailored spaces designed for impact, collaboration, and action in Brussels.',
	alternates: { canonical: '/concepts' },
	openGraph: {
		title: 'Concepts | Time&Spaces',
		description:
			'Tailored concepts for impactful meetings and events in Brussels.',
		url: 'https://www.timeandspaces.org/concepts',
		siteName: 'Time&Spaces',
		type: 'article',
		images: [
			{
				url: 'https://www.timeandspaces.org/web-app-manifest-512x512.png',
				width: 512,
				height: 512,
			},
		],
	},
}

const ConceptsPage = () => {
	return (
		<>
			<Concepts />
		</>
	)
}

export default ConceptsPage
