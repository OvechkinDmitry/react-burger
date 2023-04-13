import React, { FC } from 'react'
import styles from './round-ingredient.module.css'
import { useTypedSelector } from '../../../hooks/use-typed-selector'

type TRoundIngredient = {
	ingredient: any
	extraClass?: string
	count?: number
}

export const RoundIngredient: FC<TRoundIngredient> = ({
	ingredient,
	extraClass,
	count = 1
}) => {
	const { ingredients } = useTypedSelector(state => state.ingredientsReducer)
	const ing = ingredients.find(el => el._id === ingredient)
	return ing ? (
		<div className={`${styles.body} ${extraClass}`}>
			<img src={ing.image_mobile} alt={'ингредиент'} />
			{count > 1 && (
				<div className={`${styles.count} text text_type_digits-default`}>
					+{count}
				</div>
			)}
		</div>
	) : null
}
