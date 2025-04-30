'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { quote, QuoteTypes } from './quote.zod'
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
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const GetQuoteComponent = () => {
	const form = useForm<QuoteTypes>({
		resolver: zodResolver(quote),
		defaultValues: {
			request: '',
			name: '',
			email: '',
			phone: '',
		},
	})

	const isSubmitting = form.formState.isSubmitting

	const submitHandler: SubmitHandler<QuoteTypes> = async (data) => {
		console.log(data)
	}

	return (
		<div className="mt-32 w-[90%] mx-auto max-w-[800px] font-nunito">
			<h2 className="font-robo text-center lg:text-left font-bold uppercase text-lg lg:text-2xl">
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
							<FormItem className="col-span-2">
								<FormLabel>YOUR REQUEST*</FormLabel>
								<FormControl>
									<Textarea
										disabled={isSubmitting}
										placeholder="REQUEST"
										{...field}
										className="bg-white text-primary"
									/>
								</FormControl>
								<FormMessage className="text-red-500 text-sm" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="dates"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>YOUR REQUESTED DATES*</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn(
													'pl-3 text-left font-normal  bg-white hover:bg-white text-primary hover:text-primary'
												)}
											>
												{field.value ? (
													field.value.toLocaleDateString(
														'it-IT'
													)
												) : (
													<span>Pick a date</span>
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
											className="bg-white text-primary"
											mode="range"
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
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>YOUR NAME*</FormLabel>
								<FormControl>
									<Input
										disabled={isSubmitting}
										placeholder="NAME"
										{...field}
										className="bg-white text-primary"
									/>
								</FormControl>
								<FormMessage className="text-red-500 text-sm" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>YOUR EMAIL*</FormLabel>
								<FormControl>
									<Input
										disabled={isSubmitting}
										placeholder="EMAIL"
										{...field}
										className="bg-white text-primary"
									/>
								</FormControl>
								<FormMessage className="text-red-500 text-sm" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>YOUR PHONE NUMBER</FormLabel>
								<FormControl>
									<Input
										disabled={isSubmitting}
										placeholder="PHONE NUMBER"
										{...field}
										className="bg-white text-primary"
									/>
								</FormControl>
								<FormMessage className="text-red-500 text-sm" />
							</FormItem>
						)}
					/>
					<Button
						disabled={false}
						type="submit"
						variant="default"
						className="bg-primary-light text-white hover:bg-primary-light shadow-md hover:shadow-xl hover:scale-[1.02] mt-8 px-12 py-2"
					>
						Save
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default GetQuoteComponent
