import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from '../../../../utils/auth-service/lib/auth-service'
import { exitUser } from '../../../reducers/auth-user/lib/auth-user-slice'
import { TRejectValue, TUser } from '../model/types'

export const checkUserWithTokens = createAsyncThunk<
	TUser | undefined,
	undefined,
	{ rejectValue: TRejectValue }
>(
	'authUserSlice/checkUserWithTokens',
	async function (_, { rejectWithValue, dispatch }) {
		if (
			!localStorage.getItem('accessToken') ||
			!localStorage.getItem('refreshToken')
		) {
			dispatch(exitUser())
			return
		}
		try {
			const res = await AuthService.getUserData()
			return res.data.user
		} catch (e) {
			const { data, success } = await AuthService.refreshToken(
				AuthService.getUserData
			)
			return rejectWithValue({ data: data, success })
		}
	}
)
