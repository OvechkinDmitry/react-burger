import React, { useEffect, useState } from 'react'
import styles from './profile.module.css'
import {
	Button,
	EmailInput,
	PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { patchUser } from '../../../../utils/patch-user'
import { updateUser } from '../../../../services/reducers/auth-user-slice'
import WarnLog from '../../../ui/warn-log/warn-log'

const Profile = () => {
	const dispatch = useDispatch()
	const [pageError, setPageError] = useState('')
	const { user } = useSelector(state => state.authUserReducer)
	const [editFieldVisible, setEditFieldVisible] = useState(false)
	const initialStateForm = {
		name: user.name,
		email: user.email,
		password: user.password || ''
	}
	const [form, setValue] = useState(initialStateForm)
	const applyChanges = async () => {
		const res = await patchUser(form)
		if (res.ok) dispatch(updateUser(form))
		else {
			setEditFieldVisible(false)
			setValue(initialStateForm)
			setPageError('Ошибка на сервере')
		}
	}
	const onChange = e =>
		setValue({ ...form, [e.target.name]: e.target.value.trim() })

	useEffect(() => {
		setEditFieldVisible(
			JSON.stringify(initialStateForm) !== JSON.stringify(form)
		)
	}, [form.name, form.password, form.login, initialStateForm])

	return (
		<div className={styles.inputs}>
			<WarnLog>{pageError}</WarnLog>
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
				value={form.email}
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
			{editFieldVisible && (
				<div className={`${styles.edit} mt-6`}>
					<Button
						onClick={() => setValue(initialStateForm)}
						htmlType='button'
						type='secondary'
						size='medium'
					>
						Отмена
					</Button>
					<Button
						onClick={applyChanges}
						htmlType='button'
						type='primary'
						size='medium'
					>
						Сохранить
					</Button>
				</div>
			)}
		</div>
	)
}

export default Profile
