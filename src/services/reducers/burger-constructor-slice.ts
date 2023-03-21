import { createSlice } from '@reduxjs/toolkit'
import { calculatePrice } from '../../utils/calculate-price'
import { TIngredient } from '../../utils/types/ingredient-type'

type TBurgerConstructorState = {
	constructorElements: (TIngredient & { index: number })[]
	bun: TIngredient
	totalPrice: number
}

const initialState: TBurgerConstructorState = {
	constructorElements: [],
	bun: {} as TIngredient,
	totalPrice: 0
}

const burgerConstructorSlice = createSlice({
	name: 'burgerConstructorSlice',
	initialState,
	reducers: {
		updateConstructorElements(state, action) {
			const { ingredients } = action.payload
			state.constructorElements = ingredients
		},
		addConstructorElements(state, action) {
			const { ingredient } = action.payload
			state.constructorElements = [...state.constructorElements, ingredient]
		},
		addBun(state, action) {
			state.bun = action.payload.ingredient
		},
		deleteConstructorElement(state, action) {
			const { index } = action.payload
			state.constructorElements = state.constructorElements.filter(
				el => el.index !== index
			)
		},
		calculateTotalPrice(state) {
			state.totalPrice = calculatePrice([
				state.bun,
				...state.constructorElements
			])
		}
	}
})

export default burgerConstructorSlice.reducer
export const {
	addConstructorElements,
	deleteConstructorElement,
	addBun,
	updateConstructorElements,
	calculateTotalPrice
} = burgerConstructorSlice.actions
