import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    data: {}
}

export const ingredientDetailsSlice = createSlice({
    name: "ingredientDetails",
    initialState,
    reducers: {
        setModalData(state, action){
            state.data = action.payload
        },
        deleteModalData(state) {
            state.data = initialState
        }
    }
})

export default ingredientDetailsSlice.reducer
export const {setModalData, deleteModalData} = ingredientDetailsSlice.actions