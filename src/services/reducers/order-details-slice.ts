import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TOrderDetailsState = {
	id: number
	isLoading: boolean
	isError: boolean
}

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
		dataFetchingError(state) {
			state.isLoading = false
			state.isError = true
			state = initialState
		},
		updateId(state, action: PayloadAction<{ id: number }>) {
			state.id = action.payload.id
			state.isLoading = false
			state.isError = false
		},
		deleteId(state) {
			state = initialState
		}
	}
})

export default orderDetailsSlice.reducer
export const { updateId, deleteId, dataFetching, dataFetchingError } =
	orderDetailsSlice.actions
