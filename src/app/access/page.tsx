import Access from '@/components/access/access'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Access | Time&Spaces',
	description:
		'Find out how to reach our Brussels location easily by train, plane, or local transport. Maps, directions, and tips.',
	alternates: { canonical: '/access' },
	openGraph: {
		title: 'Access | Time&Spaces',
		description:
			'How to reach Time&Spaces in Brussels: maps, directions, and transport.',
		url: 'https://www.timeandspaces.org/access',
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

const AccessPage = () => {
	return <Access />
}

export default AccessPage
