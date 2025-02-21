import { Nunito_Sans, Roboto_Serif } from 'next/font/google'

export const jose = Nunito_Sans({
	subsets: ['latin'],
	weight: ['400', '700'],
	display: 'swap',
	variable: '--font-nunito',
	fallback: ['sans-serif'],
})

export const robo = Roboto_Serif({
	weight: '700',
	style: 'normal',
	subsets: ['latin'],
	variable: '--font-robo',
	fallback: ['serif'],
})
