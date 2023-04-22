import axios, { AxiosInstance } from 'axios'

export const URL_INGREDIENTS = '/ingredients'
export const URL_ORDER = '/orders'
export const URL_FORGOT_PASSWORD = '/password-reset'
export const URL_PASSWORD_RESET = '/password-reset/reset'
export const URL_REGISTER = '/auth/register'
export const URL_LOGIN = 'auth/login'
export const URL_USER = 'auth/user'
export const URL_TOKEN = 'auth/token'
export const URL_LOGOUT = 'auth/logout'

export const NomorepartiesInstance: AxiosInstance = axios.create({
	baseURL: 'https://norma.nomoreparties.space/api/',
	timeout: 0,
	headers: {
		Accept: 'application/json'
	}
})
