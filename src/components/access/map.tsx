'use client'

import { useRef, useEffect } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

export default function Map() {
	const mapRef = useRef(null)

	useEffect(() => {
		const initializeMap = async () => {
			const loader = new Loader({
				apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || '',
				version: 'quarterly',
			})

			const { Map } = await loader.importLibrary('maps')

			const locationInMap = {
				lat: 50.84406598640439,
				lng: 4.3760091831455625,
			}

			const { Marker } = await loader.importLibrary('marker')

			const options = {
				center: locationInMap,
				zoom: 14,
				mapId: 'time-spaces',
			}

			const map = new Map(mapRef.current, options)
			//eslint-disable-next-line
			const marker = new Marker({
				position: locationInMap,
				map,
			})
		}

		initializeMap()
	}, [])

	return (
		<div
			className="w-full md:w-3/4 mx-auto aspect-[4/3]"
			ref={mapRef}
		></div>
	)
}
