import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from '../../../../utils/auth-service/lib/auth-service'
import { updateUser } from '../../../reducers/auth-user/lib/auth-user-slice'
import { TForm } from '../model/types'

export const registerUser = createAsyncThunk<
	undefined,
	TForm,
	{ rejectValue: string }
>(
	'authUserSlice/registerUser',
	async function (form, { rejectWithValue, dispatch }) {
		const { email, password, name } = form
		try {
			const { data } = await AuthService.register(email, password, name)
			localStorage.setItem('refreshToken', data.refreshToken)
			localStorage.setItem('accessToken', data.accessToken.split('Bearer ')[1])
			dispatch(updateUser({ ...data.user, password: form.password }))
		} catch (e) {
			return rejectWithValue('Пользователь уже зарегестрирован')
		}
	}
)
