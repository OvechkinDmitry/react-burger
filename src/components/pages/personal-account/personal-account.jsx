import React from 'react'
import styles from './personal-account.module.css'
import { NavLink } from 'react-router-dom'

const PersonalAccount = () => {
	const routes = [
		{
			title: 'Профиль',
			link: '/profile'
		},
		{
			title: 'История заказов',
			link: '/qwqwqw'
		},
		{
			title: 'Выход',
			link: '/qwqqqwqq'
		}
	]
	const activeClassName = `text text_type_main-medium ${styles.navLink}`
	const inactiveClassName = `text text_type_main-medium text_color_inactive ${styles.navLink}`
	return (
		<div className={styles.body}>
			<div className={styles.navigation}>
				{/*{routes.map(({ title, link }, index) => (*/}
				{/*	<NavLink*/}
				{/*		key={index}*/}
				{/*		to={`${link}`}*/}
				{/*		className={({ isActive }) =>*/}
				{/*			isActive ? activeClassName : inactiveClassName*/}
				{/*		}*/}
				{/*	>*/}
				{/*		{title}*/}
				{/*	</NavLink>*/}
				{/*))}*/}
				<NavLink
					to={'/profile'}
					className={({ isActive }) => {
						console.log(isActive)
						return isActive ? activeClassName : inactiveClassName
					}}
				>
					Профиль
				</NavLink>

				<NavLink
					to={'/'}
					className={({ isActive }) => {
						console.log(isActive)
						return isActive ? activeClassName : inactiveClassName
					}}
				>
					История заказов
				</NavLink>
				<p className={'text text_type_main-small text_color_inactive mt-20'}>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</div>
			<div className={styles.inputs}></div>
		</div>
	)
}

export default PersonalAccount
