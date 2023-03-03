import React from 'react'
import styles from './profile.css'
import {
	EmailInput,
	PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'

const Profile = () => {
	return (
		<div className={styles.inputs}>
			<EmailInput
				placeholder={'Имя'}
				name={'name'}
				isIcon={true}
				error={false}
				inputMode={'text'}
				extraClass=''
			/>
			<EmailInput
				placeholder={'Логин'}
				name={'login'}
				isIcon={true}
				error={false}
				errorText={'Ошибка'}
				extraClass='mt-6 mb-6'
			/>
			<PasswordInput
				placeholder={'Пароль'}
				icon={'EditIcon'}
				name={'password'}
				errorText={'Ошибка'}
			/>
		</div>
	)
}

export default Profile
