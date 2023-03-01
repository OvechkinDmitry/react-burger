import React from 'react'
import styles from './personal-account.module.css'
import { NavLink, Route, Routes } from 'react-router-dom'
import Profile from './profile/profile'

const routes = [
	{
		title: 'Профиль',
		link: '/profile'
	},
	{
		title: 'История заказов',
		link: 'orders'
	},
	{
		title: 'Выход',
		link: 'exit'
	}
]

const PersonalAccount = () => {
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
				<p className={'text text_type_main-small text_color_inactive mt-20'}>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</div>
			<Routes>
				<Route path={'/'} element={<Profile />} />
				<Route path={'orders'} element={<div>working on it</div>} />
				<Route path={'exit'} element={<div>working on it</div>} />
			</Routes>
		</div>
	)
}

export default PersonalAccount
