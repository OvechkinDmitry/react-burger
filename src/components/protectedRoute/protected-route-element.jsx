import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function ProtectedRouteElement({ element, guest = false }) {
	const location = useLocation()
	const from = location.state?.from || '/'
	const { user } = useSelector(state => state.authUserReducer)
	if (user.email && guest) return <Navigate to={from} />
	if (!guest && !user.email)
		return <Navigate to='/login' state={{ from: location }} />
	return element
}
