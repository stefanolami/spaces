import Script from 'next/script'

const BookingComponent = () => {
	return (
		<div className="w-full font-nunito pt-20 xl:pt-32 min-h-[calc(100vh-207px)] md:min-h-[calc(100vh-280px)]">
			<Script src="https://unpkg.com/vue@3/dist/vue.global.prod.js" />
			<Script src="https://cdn.anny.co/widget/annyComponents.umd.latest.min.js" />
			<a-organization-page
				base-url="https://anny.co/b"
				organization="timespaces"
				placeholder-title="Time&Spaces"
				hide-resource-header="false"
				hide-organization-header="false"
				should-login="false"
				entity-id=""
				locale="de"
				default-list="resources"
				primary-color="#0f2cca"
				secondary-color="#ff5900"
				panel-background="#dac2a8"
				primary-color-rgb="15, 44, 202"
				panel-border-radius="0"
				primary-background="#ffffff"
				primary-color-hover="#1132e6"
				small-border-radius="0"
				detail-border-radius="0"
				panel-background-rgb="218, 194, 168"
				panel-background-dark="#ceae8b"
				primary-color-overlay="rgba(15, 44, 202, 0.14)"
				panel-background-light="#e6d6c5"
				primary-background-rgb="255, 255, 255"
				panel-background-overlay="rgba(218, 194, 168, 0.25)"
				panel-background-overlay-dense="rgba(218, 194, 168, 0.85)"
			></a-organization-page>
		</div>
	)
}

export default BookingComponent
