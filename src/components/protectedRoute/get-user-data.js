export const getUserData = async () => {
	const res = await fetch('https://norma.nomoreparties.space/api/auth/user', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('accessToken')
		}
	})
	return res.json()
}
