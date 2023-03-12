import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from '../../utils/auth-service'
import { exitUser } from '../reducers/auth-user-slice'

export const logoutUser = createAsyncThunk(
	'authUserSlice/logoutUser',
	async function (data, { rejectWithValue, dispatch }) {
		try {
			await AuthService.logout()
		} catch (e) {
			console.log(e)
			return rejectWithValue(e.message())
		} finally {
			dispatch(exitUser())
		}
	}
)
