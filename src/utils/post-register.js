import { NomorepartiesInstance, URL_REGISTER } from './constants/constants'

export const postRegister = (email, password, name) => async () => {
	try {
		const res = await NomorepartiesInstance.post(URL_REGISTER, {
			email: email,
			password: password,
			name: name
		})
		return res.data
	} catch (e) {
		return Promise.reject(e)
	}
}
