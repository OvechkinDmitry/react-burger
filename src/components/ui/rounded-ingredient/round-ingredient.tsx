import React, { FC } from 'react'
import styles from './round-ingredient.module.css'

type TRoundIngredient = {
	image: string
	extraClass?: string
	count?: number
}

export const RoundIngredient: FC<TRoundIngredient> = ({
	image,
	extraClass,
	count = 1
}) => {
	return image ? (
		<div className={`${styles.body} ${extraClass}`}>
			<img src={image} alt={'ингредиент'} />
			{count > 1 && (
				<div className={`${styles.count} text text_type_digits-default`}>
					+{count}
				</div>
			)}
		</div>
	) : null
}
