import authUserReducer, { exitUser, updateUser } from '../lib/auth-user-slice'
import { logoutUser } from '../../../actions/logout-user/lib/logout-user'
import { TAuthState } from '../model/types'

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

describe('authUserSlice', () => {
	it('should return empty state when passed an empty action', () => {
		const result = authUserReducer(undefined, { type: '' })
		expect(result).toEqual(initialState)
	})

	it('should update user with "updateUser" action', () => {
		const payload = { name: 'Ivan', email: 'Ivanov@mail.ru' }
		const action = {
			type: updateUser.type,
			payload
		}
		const result = authUserReducer(initialState, action)
		expect(result.user).toEqual(payload)
	})

	it('should exit user with "exitUser" action', () => {
		const action = { type: exitUser.type }
		const testState = {
			user: { name: 'Ivan', email: 'Ivanov@mail.ru' },
			isChecking: false,
			status: {
				isError: false,
				isLoading: false,
				error: ''
			}
		}
		const result = authUserReducer(testState, action)
		expect(result).toEqual({ ...initialState, isChecking: false })
	})

	it('should set loading in status when "logoutUser.pending" is called', () => {
		const action = { type: logoutUser.pending.type, payload: {} }
		const state = authUserReducer(initialState, action)
		expect(state.status.isError).toBe(false)
		expect(state.status.isLoading).toBe(true)
	})

	it('should set initial status when "logoutUser.fulfilled" is called', () => {
		const action = { type: logoutUser.fulfilled.type, payload: {} }
		const state = authUserReducer(initialState, action)
		expect(state.status.isError).toBe(false)
		expect(state.status.isLoading).toBe(false)
		expect(state.status.error).toBe('')
	})

	it('should set error in status when "logoutUser.rejected" is called', () => {
		const action = { type: logoutUser.rejected.type, payload: {} }
		const state = authUserReducer(initialState, action)
		expect(state.status.isError).toBe(true)
		expect(state.status.isLoading).toBe(false)
	})
})
