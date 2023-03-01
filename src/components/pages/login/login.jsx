import React from 'react'
import styles from './login.module.css'
import {
	Button,
	Input
} from '@ya.praktikum/react-developer-burger-ui-components'

const Login = () => {
	return (
		<div className={styles.container}>
			<div className={`${styles.body}`}>
				<p className={`text text_type_main-medium mb-6`}>Вход</p>
				<Input
					type={'email'}
					placeholder={'E-mail'}
					icon={'EditIcon'}
					name={'name'}
					error={false}
					errorText={'Ошибка'}
					extraClass='mb-6'
				/>
				<Input
					type={'password'}
					placeholder={'Пароль'}
					icon={'ShowIcon'}
					name={'name'}
					error={false}
					errorText={'Ошибка'}
					extraClass='mb-6'
				/>
				<Button htmlType='button' type='primary' size='medium'>
					Войти
				</Button>
				<p className={`text text_type_main-small text_color_inactive mt-20`}>
					Вы — новый пользователь? Зарегистрироваться
				</p>
				<p className={`text text_type_main-small text_color_inactive mt-4`}>
					Забыли пароль? Восстановить пароль
				</p>
			</div>
		</div>
	)
}

export default Login
