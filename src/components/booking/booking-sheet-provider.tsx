'use client'

import { createContext, useContext, useMemo } from 'react'
import type { PrefillPayload, BookingMode } from '@/lib/booking-types'
import BookingSheet from '@/components/booking/booking-sheet'
import { Toaster } from '@/components/ui/sonner'
import { useBookingStore } from '@/lib/booking-store'

type BookingSheetContextType = {
	isOpen: boolean
	payload: PrefillPayload | null
	mode: BookingMode
	openBookingSheet: (payload?: PrefillPayload, mode?: BookingMode) => void
	closeBookingSheet: () => void
	setPayload: (payload: PrefillPayload | null) => void
	setMode: (mode: BookingMode) => void
}

const BookingSheetContext = createContext<BookingSheetContextType | null>(null)

export function useBookingSheet() {
	const ctx = useContext(BookingSheetContext)
	if (!ctx)
		throw new Error(
			'useBookingSheet must be used within BookingSheetProvider'
		)
	return ctx
}

export default function BookingSheetProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const {
		isOpen,
		payload,
		mode,
		openBookingSheet,
		closeBookingSheet,
		setPayload,
		setMode,
	} = useBookingStore()

	const value = useMemo(
		() => ({
			isOpen,
			payload,
			mode,
			openBookingSheet,
			closeBookingSheet,
			setPayload,
			setMode,
		}),
		[
			isOpen,
			payload,
			mode,
			openBookingSheet,
			closeBookingSheet,
			setPayload,
			setMode,
		]
	)

	return (
		<BookingSheetContext.Provider value={value}>
			{children}
			<BookingSheet
				open={isOpen}
				onOpenChange={(next: boolean) =>
					next ? openBookingSheet() : closeBookingSheet()
				}
				payload={payload}
				mode={mode}
			/>
			<Toaster
				richColors
				closeButton
				position="top-right"
			/>
		</BookingSheetContext.Provider>
	)
}
