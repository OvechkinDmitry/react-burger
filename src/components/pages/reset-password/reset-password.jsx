import React, { useState } from 'react'
import styles from '../access-pages.module.css'
import {
	Button,
	Input,
	PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AuthService } from '../../../utils/auth-service'
import { useForm } from '../../../hooks/useForm'

const ResetPassword = () => {
	const navigate = useNavigate()
	const { user } = useSelector(state => state.authUserReducer)
	const [pageError, setPageError] = useState('')
	const { values, handleChange } = useForm({ password: '', code: '' })
	const onClick = async () => {
		try {
			await AuthService.resetPassword(values.password, values.code)
			navigate('/login')
		} catch (e) {
			setPageError('Неверный токен')
		}
	}
	if (user.email !== '') {
		return <Navigate to={'/'} replace />
	}
	return (
		<div className={`${styles.container}`}>
			<p className={`text text_type_main-medium mb-6`} style={{ color: 'red' }}>
				{pageError}
			</p>
			<p className={`text text_type_main-medium mb-6`}>Восстановление пароля</p>
			<PasswordInput
				placeholder={'Введите новый пароль'}
				name={'password'}
				value={values.password}
				onChange={handleChange}
				errorText={'Пароль слишком короткий'}
				extraClass='mb-6'
			/>
			<Input
				type={'text'}
				placeholder={'Введите код из письма'}
				icon={''}
				value={values.code}
				name={'code'}
				error={false}
				onChange={handleChange}
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

export default ResetPassword
