import type { Metadata } from 'next'
import { nunito, robo } from '@/app/fonts'
import '@/app/globals.css'
import { RenderMounted } from '@/components/render-mounted'
import Header from '@/components/header/header'
import Footer from '@/components/footer'
import BookingSheetProvider from '@/components/booking/booking-sheet-provider'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
	title: 'Time&Spaces',
	description: '',
	openGraph: {
		title: 'Time&Spaces',
		description:
			'Your VIEW. Your ACCESS. Your VOICE. Your PLACE OF ACTION.',
		url: 'https://www.timeandspaces.org',
		siteName: 'Time&Spaces',
		images: [
			{
				url: 'https://www.timeandspaces.org/web-app-manifest-512x512.png', // Must be an absolute URL
				width: 512,
				height: 512,
			},
		],
		locale: 'en_US',
		type: 'website',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${robo.variable} ${nunito.variable} antialiased bg-white-spaces min-h-screen flex flex-col`}
			>
				<RenderMounted>
					<BookingSheetProvider>
						<Header />
						<main className="flex-1">{children}</main>
						<Footer />
					</BookingSheetProvider>
				</RenderMounted>
				<Analytics />
			</body>
		</html>
	)
}

/* Header is fixed: base total 92px (64+28), xl total 120px (80+40) */
