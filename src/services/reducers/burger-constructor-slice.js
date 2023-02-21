import {createSlice, current} from "@reduxjs/toolkit";
import {calculatePrice} from "../../utils/calculate-price";

const initialState = {
    constructorElements: [],
    bun: {},
    totalPrice : 0,
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
            const orderElements = [state.bun, ...state.constructorElements.map(el => el.ingredient)]
            state.totalPrice = calculatePrice(orderElements)
        },
        updateBun(state, action){
            state.bun = action.payload.ingredient
            const orderElements = [state.bun, ...state.constructorElements.map(el => el.ingredient)]
            state.totalPrice = calculatePrice(orderElements)
        },
        deleteConstructorElement(state, action){
            const {index} = action.payload
            state.constructorElements = state.constructorElements.filter(el => el.index !== index).map((el, i) => {
                return {...el, 'index': i}
            })
            const orderElements = [state.bun, ...state.constructorElements.map(el => el.ingredient)]
            state.totalPrice = calculatePrice(orderElements)
        }
    }
})

export default burgerConstructorSlice.reducer
export const {updateConstructorElements, deleteConstructorElement, updateBun} = burgerConstructorSlice.actions