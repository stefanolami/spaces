import { z } from 'zod'

export const contact = z.object({
	name: z.string().min(1, { message: 'Required' }),
	email: z
		.string()
		.min(1, { message: 'Required' })
		.email({ message: 'Invalid email' }),
	subject: z.string().min(1, { message: 'Required' }),
	message: z.string().min(1, { message: 'Required' }),
})

export type ContactTypes = z.infer<typeof contact>
