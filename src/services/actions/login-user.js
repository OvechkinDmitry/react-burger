import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from '../../utils/auth-service'
import { getAccessToken } from '../reducers/auth-user-slice'

export const loginUser = createAsyncThunk(
	'authUserSlice/loginUser',
	async function (data, { rejectWithValue }) {
		const { email, password } = data
		try {
			const res = await AuthService.login(email, password)
			const {
				accessToken,
				refreshToken,
				user: { name }
			} = res.data
			localStorage.setItem('refreshToken', refreshToken)
			localStorage.setItem('accessToken', getAccessToken(accessToken))
			return { email: email, name: name }
		} catch (e) {
			localStorage.setItem('refreshToken', '')
			localStorage.setItem('accessToken', '')
			return rejectWithValue('Некорректная почта или пароль')
		}
	}
)
