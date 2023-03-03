import { NomorepartiesInstance, URL_PASSWORD_RESET } from './constants'

export const postResetPassword = (password, code) => async () => {
	try {
		console.log(password, code)
		const res = await NomorepartiesInstance.post(URL_PASSWORD_RESET, {
			password: password,
			token: code
		})
		console.log(res)
		return res.data
	} catch (e) {
		return Promise.reject(e)
	}
}
