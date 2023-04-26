import axios, { AxiosInstance } from 'axios'

export const STORE_ADRESS = 'http://localhost:3000'
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

export const testBun = {
	_id: '643d69a5c3f7b9001cfa0942',
	name: 'Булка',
	type: 'sauce',
	proteins: 30,
	fat: 20,
	carbohydrates: 40,
	calories: 30,
	price: 90,
	image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
	__v: 0
}

export const testItem = {
	_id: '643d69a5c3f7b9001cfa0942',
	name: 'Соус Spicy-X',
	type: 'sauce',
	proteins: 30,
	fat: 20,
	carbohydrates: 40,
	calories: 30,
	price: 90,
	image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
	__v: 0,
	index: 'c0a9ecb0-e2d0-11ed-92f3-b34f6244a487'
}
