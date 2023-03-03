import React, { useState } from 'react'
import styles from '../access-pages.module.css'
import {
	Button,
	EmailInput,
	Input,
	PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom'
import { postRegister } from '../../../utils/post-register'

const Register = () => {
	const [form, setValue] = useState({ name: '', email: '', password: '' })
	const onChange = e => {
		setValue({ ...form, [e.target.name]: e.target.value })
	}
	const onClick = async () => {
		const { email, password, name } = form
		try {
			const data = await postRegister(email, password, name)()
			console.log(data)
		} catch (e) {
			console.log(e + ' такая ошибка брат')
		}
	}
	return (
		<div className={`${styles.container}`}>
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
