import FacilitiesComponent from '@/components/facilities/facilities'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Facilities | Time&Spaces',
	description:
		'Discover premium facilities for meetings and events: flexible rooms, modern equipment, and dedicated support in Brussels.',
	alternates: { canonical: '/facilities' },
	openGraph: {
		title: 'Facilities | Time&Spaces',
		description:
			'Premium facilities for your meetings and events in Brussels.',
		url: 'https://www.timeandspaces.org/facilities',
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

const FacilitiesPage = () => {
	return <FacilitiesComponent />
}

export default FacilitiesPage
