'use client'

import Link from 'next/link'
import React from 'react'

const HomeCard = ({
	/* image, */
	title,
	link,
}: {
	/* image: string */
	title: string
	link: string
}) => {
	return (
		<div className="group w-full h-96 flex flex-col">
			<div className="bg-slate-500 w-full h-full"></div>
			<Link href={link}>
				<div className="w-full h-20 bg-black-spaces group-hover:bg-orange-spaces text-white font-robo">
					{title}
				</div>
			</Link>
		</div>
	)
}

export default HomeCard
