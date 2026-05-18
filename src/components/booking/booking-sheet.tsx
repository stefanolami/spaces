'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { PrefillPayload, BookingMode } from '@/lib/booking-types'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetClose,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Calendar } from '@/components/ui/calendar'
import type { DateRange } from 'react-day-picker'
import { useForm, useWatch } from 'react-hook-form'
import type { Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	bookingRequestSchema,
	type BookingRequest,
} from '@/components/booking/booking.zod'
import { ROOM_IDS, roomIdToTitle } from '@/lib/room-map'
import { SERVICE_IDS, serviceIdToTitle } from '@/lib/service-map'
import { toast } from 'sonner'
import { sendAvailabilityRequest } from '@/actions/email'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useBookingStore } from '@/lib/booking-store'
import type { RoomId, ServiceSelection } from '@/lib/booking-types'
import {
	ChevronRight,
	Building2,
	CalendarDays,
	Cog,
	UserRound,
	NotebookPen,
	Users,
} from 'lucide-react'
import { Clock } from 'lucide-react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

export default function BookingSheet({
	open,
	onOpenChange,
	payload,
	mode,
}: {
	open: boolean
	onOpenChange: (open: boolean) => void
	payload: PrefillPayload | null
	mode: BookingMode
}) {
	function getFocusableWithin(container: HTMLElement): HTMLElement[] {
		const candidates = Array.from(
			container.querySelectorAll<HTMLElement>(
				'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
			),
		)
		return candidates.filter((el) => {
			// Ignore elements that are not actually visible/interactive.
			if (el.hasAttribute('disabled')) return false
			if (el.getAttribute('aria-hidden') === 'true') return false
			const rects = el.getClientRects()
			return rects.length > 0
		})
	}

	function focusFirstControlWithin(container: HTMLElement) {
		const control = container.querySelector(
			'input:not([type="hidden"]), textarea, select',
		) as (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) | null
		if (!control) return
		// Defer to ensure this wins over any focus-trap / blur re-render timing.
		requestAnimationFrame(() => {
			try {
				control.focus({ preventScroll: true })
			} catch {
				control.focus()
			}
		})
	}

	const title = 'Request Price & Availability'

	// Calendar selection mode (single | multiple | range)
	const [calendarMode, setCalendarMode] = useState<
		'single' | 'multiple' | 'range'
	>('single')

	const tomorrow = useMemo(() => {
		const d = new Date()
		d.setHours(0, 0, 0, 0)
		d.setDate(d.getDate() + 1)
		return d
	}, [])

	const isOnOrAfterTomorrow = useCallback(
		(date: Date) => {
			const d = new Date(date)
			d.setHours(0, 0, 0, 0)
			return d.getTime() >= tomorrow.getTime()
		},
		[tomorrow],
	)

	// Local range state to drive visual feedback in range mode
	const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

	function expandRangeToDates(from: Date, to: Date): Date[] {
		const result: Date[] = []
		const start = new Date(from)
		start.setHours(0, 0, 0, 0)
		const end = new Date(to)
		end.setHours(0, 0, 0, 0)
		for (
			let d = new Date(start.getTime());
			d.getTime() <= end.getTime();
			d.setDate(d.getDate() + 1)
		) {
			result.push(new Date(d))
		}
		return result
	}

	const form = useForm<BookingRequest>({
		resolver: zodResolver(
			bookingRequestSchema,
		) as unknown as Resolver<BookingRequest>,
		defaultValues: {
			mode,
			bundleSlug: payload?.bundleSlug,
			dates: [],
			startTime: payload?.startTime,
			endTime: payload?.endTime,
			attendees: payload?.attendees,
			services: payload?.services ?? [],
			notes: '',
			contact: { name: '', email: '', phone: '', organization: '' },
			sourcePath: payload?.sourcePath,
			utm: payload?.utm,
			honeypot: '',
		},
	})

	/* const TIME_PRESETS = useMemo(
		() =>
			[
				{
					id: 'full',
					label: 'Full day',
					start: '08:00',
					end: '22:00',
					short: '08–22',
				},
				{
					id: 'morning',
					label: 'Morning',
					start: '08:00',
					end: '12:00',
					short: '08–12',
				},
				{
					id: 'afternoon',
					label: 'Afternoon',
					start: '14:00',
					end: '18:00',
					short: '14–18',
				},
				{
					id: 'evening',
					label: 'Evening',
					start: '18:00',
					end: '22:00',
					short: '18–22',
				},
			] as const,
		[],
	)

	type TimePresetId = (typeof TIME_PRESETS)[number]['id']
	const [selectedTimePresets, setSelectedTimePresets] = useState<
		TimePresetId[]
	>([])

	function hhmmToMinutes(value: string): number {
		const [hh, mm] = value.split(':')
		return Number.parseInt(hh, 10) * 60 + Number.parseInt(mm, 10)
	}
	function minutesToHHMM(value: number): string {
		const hh = String(Math.floor(value / 60)).padStart(2, '0')
		const mm = String(value % 60).padStart(2, '0')
		return `${hh}:${mm}`
	}
	function applyPresetSelection(nextSelected: TimePresetId[]) {
		setSelectedTimePresets(nextSelected)
		if (nextSelected.length === 0) return
		let minStart = Number.POSITIVE_INFINITY
		let maxEnd = Number.NEGATIVE_INFINITY
		for (const id of nextSelected) {
			const preset = TIME_PRESETS.find((p) => p.id === id)
			if (!preset) continue
			minStart = Math.min(minStart, hhmmToMinutes(preset.start))
			maxEnd = Math.max(maxEnd, hhmmToMinutes(preset.end))
		}
		if (!Number.isFinite(minStart) || !Number.isFinite(maxEnd)) return
		form.setValue('startTime', minutesToHHMM(minStart))
		form.setValue('endTime', minutesToHHMM(maxEnd))
	} */

	function normalizeRooms(
		nextRooms: RoomId[] | undefined,
	): [RoomId, ...RoomId[]] | undefined {
		if (!nextRooms || nextRooms.length === 0) return undefined
		const next = new Set<RoomId>()
		let hadRelaxation = false
		for (const r of nextRooms) {
			if (r === 'relaxation-break-out-room') {
				hadRelaxation = true
				continue
			}
			next.add(r)
		}
		if (hadRelaxation) next.add('board-and-conference-room')
		const arr = Array.from(next)
		return arr.length > 0 ? (arr as [RoomId, ...RoomId[]]) : undefined
	}

	function normalizeServices(
		nextServices: ServiceSelection[] | undefined,
	): [ServiceSelection, ...ServiceSelection[]] | undefined {
		if (!nextServices || nextServices.length === 0) return undefined
		const allowed = new Set(SERVICE_IDS)
		const deduped = new Map<string, ServiceSelection>()
		for (const svc of nextServices) {
			if (!svc) continue
			if (!allowed.has(svc.id)) continue
			if (!deduped.has(svc.id)) deduped.set(svc.id, svc)
		}
		const arr = Array.from(deduped.values())
		return arr.length > 0
			? (arr as [ServiceSelection, ...ServiceSelection[]])
			: undefined
	}

	useEffect(() => {
		form.setValue('mode', mode)
		if (payload?.rooms && payload.rooms.length > 0) {
			const normalized = normalizeRooms(payload.rooms)
			if (normalized) form.setValue('rooms', normalized)
		}
		if (payload?.services && payload.services.length > 0) {
			const normalized = normalizeServices(payload.services)
			if (normalized) form.setValue('services', normalized)
		}
		if (payload?.attendees !== undefined && payload?.attendees !== null)
			form.setValue('attendees', String(payload.attendees))
		if (payload?.date) {
			const d = new Date(payload.date)
			if (!Number.isNaN(d.getTime()) && isOnOrAfterTomorrow(d)) {
				form.setValue('dates', [d])
			}
		}
		if (payload?.startTime) form.setValue('startTime', payload.startTime)
		if (payload?.endTime) form.setValue('endTime', payload.endTime)
	}, [payload, mode, form, tomorrow, isOnOrAfterTomorrow])

	const [submitting, setSubmitting] = useState(false)

	const { draft, updateDraft, clearDraft } = useBookingStore()
	const hydratedRef = useRef(false)
	const draftPersistTimerRef = useRef<number | null>(null)

	// Hydrate form from persisted draft when opening without a payload
	useEffect(() => {
		if (open && !payload && draft && !hydratedRef.current) {
			if (draft.rooms && draft.rooms.length > 0) {
				const normalized = normalizeRooms(draft.rooms as RoomId[])
				if (normalized) form.setValue('rooms', normalized)
			}
			if (draft.services && draft.services.length > 0) {
				const normalized = normalizeServices(
					draft.services as ServiceSelection[],
				)
				if (normalized) form.setValue('services', normalized)
			}
			if (draft.attendees !== undefined && draft.attendees !== null)
				form.setValue('attendees', String(draft.attendees))
			if (draft.dates && draft.dates.length > 0)
				form.setValue(
					'dates',
					draft.dates
						.map((iso) => new Date(iso))
						.filter(
							(d) =>
								!Number.isNaN(d.getTime()) &&
								isOnOrAfterTomorrow(d),
						) as [Date, ...Date[]],
				)
			if (draft.startTime) form.setValue('startTime', draft.startTime)
			if (draft.endTime) form.setValue('endTime', draft.endTime)
			if (draft.notes) form.setValue('notes', draft.notes)
			if (draft.contact) {
				if (draft.contact.name)
					form.setValue('contact.name', draft.contact.name)
				if (draft.contact.email)
					form.setValue('contact.email', draft.contact.email)
				if (draft.contact.phone)
					form.setValue('contact.phone', draft.contact.phone)
				if (draft.contact.organization)
					form.setValue(
						'contact.organization',
						draft.contact.organization,
					)
			}
			hydratedRef.current = true
		}
		if (!open) hydratedRef.current = false
	}, [open, payload, draft, form, tomorrow, isOnOrAfterTomorrow])

	/* useEffect(() => {
		if (!open) setSelectedTimePresets([])
	}, [open]) */

	// Persist draft on form changes
	const watched = useWatch({
		control: form.control,
	}) as Partial<BookingRequest>
	useEffect(() => {
		// Only persist while the sheet is open; also debounce to avoid typing lag.
		if (!open) return
		if (!watched) return

		if (draftPersistTimerRef.current) {
			window.clearTimeout(draftPersistTimerRef.current)
		}

		draftPersistTimerRef.current = window.setTimeout(() => {
			updateDraft({
				rooms: (watched.rooms ?? []).filter(Boolean) as RoomId[],
				services: (watched.services ?? []).filter(
					Boolean,
				) as ServiceSelection[],
				dates: (watched.dates ?? [])
					.filter(Boolean)
					.map((d) => (d as Date).toISOString()),
				startTime: watched.startTime,
				endTime: watched.endTime,
				attendees: watched.attendees,
				notes: watched.notes,
				contact: {
					name: watched.contact?.name,
					email: watched.contact?.email,
					phone: watched.contact?.phone,
					organization: watched.contact?.organization,
				},
			})
		}, 200)

		return () => {
			if (draftPersistTimerRef.current) {
				window.clearTimeout(draftPersistTimerRef.current)
			}
		}
	}, [watched, open, updateDraft])

	async function submit() {
		// Validate before submitting to avoid 400 from API
		const isValid = await form.trigger()
		if (!isValid) {
			toast.error('Please check the form', {
				description:
					'Fix the highlighted fields, then try sending again.',
			})
			return
		}
		const values = form.getValues()
		const data: BookingRequest = { ...values, mode: 'availability' }
		setSubmitting(true)
		const res = await sendAvailabilityRequest(data)
		if (res.success) {
			toast.success('Request sent', {
				description: "Thanks — we'll contact you shortly.",
				duration: 6000,
			})
			onOpenChange(false)
			form.reset()
			clearDraft()
		} else {
			toast.error('Could not send request', {
				description: res.error ?? 'Please try again in a moment.',
				duration: 7000,
			})
		}
		setSubmitting(false)
	}

	return (
		<Sheet
			open={open}
			onOpenChange={onOpenChange}
		>
			<SheetContent
				tabIndex={-1}
				onKeyDownCapture={(e) => {
					if (e.key !== 'Tab') return
					if (e.altKey || e.ctrlKey || e.metaKey) return
					const container = e.currentTarget as HTMLElement
					const focusables = getFocusableWithin(container)
					if (focusables.length === 0) return

					const active = document.activeElement as HTMLElement | null
					const activeIndex = active ? focusables.indexOf(active) : -1
					const nextIndex = e.shiftKey
						? activeIndex <= 0
							? focusables.length - 1
							: activeIndex - 1
						: activeIndex === -1 ||
							  activeIndex === focusables.length - 1
							? 0
							: activeIndex + 1

					e.preventDefault()
					try {
						focusables[nextIndex]?.focus({ preventScroll: true })
					} catch {
						focusables[nextIndex]?.focus()
					}
				}}
				className="bg-white-spaces text-black-spaces border-l border-midnight-spaces shadow-2xl p-0 md:p-0"
			>
				<div className="flex flex-col h-full relative">
					{/* Brand accent strip */}
					{/* {
						<div
							className="absolute left-0 top-0 bottom-0 w-1 bg-midnight-spaces/80"
							aria-hidden="true"
						/>
					} */}
					<SheetHeader className="sticky top-0 z-10 px-4 md:px-6 py-3 md:py-4 border-b border-coral-spaces bg-gradient-to-b from-eucalyptus-spaces/70 to-white-spaces">
						<div className="flex items-center gap-2">
							<SheetClose asChild>
								<button
									aria-label="Collapse panel"
									title="Collapse"
									className="p-2 -ml-1 rounded-md text-black-spaces hover:bg-eucalyptus-spaces/70 focus:outline-none focus:ring-0"
								>
									<ChevronRight className="h-7 w-7" />
								</button>
							</SheetClose>
							<SheetTitle className="text-lg md:text-xl font-bold text-midnight-spaces">
								{title}
							</SheetTitle>
						</div>
						<SheetDescription className="text-sm md:text-base text-black-spaces/70">
							Request price and availability. Our team will reply
							shortly.
						</SheetDescription>
					</SheetHeader>

					<ScrollArea className="flex-1 px-4 bg-white-spaces">
						<Form {...form}>
							<form className="grid gap-6 my-3">
								<p className="text-[11px] leading-tight text-black-spaces/60">
									Fields marked with{' '}
									<span className="text-coral-spaces font-semibold">
										*
									</span>{' '}
									are required.
								</p>
								<section>
									<div className="text-sm font-bold mb-2 text-midnight-spaces flex items-center gap-2">
										<Building2 className="h-4 w-4" />
										<span>
											Rooms{' '}
											<span className="text-coral-spaces">
												*
											</span>
										</span>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
										{ROOM_IDS.filter(
											(id) =>
												id !==
												'relaxation-break-out-room',
										).map((id) => (
											<FormField
												key={id}
												control={form.control}
												name="rooms"
												render={({ field }) => {
													const checked =
														field.value?.includes(
															id,
														)
													return (
														<FormItem className="mt-0">
															<label
																htmlFor={`room-${id}`}
																className="flex items-center gap-2 border border-coral-spaces rounded-md p-2 min-h-[56px] md:min-h-[52px] hover:bg-eucalyptus-spaces/20 transition-colors cursor-pointer w-full"
															>
																<FormControl>
																	<Checkbox
																		id={`room-${id}`}
																		checked={
																			!!checked
																		}
																		className="border-midnight-spaces data-[state=checked]:bg-midnight-spaces data-[state=checked]:text-white-spaces data-[state=checked]:border-midnight-spaces"
																		onCheckedChange={(
																			c,
																		) => {
																			const next =
																				new Set(
																					field.value ??
																						[],
																				)
																			if (
																				c
																			)
																				next.add(
																					id,
																				)
																			else
																				next.delete(
																					id,
																				)
																			field.onChange(
																				Array.from(
																					next,
																				),
																			)
																		}}
																	/>
																</FormControl>
																<div className="w-full flex flex-col justify-center">
																	<div className="font-normal text-black-spaces text-[11px] md:text-xs">
																		{id ===
																		'board-and-conference-room'
																			? 'Large Board or Conference Room'
																			: roomIdToTitle(
																					id,
																				)}
																	</div>
																	{id ===
																	'board-and-conference-room' ? (
																		<div className="text-[11px] leading-tight text-black-spaces/60">
																			includes
																			relaxation
																			break-out
																			room
																		</div>
																	) : null}
																</div>
															</label>
															<FormMessage />
														</FormItem>
													)
												}}
											/>
										))}
									</div>
								</section>

								<Separator className="bg-coral-spaces" />

								<section>
									<div className="text-sm font-bold mb-2 text-midnight-spaces flex items-center gap-2">
										<CalendarDays className="h-4 w-4" />
										<span>
											Dates{' '}
											<span className="text-coral-spaces">
												*
											</span>
										</span>
									</div>
									<FormField
										control={form.control}
										name="dates"
										render={({ field }) => (
											<FormItem>
												{/* Calendar mode toggles */}
												<div className="flex items-center gap-2 mb-2">
													<Button
														type="button"
														size="sm"
														variant={
															calendarMode ===
															'single'
																? 'default'
																: 'outline'
														}
														className={
															calendarMode ===
															'single'
																? 'bg-midnight-spaces text- text-white-spaces hover:bg-midnight-spaces/90'
																: ''
														}
														onClick={() =>
															setCalendarMode(
																'single',
															)
														}
													>
														Single
													</Button>
													<Button
														type="button"
														size="sm"
														variant={
															calendarMode ===
															'multiple'
																? 'default'
																: 'outline'
														}
														className={
															calendarMode ===
															'multiple'
																? 'bg-midnight-spaces text-white-spaces hover:bg-midnight-spaces/90'
																: ''
														}
														onClick={() =>
															setCalendarMode(
																'multiple',
															)
														}
													>
														Multiple
													</Button>
													<Button
														type="button"
														size="sm"
														variant={
															calendarMode ===
															'range'
																? 'default'
																: 'outline'
														}
														className={
															calendarMode ===
															'range'
																? 'bg-midnight-spaces text-white-spaces hover:bg-midnight-spaces/90'
																: ''
														}
														onClick={() =>
															setCalendarMode(
																'range',
															)
														}
													>
														Range
													</Button>
												</div>
												<FormControl>
													{calendarMode ===
													'single' ? (
														<Calendar
															mode="single"
															selected={
																(field.value &&
																	field
																		.value[0]) ||
																undefined
															}
															onSelect={(date) =>
																field.onChange(
																	date
																		? [date]
																		: [],
																)
															}
															fromDate={tomorrow}
															disabled={{
																before: tomorrow,
															}}
															buttonVariant="outline"
															classNames={{
																weekdays:
																	'flex text-black-spaces/60',
																weekday:
																	'text-black-spaces/60 flex-1 select-none rounded-md text-[0.8rem] font-normal',
																caption_label:
																	'text-midnight-spaces',
																today: '[&>button]:border [&>button]:border-midnight-spaces [&>button]:rounded-md',
																day: '[&>button[data-selected-single=true]]:bg-midnight-spaces [&>button[data-selected-single=true]]:text-white-spaces',
																range_start:
																	'bg-midnight-spaces text-white-spaces rounded-l-md',
																range_end:
																	'bg-midnight-spaces text-white-spaces rounded-r-md',
																range_middle:
																	'bg-midnight-spaces text-white-spaces',
																nav: 'absolute inset-x-0 top-2 flex w-full items-center justify-between',
																button_previous:
																	'bg-eucalyptus-spaces/20 hover:bg-eucalyptus-spaces/40 transition-colors duration-300 p-1 rounded-sm',
																button_next:
																	'bg-eucalyptus-spaces/20 hover:bg-eucalyptus-spaces/40 transition-colors duration-300 p-1 rounded-sm',
															}}
														/>
													) : calendarMode ===
													  'multiple' ? (
														<Calendar
															mode="multiple"
															selected={
																field.value
															}
															onSelect={(dates) =>
																field.onChange(
																	dates ?? [],
																)
															}
															fromDate={tomorrow}
															disabled={{
																before: tomorrow,
															}}
															buttonVariant="outline"
															classNames={{
																weekdays:
																	'flex text-black-spaces/60',
																weekday:
																	'text-black-spaces/60 flex-1 select-none rounded-md text-[0.8rem] font-normal',
																caption_label:
																	'text-midnight-spaces',
																today: '[&>button]:border [&>button]:border-midnight-spaces [&>button]:rounded-md',
																day: '[&>button[data-selected-single=true]]:bg-midnight-spaces [&>button[data-selected-single=true]]:text-white-spaces',
																range_start:
																	'bg-midnight-spaces text-white-spaces rounded-l-md',
																range_end:
																	'bg-midnight-spaces text-white-spaces rounded-r-md',
																range_middle:
																	'bg-midnight-spaces/70 text-white-spaces',
																nav: 'absolute inset-x-0 top-2 flex w-full items-center justify-between',
																button_previous:
																	'bg-eucalyptus-spaces/20 hover:bg-eucalyptus-spaces/40 transition-colors duration-300 p-1 rounded-sm',
																button_next:
																	'bg-eucalyptus-spaces/20 hover:bg-eucalyptus-spaces/40 transition-colors duration-300 p-1 rounded-sm',
															}}
														/>
													) : (
														<Calendar
															mode="range"
															required={false}
															selected={dateRange}
															onSelect={(
																range,
															) => {
																setDateRange(
																	range ??
																		undefined,
																)
																if (
																	range?.from &&
																	range?.to
																)
																	field.onChange(
																		expandRangeToDates(
																			range.from,
																			range.to,
																		),
																	)
																else if (
																	range?.from
																)
																	field.onChange(
																		[
																			range.from,
																		],
																	)
																else
																	field.onChange(
																		[],
																	)
															}}
															fromDate={tomorrow}
															disabled={{
																before: tomorrow,
															}}
															buttonVariant="outline"
															classNames={{
																weekdays:
																	'flex text-black-spaces/60',
																weekday:
																	'text-black-spaces/60 flex-1 select-none rounded-md text-[0.8rem] font-normal',
																caption_label:
																	'text-midnight-spaces',
																today: '[&>button]:border [&>button]:border-midnight-spaces [&>button]:rounded-md',
																day: '[&>button[data-selected-single=true]]:bg-midnight-spaces [&>button[data-selected-single=true]]:text-white-spaces',
																range_start:
																	'bg-midnight-spaces text-white-spaces rounded-l-md',
																range_end:
																	'bg-midnight-spaces text-white-spaces rounded-r-md',
																range_middle:
																	'bg-midnight-spaces/70 text-white-spaces',
																nav: 'absolute inset-x-0 top-2 flex w-full items-center justify-between',
																button_previous:
																	'bg-eucalyptus-spaces/20 hover:bg-eucalyptus-spaces/40 transition-colors duration-300 p-1 rounded-sm',
																button_next:
																	'bg-eucalyptus-spaces/20 hover:bg-eucalyptus-spaces/40 transition-colors duration-300 p-1 rounded-sm',
															}}
														/>
													)}
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									{/* Time presets (multi-select) */}
									{/* <div className="flex flex-wrap items-center gap-2 mt-3">
										{TIME_PRESETS.map((preset) => {
											const selected =
												selectedTimePresets.includes(
													preset.id,
												)
											return (
												<Button
													key={preset.id}
													type="button"
													size="sm"
													variant={
														selected
															? 'default'
															: 'outline'
													}
													className={
														selected
															? 'bg-midnight-spaces text-white-spaces hover:bg-midnight-spaces/90'
															: ''
													}
													aria-pressed={selected}
													onClick={() => {
														const next = selected
															? selectedTimePresets.filter(
																	(id) =>
																		id !==
																		preset.id,
																)
															: [
																	...selectedTimePresets,
																	preset.id,
																]
														applyPresetSelection(
															next,
														)
													}}
												>
													{preset.label}{' '}
													<span className="hidden sm:inline">
														{preset.short}
													</span>
												</Button>
											)
										})}
									</div> */}
									<div className="grid grid-cols-2 gap-2 mt-2">
										<FormField
											control={form.control}
											name="startTime"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-sm font-bold text-midnight-spaces flex items-center gap-2 mb-2">
														<Clock className="h-4 w-4" />
														<span>Start time</span>
													</FormLabel>
													<FormControl>
														{(() => {
															const {
																onChange,
																value,
															} = field
															const match =
																value?.match(
																	/^(\d{2}):(\d{2})$/,
																)
															const hour = match
																? match[1]
																: undefined
															const minute = match
																? match[2]
																: undefined

															const hours =
																Array.from(
																	{
																		length: 15,
																	},
																	(_, i) =>
																		String(
																			i +
																				8,
																		).padStart(
																			2,
																			'0',
																		),
																)
															const minutes = [
																'00',
																'30',
															]

															return (
																<div className="flex gap-2">
																	<Select
																		value={
																			hour
																		}
																		onValueChange={(
																			hh,
																		) => {
																			const mm =
																				minute ??
																				'00'
																			onChange(
																				`${hh}:${mm}`,
																			)
																		}}
																	>
																		<SelectTrigger className="bg-white-spaces border-midnight-spaces text-black-spaces focus-visible:ring-midnight-spaces">
																			<SelectValue placeholder="HH" />
																		</SelectTrigger>
																		<SelectContent>
																			{hours.map(
																				(
																					h,
																				) => (
																					<SelectItem
																						key={
																							h
																						}
																						value={
																							h
																						}
																					>
																						{
																							h
																						}
																					</SelectItem>
																				),
																			)}
																		</SelectContent>
																	</Select>
																	<Select
																		value={
																			minute
																		}
																		onValueChange={(
																			mm,
																		) => {
																			if (
																				!hour
																			)
																				return
																			onChange(
																				`${hour}:${mm}`,
																			)
																		}}
																		disabled={
																			!hour
																		}
																	>
																		<SelectTrigger className="bg-white-spaces border-midnight-spaces text-black-spaces focus-visible:ring-midnight-spaces">
																			<SelectValue placeholder="MM" />
																		</SelectTrigger>
																		<SelectContent>
																			{minutes.map(
																				(
																					m,
																				) => (
																					<SelectItem
																						key={
																							m
																						}
																						value={
																							m
																						}
																					>
																						{
																							m
																						}
																					</SelectItem>
																				),
																			)}
																		</SelectContent>
																	</Select>
																</div>
															)
														})()}
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="endTime"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-sm font-bold text-midnight-spaces flex items-center gap-2 mb-2">
														<Clock className="h-4 w-4" />
														<span>End time</span>
													</FormLabel>
													<FormControl>
														{(() => {
															const {
																onChange,
																value,
															} = field
															const match =
																value?.match(
																	/^(\d{2}):(\d{2})$/,
																)
															const hour = match
																? match[1]
																: undefined
															const minute = match
																? match[2]
																: undefined

															const hours =
																Array.from(
																	{
																		length: 15,
																	},
																	(_, i) =>
																		String(
																			i +
																				8,
																		).padStart(
																			2,
																			'0',
																		),
																)
															const minutes = [
																'00',
																'30',
															]

															return (
																<div className="flex gap-2">
																	<Select
																		value={
																			hour
																		}
																		onValueChange={(
																			hh,
																		) => {
																			const mm =
																				minute ??
																				'00'
																			onChange(
																				`${hh}:${mm}`,
																			)
																		}}
																	>
																		<SelectTrigger className="bg-white-spaces border-midnight-spaces text-black-spaces focus-visible:ring-midnight-spaces">
																			<SelectValue placeholder="HH" />
																		</SelectTrigger>
																		<SelectContent>
																			{hours.map(
																				(
																					h,
																				) => (
																					<SelectItem
																						key={
																							h
																						}
																						value={
																							h
																						}
																					>
																						{
																							h
																						}
																					</SelectItem>
																				),
																			)}
																		</SelectContent>
																	</Select>
																	<Select
																		value={
																			minute
																		}
																		onValueChange={(
																			mm,
																		) => {
																			if (
																				!hour
																			)
																				return
																			onChange(
																				`${hour}:${mm}`,
																			)
																		}}
																		disabled={
																			!hour
																		}
																	>
																		<SelectTrigger className="bg-white-spaces border-midnight-spaces text-black-spaces focus-visible:ring-midnight-spaces">
																			<SelectValue placeholder="MM" />
																		</SelectTrigger>
																		<SelectContent>
																			{minutes.map(
																				(
																					m,
																				) => (
																					<SelectItem
																						key={
																							m
																						}
																						value={
																							m
																						}
																					>
																						{
																							m
																						}
																					</SelectItem>
																				),
																			)}
																		</SelectContent>
																	</Select>
																</div>
															)
														})()}
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<p className="mt-2 text-[11px] leading-tight text-black-spaces/60">
										If you select multiple days and the
										times differ per day, please specify the
										details in the Notes section below.
									</p>
								</section>

								<Separator className="bg-coral-spaces" />

								<section>
									<div className="text-sm font-bold mb-2 text-midnight-spaces flex items-center gap-2">
										<Cog className="h-4 w-4" />
										<span>Services</span>
									</div>
									<div className="grid grid-cols-2 gap-2">
										{SERVICE_IDS.map((svc) => (
											<FormField
												key={svc}
												control={form.control}
												name="services"
												render={({ field }) => {
													const list =
														field.value ?? []
													const idx = list.findIndex(
														(s: ServiceSelection) =>
															s.id === svc,
													)
													const checked = idx >= 0
													return (
														<FormItem className="mt-0">
															<label
																htmlFor={`svc-${svc}`}
																className="flex items-center gap-2 border border-coral-spaces rounded-lg shadow-sm hover:bg-eucalyptus-spaces/20 transition-colors cursor-pointer p-2 w-full"
															>
																<FormControl>
																	<Checkbox
																		id={`svc-${svc}`}
																		checked={
																			!!checked
																		}
																		className="border-midnight-spaces data-[state=checked]:bg-midnight-spaces data-[state=checked]:text-white-spaces data-[state=checked]:border-midnight-spaces m-0"
																		onCheckedChange={(
																			c,
																		) => {
																			const next =
																				[
																					...list,
																				]
																			if (
																				c
																			)
																				next.push(
																					{
																						id: svc,
																					},
																				)
																			else
																				next.splice(
																					idx,
																					1,
																				)
																			field.onChange(
																				next,
																			)
																		}}
																	/>
																</FormControl>
																<span className="font-normal w-full h-full text-black-spaces flex items-center text-xs md:text-xs">
																	{serviceIdToTitle(
																		svc,
																	)}
																</span>
															</label>
															<FormMessage />
														</FormItem>
													)
												}}
											/>
										))}
									</div>
								</section>

								<Separator className="bg-coral-spaces" />

								<section>
									<div className="grid grid-cols-1 gap-2">
										<FormField
											control={form.control}
											name="attendees"
											render={({ field }) => (
												<FormItem
													onPointerDownCapture={(e) =>
														focusFirstControlWithin(
															e.currentTarget as HTMLElement,
														)
													}
												>
													<div className="text-sm font-bold mb-2 text-midnight-spaces flex items-center gap-2">
														<Users className="h-4 w-4" />
														<FormLabel>
															Attendees{' '}
															<span className="text-coral-spaces">
																*
															</span>
														</FormLabel>
													</div>
													<FormControl>
														<Input
															type="text"
															inputMode="text"
															placeholder="e.g. 12 or 10-15"
															name={field.name}
															onBlur={
																field.onBlur
															}
															ref={field.ref}
															value={
																field.value ??
																''
															}
															onChange={(e) => {
																field.onChange(
																	e.target
																		.value,
																)
															}}
															className="focus-visible:ring-0 focus:border-coral-spaces focus:border-2"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="notes"
											render={({ field }) => (
												<FormItem
													onPointerDownCapture={(e) =>
														focusFirstControlWithin(
															e.currentTarget as HTMLElement,
														)
													}
												>
													<div className="text-sm font-bold mb-2 text-midnight-spaces flex items-center gap-2">
														<NotebookPen className="h-4 w-4" />
														<FormLabel>
															Notes
														</FormLabel>
													</div>
													<FormControl>
														<Textarea
															placeholder="Special requirements, layout details, etc."
															{...field}
															className="focus-visible:ring-0 focus:border-coral-spaces focus:border-2"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</section>

								<Separator className="bg-coral-spaces" />

								<section className="z-50">
									<div className="text-sm font-bold mb-2 text-midnight-spaces flex items-center gap-2">
										<UserRound className="h-4 w-4" />
										<span>Contact</span>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
										<FormField
											control={form.control}
											name="contact.name"
											render={({ field }) => (
												<FormItem
													onPointerDownCapture={(e) =>
														focusFirstControlWithin(
															e.currentTarget as HTMLElement,
														)
													}
												>
													<FormLabel className="text-sm font-semibold text-midnight-spaces">
														Name{' '}
														<span className="text-coral-spaces">
															*
														</span>
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															className="focus-visible:ring-0 focus:border-coral-spaces focus:border-2"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="contact.email"
											render={({ field }) => (
												<FormItem
													onPointerDownCapture={(e) =>
														focusFirstControlWithin(
															e.currentTarget as HTMLElement,
														)
													}
												>
													<FormLabel className="text-sm font-semibold text-midnight-spaces">
														Email{' '}
														<span className="text-coral-spaces">
															*
														</span>
													</FormLabel>
													<FormControl>
														<Input
															type="email"
															{...field}
															className="focus-visible:ring-0 focus:border-coral-spaces focus:border-2"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="contact.phone"
											render={({ field }) => (
												<FormItem
													onPointerDownCapture={(e) =>
														focusFirstControlWithin(
															e.currentTarget as HTMLElement,
														)
													}
												>
													<FormLabel className="text-sm font-semibold text-midnight-spaces">
														Phone
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															className="focus-visible:ring-0 focus:border-coral-spaces focus:border-2"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="contact.organization"
											render={({ field }) => (
												<FormItem
													onPointerDownCapture={(e) =>
														focusFirstControlWithin(
															e.currentTarget as HTMLElement,
														)
													}
												>
													<FormLabel className="text-sm font-semibold text-midnight-spaces">
														Organization
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															className="focus-visible:ring-0 focus:border-coral-spaces focus:border-2"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</section>

								{/* Honeypot */}
								<FormField
									control={form.control}
									name="honeypot"
									render={({ field }) => (
										<FormItem className="hidden">
											<FormLabel></FormLabel>
											<FormControl>
												<Input
													tabIndex={-1}
													autoComplete="off"
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</form>
						</Form>
					</ScrollArea>

					<div className="px-2 md:px-6 py-3 md:py-4 border-t border-coral-spaces bg-white-spaces">
						<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
							<Button
								onClick={submit}
								className="bg-midnight-spaces text-white-spaces hover:bg-midnight-spaces/90 text-sm"
								aria-label="Request price and availability"
								disabled={submitting}
							>
								Request Price &amp; Availability
							</Button>
							<a
								href="/contact-us"
								className="text-[12px] leading-tight text-black-spaces/70 hover:text-black-spaces underline sm:text-right"
							>
								Alternatively, call or email us directly.
							</a>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}
