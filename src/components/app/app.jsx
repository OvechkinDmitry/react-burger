import React, { useEffect } from 'react'
import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import ErrorBoundary from '../../hocs/error-boundary/error-boundary'
import Constructor from '../../pages/constructor/constructor'
import { Route, Routes, useLocation } from 'react-router-dom'
import PersonalAccount from '../../pages/personal-account/personal-account'
import Login from '../../pages/login/login'
import ForgotPassword from '../../pages/forgot-password/forgot-password'
import ResetPassword from '../../pages/reset-password/reset-password'
import Register from '../../pages/register/register'
import { ProtectedRouteElement } from '../protectedRoute/protected-route-element'
import WarnLog from '../ui/warn-log/warn-log'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../ui/loader/loader'
import { checkUserWithTokens } from '../../services/actions/check-user-with-tokens'
import IngredientDetails from '../ingredient-details/ingredient-details'
import { ModalSwitch } from '../modal-switch/modal-switch'
import { fetchIngredients } from '../../services/actions/fetch-ingredients'
import { URL_INGREDIENTS } from '../../utils/constants/constants'
import NotFound from '../../pages/not-found/not-found'
import Profile from '../../pages/personal-account/profile/profile'

function App() {
	const dispatch = useDispatch()
	const location = useLocation()
	const { isChecking } = useSelector(state => state.authUserReducer)
	const background = location.state && location.state.background
	useEffect(() => {
		dispatch(checkUserWithTokens())
		dispatch(fetchIngredients(URL_INGREDIENTS))
	}, [dispatch])
	return (
		<ErrorBoundary>
			<AppHeader />
			{!isChecking ? (
				<main className={styles.container}>
					<Routes location={background || location}>
						<Route path={'/'} element={<Constructor />} />
						<Route
							path={'/orders'}
							element={
								<ProtectedRouteElement
									element={<WarnLog>working on it</WarnLog>}
								/>
							}
						/>
						<Route
							path={'/login'}
							element={<ProtectedRouteElement guest element={<Login />} />}
						/>
						<Route
							path={'/forgot-password'}
							element={
								<ProtectedRouteElement guest element={<ForgotPassword />} />
							}
						/>
						<Route
							path={'/profile'}
							element={<ProtectedRouteElement element={<PersonalAccount />} />}
						>
							<Route index element={<Profile />} />
							<Route
								path={'orders'}
								element={<WarnLog>working on it</WarnLog>}
							/>
						</Route>
						<Route
							path={'/reset-password'}
							element={
								<ProtectedRouteElement guest element={<ResetPassword />} />
							}
						/>
						<Route
							path={'/register'}
							element={<ProtectedRouteElement guest element={<Register />} />}
						/>
						<Route path={'/*'} element={<NotFound />} />
						<Route
							path={'/ingredients/:ingredientId'}
							element={<IngredientDetails />}
						/>
					</Routes>
					<ModalSwitch background={background} />
				</main>
			) : (
				<div style={{ marginTop: 50 }}>
					<Loader />
				</div>
			)}
		</ErrorBoundary>
	)
}

export default App
