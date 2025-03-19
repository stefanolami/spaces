'use client' // Error boundaries must be Client Components

import Header from '@/components/header/header'
import { useEffect } from 'react'

export default function Error({
	error,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
		<>
			<Header />
			<main className="w-full h-screen flex items-center justify-center bg-black-spaces text-white">
				<h1 className="font-robo text-lg md:text-2xl xl:text-3xl">
					We&apos;re sorry, something went wrong.
				</h1>
			</main>
		</>
	)
}
