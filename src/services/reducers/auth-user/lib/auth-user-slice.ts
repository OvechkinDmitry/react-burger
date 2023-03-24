import { createSlice } from '@reduxjs/toolkit'
import { logoutUser } from '../../../actions/logout-user/lib/logout-user'
import { registerUser } from '../../../actions/register-user/lib/register-user'
import { loginUser } from '../../../actions/login-user/lib/login-user'
import { checkUserWithTokens } from '../../../actions/check-user-with-token/lib/check-user-with-tokens'
import { TAuthState } from '../model/types'

export const getAccessToken = (accessToken: string) =>
	accessToken.split('Bearer ')[1]

const initialState: TAuthState = {
	user: {
		name: '',
		email: ''
	},
	isChecking: true,
	status: {
		isError: false,
		isLoading: false,
		error: ''
	}
}

const setLoading = (state: TAuthState) => {
	state.status.isLoading = true
	state.status.isError = false
	state.status.error = ''
}

const authUserSlice = createSlice({
	name: 'authUserSlice',
	initialState,
	reducers: {
		exitUser(state) {
			state.isChecking = false
			state.user = initialState.user
			state.status = initialState.status
			localStorage.setItem('accessToken', '')
			localStorage.setItem('refreshToken', '')
		},
		updateUser(state, action) {
			state.user = action.payload
		}
	},
	extraReducers(builder) {
		builder
			.addCase(logoutUser.pending, setLoading)
			.addCase(logoutUser.fulfilled, state => {
				state.status.isLoading = false
				state.status.isError = false
			})
			.addCase(logoutUser.rejected, state => {
				state.status.isLoading = false
				state.status.isError = true
			})
			.addCase(checkUserWithTokens.pending, state => {
				state.status.isLoading = true
				state.status.isError = false
				state.isChecking = true
			})
			.addCase(checkUserWithTokens.fulfilled, (state, action) => {
				state.status.isLoading = false
				state.status.isError = false
				state.isChecking = false
				state.user = action.payload || initialState.user
			})
			.addCase(checkUserWithTokens.rejected, (state, action) => {
				state.status.isLoading = false
				state.status.isError = !action.payload?.success
				state.user = action.payload?.success
					? action.payload?.data.user
					: initialState.user
				state.isChecking = false
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.user = action.payload
			})
			.addCase(loginUser.pending, setLoading)
			.addCase(loginUser.rejected, (state, action) => {
				state.status.isLoading = false
				state.status.isError = true
				state.status.error = action.payload || 'bad request'
			})
			.addCase(registerUser.pending, setLoading)
			.addCase(registerUser.fulfilled, state => {
				state.status.isLoading = false
				state.status.isError = false
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.status.isLoading = false
				state.status.isError = true
				state.status.error = action.payload || 'bad request'
			})
	}
})

export default authUserSlice.reducer
export const { exitUser, updateUser } = authUserSlice.actions
