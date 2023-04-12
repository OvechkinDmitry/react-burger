import { createSlice } from '@reduxjs/toolkit'

type TWebsoketState = {
	wsConnected: boolean
	orders: any
	error: boolean
}

const initialState: TWebsoketState = {
	wsConnected: false,
	orders: {},
	error: false
}

const websoketSlice = createSlice({
	name: 'websoketSlice',
	initialState,
	reducers: {
		wsSuccess(state) {
			state.wsConnected = true
			state.error = false
		},
		wsError(state) {
			state.wsConnected = false
			state.error = true
		},
		wsClose(state, action) {
			state.wsConnected = false
			state.error = !action.payload
			state.orders = {}
		},
		wsMessage(state, action) {
			state.orders = action.payload
		}
	}
})

export default websoketSlice.reducer
export const { wsSuccess, wsError, wsClose, wsMessage } = websoketSlice.actions
