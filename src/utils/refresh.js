import React from 'react'

const refresh = async () => {
	const res = await fetch('https://norma.nomoreparties.space/api/auth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken')
		})
	})
	if (res.ok) {
		const body = await res.json()
		localStorage.setItem('refreshToken', body.refreshToken)
		localStorage.setItem('accessToken', body.accessToken.split('Bearer ')[1])
		// return body
	} else {
		const data = await res.json()
		console.log(data)
	}
	return res.ok
}

export default refresh
