import { URL_USER } from './constants/constants'
import NomorepartiesAuth from './constants/axios-auth'

export const patchUser = async form => {
	return await NomorepartiesAuth.patch(URL_USER, { ...form })
}
