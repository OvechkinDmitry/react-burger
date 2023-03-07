import { NomorepartiesInstance, URL_LOGIN } from './constants'
import {
	dataError,
	dataLoading,
	dataSuccess
} from '../services/reducers/auth-user-slice'

function getCookie(name) {
	const value = `; ${document.cookie}`
	const parts = value.split(`; ${name}=`)
	if (parts.length === 2) return parts.pop().split(';').shift()
}
export const getAccessToken = accessToken => accessToken.split('Bearer ')[1]

export const postLogin = (userEmail, userPassword) => async dispatch => {
	dispatch(dataLoading())
	try {
		const res = await NomorepartiesInstance.post(URL_LOGIN, {
			email: userEmail,
			password: userPassword
		})
		const {
			accessToken,
			refreshToken,
			user: { name }
		} = res.data
		console.log(res.data)
		document.cookie = `refreshToken=${refreshToken}`
		document.cookie = `accessToken=${getAccessToken(accessToken)}`
		dispatch(
			dataSuccess({ password: userPassword, email: userEmail, name: name })
		)
	} catch (e) {
		dispatch(dataError())
		return Promise.reject(e)
	}
}
