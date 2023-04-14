import React, { FC } from 'react'
import styles from './order-ingredient.module.css'
import { RoundIngredient } from '../../../ui/rounded-ingredient/round-ingredient'
import Price from '../../../ui/price/price'

type TOrderIngredient = {
	image: string
	count?: number
	name?: string
	price?: number
}

export const OrderIngredient: FC<Partial<TOrderIngredient>> = ({
	image,
	name,
	count = 1,
	price
}) => {
	return (
		<div className={styles.body}>
			<RoundIngredient image={image || ''} extraClass={'mr-4'} />
			<p className='text text_type_main-default'>{name || ''}</p>
			<Price
				text={`${price || 0}`}
				size={'default'}
				count={count}
				extraClass={styles.price}
			/>
		</div>
	)
}
