import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    ingredients: [],
    isLoading: false,
    isError: false,
}

const ingredientsSlice = createSlice({
    name: "constructorSlice",
    initialState,
    reducers: {
        dataFetching(state) {
            state.isLoading = true
        },
        dataFetchingSuccess(state, action) {
            state.ingredients = action.payload.ingredients
            state.isLoading = false
            state.isError = false
        },
        dataFetchingError(state) {
            state.isLoading = false
            state.isError = true
        },
    }
})

export default ingredientsSlice.reducer
export const {dataFetching, dataFetchingError, dataFetchingSuccess} = ingredientsSlice.actions