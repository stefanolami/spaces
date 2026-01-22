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
			]),
		)
		.nonempty({ message: 'Select at least one room' }),
	bundleSlug: z.string().optional(),
	dates: z
		.array(
			z.coerce
				.date()
				.min(new Date(), { message: 'Dates must be in the future' }),
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
	attendees: z
		.preprocess(
			(value) => {
				if (value === '' || value === null || value === undefined)
					return ''
				if (typeof value === 'number') return String(value)
				if (typeof value === 'string') return value.trim()
				return value
			},
			z
				.string()
				.min(1, { message: 'Required' })
				.regex(/^\d+(\s*-\s*\d+)?$/, {
					message: 'Use a number or a range like 10-15',
				}),
		)
		.refine(
			(value) => {
				if (!value.includes('-')) return true
				const [aRaw, bRaw] = value.split('-')
				const a = Number.parseInt(aRaw.trim(), 10)
				const b = Number.parseInt(bRaw.trim(), 10)
				return (
					Number.isFinite(a) &&
					Number.isFinite(b) &&
					a > 0 &&
					b > 0 &&
					a <= b
				)
			},
			{ message: 'Range must be ascending (e.g. 10-15)' },
		),
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
