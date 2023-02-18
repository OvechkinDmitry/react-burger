import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    data: [],
    totalPrice : 0
}

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructorSlice',
    initialState,
    reducers:{
        calculateTotalPrice(state, action){
            const {indgredients} = action.payload
            state.totalPrice = indgredients && indgredients.length &&
            indgredients.every(el => el !== undefined) ? indgredients.reduce((acc, el) => {
                if(!el.price)
                    return acc + 0
                if (el.type === "bun")
                    return acc + el?.price * 2
                return acc + el?.price
            }, 0) : 0
        }
    }
})

export default burgerConstructorSlice.reducer
export const {calculateTotalPrice} = burgerConstructorSlice.actions