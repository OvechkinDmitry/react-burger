import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
	NomorepartiesInstance,
	URL_LOGIN
} from '../../utils/constants/constants'

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

export const loginUser = createAsyncThunk(
	'authUserSlice/loginUser',
	async function (data, { rejectWithValue, dispatch, getState }) {
		const { user } = getState().authUserReducer
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

// export const updateUser = createAsyncThunk(
// 	'authUserSlice/loginUser',
// 	async function (form, { rejectWithValue, dispatch, getState }) {}
// )

const authUserSlice = createSlice({
	name: 'authUserSlice',
	initialState,
	reducers: {
		dataLoading(state) {
			state.isLoading = true
		},
		dataError(state) {
			state.isLoading = false
			state.isError = true
		},
		dataSuccess(state, action) {
			state.isLoading = false
			state.isError = true
			state.user = action.payload
		},
		exitUser(state) {
			state.user = initialState.user
		},
		updateUser(state, action) {
			state.user = action.payload
		}
	},
	extraReducers(builder) {
		builder
			.addCase(loginUser.pending, setLoading)
			.addCase(loginUser.fulfilled, (state, action) => {
				state.user = action.payload
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.error = action.payload
			})
	}
})

export default authUserSlice.reducer
export const { dataLoading, dataError, dataSuccess, exitUser, updateUser } =
	authUserSlice.actions
