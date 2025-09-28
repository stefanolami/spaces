import GetQuoteComponent from '@/components/get-quote/get-quote-component'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Get a Quote | Time&Spaces',
	description:
		'Tell us about your event or workspace needs and receive a tailored quote from Time&Spaces in Brussels.',
	alternates: { canonical: '/get-quote' },
	openGraph: {
		title: 'Get a Quote | Time&Spaces',
		description:
			'Request a tailored quote for your event or workspace needs in Brussels.',
		url: 'https://www.timeandspaces.org/get-quote',
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

const GetQuotePage = () => {
	return <GetQuoteComponent />
}

export default GetQuotePage
