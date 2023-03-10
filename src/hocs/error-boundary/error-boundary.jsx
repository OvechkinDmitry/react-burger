import React from 'react'
import WarnLog from '../../components/ui/warn-log/warn-log'
import PropTypes from 'prop-types'

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError() {
		return { hasError: true }
	}

	componentDidCatch(error, errorInfo) {
		console.log('Возникла ошибка: ', error, errorInfo)
	}

	render() {
		if (this.state.hasError) return <WarnLog>Ошибка</WarnLog>
		return this.props.children
	}
}

ErrorBoundary.propTypes = {
	children: PropTypes.node.isRequired
}

export default ErrorBoundary
