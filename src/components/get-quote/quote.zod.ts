import { z } from 'zod'

export const quote = z.object({
	request: z.string().min(1, { message: 'Required' }),
	dates: z.date().min(new Date(), { message: 'Dates must be in the future' }),
	name: z.string().min(1, { message: 'Required' }),
	email: z.string().min(1, { message: 'Required' }),
	phone: z.string().min(1, { message: 'Required' }),
})

export type QuoteTypes = z.infer<typeof quote>
