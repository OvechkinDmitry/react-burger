import { URL_LOGOUT } from './constants/constants'
import NomorepartiesAuth from './constants/axios-auth'

export const postLogout = async () => {
	return await NomorepartiesAuth.post(URL_LOGOUT, {
		token: localStorage.getItem('refreshToken')
	})
}
