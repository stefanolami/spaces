'use client'

import { useBookingSheet } from '../booking/booking-sheet-provider'

type TimeSlotRow = {
	timeSlotLabel: string
	perHour?: number
	halfDay4h?: number
	halfDayLunch5_5h?: number
	fullDay9h?: number
	fullEvening4h?: number
}

const euro = (value?: number) => {
	if (value === undefined) return '—'
	return new Intl.NumberFormat('en-GB', {
		style: 'currency',
		currency: 'EUR',
		maximumFractionDigits: 0,
	}).format(value)
}

const PricingTable = ({
	caption,
	rows,
}: {
	caption: string
	rows: TimeSlotRow[]
}) => {
	return (
		<div className="w-full">
			<h2 className="font-robo font-bold uppercase text-base lg:text-xl text-midnight-spaces">
				{caption}
			</h2>
			<div className="mt-4 overflow-x-auto rounded-lg border border-black-spaces/10">
				<table className="w-full min-w-[900px] border-collapse text-left">
					<thead className="bg-eucalyptus-spaces text-white-spaces">
						<tr>
							<th className="p-3 font-robo text-xs md:text-sm">
								Time slot
							</th>
							<th className="p-3 font-robo text-xs md:text-sm">
								Per hour
							</th>
							<th className="p-3 font-robo text-xs md:text-sm">
								Half-day (4h)
							</th>
							<th className="p-3 font-robo text-xs md:text-sm">
								Half-day + lunch (5.5h)
							</th>
							<th className="p-3 font-robo text-xs md:text-sm">
								Full day (9h)
							</th>
							<th className="p-3 font-robo text-xs md:text-sm">
								Full evening (4h)
							</th>
						</tr>
					</thead>
					<tbody className="bg-white-spaces">
						{rows.map((row) => (
							<tr
								key={row.timeSlotLabel}
								className="border-t border-black-spaces/10"
							>
								<td className="p-3 font-nunito text-sm md:text-base font-semibold text-black-spaces">
									{row.timeSlotLabel}
								</td>
								<td className="p-3 font-nunito text-sm md:text-base">
									{euro(row.perHour)}
								</td>
								<td className="p-3 font-nunito text-sm md:text-base">
									{euro(row.halfDay4h)}
								</td>
								<td className="p-3 font-nunito text-sm md:text-base">
									{euro(row.halfDayLunch5_5h)}
								</td>
								<td className="p-3 font-nunito text-sm md:text-base">
									{euro(row.fullDay9h)}
								</td>
								<td className="p-3 font-nunito text-sm md:text-base">
									{euro(row.fullEvening4h)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<p className="mt-2 font-nunito text-xs text-black-spaces/70">
				Tip: scroll horizontally on small screens.
			</p>
		</div>
	)
}

const LARGE_MEETING_ROOM_ROWS: TimeSlotRow[] = [
	{
		timeSlotLabel: 'Mon–Fri 08:00–18:00',
		perHour: 80,
		halfDay4h: 265,
		halfDayLunch5_5h: 375,
		fullDay9h: 495,
	},
	{
		timeSlotLabel: 'Mon–Fri 18:00–22:00',
		perHour: 95,
		fullEvening4h: 315,
	},
	{
		timeSlotLabel: 'Sat–Sun 09:00–21:00',
		perHour: 100,
		halfDay4h: 330,
		halfDayLunch5_5h: 465,
		fullDay9h: 620,
	},
]

const CATERING_OR_MEETING_ROOM_ROWS: TimeSlotRow[] = [
	{
		timeSlotLabel: 'Mon–Fri 08:00–18:00',
		perHour: 35,
		halfDay4h: 115,
		halfDayLunch5_5h: 145,
		fullDay9h: 195,
	},
	{
		timeSlotLabel: 'Mon–Fri 18:00–22:00',
		perHour: 50,
		fullEvening4h: 160,
	},
	{
		timeSlotLabel: 'Sat–Sun 09:00–21:00',
		perHour: 55,
		halfDay4h: 180,
		halfDayLunch5_5h: 225,
		fullDay9h: 295,
	},
]

const Pricing = () => {
	const { openBookingSheet } = useBookingSheet()

	return (
		<div className="mt-32 lg:mt-52 mb-20 w-[90%] mx-auto max-w-[1000px] font-nunito bg-white-spaces text-black-spaces">
			<h2 className="font-robo font-bold uppercase text-lg lg:text-3xl mb-8 lg:mb-12 text-black-spaces">
				PRICING
			</h2>
			<section className="text-black-spaces">
				<div>
					<p className="font-nunito text-sm md:text-base lg:text-lg text-center">
						The price list below is a point of reference. Following
						your request for availability and price, the price will
						be calculated according to this list. New customers get
						an automatic{' '}
						<span className="font-bold text-midnight-spaces">
							5% reduction
						</span>{' '}
						on the prices listed below.
					</p>

					<div className="mt-10 rounded-lg border border-black-spaces/10 bg-white p-6 md:p-8">
						<h2 className="font-robo font-bold uppercase text-lg md:text-2xl text-black-spaces text-center">
							Opening times
						</h2>
						<div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
							<div className="rounded-md bg-white-spaces p-4 border border-black-spaces/5">
								<p className="font-robo font-bold text-midnight-spaces">
									Monday to Friday
								</p>
								<p className="font-nunito">08:00 to 22:00</p>
							</div>
							<div className="rounded-md bg-white-spaces p-4 border border-black-spaces/5">
								<p className="font-robo font-bold text-midnight-spaces">
									Saturday & Sunday
								</p>
								<p className="font-nunito">09:00 to 21:00</p>
							</div>
							<div className="rounded-md bg-white-spaces p-4 border border-black-spaces/5">
								<p className="font-robo font-bold text-midnight-spaces">
									Public holidays
								</p>
								<p className="font-nunito">Closed</p>
							</div>
						</div>
					</div>

					<p className="mt-10 lg:mt-20 font-robo font-bold text-lg lg:text-2xl text-black-spaces">
						PRICE LIST
						<br />{' '}
						<span className="text-xs lg:text-base">
							(all prices exclude 21 % Belgian VAT and are in
							EURs)
						</span>
					</p>

					<div className="mt-6 lg:mt-12 space-y-10">
						<PricingTable
							caption="Large Meeting / Conference Room (with break-out room)"
							rows={LARGE_MEETING_ROOM_ROWS}
						/>
						<PricingTable
							caption="Catering or Meeting room"
							rows={CATERING_OR_MEETING_ROOM_ROWS}
						/>
					</div>

					<div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4">
						<a
							href="/brochures/price-list.pdf"
							className="inline-flex items-center justify-center px-5 h-11 bg-midnight-spaces text-white-spaces font-robo font-bold text-sm md:text-base hover:bg-midnight-spaces/90"
							target="_blank"
							rel="noreferrer"
						>
							Download brochure with prices (PDF)
						</a>
						<button
							onClick={(e) => {
								e.preventDefault()
								openBookingSheet(
									{ sourcePath: '/pricing' },
									'booking',
								)
							}}
							className="inline-flex items-center justify-center px-5 h-11 bg-eucalyptus-spaces text-white-spaces font-robo font-bold text-sm md:text-base hover:bg-eucalyptus-spaces/90"
						>
							MAKE REQUEST
						</button>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Pricing
