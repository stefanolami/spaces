import { type NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import { bookingRequestSchema } from '@/components/booking/booking.zod'
import { bodyFor, subjectFor } from '@/lib/booking-email'

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

	// Force mode to availability for this endpoint, regardless of client value
	req.mode = 'availability'

	// Simple honeypot check
	if (req.honeypot && req.honeypot.trim().length > 0) {
		return NextResponse.json({ message: 'Ignored' })
	}

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
		subject: subjectFor(req),
		text: bodyFor(req),
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
		return NextResponse.json({ message: 'Message sent' })
	} catch (err) {
		console.log(err)
		return NextResponse.json({ error: err }, { status: 500 })
	}
}
