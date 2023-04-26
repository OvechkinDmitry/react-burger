import { createSlice } from '@reduxjs/toolkit'
import { TOrders } from '../../../middleware/model/types'

export type TWebsoketState = {
	wsConnected: boolean
	orders: TOrders | null
	error: boolean
}

const initialState: TWebsoketState = {
	wsConnected: false,
	orders: null,
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
			state.orders = null
		},
		wsMessage(state, action) {
			state.orders = action.payload
		}
	}
})

export default websoketSlice.reducer
export const { wsSuccess, wsError, wsClose, wsMessage } = websoketSlice.actions
