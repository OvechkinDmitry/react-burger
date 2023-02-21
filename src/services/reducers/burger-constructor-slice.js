import {createSlice} from "@reduxjs/toolkit";
import {calculatePrice} from "../../utils/calculate-price";

const initialState = {
    constructorElements: [],
    totalPrice : 0,
    isOrderDenied : true,
}

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructorSlice',
    initialState,
    reducers:{
        updateConstructorElements(state, action){
            const {itemId, data} = action.payload
            const ingredient = data.find(el => el["_id"] === itemId.id)
            state.constructorElements =
                    state.constructorElements.find(el => el.type === 'bun') && ingredient.type === 'bun' ?
                    state.constructorElements.map(el => el.type === 'bun' ? ingredient : el)
                    : [...state.constructorElements, ingredient]
            state.totalPrice = calculatePrice(state.constructorElements)
            state.isOrderDenied = state.constructorElements.length <= 0
        },
        deleteConstructorElement(state, action){
            const {id} = action.payload
            console.log(id)
            state.constructorElements = state.constructorElements.filter(el => el._id !== id)
        }
    }
})

export default burgerConstructorSlice.reducer
export const {updateConstructorElements, deleteConstructorElement} = burgerConstructorSlice.actions