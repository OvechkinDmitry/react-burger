import React, { Component, ErrorInfo, ReactNode } from 'react'
import WarnLog from '../../components/ui/warn-log/warn-log'

type TErrorBoundary = {
	children: ReactNode
}

type TErrorBoundaryState = {
	hasError: boolean
}

class ErrorBoundary extends Component<TErrorBoundary, TErrorBoundaryState> {
	readonly state

	constructor(props: TErrorBoundary) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError() {
		return { hasError: true }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.log('Возникла ошибка: ', error, errorInfo)
	}

	render() {
		if (this.state.hasError) return <WarnLog>Ошибка</WarnLog>
		return this.props.children
	}
}

export default ErrorBoundary
