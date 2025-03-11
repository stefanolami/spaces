import { FacilitiesCardType } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'

const FacilitiesCard = ({
	card,
	position,
}: {
	card: FacilitiesCardType
	position: number
}) => {
	return (
		<div
			className={`bg-[#F3F3F3] mb-8 md:mb-0 md:py-6 ${
				position % 2 === 0 ? 'md:bg-white' : ''
			}`}
		>
			<div
				className={`mx-auto md:w-4/5 max-w-[1000px] flex flex-col items-center justify-center ${
					position % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
				} gap-8 lg:gap-8`}
			>
				<div className="w-full aspect-square relative ">
					<Image
						src={card.image}
						alt={card.title}
						fill
					/>
				</div>
				<div className="w-full flex flex-col items-center md:items-start justify-center gap-4 lg:gap-8">
					<h3 className="text-base md:text-xl lg:text-2xl font-extrabold text-center md:text-left w-4/5 md:w-full mx-auto uppercase">
						{card.title}
					</h3>
					<p className="text-justify md:text-left text-xs md:text-sm lg:text-base w-4/5 md:w-full mx-auto">
						{card.text}
					</p>
					<div className="w-full md:w-2/3 md:gap-4 grid grid-cols-2">
						<Link href={card.firstLink}>
							<button className="bg-orange-spaces hover:scale-[1.02] w-full flex items-center justify-center p-2 text-xs md:text-sm lg:text-base font-bold text-white shadow-md hover:shadow-lg">
								BOOK NOW!
							</button>
						</Link>
						<Link href={card.firstLink}>
							<button className="bg-black-spaces hover:scale-[1.02] w-full flex items-center justify-center p-2 text-xs md:text-sm lg:text-base font-bold text-white shadow-md hover:shadow-lg">
								GET A QUOTE
							</button>
						</Link>
					</div>
					<p className="text-sm md:text-base lg:text-lg md:text-left">
						<span className="font-extrabold">PRICE:</span> €
						{card.price}
					</p>
					{card.subText && (
						<p className="italic text-[10px] leading-[12px] md:text-xs lg:text-sm w-4/5 mx-auto md:w-full md:text-left">
							{card.subText}
						</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default FacilitiesCard
