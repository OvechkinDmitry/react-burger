import React, { useState } from 'react'
import styles from './app-header.module.css'
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavButton } from './ui/nav-button/nav-button'
import { useSelector } from 'react-redux'

const AppHeader = () => {
	const { user } = useSelector(state => state.authUserReducer)
	return (
		<header className={styles.header}>
			<nav className={styles.headerContainer + ' pt-4 pb-4'}>
				<NavButton text={'Конструктор'} link={'/'}>
					<BurgerIcon type='primary' />
				</NavButton>
				<NavButton text={'Лента заказов'} link={'/orders'}>
					<ListIcon type='primary' />
				</NavButton>
				<div className={styles.logo}>
					<Logo />
				</div>
				<NavButton text={user.name || 'Личный кабинет'} link={'/profile'}>
					<ProfileIcon type='primary' />
				</NavButton>
			</nav>
		</header>
	)
}

export default AppHeader
