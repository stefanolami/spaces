'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { contact, ContactTypes } from './contact.zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { useState } from 'react'
import { sendContactEmail } from '@/actions/email'
import { Mail, MapPin, Phone } from 'lucide-react'

const ContactUsComponent = () => {
	const [responseMessage, setResponseMessage] = useState('')
	const [responseError, setResponseError] = useState('')
	const [isSending, setIsSending] = useState(false)

	const form = useForm<ContactTypes>({
		resolver: zodResolver(contact),
		defaultValues: {
			name: '',
			email: '',
			subject: '',
			message: '',
		},
	})

	const isSubmitting = form.formState.isSubmitting

	const submitHandler: SubmitHandler<ContactTypes> = async (data) => {
		setIsSending(true)

		const result = await sendContactEmail({
			name: data.name,
			email: data.email,
			subject: data.subject,
			message: data.message,
		})

		if (result.success) {
			setResponseMessage('Message sent!')
			setResponseError('')
			form.reset()
		} else {
			setResponseMessage('')
			setResponseError('There was an error sending the message')
			console.error('Error sending contact email:', result.error)
		}

		setIsSending(false)
	}

	return (
		<div className="mt-32 lg:mt-52 mb-20 w-[90%] sm:w-3/4 md:w-3/5 mx-auto max-w-[700px] font-nunito bg-white-spaces text-black-spaces">
			<h2 className="font-robo font-bold uppercase text-lg lg:text-2xl mb-8 lg:mb-12">
				CONTACT US
			</h2>
			<div className="mb-8 lg:mb-12">
				<ul className="space-y-3 text-sm lg:text-base text-black-spaces/80">
					<li className="flex items-start gap-3">
						<Phone className="h-5 w-5 text-midnight-spaces mt-0.5" />
						<a
							href="tel:+32485382221"
							className="hover:underline"
						>
							+32 (0) 485 382 221
						</a>
					</li>
					<li className="flex items-start gap-3">
						<Mail className="h-5 w-5 text-midnight-spaces mt-0.5" />
						<a
							href="mailto:contact@timeandspaces.org"
							className="hover:underline"
						>
							contact@timeandspaces.org
						</a>
					</li>
					<li className="flex items-start gap-3">
						<MapPin className="h-5 w-5 text-midnight-spaces mt-0.5" />
						<span>Rue de la Loi 81A - 1040 Brussels, Belgium</span>
					</li>
				</ul>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(submitHandler)}>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel className="lg:text-lg">
									YOUR NAME
								</FormLabel>
								<FormControl className="mt-2 lg:mt-4">
									<Input
										disabled={isSubmitting}
										placeholder="NAME"
										{...field}
										className="bg-white-spaces text-primary focus-visible:ring-0 focus:border-coral-spaces focus:border-2"
									/>
								</FormControl>
								<FormMessage className="text-red-500 text-sm lg:text-base lg:mt-1" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel className="lg:text-lg">
									YOUR EMAIL
								</FormLabel>
								<FormControl className="mt-2 lg:mt-4">
									<Input
										disabled={isSubmitting}
										placeholder="EMAIL"
										{...field}
										className="bg-white-spaces text-primary focus-visible:ring-0 focus:border-coral-spaces focus:border-2"
									/>
								</FormControl>
								<FormMessage className="text-red-500 text-sm lg:text-base lg:mt-1" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="subject"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel className="lg:text-lg">
									SUBJECT
								</FormLabel>
								<FormControl className="mt-2 lg:mt-4">
									<Input
										disabled={isSubmitting}
										placeholder="SUBJECT"
										{...field}
										className="bg-white-spaces text-primary focus-visible:ring-0 focus:border-coral-spaces focus:border-2"
									/>
								</FormControl>
								<FormMessage className="text-red-500 text-sm lg:text-base lg:mt-1" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel className="lg:text-lg">
									YOUR MESSAGE
								</FormLabel>
								<FormControl className="mt-2 lg:mt-4">
									<Textarea
										disabled={isSubmitting}
										placeholder="MESSAGE"
										{...field}
										className="bg-white-spaces text-primary focus-visible:ring-0 focus:border-coral-spaces focus:border-2"
									/>
								</FormControl>
								<FormMessage className="text-red-500 text-sm lg:text-base lg:mt-1" />
							</FormItem>
						)}
					/>

					<div className="flex flex-row items-center justify-start gap-3 lg:gap-8 mt-8 lg:mt-12">
						<Button
							disabled={isSending}
							type="submit"
							variant="default"
							className="bg-black-spaces hover:scale-105 transition-scale-standard flex items-center justify-center text-xs md:text-sm lg:text-base font-bold font-nunito text-white-spaces shadow-md hover:shadow-lg uppercase rounded-none px-6 lg:px-10 py-2 lg:py-5"
						>
							send
						</Button>
						{responseMessage && (
							<div className="font-nunito text-green-600 text-center">
								{responseMessage}
							</div>
						)}
						{responseError && (
							<div className="font-nunito text-red-600 text-center">
								{responseError}
							</div>
						)}
					</div>
				</form>
			</Form>
		</div>
	)
}

export default ContactUsComponent
