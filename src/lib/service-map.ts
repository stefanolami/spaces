import type { ServiceId } from '@/lib/booking-types'

export const SERVICE_TITLE_MAP: Record<ServiceId, string> = {
	catering: 'Catering',
	interpretation: 'Interpretation',
	streaming: 'Live streaming',
	recording: 'Recording',
	'videos-and-photos': 'Videos and/or photos',
	'branded-giveaways': 'Branded giveaways/paraphernalia',
	transportation: 'Transportation',
}

export const SERVICE_IDS: ServiceId[] = Object.keys(
	SERVICE_TITLE_MAP,
) as ServiceId[]

export function serviceIdToTitle(id: ServiceId): string {
	return SERVICE_TITLE_MAP[id]
}
