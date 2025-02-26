import { Nunito_Sans, Roboto_Serif } from 'next/font/google'

export const nunito = Nunito_Sans({
	subsets: ['latin'],
	weight: ['400', '600', '700', '800'],
	display: 'swap',
	variable: '--font-nunito',
	fallback: ['sans-serif'],
	style: ['normal', 'italic'],
})

export const robo = Roboto_Serif({
	weight: ['400', '700'],
	style: 'normal',
	subsets: ['latin'],
	variable: '--font-robo',
	fallback: ['serif'],
})
