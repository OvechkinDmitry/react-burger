export const patchUser = async form => {
	const res = fetch('https://norma.nomoreparties.space/api/auth/user', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('accessToken')
		},
		body: JSON.stringify(form)
	})
	return res
}
