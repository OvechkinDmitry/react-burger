import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from '../../../../utils/auth-service/lib/auth-service'
import { exitUser } from '../../../reducers/auth-user/lib/auth-user-slice'
import { AxiosError } from 'axios'

export const logoutUser = createAsyncThunk<
	undefined,
	undefined,
	{ rejectValue: string }
>(
	'authUserSlice/logoutUser',
	async function (_, { rejectWithValue, dispatch }) {
		try {
			await AuthService.logout()
		} catch (e) {
			const error = e as AxiosError
			return rejectWithValue(error.message)
		} finally {
			dispatch(exitUser())
		}
	}
)
