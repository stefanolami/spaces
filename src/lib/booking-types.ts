export type RoomId =
	| 'board-and-conference-room'
	| 'relaxation-break-out-room'
	| 'catering-or-meeting-room-2'
	| 'meeting-room-3'

export type ServiceId =
	| 'catering'
	| 'av'
	| 'streaming'
	| 'recording'
	| 'interpretation'
	| 'layout'

export type ServiceSelection = {
	id: ServiceId
	quantity?: number
	notes?: string
}

export type PrefillPayload = {
	rooms?: RoomId[]
	bundleSlug?: string
	services?: ServiceSelection[]
	date?: string // ISO date for single-day prefill
	startTime?: string // HH:mm
	endTime?: string // HH:mm
	attendees?: string
	sourcePath?: string
	utm?: Record<string, string>
}

export type BookingMode = 'booking' | 'availability'
