import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    data: [],
    isLoading: false,
    isError: false,
}

const ingredientsSlice = createSlice({
    name: "constructorSlice",
    initialState,
    reducers: {
        dataFetching(state){
            state.isLoading = true
        },
        dataFetchingSuccess(state, action) {
            state.data = action.payload.data
            state.isLoading = false
            state.isError = false
        },
        dataFetchingError(state){
            state.isLoading = false
            state.isError = true
        },
        updateIngerdients(state, action){
            state.data = state.data.filter(el => el.id !== action.payload.itemId)
        }
    }
})

export default ingredientsSlice.reducer
export const {dataFetching, dataFetchingError, dataFetchingSuccess, updateIngerdients} = ingredientsSlice.actions