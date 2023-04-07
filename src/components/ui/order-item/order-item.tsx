import React, { FC } from 'react'
import styles from './order-item.module.css'
import { useTypedSelector } from '../../../hooks/use-typed-selector'
import Price from '../price/price'
import { RoundIngredient } from '../rounded-ingredient/round-ingredient'

type TOrderItem = {
	id: string
	date: string
	title: string
	ingredients: object
	price: number
}

export const OrderItem: FC<Partial<TOrderItem>> = ({
	id,
	date,
	ingredients,
	price,
	title
}) => {
	const items = useTypedSelector(state => state.ingredientsReducer.ingredients)
	const { name, image_mobile } = items[0]
	return (
		<div className={styles.container}>
			<div className={`${styles.head} mb-6`}>
				<span className={'text text_type_digits-default'}>#034535</span>
				<span className={'text text_type_main-default text_color_inactive'}>
					Сегодня, 16:20
				</span>
			</div>
			<p className='text text_type_main-medium mb-6'>
				Death Star Starship Main бургер
			</p>

			<div className={styles.footer}>
				<div className={styles.ingredients}>
					<RoundIngredient src={image_mobile} extraClass={styles.ingredient} />
					<RoundIngredient src={image_mobile} extraClass={styles.ingredient} />
					<RoundIngredient src={image_mobile} extraClass={styles.ingredient} />
					<RoundIngredient src={image_mobile} extraClass={styles.ingredient} />
					<RoundIngredient
						src={image_mobile}
						count={1}
						extraClass={styles.ingredient}
					/>
					<RoundIngredient src={image_mobile} extraClass={styles.ingredient} />
					<RoundIngredient src={image_mobile} extraClass={styles.ingredient} />
					<RoundIngredient src={image_mobile} extraClass={styles.ingredient} />
				</div>
				<Price text={'480'} size={'default'} extraClass={'ml-6'} />
			</div>
		</div>
	)
}
