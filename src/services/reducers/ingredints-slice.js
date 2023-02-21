import {createSlice, current} from "@reduxjs/toolkit";

const initialState = {
    data: [],
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
            state.data = action.payload.data
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