import HomeComponent from '@/components/home/home'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Time&Spaces | Your Place of Action',
	description:
		'Strategic meeting and event locations in Brussels with premium facilities, services, and access. Your VIEW. Your ACCESS. Your VOICE. Your PLACE OF ACTION.',
	alternates: { canonical: '/' },
	openGraph: {
		title: 'Time&Spaces | Your Place of Action',
		description:
			'Strategic meeting and event locations in Brussels with premium facilities, services, and access.',
		url: 'https://www.timeandspaces.org/',
		siteName: 'Time&Spaces',
		type: 'website',
		images: [
			{
				url: 'https://www.timeandspaces.org/web-app-manifest-512x512.png',
				width: 512,
				height: 512,
			},
		],
	},
}

export default function Home() {
	return <HomeComponent />
}
