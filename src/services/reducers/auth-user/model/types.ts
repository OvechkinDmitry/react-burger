export type TAuthState = {
	user: {
		name: string
		email: string
	}
	isChecking: boolean
	status: {
		isError: boolean
		isLoading: boolean
		error: string
	}
}
