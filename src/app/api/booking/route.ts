import { type NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import { bookingRequestSchema } from '@/components/booking/booking.zod'
import {
	bodyFor,
	generateRefId,
	subjectFor,
	generateICS,
} from '@/lib/booking-email'

export async function POST(request: NextRequest) {
	const json = await request.json()

	const parse = bookingRequestSchema.safeParse(json)
	if (!parse.success) {
		return NextResponse.json(
			{ error: 'Invalid payload', details: parse.error.flatten() },
			{ status: 400 }
		)
	}

	const req = parse.data

	// Simple honeypot check
	if (req.honeypot && req.honeypot.trim().length > 0) {
		return NextResponse.json({ message: 'Ignored' })
	}

	const refId = generateRefId()

	const transport = nodemailer.createTransport({
		host: 'smtp.zoho.com',
		port: 465,
		secure: true,
		authMethod: 'LOGIN',
		auth: {
			user: process.env.MY_EMAIL,
			pass: process.env.MY_PASSWORD,
		},
	})

	const mailOptions: Mail.Options = {
		from: process.env.MY_EMAIL,
		to: process.env.MY_EMAIL,
		subject: subjectFor(req, refId),
		text: bodyFor(req, refId),
	}

	const ics = generateICS(req, refId)
	if (ics) {
		mailOptions.attachments = [
			{
				filename: `Time&Spaces-${refId}.ics`,
				content: ics,
				contentType: 'text/calendar',
			},
		]
	}

	const sendMailPromise = () =>
		new Promise<string>((resolve, reject) => {
			transport.sendMail(mailOptions, function (err) {
				if (!err) {
					resolve('Message sent')
				} else {
					reject(err.message)
				}
			})
		})

	try {
		await sendMailPromise()
		// Basic acknowledgment payload for client usage
		return NextResponse.json({ message: 'Message sent', refId })
	} catch (err) {
		console.log(err)
		return NextResponse.json({ error: err }, { status: 500 })
	}
}
