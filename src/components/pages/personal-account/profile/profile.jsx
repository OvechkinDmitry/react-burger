import React, { useState } from 'react'
import styles from './profile.css'
import {
	EmailInput,
	PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'

const Profile = () => {
	const { user } = useSelector(state => state.authUserReducer)
	const [form, setValue] = useState({
		name: user.name,
		login: user.email,
		password: user.password
	})
	const onChange = e => setValue({ ...form, [e.target.name]: e.target.value })
	return (
		<div className={styles.inputs}>
			<EmailInput
				placeholder={'Имя'}
				value={form.name}
				onChange={onChange}
				name={'name'}
				isIcon={true}
				error={false}
				inputMode={'text'}
				extraClass=''
			/>
			<EmailInput
				placeholder={'Логин'}
				value={form.login}
				onChange={onChange}
				name={'login'}
				isIcon={true}
				error={false}
				errorText={'Ошибка'}
				extraClass='mt-6 mb-6'
			/>
			<PasswordInput
				value={form.password}
				onChange={onChange}
				placeholder={'Пароль'}
				icon={'EditIcon'}
				name={'password'}
				errorText={'Ошибка'}
			/>
		</div>
	)
}

export default Profile
