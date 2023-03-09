import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
	NomorepartiesInstance,
	URL_LOGIN
} from '../../utils/constants/constants'
import { postLogout } from '../../utils/post-logout'
import { AuthService } from '../../utils/auth-service'

export const getAccessToken = accessToken => accessToken.split('Bearer ')[1]

const initialState = {
	user: {
		name: '',
		email: '',
		password: ''
	},
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
export const logoutUser = createAsyncThunk(
	'authUserSlice/logoutUser',
	async function (data, { rejectWithValue, dispatch, getState }) {
		try {
			await AuthService.logout()
		} catch (e) {
			console.log(e)
			return rejectWithValue(e.message())
		}
		dispatch(exitUser())
	}
)

export const loginUser = createAsyncThunk(
	'authUserSlice/loginUser',
	async function (data, { rejectWithValue }) {
		const { userEmail, userPassword } = data
		try {
			const res = await AuthService.login(userEmail, userPassword)
			const {
				accessToken,
				refreshToken,
				user: { name }
			} = res.data
			localStorage.setItem('refreshToken', refreshToken)
			localStorage.setItem('accessToken', getAccessToken(accessToken))
			return { password: userPassword, email: userEmail, name: name }
		} catch (e) {
			localStorage.setItem('refreshToken', '')
			localStorage.setItem('accessToken', '')
			return rejectWithValue('Некорректная почта или пароль')
		}
	}
)

const authUserSlice = createSlice({
	name: 'authUserSlice',
	initialState,
	reducers: {
		exitUser(state) {
			localStorage.setItem('accessToken', '')
			localStorage.setItem('refreshToken', '')
			state.user = initialState.user
			state.status = initialState.status
		},
		updateUser(state, action) {
			state.user = action.payload
		}
	},
	extraReducers(builder) {
		builder
			.addCase(loginUser.pending, setLoading)
			.addCase(logoutUser.pending, setLoading)
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = initialState.status
				state.user = { ...state.user, ...action.payload }
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status.isLoading = false
				state.status.isError = true
				state.status.error = action.payload
			})
	}
})

export default authUserSlice.reducer
export const { exitUser, updateUser } = authUserSlice.actions
