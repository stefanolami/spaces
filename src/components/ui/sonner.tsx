'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = 'system' } = useTheme()

	return (
		<Sonner
			theme={theme as ToasterProps['theme']}
			className="toaster group z-50"
			toastOptions={{
				classNames: {
					toast: 'group toast bg-white-spaces text-black-spaces shadow-lg border border-l-4 !border-coral-spaces !border-l-coral-spaces',
					title: 'text-black-spaces',
					description: 'text-midnight-spaces opacity-100',
					icon: 'toast-icon !text-coral-spaces',
					success:
						'!border-eucalyptus-spaces !border-l-eucalyptus-spaces [&_.toast-icon]:!text-eucalyptus-spaces',
					error: '!border-coral-spaces !border-l-coral-spaces',
					warning: '!border-coral-spaces !border-l-coral-spaces',
					actionButton: 'bg-midnight-spaces text-white-spaces',
					cancelButton:
						'bg-white-spaces text-midnight-spaces border border-midnight-spaces hover:bg-eucalyptus-spaces/20',
				},
			}}
			{...props}
		/>
	)
}

export { Toaster }
