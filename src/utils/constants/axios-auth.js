import axios from 'axios'

const NomorepartiesAuth = axios.create({
	baseURL: 'https://norma.nomoreparties.space/api/',
	headers: {
		Accept: 'application/json'
	},
	timeout: 0
})

NomorepartiesAuth.interceptors.request.use(config => {
	console.log(localStorage.getItem('accessToken'))
	config.headers.Authorization =
		'Bearer ' + (localStorage.getItem('accessToken') || ' ')
	return config
})

export default NomorepartiesAuth
