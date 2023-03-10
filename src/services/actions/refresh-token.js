import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from '../../utils/auth-service'

export const refreshToken = createAsyncThunk(
	'authUserSlice/refreshToken',
	async function (_, { rejectWithValue }) {
		try {
			const res = await AuthService.refresh()
			localStorage.setItem('refreshToken', res.data.refreshToken)
			localStorage.setItem(
				'accessToken',
				res.data.accessToken.split('Bearer ')[1]
			)
			const userData = await AuthService.getUserData()
			return userData.data.user
		} catch (e) {
			return rejectWithValue({})
		}
	}
)
