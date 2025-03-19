import React from 'react'

const ErrorComponent = () => {
	throw Error('ErrorComponent Error')
	return <div>ErrorComponent</div>
}

export default ErrorComponent
