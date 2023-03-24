import React, { FC } from 'react'
import styles from './personal-account.module.css'
import { NavLink, Outlet } from 'react-router-dom'
import { logoutUser } from '../../services/actions/logout-user/lib/logout-user'
import { useTypedDispatch } from '../../hooks/use-typed-dispatch'

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

const PersonalAccount: FC = () => {
	const dispatch = useTypedDispatch()
	const exit = (): void => {
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
			<Outlet />
		</div>
	)
}

export default PersonalAccount
