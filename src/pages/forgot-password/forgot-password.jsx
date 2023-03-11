import React from 'react'
import styles from '../access-pages.module.css'
import {
	Button,
	EmailInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AuthService } from '../../utils/auth-service'
import { useForm } from '../../hooks/useForm'

const ForgotPassword = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { values, handleChange } = useForm({ email: '' })
	const onSubmit = async e => {
		e.preventDefault()
		try {
			//навигации не произойдет, тк при впри возникновении ошибки
			//содержимое try не пройдет дальше вызова асинхронной функции (await)
			await AuthService.getMailReset(values.email)
			navigate('/reset-password', {
				replace: true,
				state: { from: location.pathname }
			})
		} catch (e) {
			console.log(e)
		}
	}
	return (
		<form onSubmit={onSubmit} className={`${styles.container}`}>
			<p className={`text text_type_main-medium mb-6`}>Восстановление пароля</p>
			<EmailInput
				value={values.email}
				placeholder={'Укажите e-mail'}
				errorText={'Введите правильный формат email'}
				onChange={handleChange}
				name={'email'}
				extraClass='mb-6'
			/>
			<Button
				htmlType='submit'
				type='primary'
				size='medium'
				onClick={onSubmit}
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
		</form>
	)
}

export default ForgotPassword
