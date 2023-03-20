import axios, { AxiosInstance } from 'axios'

const NomorepartiesAuth: AxiosInstance = axios.create({
	baseURL: 'https://norma.nomoreparties.space/api/',
	headers: {
		Accept: 'application/json'
	},
	timeout: 0
})

NomorepartiesAuth.interceptors.request.use(config => {
	config.headers.Authorization =
		'Bearer ' + (localStorage.getItem('accessToken') || ' ')
	return config
})

export default NomorepartiesAuth
