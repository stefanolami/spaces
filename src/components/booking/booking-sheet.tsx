'use client'

import { useEffect, useMemo } from 'react'
import type { PrefillPayload, BookingMode } from '@/lib/booking-types'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
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
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	bookingRequestSchema,
	type BookingRequest,
} from '@/components/booking/booking.zod'
import { ROOM_IDS, roomIdToTitle } from '@/lib/room-map'
import { SERVICE_IDS, serviceIdToTitle } from '@/lib/service-map'
import { toast } from 'sonner'
import { sendAvailabilityRequest, sendBookingRequest } from '@/actions/email'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useState } from 'react'
import { useBookingStore } from '@/lib/booking-store'
import type { RoomId, ServiceSelection } from '@/lib/booking-types'

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
	const title = useMemo(() => 'Booking & Availability', [])

	const form = useForm<BookingRequest>({
		resolver: zodResolver(bookingRequestSchema),
		defaultValues: {
			mode,
			rooms: payload?.rooms ?? [],
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

	useEffect(() => {
		form.setValue('mode', mode)
		if (payload?.rooms && payload.rooms.length > 0)
			form.setValue('rooms', payload.rooms as [RoomId, ...RoomId[]])
		if (payload?.services && payload.services.length > 0)
			form.setValue(
				'services',
				payload.services as [ServiceSelection, ...ServiceSelection[]]
			)
		if (payload?.attendees) form.setValue('attendees', payload.attendees)
		if (payload?.date) {
			const d = new Date(payload.date)
			if (!Number.isNaN(d.getTime())) form.setValue('dates', [d])
		}
		if (payload?.startTime) form.setValue('startTime', payload.startTime)
		if (payload?.endTime) form.setValue('endTime', payload.endTime)
	}, [payload, mode, form])

	const [submitting, setSubmitting] = useState(false)

	const { draft, updateDraft, clearDraft } = useBookingStore()

	// Hydrate form from persisted draft when opening without a payload
	useEffect(() => {
		if (open && !payload && draft) {
			if (draft.rooms && draft.rooms.length > 0)
				form.setValue('rooms', draft.rooms as [RoomId, ...RoomId[]])
			if (draft.services && draft.services.length > 0)
				form.setValue(
					'services',
					draft.services as [ServiceSelection, ...ServiceSelection[]]
				)
			if (draft.attendees) form.setValue('attendees', draft.attendees)
			if (draft.dates && draft.dates.length > 0)
				form.setValue(
					'dates',
					draft.dates
						.map((iso) => new Date(iso))
						.filter((d) => !Number.isNaN(d.getTime())) as [
						Date,
						...Date[]
					]
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
						draft.contact.organization
					)
			}
		}
	}, [open, payload, draft, form])

	// Persist draft on form changes
	const watched = useWatch({
		control: form.control,
	}) as Partial<BookingRequest>
	useEffect(() => {
		if (!watched) return
		updateDraft({
			rooms: (watched.rooms ?? []).filter(Boolean) as RoomId[],
			services: (watched.services ?? []).filter(
				Boolean
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
	}, [watched, updateDraft])

	async function submit(modeOverride: BookingMode) {
		const values = form.getValues()
		const data: BookingRequest = { ...values, mode: modeOverride }
		const sender =
			modeOverride === 'booking'
				? sendBookingRequest
				: sendAvailabilityRequest
		setSubmitting(true)
		const res = await sender(data)
		if (res.success) {
			toast.success(`Sent! Ref ${res.data?.refId ?? ''}`)
			onOpenChange(false)
			form.reset()
			clearDraft()
		} else {
			toast.error(`Error: ${res.error}`)
		}
		setSubmitting(false)
	}

	return (
		<Sheet
			open={open}
			onOpenChange={onOpenChange}
		>
			<SheetContent className="bg-white-spaces text-black-spaces border-l border-midnight-spaces p-0 md:p-0">
				<div className="flex flex-col h-full">
					<SheetHeader className="px-4 md:px-6 py-3 md:py-4 border-b border-beje-spaces bg-white-spaces">
						<SheetTitle className="text-lg md:text-xl font-bold">
							{title}
						</SheetTitle>
						<SheetDescription className="text-sm md:text-base">
							Complete your details and send a request. Our team
							will reply shortly.
						</SheetDescription>
					</SheetHeader>

					<ScrollArea className="flex-1 px-4 md:px-6 py-4">
						<Form {...form}>
							<form className="grid gap-4">
								<section>
									<div className="text-sm font-bold mb-2">
										Rooms
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
										{ROOM_IDS.map((id) => (
											<FormField
												key={id}
												control={form.control}
												name="rooms"
												render={({ field }) => {
													const checked =
														field.value?.includes(
															id
														)
													return (
														<FormItem className="mt-0">
															<div className="flex items-center gap-2 border border-beje-spaces rounded-md p-2">
																<FormControl>
																	<Checkbox
																		checked={
																			!!checked
																		}
																		onCheckedChange={(
																			c
																		) => {
																			const next =
																				new Set(
																					field.value ??
																						[]
																				)
																			if (
																				c
																			)
																				next.add(
																					id
																				)
																			else
																				next.delete(
																					id
																				)
																			field.onChange(
																				Array.from(
																					next
																				)
																			)
																		}}
																	/>
																</FormControl>
																<FormLabel className="font-normal">
																	{roomIdToTitle(
																		id
																	)}
																</FormLabel>
															</div>
															<FormMessage />
														</FormItem>
													)
												}}
											/>
										))}
									</div>
								</section>

								<Separator className="bg-beje-spaces" />

								<section>
									<div className="text-sm font-bold mb-2">
										Dates
									</div>
									<FormField
										control={form.control}
										name="dates"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Calendar
														mode="multiple"
														selected={field.value}
														onSelect={(dates) =>
															field.onChange(
																dates ?? []
															)
														}
														fromDate={new Date()}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									{/* <div className="grid grid-cols-2 gap-2 mt-2">
										<FormField
											control={form.control}
											name="startTime"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Start time
													</FormLabel>
													<FormControl>
														<Input
															type="time"
															placeholder="09:00"
															{...field}
														/>
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
													<FormLabel>
														End time
													</FormLabel>
													<FormControl>
														<Input
															type="time"
															placeholder="17:00"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div> */}
								</section>

								<Separator className="bg-beje-spaces" />

								<section>
									<div className="text-sm font-bold mb-2">
										Services
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
															s.id === svc
													)
													const checked = idx >= 0
													return (
														<FormItem className="mt-0">
															<div className="flex items-center gap-2 border border-beje-spaces rounded-md p-2">
																<FormControl>
																	<Checkbox
																		checked={
																			!!checked
																		}
																		onCheckedChange={(
																			c
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
																					}
																				)
																			else
																				next.splice(
																					idx,
																					1
																				)
																			field.onChange(
																				next
																			)
																		}}
																	/>
																</FormControl>
																<FormLabel className="font-normal">
																	{serviceIdToTitle(
																		svc
																	)}
																</FormLabel>
															</div>
															<FormMessage />
														</FormItem>
													)
												}}
											/>
										))}
									</div>
								</section>

								<Separator className="bg-beje-spaces" />

								<section>
									<div className="grid grid-cols-1 gap-2">
										{/* <FormField
											control={form.control}
											name="attendees"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Attendees
													</FormLabel>
													<FormControl>
														<Input
															type="number"
															min={1}
															placeholder="10"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/> */}
										<FormField
											control={form.control}
											name="notes"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Notes</FormLabel>
													<FormControl>
														<Textarea
															placeholder="Special requirements, layout details, etc."
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</section>

								<Separator className="bg-beje-spaces" />

								<section>
									<div className="text-sm font-bold mb-2">
										Contact
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
										<FormField
											control={form.control}
											name="contact.name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Name</FormLabel>
													<FormControl>
														<Input
															placeholder="Your full name"
															{...field}
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
												<FormItem>
													<FormLabel>Email</FormLabel>
													<FormControl>
														<Input
															type="email"
															placeholder="you@example.com"
															{...field}
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
												<FormItem>
													<FormLabel>Phone</FormLabel>
													<FormControl>
														<Input
															placeholder="Optional"
															{...field}
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
												<FormItem>
													<FormLabel>
														Organization
													</FormLabel>
													<FormControl>
														<Input
															placeholder="Optional"
															{...field}
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
											<FormLabel>Do not fill</FormLabel>
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

					<div className="px-4 md:px-6 py-3 md:py-4 border-t border-beje-spaces bg-white-spaces flex items-center justify-end gap-2">
						<Button
							onClick={() => submit('booking')}
							className="bg-midnight-spaces text-white-spaces hover:bg-midnight-spaces/90"
							aria-label="Send booking request"
							disabled={submitting}
						>
							Send Booking Request
						</Button>
						<Button
							onClick={() => submit('availability')}
							className="bg-black-spaces text-white-spaces hover:bg-black-spaces/90"
							aria-label="Ask availability"
							disabled={submitting}
						>
							Ask Availability
						</Button>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}
