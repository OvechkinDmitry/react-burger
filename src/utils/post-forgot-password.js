import {
	NomorepartiesInstance,
	URL_FORGOT_PASSWORD
} from './constants/constants'

export const postForgotPassword = email => async () => {
	try {
		return await NomorepartiesInstance.post(URL_FORGOT_PASSWORD, {
			email: email
		})
	} catch (e) {
		return Promise.reject(e.message)
	}
}
