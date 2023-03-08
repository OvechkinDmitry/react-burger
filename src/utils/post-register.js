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
		if (e.message === 'Request failed with status code 403')
			return Promise.reject('Пользователь с таким именем уже существует')
	}
}
