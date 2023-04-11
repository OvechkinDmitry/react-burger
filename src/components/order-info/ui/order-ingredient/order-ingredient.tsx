import React from 'react'
import styles from './order-ingredient.module.css'
import { useTypedSelector } from '../../../../hooks/use-typed-selector'
import { RoundIngredient } from '../../../ui/rounded-ingredient/round-ingredient'
import Price from '../../../ui/price/price'

type TOrderIngredient = {}

export const OrderIngredient = () => {
	const items = useTypedSelector(state => state.ingredientsReducer.ingredients)
	const { name, image_mobile } = items[0]
	return (
		<div className={styles.body}>
			{/*<RoundIngredient src={image_mobile} extraClass={'mr-4'} />*/}
			<p className='text text_type_main-default'>Флюоресцентная булка R2-D3</p>
			<Price text={'20'} size={'default'} count={1} extraClass={styles.price} />
		</div>
	)
}
