import React, { useMemo } from 'react'
import styles from './ingredient-cart.module.css'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import Price from '../../../ui/price/price'
import { useDrag } from 'react-dnd'
import { Link, useLocation } from 'react-router-dom'
import { TIngredient } from '../../../../utils/types/ingredient-type'
import { useTypedSelector } from '../../../../hooks/use-typed-selector'

type TIngredientCart = {
	ingredient: TIngredient
}

const IngredientCart = React.memo<TIngredientCart>(({ ingredient }) => {
	const location = useLocation()
	const ingredientId = ingredient._id
	const [_, dragRef] = useDrag({
		type: 'ingredient',
		item: ingredient
	})
	const { constructorElements, bun } = useTypedSelector(
		state => state.burgerConstructorReducer
	)
	const count = useMemo(() => {
		const ingredients = [...constructorElements, bun, bun] as TIngredient[]
		return ingredients.filter(el => el._id === ingredient._id).length
	}, [ingredient, constructorElements, bun])
	return (
		<Link
			key={ingredient._id}
			to={`/ingredients/${ingredientId}`}
			state={{ background: location }}
		>
			<li ref={dragRef} className={styles.cart}>
				{count > 0 && <Counter count={count} size='default' extraClass='m-1' />}
				<img
					alt={`изображение ${ingredient.name}`}
					src={ingredient.image}
					className='pr-4 pb-1 pl-4'
				/>
				<Price text={String(ingredient.price)} size={'default'} />
				<span
					className={`${styles.description} text text_type_main-small mt-1`}
				>
					{ingredient.name}
				</span>
			</li>
		</Link>
	)
})
export default IngredientCart
