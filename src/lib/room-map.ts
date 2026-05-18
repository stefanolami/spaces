import type { RoomId } from './booking-types'

export const ROOM_TITLE_MAP: Record<RoomId, string> = {
	'board-and-conference-room': 'Board and Conference Room',
	'relaxation-break-out-room': 'Relaxation Break-Out Room',
	'catering-or-meeting-room-2': 'Catering or Meeting Room 2',
	'meeting-room-3': 'Meeting Room 3',
}

export const ROOM_IDS: RoomId[] = (
	Object.keys(ROOM_TITLE_MAP) as RoomId[]
).filter((id) => id !== 'meeting-room-3')

export function roomTitleToId(title: string): RoomId | undefined {
	const entries = Object.entries(ROOM_TITLE_MAP) as [RoomId, string][]
	const found = entries.find(
		([, t]) => t.toLowerCase() === title.toLowerCase(),
	)
	return found?.[0]
}

export function roomIdToTitle(id: RoomId): string {
	return ROOM_TITLE_MAP[id]
}
