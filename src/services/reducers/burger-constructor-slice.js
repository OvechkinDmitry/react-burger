import {createSlice} from "@reduxjs/toolkit";
import {calculatePrice} from "../../utils/calculate-price";

const initialState = {
    constructorElements: [],
    bun: {},
    totalPrice : 0,
    isOrderDenied : true,
}

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructorSlice',
    initialState,
    reducers:{
        updateConstructorElements(state, action){
            const {ingredient} = action.payload
            state.constructorElements = [
                ...state.constructorElements,
                {
                    index: state.constructorElements.length ? state.constructorElements.length : 0,
                    ingredient
                }
            ]
        },
        updateBun(state, action){
            state.bun = action.payload.ingredient
        },
        deleteConstructorElement(state, action){
            const {index} = action.payload
            state.constructorElements = state.constructorElements.filter(el => el.index !== index).map((el, i) => {
                return {...el, 'index': i}
            })
        }
    }
})

export default burgerConstructorSlice.reducer
export const {updateConstructorElements, deleteConstructorElement, updateBun} = burgerConstructorSlice.actions