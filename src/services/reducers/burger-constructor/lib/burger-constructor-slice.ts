import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calculatePrice } from '../../../../utils/calculate-price'
import { TIngredient } from '../../../../utils/types/ingredient-type'
import { TBurgerConstructorState, TConstructorElement } from '../model/types'

const initialState: TBurgerConstructorState = {
	constructorElements: [],
	bun: {} as TIngredient,
	totalPrice: 0
}

const burgerConstructorSlice = createSlice({
	name: 'burgerConstructorSlice',
	initialState,
	reducers: {
		updateConstructorElements(
			state,
			action: PayloadAction<{
				ingredients: TConstructorElement[]
			}>
		) {
			state.constructorElements = action.payload.ingredients
		},
		addConstructorElements(
			state,
			action: PayloadAction<{ ingredient: TConstructorElement }>
		) {
			state.constructorElements.push(action.payload.ingredient)
		},
		addBun(state, action: PayloadAction<{ ingredient: TIngredient }>) {
			state.bun = action.payload.ingredient
		},
		deleteConstructorElement(state, action: PayloadAction<{ index: string }>) {
			state.constructorElements = state.constructorElements.filter(
				el => el.index !== action.payload.index
			)
		},
		calculateTotalPrice(state) {
			state.totalPrice = calculatePrice([
				state.bun,
				...state.constructorElements
			])
		},
		resetConstructor(state) {
			state.bun = initialState.bun
			state.constructorElements = initialState.constructorElements
			state.totalPrice = initialState.totalPrice
		}
	}
})

export default burgerConstructorSlice.reducer
export const {
	addConstructorElements,
	deleteConstructorElement,
	addBun,
	updateConstructorElements,
	calculateTotalPrice,
	resetConstructor
} = burgerConstructorSlice.actions
