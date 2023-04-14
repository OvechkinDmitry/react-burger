export const WS_BASE_URL = 'wss://norma.nomoreparties.space/orders'
export const WS_ALL = `${WS_BASE_URL}/all`
export const WS_USER = `${WS_BASE_URL}?token=${localStorage.getItem(
	'accessToken'
)}`
