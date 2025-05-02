import { z } from 'zod'

export const quote = z.object({
	request: z.string().min(1, { message: 'Required' }),
	dates: z
		.array(
			z.date().min(new Date(), { message: 'Dates must be in the future' })
		)
		.nonempty({
			message: 'Required',
		}),
	name: z.string().min(1, { message: 'Required' }),
	email: z.string().min(1, { message: 'Required' }),
	phone: z.string().optional(),
})

export type QuoteTypes = z.infer<typeof quote>
