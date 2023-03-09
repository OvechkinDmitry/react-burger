import { Navigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import useAuth from '../../hooks/use-auth'
import {
	exitUser,
	refreshToken,
	updateUser
} from '../../services/reducers/auth-user-slice'
import { AuthService } from '../../utils/auth-service'

export function ProtectedRouteElement({ element }) {
	const { user } = useAuth()
	const dispatch = useDispatch()
	const location = useLocation()
	const [isUserLoaded, setUserLoaded] = useState(false)
	// const checkUser = async () => {
	// 	try {
	// 		const res = await AuthService.refresh()
	// 		const { accessToken, refreshToken } = res.data
	// 		localStorage.setItem('refreshToken', refreshToken)
	// 		localStorage.setItem('accessToken', accessToken.split('Bearer ')[1])
	// 		const userData = await AuthService.getUserData()
	// 		dispatch(updateUser(userData.data.user))
	// 	} catch (e) {
	// 		console.log(e + 'checkUser')
	// 		dispatch(updateUser({ email: '', passwoord: '', name: '' }))
	// 	}
	// }
	const init = async () => {
		if (
			!localStorage.getItem('accessToken') ||
			!localStorage.getItem('refreshToken')
		) {
			dispatch(exitUser())
			setUserLoaded(true)
			return
		}
		try {
			const res = await AuthService.getUserData()
			console.log(res)
		} catch (e) {
			dispatch(refreshToken()) //делает рефреш
		}
		setUserLoaded(true)
	}
	useEffect(() => {
		init()
	}, [location])

	if (!isUserLoaded) return null
	return user.email ? element : <Navigate to='/login' replace />
}
