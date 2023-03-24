import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TIngredient } from '../../../../utils/types/ingredient-type'
import { TIngredientsState } from '../model/types'

const initialState: TIngredientsState = {
	ingredients: [],
	isLoading: false,
	isError: false
}

const ingredientsSlice = createSlice({
	name: 'constructorSlice',
	initialState,
	reducers: {
		dataFetching(state) {
			state.isLoading = true
		},
		dataFetchingSuccess(
			state,
			action: PayloadAction<{ ingredients: TIngredient[] }>
		) {
			state.ingredients = action.payload.ingredients
			state.isLoading = false
			state.isError = false
		},
		dataFetchingError(state) {
			state.isLoading = false
			state.isError = true
		}
	}
})

export default ingredientsSlice.reducer
export const { dataFetching, dataFetchingError, dataFetchingSuccess } =
	ingredientsSlice.actions
