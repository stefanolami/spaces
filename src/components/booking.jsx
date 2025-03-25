import Script from 'next/script'

const BookingComponent = () => {
	return (
		<div className="w-full font-nunito mt-20 md:mt-24 xl:mt-32 min-h-[calc(100vh-207px)] md:min-h-[calc(100vh-280px)] lg:min-h-[calc(100vh-316px)]">
			<Script src="https://unpkg.com/vue@3/dist/vue.global.prod.js" />
			<Script src="https://cdn.anny.co/widget/annyComponents.umd.latest.min.js" />
			<a-organization-page
				base-url="https://anny.co/b"
				organization="timespaces"
				placeholder-title="Loading Booking page..."
				hide-resource-header="true"
				hide-organization-header="true"
				should-login="false"
				entity-id=""
				locale="en"
				default-list="resources"
				primary-color="#0f2cca"
				secondary-color="#ff5900"
				/* input-background="#414141" */
				panel-background="#ffffff"
				primary-color-rgb="15, 44, 202"
				panel-border-radius="0"
				primary-background="#ffffff"
				primary-color-hover="#1132e6"
				small-border-radius="0"
				detail-border-radius="0"
				panel-background-rgb="255, 255, 255"
				panel-background-dark="#ebebeb"
				primary-color-overlay="rgba(15, 44, 202, 0.14)"
				panel-background-light="#ffffff"
				primary-background-rgb="255, 255, 255"
				panel-background-overlay="rgba(255, 255, 255, 0.25)"
				panel-background-overlay-dense="rgba(255, 255, 255, 0.85)"
			></a-organization-page>
		</div>
	)
}

export default BookingComponent
