import React, { useState } from 'react'
import styles from '../access-pages.module.css'
import {
	Button,
	EmailInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { postForgotPassword } from '../../../utils/post-forgot-password'
import { useSelector } from 'react-redux'

const ForgotPassword = () => {
	const { user } = useSelector(state => state.authUserReducer)
	const navigate = useNavigate()
	const [form, setValue] = useState({ email: '' })
	const onChange = e => {
		setValue({ ...form, [e.target.name]: e.target.value })
	}
	const onClick = async () => {
		try {
			const data = await postForgotPassword(form.email)()
			navigate('/reset-password')
		} catch (e) {
			console.log(e)
		}
	}
	if (user.email !== '') {
		return <Navigate to={'/'} replace />
	}
	return (
		<div className={`${styles.container}`}>
			<p className={`text text_type_main-medium mb-6`}>Восстановление пароля</p>
			<EmailInput
				value={form.email}
				placeholder={'Укажите e-mail'}
				errorText={'Введите правильный формат email'}
				onChange={onChange}
				name={'email'}
				extraClass='mb-6'
			/>
			<Button
				htmlType='button'
				type='primary'
				size='medium'
				onClick={onClick}
				extraClass={'mb-20'}
			>
				Восстановить
			</Button>
			<p className={`text text_type_main-small text_color_inactive`}>
				Вспомнили пароль?{' '}
				<NavLink className={styles.link} to={'/login'}>
					Войти
				</NavLink>
			</p>
		</div>
	)
}

export default ForgotPassword
