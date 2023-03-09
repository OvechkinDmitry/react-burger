import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
	NomorepartiesInstance,
	URL_LOGIN
} from '../../utils/constants/constants'
import { postLogout } from '../../utils/post-logout'

export const getAccessToken = accessToken => accessToken.split('Bearer ')[1]

const initialState = {
	user: {
		name: '',
		email: '',
		password: ''
	},
	isLoading: false,
	error: ''
}

const setLoading = state => {
	state.isLoading = true
	state.error = ''
}
export const logoutUser = createAsyncThunk(
	'authUserSlice/logoutUser',
	async function (data, { rejectWithValue, dispatch, getState }) {
		try {
			await postLogout()
			dispatch(exitUser())
		} catch (e) {
			console.log(e)
			dispatch(exitUser())
			return rejectWithValue(e.message())
		}
	}
)

export const loginUser = createAsyncThunk(
	'authUserSlice/loginUser',
	async function (data, { rejectWithValue }) {
		const { userEmail, userPassword } = data
		try {
			const res = await NomorepartiesInstance.post(URL_LOGIN, {
				email: userEmail,
				password: userPassword
			})
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
			state.isLoading = false
			state.isError = false
		},
		updateUser(state, action) {
			state.user = action.payload
		}
	},
	extraReducers(builder) {
		builder
			.addCase(loginUser.pending, setLoading)
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false
				state.isError = false
				state.user = { ...state.user, ...action.payload }
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.error = action.payload
			})
	}
})

export default authUserSlice.reducer
export const { exitUser, updateUser } = authUserSlice.actions
