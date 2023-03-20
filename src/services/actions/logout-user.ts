import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from '../../utils/auth-service'
import { exitUser } from '../reducers/auth-user-slice'
import { AxiosError } from 'axios'

export const logoutUser = createAsyncThunk(
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
