export type TAuthData = {
	success: boolean
	user: {
		email: string
		name: string
	}
	accessToken: string
	refreshToken: string
}

export type TUserData = Pick<TAuthData, 'user' | 'success'>

export type TLogout = {
	success: boolean
	message: string
}
