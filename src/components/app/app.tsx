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
	//todo: через наличие токенов следить за запросами чтобы не было долгих перезагрузок
	const [isUserChecked, setUserChecked] = useState(false)
	const dispatch = useDispatch()
	const checkUser = async () => {
		try {
			const res = await refresh()
			const { accessToken, refreshToken } = res.data
			localStorage.setItem('refreshToken', refreshToken)
			localStorage.setItem('accessToken', accessToken.split('Bearer ')[1])
			const userData = await getUserData()
			dispatch(updateUser(userData.data.user))
		} catch (e) {
			dispatch(updateUser({ email: '', passwoord: '', name: '' }))
		}
	}
	//todo: сейчас при каждом обновлении
	const init = async () => {
		try {
			const res = await getUserData()
			dispatch(updateUser(res.data.user))
		} catch (e) {
			console.log(e)
			await checkUser()
		}
		setUserChecked(true)
	}
	useEffect(() => {
		init()
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
