import { TIngredient } from '../../../../utils/types/ingredient-type'

export type TConstructorElement = TIngredient & { index: string }

export type TBurgerConstructorState = {
	constructorElements: TConstructorElement[]
	bun: TIngredient
	totalPrice: number
}
