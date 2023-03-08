import { NomorepartiesAuth, URL_USER } from './constants/constants'

export const patchUser = async form => {
	return fetch('https://norma.nomoreparties.space/api/auth/user', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('accessToken')
		},
		body: JSON.stringify(form)
	})
}

// export const patchUser = async form => {
// 	await NomorepartiesAuth(URL_USER,{
// 		headers:{
//
// 		}
// 	})
// }
