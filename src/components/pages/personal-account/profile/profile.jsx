import React from 'react'
import styles from './profile.css'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'

const Profile = () => {
	return (
		<div className={styles.inputs}>
			<Input
				type={'text'}
				placeholder={'Имя'}
				icon={'EditIcon'}
				name={'name'}
				error={false}
				errorText={'Ошибка'}
				extraClass=''
			/>
			<Input
				type={'email'}
				placeholder={'Логин'}
				icon={'EditIcon'}
				name={'name'}
				error={false}
				errorText={'Ошибка'}
				extraClass='mt-6 mb-6'
			/>
			<Input
				type={'password'}
				placeholder={'Пароль'}
				icon={'EditIcon'}
				name={'name'}
				error={false}
				errorText={'Ошибка'}
				extraClass=''
			/>
		</div>
	)
}

export default Profile
