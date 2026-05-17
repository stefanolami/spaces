import Services from '@/components/services/services'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Services | Time&Spaces',
	description:
		'From event management to 360° office support: discover our range of services crafted to make your projects a success.',
	alternates: { canonical: '/services' },
	openGraph: {
		title: 'Services | Time&Spaces',
		description:
			'Event management and 360° office support services in Brussels.',
		url: 'https://www.timeandspaces.org/services',
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

const ServicesPage = () => {
	return <Services />
}

export default ServicesPage
