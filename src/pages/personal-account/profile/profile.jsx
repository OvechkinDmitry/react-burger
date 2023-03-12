import React, { useEffect, useState } from 'react'
import styles from './profile.module.css'
import {
	Button,
	EmailInput,
	PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../../services/reducers/auth-user-slice'
import WarnLog from '../../../components/ui/warn-log/warn-log'
import { AuthService } from '../../../utils/auth-service'
import { filterObject } from '../../../utils/filter-object'
import { useForm } from '../../../hooks/useForm'

const Profile = () => {
	const dispatch = useDispatch()
	const [pageError, setPageError] = useState('')
	const { user } = useSelector(state => state.authUserReducer)
	const [editFieldVisible, setEditFieldVisible] = useState(false)
	const initialStateForm = {
		name: user.name,
		email: user.email,
		password: ''
	}
	const { values, handleChange, setValues } = useForm(initialStateForm)
	const applyChanges = async e => {
		e.preventDefault()
		try {
			const filtObj = filterObject(values, el => el !== '')
			await AuthService.patchUser(filtObj)
			dispatch(updateUser(filtObj))
		} catch (e) {
			setEditFieldVisible(false)
			setValues(initialStateForm)
			setPageError('Ошибка на сервере')
		}
	}
	useEffect(() => {
		setEditFieldVisible(
			JSON.stringify(initialStateForm) !== JSON.stringify(values)
		)
	}, [JSON.stringify(values), initialStateForm])

	return (
		<form onSubmit={applyChanges} className={styles.inputs}>
			{pageError && <WarnLog>{pageError}</WarnLog>}
			<EmailInput
				placeholder={'Имя'}
				value={values.name}
				onChange={handleChange}
				name={'name'}
				isIcon={true}
				error={false}
				inputMode={'text'}
				extraClass=''
			/>
			<EmailInput
				placeholder={'Логин'}
				value={values.email}
				onChange={handleChange}
				name={'email'}
				isIcon={true}
				error={false}
				errorText={'Ошибка'}
				extraClass='mt-6 mb-6'
			/>
			<PasswordInput
				value={values.password}
				onChange={handleChange}
				placeholder={'Пароль'}
				icon={'EditIcon'}
				name={'password'}
				errorText={'Ошибка'}
			/>
			{editFieldVisible && (
				<div className={`${styles.edit} mt-6`}>
					<Button
						onClick={() => setValues(initialStateForm)}
						htmlType='button'
						type='secondary'
						size='medium'
					>
						Отмена
					</Button>
					<Button htmlType='submit' type='primary' size='medium'>
						Сохранить
					</Button>
				</div>
			)}
		</form>
	)
}

export default Profile
