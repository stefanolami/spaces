import React from 'react'
import type { Metadata } from 'next'
import ContactUsComponent from '@/components/contact-us/contact-us'

export const metadata: Metadata = {
	title: 'Contact Us | Time&Spaces',
	description:
		'Get in touch with Time&Spaces in Brussels. Send us your questions or project details and we will reply shortly.',
	alternates: { canonical: '/contact-us' },
	openGraph: {
		title: 'Contact Us | Time&Spaces',
		description:
			'Reach out to Time&Spaces with any questions or project details.',
		url: 'https://www.timeandspaces.org/contact-us',
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

const ContactUsPage = () => {
	return <ContactUsComponent />
}

export default ContactUsPage
