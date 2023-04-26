import { TBurgerConstructorState } from '../model/types'
import { TIngredient } from '../../../../utils/types/ingredient-type'
import burgerConstructorReducer, {
	addBun,
	addConstructorElements,
	calculateTotalPrice,
	deleteConstructorElement,
	resetConstructor
} from '../lib/burger-constructor-slice'
import { updateConstructorElements } from '../lib/burger-constructor-slice'
import { testBun, testItem } from '../../../../utils/constants/constants'

const initialState: TBurgerConstructorState = {
	constructorElements: [],
	bun: {} as TIngredient,
	totalPrice: 0
}

describe('burger-constructor', () => {
	it('should update constructor elements when "updateConstructorElements" action is called', () => {
		const action = {
			type: updateConstructorElements.type,
			payload: { ingredients: [testItem] }
		}
		const store = burgerConstructorReducer(initialState, action)
		expect(store).toEqual({ ...initialState, constructorElements: [testItem] })
	})

	it('should add ingredients to constructorElements when "addConstructorElements" action is called', () => {
		const action = {
			type: addConstructorElements.type,
			payload: { ingredient: testItem }
		}
		const store = burgerConstructorReducer(initialState, action)
		expect(store.constructorElements).toEqual([testItem])
	})

	it('should add bun when "addBun" action is called', () => {
		const action = {
			type: addBun.type,
			payload: { ingredient: testBun }
		}
		const store = burgerConstructorReducer(initialState, action)
		expect(store.bun).toEqual(testBun)
	})

	it('should delete constructor`s element when "deleteConstructorElement" is called', function () {
		const action = {
			type: deleteConstructorElement.type,
			payload: { index: testItem.index }
		}
		const store = burgerConstructorReducer(
			{ ...initialState, constructorElements: [testItem] },
			action
		)
		expect(store.constructorElements).toEqual([])
	})

	it('should calculate constructor`s price when "calculateTotalPrice" is called', () => {
		const action = { type: calculateTotalPrice.type }
		const store = burgerConstructorReducer(
			{ ...initialState, constructorElements: [testItem] },
			action
		)
		expect(store.totalPrice).toBe(testItem.price)
	})

	it('should return constructor to it`s initial state value when resetConstructor is called', () => {
		const action = { type: resetConstructor.type }
		const state = {
			...initialState,
			constructorElements: [testItem],
			bun: testBun,
			totalPrice: testBun.price + testBun.price * 2
		}
		const store = burgerConstructorReducer(state, action)
		expect(store).toEqual(initialState)
	})
})
