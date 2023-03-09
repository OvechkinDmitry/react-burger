import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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

export const refreshToken = createAsyncThunk(
	'authUserSlice/refreshToken',
	async function (_, { rejectWithValue, dispatch, getState }) {
		try {
			const res = await AuthService.refresh()
			const { accessToken, refreshToken } = res.data
			localStorage.setItem('refreshToken', refreshToken)
			localStorage.setItem('accessToken', accessToken.split('Bearer ')[1])
			const userData = await AuthService.getUserData()
			dispatch(updateUser(userData.data.user))
		} catch (e) {
			dispatch(updateUser({ email: '', passwoord: '', name: '' }))
		}
	}
)

export const registerUser = createAsyncThunk(
	'authUserSlice/registerUser',
	async function (form, { rejectWithValue, dispatch, getState }) {
		const { email, password, name } = form
		try {
			const { data } = await AuthService.register(email, password, name)
			localStorage.setItem('refreshToken', data.refreshToken)
			localStorage.setItem('accessToken', data.accessToken.split('Bearer ')[1])
			dispatch(updateUser({ ...data.user, password: form.password }))
		} catch (e) {
			return rejectWithValue('Пользователь уже зарегестрирован')
		}
	}
)

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
			.addCase(registerUser.pending, setLoading)
			.addCase(logoutUser.pending, setLoading)
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = initialState.status
				state.user = { ...state.user, ...action.payload }
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.status.isLoading = false
				state.status.isError = true
				state.status.error = action.payload
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
