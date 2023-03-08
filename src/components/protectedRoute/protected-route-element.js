import { Navigate, Route, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getUserData } from './get-user-data'
import useAuth from '../../hooks/use-auth'
import { updateUser } from '../../services/reducers/auth-user-slice'
import refresh from '../../utils/refresh'

export function ProtectedRouteElement({ element }) {
	const { user } = useAuth()
	const dispatch = useDispatch()
	const location = useLocation()
	const [isUserLoaded, setUserLoaded] = useState(false)
	const checkUser = async () => {
		try {
			const res = await refresh()
			const { accessToken, refreshToken } = res.data
			localStorage.setItem('refreshToken', refreshToken)
			localStorage.setItem('accessToken', accessToken.split('Bearer ')[1])
			const userData = await getUserData()
			dispatch(updateUser(userData.data.user))
		} catch (e) {
			// console.log(e)
			dispatch(updateUser({ email: '', passwoord: '', name: '' }))
		}
	}
	const init = async () => {
		try {
			console.log('Зашел')
			const res = await getUserData()
			console.log(res)
		} catch (e) {
			checkUser()
		}
		setUserLoaded(true)
	}
	useEffect(() => {
		init()
	}, [location])

	if (!isUserLoaded) return null
	return user.email ? element : <Navigate to='/login' replace />
}
