import { Navigate, useLocation } from 'react-router-dom'
import { FC, ReactElement } from 'react'
import { useTypedSelector } from '../../hooks/use-typed-selector'

type TProtectedRouteElement = {
	element: ReactElement
	guest?: boolean
}

export const ProtectedRouteElement: FC<TProtectedRouteElement> = ({
	element,
	guest = false
}): ReactElement | null => {
	const location = useLocation()
	const from = location.state?.from || '/'
	const { user } = useTypedSelector(state => state.authUserReducer)
	if (user.email && guest) return <Navigate to={from} />
	if (!guest && !user.email)
		return <Navigate to='/login' state={{ from: location }} />
	return element
}
