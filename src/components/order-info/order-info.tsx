import React, { FC } from 'react'
import styles from './order-info.module.css'
import Price from '../ui/price/price'
import { OrderIngredient } from './ui/order-ingredient/order-ingredient'

type TOrderInfo = {
	id: string
	title: string
	status: string
	date: string
}
export const OrderInfo: FC<Partial<TOrderInfo>> = ({
	id,
	title,
	status,
	date
}) => {
	return (
		<div className={styles.body}>
			<center>
				<p className={'text text_type_digits-default mb-10'}>#034533</p>
			</center>
			<p className={`text text_type_main-medium mb-3`}>
				Black Hole Singularity острый бургер
			</p>
			<p className={`${styles.status} text text_type_main-default mb-15`}>
				Выполнен
			</p>
			<p className='text text_type_main-medium mb-6'>Состав:</p>
			<div className={styles.ingredients}>
				<OrderIngredient />
				<OrderIngredient />
				<OrderIngredient />
				<OrderIngredient />
				<OrderIngredient />
				<OrderIngredient />
			</div>
			<div className={`${styles.footer} mt-10`}>
				<p className='text text_type_main-default text_color_inactive'>
					Вчера, 13:50
				</p>
				<Price text={'510'} size={'default'} />
			</div>
		</div>
	)
}
