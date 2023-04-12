import React, { FC } from 'react'
import styles from './order-item.module.css'
import { useTypedSelector } from '../../../hooks/use-typed-selector'
import Price from '../price/price'
import { RoundIngredient } from '../rounded-ingredient/round-ingredient'
import { TIngredient } from '../../../utils/types/ingredient-type'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation } from 'react-router-dom'

type TOrderItem = {
	order: any
}

const processOrder = (order: any) => {
	const counted = order.reduce((acc: any, v: any) => {
		return { ...acc, [v]: (acc[v] || 0) + 1 }
	}, {})
	return Object.entries(counted)
}

const countPrice = (order: string[], menuList: TIngredient[]) => {
	if (menuList.length)
		return order.reduce(
			(acc: number, el: string) =>
				acc + (menuList?.find(item => item._id === el)?.price || 0),
			0
		)
	else return 0
}

export const OrderItem: FC<Partial<TOrderItem>> = ({ order }) => {
	const items = useTypedSelector(state => state.ingredientsReducer.ingredients)
	const countedItems = processOrder(order.ingredients)
	const location = useLocation()
	const id = order._id
	return (
		<Link to={`/feed/${id}`} state={{ background: location }}>
			<div className={styles.container}>
				<div className={`${styles.head} mb-6`}>
					<span className={'text text_type_digits-default'}>
						#{order.number}
					</span>
					<span className={'text text_type_main-default text_color_inactive'}>
						<FormattedDate date={new Date(order.createdAt)} />
					</span>
				</div>
				<p className='text text_type_main-medium mb-6'>{order.name}</p>
				<div className={styles.footer}>
					<div className={styles.ingredients}>
						{countedItems.map((ingredient: any, i) => (
							<RoundIngredient
								key={i}
								ingredient={ingredient}
								extraClass={styles.ingredient}
							/>
						))}
					</div>
					<Price
						text={`${countPrice(order.ingredients, items)}`}
						size={'default'}
						extraClass={'ml-6'}
					/>
				</div>
			</div>
		</Link>
	)
}
