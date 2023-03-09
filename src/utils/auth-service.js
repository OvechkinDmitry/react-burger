import {
	NomorepartiesInstance,
	URL_FORGOT_PASSWORD,
	URL_LOGIN,
	URL_LOGOUT,
	URL_PASSWORD_RESET,
	URL_REGISTER,
	URL_USER
} from './constants/constants'
import NomorepartiesAuth from './constants/axios-auth'

export class AuthService {
	static async login(email, password) {
		return await NomorepartiesInstance.post(URL_LOGIN, {
			email: email,
			password: password
		})
	}

	static async logout() {
		return await NomorepartiesAuth.post(URL_LOGOUT, {
			token: localStorage.getItem('refreshToken')
		})
	}

	static async getUserData() {
		return await NomorepartiesAuth.get(URL_USER)
	}
}
