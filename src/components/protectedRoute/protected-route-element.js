import { Navigate, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getUserData } from './get-user-data'
import useAuth from '../../hooks/use-auth'
import { updateUser } from '../../services/reducers/auth-user-slice'
import refresh from '../../utils/refresh'

export function ProtectedRouteElement({ element }) {
	const { user } = useAuth()
	const dispatch = useDispatch()
	const [isUserLoaded, setUserLoaded] = useState(false)
	const checkUser = async () => {
		const res = await getUserData()
		if (res.ok) {
			const body = await res.json()
			console.log()
			dispatch(updateUser(body.user))
		} else {
			const success = await refresh()
			if (success) {
				const reResponse = await getUserData()
				const reBody = await reResponse.json()
				dispatch(updateUser(reBody.user))
			}
		}
	}
	const init = async () => {
		const accessToken = localStorage.getItem('accessToken')
		const res = await getUserData()
		if (!res.ok && accessToken) {
			console.log(await res.json())
			checkUser()
		}
		setUserLoaded(true)
	}
	useEffect(() => {
		init()
	}, [])

	if (!isUserLoaded) return null
	return user.email ? element : <Navigate to='/login' replace />
}
