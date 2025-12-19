import type { BookingRequest } from '@/components/booking/booking.zod'
import { ROOM_TITLE_MAP } from '@/lib/room-map'
import { BUNDLE_MAP } from '@/lib/bundle-map'

function pad2(n: number) {
	return String(n).padStart(2, '0')
}

export function generateRefId(date = new Date()): string {
	const y = date.getFullYear()
	const m = pad2(date.getMonth() + 1)
	const d = pad2(date.getDate())
	const rand = Math.random().toString(36).slice(2, 7).toUpperCase()
	return `TS-${y}${m}${d}-${rand}`
}

export function subjectFor(req: BookingRequest, refId: string): string {
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
	const prefix =
		req.mode === 'booking' ? 'Booking Request' : 'Availability Inquiry'
	return `Time&Spaces ${prefix} · ${
		primary ?? '—'
	} · ${dateStr} · Ref ${refId}`
}

export function generateICS(req: BookingRequest, refId: string): string | null {
	if (req.mode !== 'booking') return null
	if (!req.dates?.length) return null
	const dtstamp =
		new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
	const uid = `${refId}@timeandspaces.org`
	const summary = subjectFor(req, refId)
	const lines: string[] = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//Time&Spaces//Booking//EN',
	]
	for (const d of req.dates) {
		const y = d.getFullYear()
		const m = String(d.getMonth() + 1).padStart(2, '0')
		const day = String(d.getDate()).padStart(2, '0')
		const start = req.startTime
			? `${y}${m}${day}T${req.startTime.replace(':', '')}00Z`
			: `${y}${m}${day}T090000Z`
		const end = req.endTime
			? `${y}${m}${day}T${req.endTime.replace(':', '')}00Z`
			: `${y}${m}${day}T170000Z`
		lines.push(
			'BEGIN:VEVENT',
			`UID:${uid}`,
			`DTSTAMP:${dtstamp}`,
			`DTSTART:${start}`,
			`DTEND:${end}`,
			`SUMMARY:${summary}`,
			'END:VEVENT'
		)
	}
	lines.push('END:VCALENDAR')
	return lines.join('\r\n')
}

export function bodyFor(req: BookingRequest, refId: string): string {
	const readable = [
		`Reference: ${refId}`,
		`Mode: ${req.mode}`,
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

	const structured = JSON.stringify(req, null, 2)
	return `${readable}\n\n---\nStructured:\n${structured}`
}
