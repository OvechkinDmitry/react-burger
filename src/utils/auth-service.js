import {
	NomorepartiesInstance,
	URL_FORGOT_PASSWORD,
	URL_LOGIN,
	URL_LOGOUT,
	URL_PASSWORD_RESET,
	URL_REGISTER,
	URL_TOKEN,
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

	static async register(email, password, name) {
		return await NomorepartiesInstance.post(URL_REGISTER, {
			email: email,
			password: password,
			name: name
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

	static async patchUser(form) {
		return await NomorepartiesAuth.patch(URL_USER, { ...form })
	}

	static async refresh() {
		return await NomorepartiesInstance.post(URL_TOKEN, {
			token: localStorage.getItem('refreshToken')
		})
	}
	static async getMailReset(email) {
		return await NomorepartiesInstance.post(URL_FORGOT_PASSWORD, {
			email: email
		})
	}

	static async resetPassword(password, token) {
		return await NomorepartiesInstance.post(URL_PASSWORD_RESET, {
			password: password,
			token: token
		})
	}
}
