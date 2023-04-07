import React, { FC } from 'react'
import styles from './order-item.module.scss'

type TOrderItem = {
	id: string
	date: string
	title: string
	ingredients: object
	price: number
}

export const OrderItem: FC<TOrderItem> = () => {
	return <div></div>
}
