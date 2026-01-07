import { z } from 'zod'

export const serviceSelectionSchema = z.object({
	id: z.enum([
		'catering',
		'av',
		'streaming',
		'interpretation',
		'recording',
		'layout',
	]),
	quantity: z.coerce.number().int().positive().optional(),
	notes: z.string().optional(),
})

export const bookingRequestSchema = z.object({
	mode: z.enum(['booking', 'availability']),
	rooms: z
		.array(
			z.enum([
				'board-and-conference-room',
				'relaxation-break-out-room',
				'catering-or-meeting-room-2',
				'meeting-room-3',
			])
		)
		.nonempty({ message: 'Select at least one room' }),
	bundleSlug: z.string().optional(),
	dates: z
		.array(
			z.coerce
				.date()
				.min(new Date(), { message: 'Dates must be in the future' })
		)
		.nonempty({ message: 'Provide at least one date' }),
	startTime: z
		.string()
		.regex(/^\d{2}:\d{2}$/)
		.optional(),
	endTime: z
		.string()
		.regex(/^\d{2}:\d{2}$/)
		.optional(),
	attendees: z.coerce.number().int().positive().optional(),
	services: z.array(serviceSelectionSchema).optional(),
	notes: z.string().optional(),
	contact: z.object({
		name: z.string().min(1, { message: 'Required' }),
		email: z
			.string()
			.min(1, { message: 'Required' })
			.email({ message: 'Invalid email' }),
		phone: z.string().optional(),
		organization: z.string().optional(),
	}),
	sourcePath: z.string().optional(),
	utm: z.record(z.string()).optional(),
	honeypot: z.string().optional(),
})

export type BookingRequest = z.infer<typeof bookingRequestSchema>
