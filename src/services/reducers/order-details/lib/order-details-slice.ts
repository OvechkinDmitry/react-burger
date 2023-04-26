import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TOrderDetailsState } from '../model/types'

const initialState: TOrderDetailsState = {
	id: 0,
	isLoading: false,
	isError: false
}

export const orderDetailsSlice = createSlice({
	name: 'orderDetailsSlice',
	initialState,
	reducers: {
		dataFetching(state) {
			state.isLoading = true
		},
		dataFetchingError() {
			return { ...initialState, isError: true }
		},
		updateId(state, action: PayloadAction<{ id: number }>) {
			state.id = action.payload.id
			state.isLoading = false
			state.isError = false
		},
		deleteId() {
			return initialState
		}
	}
})

export default orderDetailsSlice.reducer
export const { updateId, deleteId, dataFetching, dataFetchingError } =
	orderDetailsSlice.actions
