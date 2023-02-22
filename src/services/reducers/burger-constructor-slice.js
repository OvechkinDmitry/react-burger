import {createSlice} from "@reduxjs/toolkit";
import {v1 as uuid} from 'uuid'
import {calculatePrice} from "../../utils/calculate-price";

const initialState = {
    constructorElements: [],
    bun: {},
    totalPrice: 0,
}

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructorSlice',
    initialState,
    reducers: {
        updateConstructorElements(state, action) {
            const {ingredients} = action.payload
            state.constructorElements = ingredients
            state.totalPrice = calculatePrice([state.bun, ...state.constructorElements])
        },
        addConstructorElements(state, action) {
            const {ingredient} = action.payload
            state.constructorElements = [...state.constructorElements, {index: uuid(), ...ingredient}]
            state.totalPrice = calculatePrice([state.bun, ...state.constructorElements])
        },
        addBun(state, action) {
            state.bun = action.payload.ingredient
            state.totalPrice = calculatePrice([state.bun, ...state.constructorElements])
        },
        deleteConstructorElement(state, action) {
            const {index} = action.payload
            state.constructorElements = state.constructorElements.filter(el => el.index !== index)
            state.totalPrice = calculatePrice([state.bun, ...state.constructorElements])
        }
    }
})

export default burgerConstructorSlice.reducer
export const {
    addConstructorElements,
    deleteConstructorElement,
    addBun,
    updateConstructorElements
} = burgerConstructorSlice.actions