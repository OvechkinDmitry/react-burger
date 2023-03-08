import {
	NomorepartiesInstance,
	URL_FORGOT_PASSWORD
} from './constants/constants'

export const postForgotPassword = email => async () => {
	try {
		console.log(email)
		const res = await NomorepartiesInstance.post(URL_FORGOT_PASSWORD, {
			email: email
		})
		console.log(res)
		return res
	} catch (e) {
		return Promise.reject(new Error(e))
	}
}
