import React, { FC, FormEvent } from 'react'
import styles from '../access-pages.module.css'
import {
	Button,
	EmailInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AuthService } from '../../utils/auth-service/lib/auth-service'
import { useForm } from '../../hooks/use-form'

const ForgotPassword: FC = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { values, handleChange } = useForm<{ email: string }>({ email: '' })
	const onSubmit = async (
		e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault()
		try {
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
				onChange={handleChange}
				name={'email'}
				extraClass='mb-6'
			/>
			<Button
				htmlType='submit'
				type='primary'
				size='medium'
				onClick={() => onSubmit}
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
