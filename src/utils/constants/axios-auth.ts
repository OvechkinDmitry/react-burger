import axios, { AxiosInstance } from 'axios'

const NomorepartiesAuth: AxiosInstance = axios.create({
	baseURL: 'https://norma.nomoreparties.space/api/',
	headers: {
		Accept: 'application/json'
	},
	timeout: 0
})

NomorepartiesAuth.interceptors.request.use(config => {
	// здесь висист interceptor у обычного экземпляра не вешается поле Authorization
	config.headers.Authorization =
		'Bearer ' + (localStorage.getItem('accessToken') || ' ')
	return config
})

export default NomorepartiesAuth
