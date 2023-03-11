import { createSlice } from '@reduxjs/toolkit'
import { logoutUser } from '../actions/logout-user'
import { registerUser } from '../actions/register-user'
import { loginUser } from '../actions/login-user'
import { refreshToken } from '../actions/refresh-token'
import { checkUserWithTokens } from '../actions/check-user-with-tokens'

export const getAccessToken = accessToken => accessToken.split('Bearer ')[1]

const initialState = {
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

const setLoading = state => {
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
				state.user = { ...state.user, ...action.payload }
			})
			.addCase(checkUserWithTokens.rejected, state => {
				state.status.isLoading = false
				state.status.isError = true
				state.status.isChecking = true
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.user = { ...state.user, ...action.payload }
			})
			.addCase(loginUser.pending, setLoading)
			.addCase(loginUser.rejected, (state, action) => {
				state.status.isLoading = false
				state.status.isError = true
				state.status.error = action.payload
			})
			.addCase(refreshToken.pending, state => {
				state.isChecking = true
			})
			.addCase(refreshToken.fulfilled, (state, action) => {
				state.user = action.payload
				state.isError = false
				state.isLoading = false
				state.isChecking = false
			})
			.addCase(refreshToken.rejected, state => {
				state.status.isError = true
				state.status.isLoading = false
				state.isChecking = false
				state.user = initialState.user
			})
			.addCase(registerUser.pending, setLoading)
			.addCase(registerUser.fulfilled, state => {
				state.status.isLoading = false
				state.status.isError = false
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.status.isLoading = false
				state.status.isError = true
				state.status.error = action.payload
			})
	}
})

export default authUserSlice.reducer
export const { exitUser, updateUser } = authUserSlice.actions
