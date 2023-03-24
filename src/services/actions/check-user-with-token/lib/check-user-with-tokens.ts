import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from '../../../../utils/auth-service'
import { exitUser } from '../../../reducers/auth-user-slice'

export type TUser = {
	email: string
	name: string
}
export type TRejectValue = {
	data: { user: TUser }
	success: boolean
}
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
