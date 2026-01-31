import Pricing from '@/components/pricing/pricing'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Pricing | Time&Spaces',
	description:
		'Reference price list for meeting rooms and catering/meeting spaces at Time&Spaces in Brussels.',
	alternates: { canonical: '/pricing' },
	openGraph: {
		title: 'Pricing | Time&Spaces',
		description:
			'Reference price list for meeting rooms and catering/meeting spaces at Time&Spaces in Brussels.',
		url: 'https://www.timeandspaces.org/pricing',
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

const PricingPage = () => {
	return <Pricing />
}

export default PricingPage
