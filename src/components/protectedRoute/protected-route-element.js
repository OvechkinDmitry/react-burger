import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function ProtectedRouteElement({ element }) {
	const { user } = useSelector(state => state.authUserReducer)
	return user.email ? element : <Navigate to='/login' replace />
}
