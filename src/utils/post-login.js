import { NomorepartiesInstance, URL_LOGIN } from './constants'

export const postLogin = (email, password) => async () => {
	try {
		const res = await NomorepartiesInstance.post(URL_LOGIN, {
			email: email,
			password: password
		})
		return res.data
	} catch (e) {
		return Promise.reject(e)
	}
}
