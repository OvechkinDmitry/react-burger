import React from 'react'
import styles from './personal-account.module.css'
import { NavLink, Route, Routes } from 'react-router-dom'
import Profile from './profile/profile'
import { useDispatch } from 'react-redux'
import WarnLog from '../../ui/warn-log/warn-log'
import { logoutUser } from '../../../services/actions/logout-user'

const routes = [
	{
		title: 'Профиль',
		link: '/profile'
	},
	{
		title: 'История заказов',
		link: 'orders'
	}
]

const PersonalAccount = () => {
	const dispatch = useDispatch()
	const exit = () => {
		dispatch(logoutUser())
	}
	return (
		<div className={styles.body}>
			<div className={`${styles.navigation} mr-15`}>
				{routes.map(({ title, link }, index) => (
					<NavLink
						key={index}
						end
						to={`${link}`}
						className={({ isActive }) =>
							`text text_type_main-medium ${styles.navLink} 
							${isActive ? '' : 'text_color_inactive'}`
						}
					>
						{title}
					</NavLink>
				))}
				<div
					className={`text text_type_main-medium ${styles.navLink} text_color_inactive`}
					onClick={exit}
				>
					Выход
				</div>
				<p className={'text text_type_main-small text_color_inactive mt-20'}>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</div>
			<Routes>
				<Route path={'/'} element={<Profile />} />
				<Route path={'orders'} element={<WarnLog>working on it</WarnLog>} />
			</Routes>
		</div>
	)
}

export default PersonalAccount
