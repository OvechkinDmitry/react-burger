export const getUserData = async () => {
	return await fetch('https://norma.nomoreparties.space/api/auth/user', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('accessToken')
		}
	})
}
