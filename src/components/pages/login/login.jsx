import React, { useEffect, useState } from 'react'
import styles from '../access-pages.module.css'
import {
	Button,
	EmailInput,
	PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Navigate, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../../services/reducers/auth-user-slice'

const Login = () => {
	const dispatch = useDispatch()
	const { user, status } = useSelector(state => state.authUserReducer)
	const [form, setValue] = useState({ email: '', password: '' })
	const onChange = e => {
		setValue({ ...form, [e.target.name]: e.target.value })
	}
	const onClick = () => {
		dispatch(loginUser({ userEmail: form.email, userPassword: form.password }))
	}
	if (user.email) return <Navigate to={'/profile'} />
	return (
		<div className={styles.container}>
			<p className={`text text_type_main-medium mb-6`} style={{ color: 'red' }}>
				{status.error}
			</p>
			<p className={`text text_type_main-medium mb-6`}>Вход</p>
			<EmailInput
				placeholder={'E-mail'}
				value={form.email}
				onChange={onChange}
				name={'email'}
				extraClass='mb-6'
			/>
			<PasswordInput
				placeholder={'Пароль'}
				value={form.password}
				onChange={onChange}
				name={'password'}
				errorText={'Ошибка'}
				extraClass='mb-6'
			/>
			<Button onClick={onClick} htmlType='button' type='primary' size='medium'>
				Войти
			</Button>
			<p className={`text text_type_main-small text_color_inactive mt-20`}>
				Вы — новый пользователь?{' '}
				<NavLink className={styles.link} to={'/register'}>
					Зарегистрироваться
				</NavLink>
			</p>
			<p className={`text text_type_main-small text_color_inactive mt-4`}>
				Забыли пароль?{' '}
				<NavLink className={styles.link} to={'/forgot-password'}>
					Восстановить пароль
				</NavLink>
			</p>
		</div>
	)
}

export default Login
