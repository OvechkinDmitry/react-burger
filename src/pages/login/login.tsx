import React, { FC, FormEvent } from 'react'
import styles from '../access-pages.module.css'
import {
	Button,
	EmailInput,
	PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom'
import { loginUser } from '../../services/actions/login-user/lib/login-user'
import { useForm } from '../../hooks/use-form'
import { useTypedDispatch } from '../../hooks/use-typed-dispatch'
import { useTypedSelector } from '../../hooks/use-typed-selector'

type TLoginForm = {
	email: string
	password: string
}

const Login: FC = () => {
	const dispatch = useTypedDispatch()
	const { status } = useTypedSelector(state => state.authUserReducer)
	const { values, handleChange } = useForm<TLoginForm>({
		email: '',
		password: ''
	})
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
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
					data-cy={'login-email'}
					placeholder={'E-mail'}
					value={values.email}
					onChange={handleChange}
					name={'email'}
					extraClass='mb-6'
				/>
				<PasswordInput
					data-cy={'login-password'}
					placeholder={'Пароль'}
					value={values.password}
					onChange={handleChange}
					name={'password'}
					extraClass='mb-6'
				/>
				<Button
					data-cy={'login-button'}
					htmlType='submit'
					type='primary'
					size='medium'
				>
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
