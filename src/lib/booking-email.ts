import type { BookingRequest } from '@/components/booking/booking.zod'
import { ROOM_TITLE_MAP } from '@/lib/room-map'
import { BUNDLE_MAP } from '@/lib/bundle-map'

export function subjectFor(req: BookingRequest): string {
	let primary: string | undefined
	if (req.bundleSlug && BUNDLE_MAP[req.bundleSlug]) {
		primary = BUNDLE_MAP[req.bundleSlug].title
	} else if (req.rooms && req.rooms.length > 0) {
		const first = req.rooms[0]
		primary = ROOM_TITLE_MAP[first] ?? first
	}
	const dateStr = req.dates
		.map((d) => d.toISOString().slice(0, 10))
		.join(', ')
	const prefix = 'Price & Availability Request'
	return `Time&Spaces ${prefix} · ${primary ?? '—'} · ${dateStr}`
}
export function bodyFor(req: BookingRequest): string {
	return [
		'Request: Price & Availability',
		`Rooms: ${req.rooms.join(', ')}`,
		req.bundleSlug ? `Bundle: ${req.bundleSlug}` : undefined,
		`Dates: ${req.dates.map((d) => d.toDateString()).join(', ')}`,
		req.startTime ? `Start: ${req.startTime}` : undefined,
		req.endTime ? `End: ${req.endTime}` : undefined,
		req.attendees ? `Attendees: ${req.attendees}` : undefined,
		req.services?.length
			? `Services: ${req.services
					.map((s) => `${s.id}${s.quantity ? ` x${s.quantity}` : ''}`)
					.join(', ')}`
			: undefined,
		req.notes ? `Notes: ${req.notes}` : undefined,
		`Contact: ${req.contact.name} (${req.contact.email})${
			req.contact.phone ? `, ${req.contact.phone}` : ''
		}${req.contact.organization ? `, ${req.contact.organization}` : ''}`,
		req.sourcePath ? `Source: ${req.sourcePath}` : undefined,
	]
		.filter(Boolean)
		.join('\n')
}
