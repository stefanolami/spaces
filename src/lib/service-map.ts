import type { ServiceId } from '@/lib/booking-types'

export const SERVICE_TITLE_MAP: Record<ServiceId, string> = {
	catering: 'Catering',
	av: 'A/V Support',
	streaming: 'Streaming',
	interpretation: 'Interpretation',
	recording: 'Recording',
	layout: 'Room Layout',
}

export const SERVICE_IDS: ServiceId[] = Object.keys(
	SERVICE_TITLE_MAP
) as ServiceId[]

export function serviceIdToTitle(id: ServiceId): string {
	return SERVICE_TITLE_MAP[id]
}
