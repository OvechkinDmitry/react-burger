import React, { useState } from 'react'
import styles from '../access-pages.module.css'
import {
	Button,
	EmailInput,
	PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom'
import { postLogin } from '../../../utils/post-login'

const Login = () => {
	const [form, setValue] = useState({ email: '', password: '' })
	const onChange = e => {
		setValue({ ...form, [e.target.name]: e.target.value })
	}
	const onClick = async () => {
		try {
			const data = await postLogin(form.email, form.password)()
			console.log(data)
		} catch (e) {
			console.log(e.response)
		}
	}
	return (
		<div className={styles.container}>
			<p className={`text text_type_main-medium mb-6`}>Вход</p>
			<EmailInput
				placeholder={'E-mail'}
				value={form.email}
				onChange={onChange}
				name={'email'}
				// isIcon={true}
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
