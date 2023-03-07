import React from 'react'
import styles from './personal-account.module.css'
import { NavLink, Route, Routes } from 'react-router-dom'
import Profile from './profile/profile'
import { useDispatch } from 'react-redux'
import { exitUser } from '../../../services/reducers/auth-user-slice'
import WarnLog from '../../ui/warn-log/warn-log'
import { postLogout } from '../../../utils/post-logout'

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
	const exit = async e => {
		e.preventDefault()
		try {
			const res = await postLogout()
			const data = await res.json()
			console.log(data)
			dispatch(exitUser())
		} catch (e) {
			console.log(e)
		}
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
