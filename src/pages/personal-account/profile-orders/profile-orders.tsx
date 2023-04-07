import React, { FC } from 'react'
import styles from './profile-orders.module.css'
import { OrderItem } from '../../../components/ui/order-item/order-item'

type TProfileOrders = {}

export const ProfileOrders: FC<TProfileOrders> = ({}) => {
	return (
		<div className={`${styles.orders} mt-20`}>
			<OrderItem />
			<OrderItem />
			<OrderItem />
			<OrderItem />
			<OrderItem />
			<OrderItem />
			<OrderItem />
			<OrderItem />
			<OrderItem />
			<OrderItem />
			<OrderItem />
			<OrderItem />
		</div>
	)
}
