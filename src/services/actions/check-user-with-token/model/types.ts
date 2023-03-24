export type TUser = {
	email: string
	name: string
}
export type TRejectValue = {
	data: {
		success: boolean
		user: {
			email: string
			name: string
		}
	}
	success: boolean
}
