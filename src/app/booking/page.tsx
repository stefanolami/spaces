import BookingComponent from '@/components/booking'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Booking | Time&Spaces',
	description:
		'Book your meeting rooms or event spaces at Time&Spaces in Brussels. Check availability and reserve now.',
	alternates: { canonical: '/booking' },
	openGraph: {
		title: 'Booking | Time&Spaces',
		description:
			'Reserve meeting rooms and event spaces at Time&Spaces in Brussels.',
		url: 'https://www.timeandspaces.org/booking',
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

const BookingPage = () => {
	return <BookingComponent />
}

export default BookingPage
