import { Navigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { checkUserWithTokens } from '../../services/reducers/auth-user-slice'

export function ProtectedRouteElement({ element }) {
	const { user } = useSelector(state => state.authUserReducer)
	const dispatch = useDispatch()
	const location = useLocation()
	const [isUserLoaded, setUserLoaded] = useState(false)
	const init = async () => {
		await dispatch(checkUserWithTokens())
		setUserLoaded(true)
	}
	useEffect(() => {
		init()
	}, [location])

	if (!isUserLoaded) return null
	return user.email ? element : <Navigate to='/login' replace />
}
