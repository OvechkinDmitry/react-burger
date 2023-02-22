import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    id: ''
}

export const orderDetailsSlice = createSlice({
    name: 'orderDetailsSlice',
    initialState,
    reducers:{
        updateId(state, action){
            state.id = action.payload.id
        },
        deleteId(state){
            state = initialState
        }
    }
})

export default orderDetailsSlice.reducer
export const {updateId, deleteId} = orderDetailsSlice.actions