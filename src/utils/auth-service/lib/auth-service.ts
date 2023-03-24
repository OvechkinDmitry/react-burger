import {
	NomorepartiesInstance,
	URL_FORGOT_PASSWORD,
	URL_LOGIN,
	URL_LOGOUT,
	URL_PASSWORD_RESET,
	URL_REGISTER,
	URL_TOKEN,
	URL_USER
} from '../../constants/constants'
import NomorepartiesAuth from '../../constants/axios-auth'
import { AxiosError, AxiosResponse } from 'axios'
import { TAuthData, TLogout, TUserData } from '../model/types'

export type TRefreshData = {
	success: boolean
	refreshToken: string
	accessToken: string
}

export type TRefreshToken = {
	success: boolean
	data: { data: object }
}

export class AuthService {
	static async login(email: string, password: string) {
		return await NomorepartiesInstance.post<TAuthData>(URL_LOGIN, {
			email: email,
			password: password
		})
	}

	static async register(email: string, password: string, name: string) {
		return await NomorepartiesInstance.post<TAuthData>(URL_REGISTER, {
			email: email,
			password: password,
			name: name
		})
	}

	static async logout() {
		return await NomorepartiesAuth.post<TLogout>(URL_LOGOUT, {
			token: localStorage.getItem('refreshToken')
		})
	}

	static async getUserData() {
		return await NomorepartiesAuth.get<TUserData>(URL_USER)
	}

	static async patchUser(form: { [key: string]: string }) {
		return await NomorepartiesAuth.patch<TUserData>(URL_USER, { ...form })
	}

	static async refresh() {
		return await NomorepartiesInstance.post<TRefreshData>(URL_TOKEN, {
			token: localStorage.getItem('refreshToken')
		})
	}
	static async getMailReset(email: string) {
		return await NomorepartiesInstance.post(URL_FORGOT_PASSWORD, {
			email: email
		})
	}

	static async resetPassword(password: string, token: string) {
		return await NomorepartiesInstance.post(URL_PASSWORD_RESET, {
			password: password,
			token: token
		})
	}

	static async refreshToken(request: () => Promise<AxiosResponse<TUserData>>) {
		try {
			const res = await this.refresh()
			localStorage.setItem('refreshToken', res.data['refreshToken'])
			localStorage.setItem(
				'accessToken',
				res.data['accessToken'].split('Bearer ')[1]
			)
			const data = await request()
			return {
				success: true,
				data: data?.data
			}
		} catch (e) {
			const error = e as AxiosError
			return {
				success: false,
				error: error.message,
				data: {} as TUserData
			}
		}
	}
}
