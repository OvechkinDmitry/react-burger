import React, { FC, SyntheticEvent } from 'react'
import styles from '../access-pages.module.css'
import {
	Button,
	EmailInput,
	Input,
	PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom'
import { registerUser } from '../../services/actions/register-user/lib/register-user'
import { useForm } from '../../hooks/use-form'
import { useTypedSelector } from '../../hooks/use-typed-selector'
import { useTypedDispatch } from '../../hooks/use-typed-dispatch'

const Register: FC = () => {
	const dispatch = useTypedDispatch()
	const { status } = useTypedSelector(state => state.authUserReducer)
	const { values, handleChange } = useForm({
		name: '',
		email: '',
		password: ''
	})
	const onSubmit = async (e: SyntheticEvent) => {
		e.preventDefault()
		dispatch(registerUser(values))
	}
	return (
		<form onSubmit={onSubmit} className={`${styles.container}`}>
			<p className={`text text_type_main-medium mb-6`} style={{ color: 'red' }}>
				{status.error}
			</p>
			<p className={`text text_type_main-medium mb-6`}>Регистрация</p>
			<Input
				type={'text'}
				placeholder={'Имя'}
				value={values.name}
				name={'name'}
				onChange={handleChange}
				error={false}
				errorText={'Ошибка'}
				extraClass='mb-6'
			/>
			<EmailInput
				placeholder={'E-mail'}
				value={values.email}
				name={'email'}
				onChange={handleChange}
				extraClass='mb-6'
			/>
			<PasswordInput
				value={values.password}
				placeholder={'Пароль'}
				onChange={handleChange}
				name={'password'}
				extraClass='mb-6'
			/>
			<Button
				htmlType='submit'
				type='primary'
				size='medium'
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
		</form>
	)
}

export default Register
