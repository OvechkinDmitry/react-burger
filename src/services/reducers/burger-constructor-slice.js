import {createSlice} from "@reduxjs/toolkit";
import { v1 as uuid} from 'uuid'

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
            const {ingredients} = action.payload
            state.constructorElements = ingredients
        },
        addConstructorElements(state, action){
            const {ingredient} = action.payload
            state.constructorElements = [...state.constructorElements, { index: uuid(), ...ingredient }]
            // const orderElements = [state.bun, ...state.constructorElements.map(el => el.ingredient)]
            // state.totalPrice = calculatePrice(orderElements)
        },
        addBun(state, action){
            state.bun = action.payload.ingredient
            // const orderElements = [state.bun, ...state.constructorElements.map(el => el.ingredient)]
            // state.totalPrice = calculatePrice(orderElements)
        },
        deleteConstructorElement(state, action){
            const {index} = action.payload
            state.constructorElements = state.constructorElements.filter(el => el.index !== index)
            // const orderElements = [state.bun, ...state.constructorElements.map(el => el.ingredient)]
            // state.totalPrice = calculatePrice(orderElements)
        }
    }
})

export default burgerConstructorSlice.reducer
export const {addConstructorElements, deleteConstructorElement, addBun, updateConstructorElements} = burgerConstructorSlice.actions