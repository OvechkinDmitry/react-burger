import {
	NomorepartiesInstance,
	URL_FORGOT_PASSWORD,
	URL_LOGIN,
	URL_PASSWORD_RESET,
	URL_REGISTER
} from './constants/constants'

export class AuthService {
	static async login(email, password) {
		return NomorepartiesInstance.post(URL_LOGIN, {
			email: email,
			password: password
		})
	}

	static async register(email, password, name) {
		return NomorepartiesInstance.post(URL_REGISTER, {
			email: email,
			password: password,
			name: name
		})
	}

	static async resetPassword(password, code) {
		return NomorepartiesInstance.post(URL_PASSWORD_RESET, {
			password: password,
			token: code
		})
	}

	static async forgotPassword(email) {
		return NomorepartiesInstance.post(URL_FORGOT_PASSWORD, {
			email: email
		})
	}
}
