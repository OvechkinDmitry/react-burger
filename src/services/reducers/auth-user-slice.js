import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthService } from '../../utils/auth-service'

export const getAccessToken = accessToken => accessToken.split('Bearer ')[1]

const initialState = {
	user: {
		name: '',
		email: '',
		password: ''
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

export const refreshToken = createAsyncThunk(
	'authUserSlice/refreshToken',
	async function (_, { rejectWithValue }) {
		try {
			const res = await AuthService.refresh()
			localStorage.setItem('refreshToken', res.data.refreshToken)
			localStorage.setItem(
				'accessToken',
				res.data.accessToken.split('Bearer ')[1]
			)
			const userData = await AuthService.getUserData()
			return userData.data.user
		} catch (e) {
			console.log('refresh error')
			return rejectWithValue({})
		}
	}
)

export const checkUserWithTokens = createAsyncThunk(
	'authUserSlice/checkUserWithTokens',
	async function (_, { rejectWithValue, dispatch }) {
		console.log('checkUserWithTokens')
		if (
			!localStorage.getItem('accessToken') ||
			!localStorage.getItem('refreshToken')
		) {
			dispatch(exitUser())
			return {}
		}
		try {
			const res = await AuthService.getUserData()
			return res.data.user
		} catch (e) {
			await dispatch(refreshToken())
			return rejectWithValue({})
		}
	}
)

export const registerUser = createAsyncThunk(
	'authUserSlice/registerUser',
	async function (form, { rejectWithValue, dispatch }) {
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
			.addCase(loginUser.pending, setLoading)
			.addCase(registerUser.pending, setLoading)
			.addCase(logoutUser.pending, setLoading)
			.addCase(checkUserWithTokens.pending, state => {
				state.isChecking = true
			})
			.addCase(checkUserWithTokens.fulfilled, (state, action) => {
				console.log('checkUserWithTokens.fulfilled')
				state.isChecking = false
				state.user = { ...state.user, ...action.payload }
			})
			// .addCase(checkUserWithTokens.rejected, (state, action) => {
			// 	console.log('checkUserWithTokens.rejected')
			// })
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status.isAuth = true
				state.user = { ...state.user, ...action.payload }
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status.isLoading = false
				state.status.isError = true
				state.status.error = action.payload
			})
			.addCase(refreshToken.fulfilled, (state, action) => {
				console.log('refreshToken.fulfilled')
				state.isChecking = false
				state.user = action.payload
			})
			.addCase(refreshToken.rejected, state => {
				console.log('refreshToken.rejected')
				state.isChecking = false
				state.user = initialState.user
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
