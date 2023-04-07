import React, { FC } from 'react'
import styles from './round-ingredient.module.css'

type TRoundIngredient = {
	src: string
	count?: number
	extraClass: string
}

export const RoundIngredient: FC<TRoundIngredient> = ({
	src,
	count = 2,
	extraClass
}) => {
	return (
		<div className={`${styles.body} ${extraClass}`}>
			<img src={src} alt={'ингредиент'} />
			{count > 1 && (
				<div className={`${styles.count} text text_type_digits-default`}>
					+{count}
				</div>
			)}
		</div>
	)
}
