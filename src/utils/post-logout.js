export const postLogout = async () => {
	console.log(localStorage.getItem('refreshToken'))
	const res = await fetch('https://norma.nomoreparties.space/api/auth/logout', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken')
		})
	})
	return res
}
