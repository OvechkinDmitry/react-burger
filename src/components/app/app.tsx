import React from 'react'
import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import ErrorBoundary from '../../hocs/error-boundary/error-boundary'
import Constructor from '../pages/constructor/constructor'
import { Route, Routes } from 'react-router-dom'
import PersonalAccount from '../pages/personal-account/personal-account'
import Login from '../pages/login/login'

//Todo:
// / - главная страница, конструктор бургеров.
// /login - страница авторизации.
// /register - страница регистрации.
// /forgot-password - страница восстановления пароля.
// /reset-password - страница сброса пароля.
// /profile — страница с настройками профиля пользователя.
// /ingredients/:id — страница ингредиента.

function App() {
	return (
		<ErrorBoundary>
			<AppHeader />
			<main className={styles.container}>
				<Routes>
					<Route path={'/'} element={<Constructor />} />
					<Route path={'/orders'} element={<div>working on it</div>} />
					<Route path={'/login'} element={<Login />} />
					<Route path={'/profile/*'} element={<PersonalAccount />} />
				</Routes>
			</main>
		</ErrorBoundary>
	)
}

export default App
