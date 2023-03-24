import { TIngredient } from '../../../../utils/types/ingredient-type'

export type TIngredientsState = {
	ingredients: TIngredient[]
	isLoading: boolean
	isError: boolean
}
