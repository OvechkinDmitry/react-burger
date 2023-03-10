import React from 'react'
import styles from '../access-pages.module.css'
import {
	Button,
	EmailInput,
	PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../services/actions/login-user'
import { useForm } from '../../hooks/useForm'

const Login = () => {
	const dispatch = useDispatch()
	const { status } = useSelector(state => state.authUserReducer)
	const { values, handleChange } = useForm({
		email: '',
		password: ''
	})
	const onSubmit = e => {
		e.preventDefault()
		dispatch(loginUser(values))
	}
	return (
		<div className={styles.container}>
			<p className={`text text_type_main-medium mb-6`} style={{ color: 'red' }}>
				{status.error}
			</p>
			<p className={`text text_type_main-medium mb-6`}>Вход</p>
			<form onSubmit={onSubmit}>
				<EmailInput
					placeholder={'E-mail'}
					value={values.email}
					onChange={handleChange}
					name={'email'}
					extraClass='mb-6'
				/>
				<PasswordInput
					placeholder={'Пароль'}
					value={values.password}
					onChange={handleChange}
					name={'password'}
					errorText={'Ошибка'}
					extraClass='mb-6'
				/>
				<Button htmlType='submit' type='primary' size='medium'>
					Войти
				</Button>
			</form>
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
