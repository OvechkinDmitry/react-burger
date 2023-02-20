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
            const ingredient = data.find(el => el["_id"] === itemId.id)
            if(ingredient.type !== 'bun')
                state.constructorElements = [...state.constructorElements, ingredient]
            else {
                state.constructorElements = state.constructorElements.length ?
                    state.constructorElements.map(el => {
                    if (el.type === 'bun')
                        return ingredient
                    else
                        return el
                }) : [...state.constructorElements, ingredient]
            }
            state.totalPrice = calculatePrice(state.constructorElements)
        }
    }
})

export default burgerConstructorSlice.reducer
export const {updateConstructorElements} = burgerConstructorSlice.actions