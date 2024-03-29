import React, { FC, FormEvent, SyntheticEvent, useState } from 'react'
import styles from '../access-pages.module.css'
import {
	Button,
	Input,
	PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AuthService } from '../../utils/auth-service/lib/auth-service'
import { useForm } from '../../hooks/use-form'

type TForm = {
	password: string
	code: string
}

const ResetPassword: FC = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const [pageError, setPageError] = useState<string>('')
	const { values, handleChange } = useForm<TForm>({
		password: '',
		code: ''
	})
	const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		try {
			await AuthService.resetPassword(values.password, values.code)
			navigate('/login')
		} catch (e) {
			setPageError('Неверный токен')
		}
	}
	if (location.state?.from !== '/forgot-password')
		return <Navigate replace to={'/forgot-password'} />
	return (
		<form onSubmit={onSubmit} className={`${styles.container}`}>
			<p className={`text text_type_main-medium mb-6`} style={{ color: 'red' }}>
				{pageError}
			</p>
			<p className={`text text_type_main-medium mb-6`}>Восстановление пароля</p>
			<PasswordInput
				placeholder={'Введите новый пароль'}
				name={'password'}
				value={values.password}
				onChange={handleChange}
				extraClass='mb-6'
			/>
			<Input
				type={'text'}
				placeholder={'Введите код из письма'}
				icon={undefined}
				value={values.code}
				name={'code'}
				error={false}
				onChange={handleChange}
				errorText={'Ошибка'}
				extraClass='mb-6'
			/>
			<Button
				htmlType='submit'
				type='primary'
				size='medium'
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

export default ResetPassword
