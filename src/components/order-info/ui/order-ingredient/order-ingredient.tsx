import React, { FC } from 'react'
import styles from './order-ingredient.module.css'
import { useTypedSelector } from '../../../../hooks/use-typed-selector'
import { RoundIngredient } from '../../../ui/rounded-ingredient/round-ingredient'
import Price from '../../../ui/price/price'

type TOrderIngredient = {
	id: string
	count?: number
}

export const OrderIngredient: FC<Partial<TOrderIngredient>> = ({
	id,
	count = 1
}) => {
	const items = useTypedSelector(state => state.ingredientsReducer.ingredients)
	const ingredient = items.find(item => item._id === id)
	return (
		<div className={styles.body}>
			<RoundIngredient ingredient={ingredient?._id || ''} extraClass={'mr-4'} />
			<p className='text text_type_main-default'>{ingredient?.name || ''}</p>
			<Price
				text={`${ingredient?.price || 0}`}
				size={'default'}
				count={count}
				extraClass={styles.price}
			/>
		</div>
	)
}
