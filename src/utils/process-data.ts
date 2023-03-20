import { TIngredient } from './types/ingredient-type'

export const processData = (
	data: Array<TIngredient>
): { [key: string]: Array<TIngredient> } => {
	if (data.length)
		return data.reduce((acc: { [key: string]: Array<TIngredient> }, el) => {
			if (el.type in acc) acc[el.type].push(el)
			else acc[el.type] = [el]
			return acc
		}, {})
	else return {}
}
