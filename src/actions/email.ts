'use server'

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
	const apiEndpoint = 'https://spaces-eta.vercel.app/api/email'

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
