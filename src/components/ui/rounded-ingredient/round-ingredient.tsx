import React, { FC } from 'react'
import styles from './round-ingredient.module.css'
import { useTypedSelector } from '../../../hooks/use-typed-selector'

type TRoundIngredient = {
	ingredient: any
	extraClass: string
}

export const RoundIngredient: FC<TRoundIngredient> = ({
	ingredient,
	extraClass
}) => {
	const { ingredients } = useTypedSelector(state => state.ingredientsReducer)
	const ing = ingredients.find(el => el._id === ingredient[0])
	return ing ? (
		<div className={`${styles.body} ${extraClass}`}>
			<img src={ing.image_mobile} alt={'ингредиент'} />
			{ingredient[1] > 1 && (
				<div className={`${styles.count} text text_type_digits-default`}>
					+{ingredient[1]}
				</div>
			)}
		</div>
	) : null
}
