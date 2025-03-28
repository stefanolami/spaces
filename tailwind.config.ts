import type { Config } from 'tailwindcss'

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@material-tailwind/**/*.{html,js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'brown-spaces': '#7F401F',
				'blue-spaces': '#0F2CCA',
				'black-spaces': '#2A2A2A',
				'beje-spaces': '#DAC2A8',
				'orange-spaces': '#FF5900',
			},
			fontFamily: {
				robo: ['var(--font-robo)'],
				nunito: ['var(--font-nunito)'],
			},
		},
	},
	plugins: [],
} satisfies Config
