import { TIngredient } from './types/ingredient-type'

export const calculatePrice = (data: Array<TIngredient>): number => {
	return data && data.length && data.every(el => el !== undefined)
		? data.reduce((acc: number, el) => {
				if (!el.price) return acc
				if (el.type === 'bun') return acc + el?.price * 2
				return acc + el?.price
		  }, 0)
		: 0
}
