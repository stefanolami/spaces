'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { quote, QuoteTypes } from './quote.zod'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { sendEmail } from '@/actions/email'

const GetQuoteComponent = () => {
	const [responseMessage, setResponseMessage] = useState('')
	const [responseError, setResponseError] = useState('')
	const [isSending, setIsSending] = useState(false)

	const storedValues =
		typeof window !== 'undefined' ? localStorage.getItem('quoteForm') : null
	console.log('storedValues', storedValues)
	const parsedValues = storedValues ? JSON.parse(storedValues) : null
	console.log('parsedValues', parsedValues)
	const initialValues = parsedValues
		? {
				...parsedValues,
				dates: parsedValues.dates
					? parsedValues.dates.map((date: string) => new Date(date))
					: [],
		  }
		: {
				request: '',
				name: '',
				email: '',
				phone: '',
		  }
	console.log('initialValues', initialValues)
	const form = useForm<QuoteTypes>({
		resolver: zodResolver(quote),
		defaultValues: initialValues,
	})

	const isSubmitting = form.formState.isSubmitting

	const submitHandler: SubmitHandler<QuoteTypes> = async (data) => {
		const newData = {
			formRequest: data.request,
			dates: data.dates
				.map((date) => date.toLocaleDateString('it-IT'))
				.join(' - '),
			name: data.name,
			email: data.email,
			phone: data.phone,
		}

		setIsSending(true)

		const result = await sendEmail(newData)

		if (result.success) {
			setResponseMessage('Message sent!')
			setResponseError('')
			console.log('Email sent successfully:', result.data)
		} else {
			setResponseMessage('')
			setResponseError('There was an error sending the message')
			console.error('Error sending email:', result.error)
		}

		setIsSending(false)
		form.reset()
	}

	useEffect(() => {
		const subscription = form.watch((values) => {
			// Convert `dates` to ISO string before saving
			const valuesToStore = {
				...values,
				dates: values.dates
					? values.dates.map((date) =>
							date ? date.toISOString() : null
					  )
					: [],
			}
			localStorage.setItem('quoteForm', JSON.stringify(valuesToStore))
		})
		return () => subscription.unsubscribe()
	}, [form])

	return (
		<div className="mt-32 lg:mt-52 mb-20 w-[90%] sm:w-3/4 md:w-3/5 mx-auto max-w-[700px] font-nunito">
			<h2 className="font-robo font-bold uppercase text-lg lg:text-2xl mb-8 lg:mb-12">
				GET A QUOTE!
			</h2>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(submitHandler)}
					className=""
				>
					<FormField
						control={form.control}
						name="request"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel className="lg:text-lg">
									YOUR REQUEST*
								</FormLabel>
								<FormControl className="mt-2 lg:mt-4">
									<Textarea
										disabled={isSubmitting}
										placeholder="REQUEST"
										{...field}
										className="bg-white-spaces text-primary"
									/>
								</FormControl>
								<FormMessage className="text-red-500 text-sm lg:text-base lg:mt-1" />
								<FormDescription className="font-nunito text-sm lg:text-base mt-2 lg:mt-3">
									<span className="block">
										Our{' '}
										<Link
											href="/concepts"
											className="text-eucalyptus-spaces font-bold"
										>
											concepts
										</Link>{' '}
										<Link
											href="/facilities"
											className="text-eucalyptus-spaces font-bold"
										>
											facilities
										</Link>{' '}
										&{' '}
										<Link
											href="/services"
											className="text-eucalyptus-spaces font-bold"
										>
											services
										</Link>{' '}
										for your reference.
										<span className="block italic">
											Please note: already entered
											information will not be lost if you
											move to another page.
										</span>
									</span>
									<span className="block mt-2">
										The more details you provide the more
										concrete our quote will be.
									</span>
								</FormDescription>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="dates"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel className="lg:text-lg">
									YOUR REQUESTED DATES*
								</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl className="mt-2 lg:mt-4">
											<Button
												variant={'outline'}
												className={cn(
													'pl-3 text-left font-normal  bg-white-spaces hover:bg-white-spaces text-primary hover:text-primary'
												)}
											>
												{field.value?.length > 0 ? (
													field.value
														.toLocaleString(
															'it-IT',
															{
																month: '2-digit',
																day: '2-digit',
															}
														)
														.replaceAll(',', ' - ')
												) : (
													<span className="font-nunito italic text-sm lg:text-base uppercase text-muted-foreground">
														Pick a date
													</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent
										className="w-auto p-0"
										align="start"
									>
										<Calendar
											className="bg-white-spaces text-primary"
											mode="multiple"
											selected={field.value}
											onSelect={(date) => {
												field.onChange(date)
												console.log(date)
											}}
											disabled={(date) =>
												date < new Date()
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage className="text-red-500 text-sm lg:text-base lg:mt-1" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel className="lg:text-lg">
									YOUR NAME*
								</FormLabel>
								<FormControl className="mt-2 lg:mt-4">
									<Input
										disabled={isSubmitting}
										placeholder="NAME"
										{...field}
										className="bg-white-spaces text-primary"
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
									YOUR EMAIL*
								</FormLabel>
								<FormControl className="mt-2 lg:mt-4">
									<Input
										disabled={isSubmitting}
										placeholder="EMAIL"
										{...field}
										className="bg-white-spaces text-primary"
									/>
								</FormControl>
								<FormMessage className="text-red-500 text-sm lg:text-base lg:mt-1" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormDescription className="font-nunito text-sm lg:text-base mb-3 lg:my-4">
									Or leave your number and we can have a
									direct chat for any open question.
								</FormDescription>
								<FormLabel className="lg:text-lg">
									YOUR PHONE NUMBER
								</FormLabel>
								<FormControl className="mt-2 lg:mt-4">
									<Input
										disabled={isSubmitting}
										placeholder="PHONE NUMBER"
										{...field}
										className="bg-white-spaces text-primary"
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

export default GetQuoteComponent
