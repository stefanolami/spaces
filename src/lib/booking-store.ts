import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
	PrefillPayload,
	BookingMode,
	ServiceSelection,
} from '@/lib/booking-types'
import type { RoomId } from '@/lib/booking-types'

type BookingDraft = {
	rooms?: RoomId[]
	services?: ServiceSelection[]
	dates?: string[] // ISO strings
	startTime?: string
	endTime?: string
	attendees?: string
	contact?: {
		name?: string
		email?: string
		phone?: string
		organization?: string
	}
	notes?: string
}

type BookingStore = {
	// UI state (not persisted)
	isOpen: boolean
	payload: PrefillPayload | null
	mode: BookingMode
	openBookingSheet: (payload?: PrefillPayload, mode?: BookingMode) => void
	closeBookingSheet: () => void
	setPayload: (payload: PrefillPayload | null) => void
	setMode: (mode: BookingMode) => void

	// Persisted draft
	draft: BookingDraft | null
	updateDraft: (partial: BookingDraft) => void
	clearDraft: () => void
}

export const useBookingStore = create<BookingStore>()(
	persist(
		(set) => ({
			isOpen: false,
			payload: null,
			mode: 'booking',
			openBookingSheet: (payload, mode) =>
				set((state) => ({
					isOpen: true,
					payload: payload ?? state.payload,
					mode: mode ?? state.mode,
				})),
			closeBookingSheet: () => set({ isOpen: false }),
			setPayload: (payload) => set({ payload }),
			setMode: (mode) => set({ mode }),

			draft: null,
			updateDraft: (partial) =>
				set((state) => ({
					draft: { ...(state.draft ?? {}), ...partial },
				})),
			clearDraft: () => set({ draft: null }),
		}),
		{
			name: 'ts_booking_store',
			// Persist only the draft
			partialize: (state) => ({ draft: state.draft }),
		},
	),
)
