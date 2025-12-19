import type { RoomId, ServiceSelection } from './booking-types'

export type BundleMapEntry = {
	title: string
	rooms: RoomId[]
	services: ServiceSelection[]
}

// Keyed by slug of concept title
export const BUNDLE_MAP: Record<string, BundleMapEntry> = {
	'multi-functional-board-meeting-approach': {
		title: 'Multi-functional Board Meeting Approach',
		rooms: ['board-and-conference-room', 'relaxation-break-out-room'],
		services: [{ id: 'catering' }, { id: 'av' }, { id: 'layout' }],
	},
	'mini-conferences-panel-discussions-keynote-speeches': {
		title: 'Mini-Conferences, Panel Discussions & Keynote Speeches',
		rooms: ['board-and-conference-room', 'catering-or-meeting-room-2'],
		services: [{ id: 'av' }, { id: 'layout' }],
	},
	'trainings-seminars-action-tanks': {
		title: 'Trainings, Seminars & Action Tanks',
		rooms: ['meeting-room-3', 'relaxation-break-out-room'],
		services: [{ id: 'catering' }, { id: 'recording' }],
	},
}

export function slugifyBundle(title: string): string {
	return title
		.toLowerCase()
		.replace(/&/g, 'and')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '')
}
