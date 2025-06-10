import type { Metadata } from 'next'
import { nunito, robo } from '@/app/fonts'
import './globals.css'
import { RenderMounted } from '@/components/render-mounted'
import Header from '@/components/header/header'
import Footer from '@/components/footer'

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
			<body className={`${robo.variable} ${nunito.variable} antialiased`}>
				<RenderMounted>
					<Header />
					<main className="">{children}</main>
					<Footer />
				</RenderMounted>
			</body>
		</html>
	)
}

/* pt-[84px] md:pt-[92px] xl:pt-[120px] */
