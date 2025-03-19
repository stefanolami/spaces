import Header from '@/components/header/header'

export default function NotFound() {
	return (
		<>
			<Header />
			<main className="w-full h-screen flex items-center justify-center bg-black-spaces text-white">
				<h1 className="font-robo text-lg md:text-2xl xl:text-3xl">
					404 - Page Not Found
				</h1>
			</main>
		</>
	)
}
