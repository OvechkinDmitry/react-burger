import { Navigate, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getUserData } from './get-user-data'

export function ProtectedRouteElement({ element }) {
	const { user } = useSelector(store => store.authUserReducer)
	const [isUserLoaded, setUserLoaded] = useState(false)
	const init = async () => {
		try {
			const data = await getUserData()
			console.log(data)
		} catch (e) {
			console.log(e)
		} finally {
			setUserLoaded(true)
		}
	}
	useEffect(() => {
		init()
	}, [])
	if (!isUserLoaded) return null
	return user.email ? element : <Navigate to='/login' replace />
}
