import { Navigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { exitUser, refreshToken } from '../../services/reducers/auth-user-slice'
import { AuthService } from '../../utils/auth-service'

export function ProtectedRouteElement({ element }) {
	const { user } = useSelector(state => state.authUserReducer)
	const dispatch = useDispatch()
	const location = useLocation()
	const [isUserLoaded, setUserLoaded] = useState(false)
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
			await dispatch(refreshToken()) //делает рефреш
		}
		setUserLoaded(true)
	}
	useEffect(() => {
		init()
	}, [location])

	if (!isUserLoaded) return null
	return user.email ? element : <Navigate to='/login' replace />
}
