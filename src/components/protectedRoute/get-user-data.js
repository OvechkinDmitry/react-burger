import NomorepartiesAuth from '../../utils/constants/axios-auth'
import { URL_USER } from '../../utils/constants/constants'

export const getUserData = async () => {
	return await NomorepartiesAuth.get(URL_USER)
}
