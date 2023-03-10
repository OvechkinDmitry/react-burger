import React, { useState } from 'react'
import styles from '../access-pages.module.css'
import {
	Button,
	EmailInput,
	Input,
	PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Navigate, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../../services/actions/register-user'

const Register = () => {
	const dispatch = useDispatch()
	const { user, status } = useSelector(state => state.authUserReducer)
	const [form, setValue] = useState({ name: '', email: '', password: '' })
	const onChange = e => {
		setValue({ ...form, [e.target.name]: e.target.value })
	}
	const onClick = async () => {
		dispatch(registerUser(form))
	}
	if (user.email) {
		return <Navigate to={'/profile'} replace />
	}
	return (
		<div className={`${styles.container}`}>
			<p className={`text text_type_main-medium mb-6`} style={{ color: 'red' }}>
				{status.error}
			</p>
			<p className={`text text_type_main-medium mb-6`}>Регистрация</p>
			<Input
				type={'text'}
				placeholder={'Имя'}
				value={form.name}
				name={'name'}
				onChange={onChange}
				error={false}
				errorText={'Ошибка'}
				extraClass='mb-6'
			/>
			<EmailInput
				placeholder={'E-mail'}
				value={form.email}
				name={'email'}
				onChange={onChange}
				errorText={'Ошибка'}
				extraClass='mb-6'
			/>
			<PasswordInput
				value={form.password}
				placeholder={'Пароль'}
				onChange={onChange}
				name={'password'}
				errorText={'Ошибка'}
				extraClass='mb-6'
			/>
			<Button
				htmlType='button'
				type='primary'
				size='medium'
				onClick={onClick}
				extraClass={'mb-20'}
			>
				Зарегистрироваться
			</Button>
			<p className={`text text_type_main-small text_color_inactive`}>
				Уже зарегистрированы?{' '}
				<NavLink className={styles.link} to={'/login'}>
					Войти
				</NavLink>
			</p>
		</div>
	)
}

export default Register
