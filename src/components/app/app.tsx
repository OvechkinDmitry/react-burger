import React, { useEffect, useState } from 'react'
import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import ErrorBoundary from '../../hocs/error-boundary/error-boundary'
import Constructor from '../pages/constructor/constructor'
import { Route, Routes } from 'react-router-dom'
import PersonalAccount from '../pages/personal-account/personal-account'
import Login from '../pages/login/login'
import ForgotPassword from '../pages/forgot-password/forgot-password'
import ResetPassword from '../pages/reset-password/reset-password'
import Register from '../pages/register/register'
import { ProtectedRouteElement } from '../protectedRoute/protected-route-element'
import WarnLog from '../ui/warn-log/warn-log'
import { getUserData } from '../protectedRoute/get-user-data'
import { bool } from 'prop-types'
import { updateUser } from '../../services/reducers/auth-user-slice'
import refresh from '../../utils/refresh'
import { useDispatch } from 'react-redux'

//Todo:
// / - главная страница, конструктор бургеров.
// /login - страница авторизации.
// /register - страница регистрации.
// /forgot-password - страница восстановления пароля.
// /reset-password - страница сброса пароля.
// /profile — страница с настройками профиля пользователя.
// /ingredients/:id — страница ингредиента.

function App() {
	const [isUserChecked, setUserChecked] = useState(false)
	const dispatch = useDispatch()
	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken')
		if (accessToken) {
			const checkUser = async () => {
				const res = await getUserData()
				if (res.ok) {
					const body = await res.json()
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
			checkUser()
		}
		return () => setUserChecked(true)
	}, [])
	if (!isUserChecked) return null
	return (
		<ErrorBoundary>
			<AppHeader />
			<main className={styles.container}>
				<Routes>
					<Route path={'/'} element={<Constructor />} />
					<Route
						path={'/orders'}
						element={
							<ProtectedRouteElement
								element={<WarnLog>working on it</WarnLog>}
							/>
						}
					/>
					<Route path={'/login'} element={<Login />} />
					<Route path={'/forgot-password'} element={<ForgotPassword />} />
					<Route
						path={'/profile/*'}
						element={<ProtectedRouteElement element={<PersonalAccount />} />}
					/>
					{/*<Route path={'/profile/*'} element={<PersonalAccount />} />*/}
					<Route path={'/reset-password'} element={<ResetPassword />} />
					<Route path={'/register'} element={<Register />} />
				</Routes>
			</main>
		</ErrorBoundary>
	)
}

export default App
