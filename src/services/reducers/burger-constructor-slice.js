import {createSlice} from "@reduxjs/toolkit";
import {calculatePrice} from "../../utils/calculate-price";

const initialState = {
    constructorElements: [],
    totalPrice : 0
}

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructorSlice',
    initialState,
    reducers:{
        updateConstructorElements(state, action){
            const {itemId, data} = action.payload
            state.constructorElements = [...state.constructorElements,
                ...data.filter(el => el["_id"] === itemId.id)]
            state.totalPrice = calculatePrice(state.constructorElements)
        }
    }
})

export default burgerConstructorSlice.reducer
export const {updateConstructorElements} = burgerConstructorSlice.actions