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
		<>
			<div className={`bg-white flex w-full font-nunito`}>
				<div className="w-full flex flex-col md:grid md:grid-cols-2 h-full">
					<div
						className={`w-full h-44 md:h-full relative ${
							position % 2 === 0 ? 'md:order-1' : ''
						}`}
					>
						<Image
							src={card.image}
							alt={card.title}
							fill
							className="object-cover"
						/>
					</div>
					<div className="flex flex-col justify-center w-3/4 mx-auto max-w-[600px] py-8 md:py-12 lg:py-20 xl:py-36 gap-4 md:gap-5 lg:gap-6">
						<h3 className="text-base md:text-lg lg:text-xl font-bold w-full text-balance text-center md:text-left">
							{card.title}
						</h3>
						<p className="text-sm md:text-sm lg:text-base text-center md:text-justify">
							{card.text}
						</p>
						<div className="w-full md:w-2/3 my-4 md:gap-4 grid grid-cols-2">
							<Link href={card.firstLink}>
								<button className="bg-orange-spaces hover:scale-[1.02] w-full flex items-center justify-center p-2 text-xs md:text-sm lg:text-base font-bold text-white shadow-md hover:shadow-lg">
									BOOK NOW
								</button>
							</Link>
							<Link href={card.firstLink}>
								<button className="bg-black-spaces hover:scale-[1.02] w-full flex items-center justify-center p-2 text-xs md:text-sm lg:text-base font-bold text-white shadow-md hover:shadow-lg">
									GET A QUOTE
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
			{/* <div
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
								BOOK NOW
							</button>
						</Link>
						<Link href={card.firstLink}>
							<button className="bg-black-spaces hover:scale-[1.02] w-full flex items-center justify-center p-2 text-xs md:text-sm lg:text-base font-bold text-white shadow-md hover:shadow-lg">
								GET A QUOTE
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div> */}
		</>
	)
}

export default FacilitiesCard
