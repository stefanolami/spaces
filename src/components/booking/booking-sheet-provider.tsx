'use client'

import { createContext, useContext, useMemo } from 'react'
import type { PrefillPayload, BookingMode } from '@/lib/booking-types'
import BookingSheet from '@/components/booking/booking-sheet'
import { Toaster } from '@/components/ui/sonner'
import { useBookingStore } from '@/lib/booking-store'
import { ChevronLeft } from 'lucide-react'

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
			{/* Expand handle at bottom-right when collapsed */}
			{!isOpen && (
				<button
					aria-label="Expand booking panel"
					title="Expand"
					onClick={() => openBookingSheet()}
					className="fixed bottom-3 md:bottom-6 right-0 z-40 bg-midnight-spaces text-white-spaces border-2 border-midnight-spaces hover:border-coral-spaces border-r-0 rounded-tl-full rounded-bl-full shadow-xl p-2 md:p-3 hover:bg-midnight-spaces/90 focus:outline-none focus:ring-0"
				>
					<ChevronLeft className="h-6 w-6" />
				</button>
			)}
			<Toaster position="top-right" />
		</BookingSheetContext.Provider>
	)
}
