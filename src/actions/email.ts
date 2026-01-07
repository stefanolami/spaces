type FormData = {
	formRequest: string
	dates: string
	name: string
	email: string
	phone: string | undefined
}

type EmailResponse = {
	success: boolean
	//eslint-disable-next-line @typescript-eslint/no-explicit-any
	data?: any
	error?: string
}

export async function sendEmail(data: FormData): Promise<EmailResponse> {
	const apiEndpoint = 'https://www.timeandspaces.org/api/email'

	try {
		const res = await fetch(apiEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})

		// Check if the response is OK
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`)
		}

		// Parse and return the JSON response
		const responseData = await res.json()
		return { success: true, data: responseData }
	} catch (err) {
		// Return the error in a structured format
		console.error('Error sending email:', err)
		return { success: false, error: (err as Error).message }
	}
}

// Contact form types and sender
type ContactFormData = {
	name: string
	email: string
	subject: string
	message: string
}

export async function sendContactEmail(
	data: ContactFormData
): Promise<EmailResponse> {
	// Use a relative URL so it works in dev and prod environments
	const apiEndpoint = '/api/contact'

	try {
		const res = await fetch(apiEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`)
		}

		const responseData = await res.json()
		return { success: true, data: responseData }
	} catch (err) {
		console.error('Error sending contact email:', err)
		return { success: false, error: (err as Error).message }
	}
}

// Booking & availability senders
type BookingRequestData = {
	// Mirror the bookingRequestSchema fields; keep it loose here to avoid duplication
	//eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any
}

export async function sendBookingRequest(
	data: BookingRequestData
): Promise<EmailResponse> {
	const res = await fetch('/api/booking', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})
	const responseData = await res.json().catch(() => undefined)
	if (!res.ok) {
		const errMsg =
			(responseData && (responseData.error || responseData.message)) ||
			`HTTP error! status: ${res.status}`
		return { success: false, error: errMsg, data: responseData }
	}
	return { success: true, data: responseData }
}

export async function sendAvailabilityRequest(
	data: BookingRequestData
): Promise<EmailResponse> {
	const res = await fetch('/api/availability', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})
	const responseData = await res.json().catch(() => undefined)
	if (!res.ok) {
		const errMsg =
			(responseData && (responseData.error || responseData.message)) ||
			`HTTP error! status: ${res.status}`
		return { success: false, error: errMsg, data: responseData }
	}
	return { success: true, data: responseData }
}
