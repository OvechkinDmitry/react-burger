import React, { FC, useEffect } from 'react'
import styles from './feed.module.css'
import { OrderItem } from '../../components/ui/order-item/order-item'
import { useTypedSelector } from '../../hooks/use-typed-selector'
import Loader from '../../components/ui/loader/loader'
import { useTypedDispatch } from '../../hooks/use-typed-dispatch'
import {
	wsDisconnect,
	wsStart
} from '../../services/actions/wsActions/lib/ws-actions'
import { WS_ALL } from '../../services/middleware/constants'
import { TOrderItem } from '../../services/middleware/model/types'

const getFilteredOrders = (orders: TOrderItem[], status: string) => {
	return orders
		.filter(order => order.status === status)
		.slice(0, 20)
		.map(order => (
			<li key={order._id} className='text text_type_digits-default'>
				{order.number}
			</li>
		))
}

export const Feed: FC = () => {
	const dispatch = useTypedDispatch()
	const { orders } = useTypedSelector(state => state.websoketReducer)
	const { isLoading } = useTypedSelector(state => state.ingredientsReducer)

	useEffect(() => {
		dispatch(wsStart(WS_ALL))
		return () => {
			dispatch(wsDisconnect())
		}
	}, [dispatch])

	return orders && !isLoading ? (
		<div className={styles.container}>
			<p className={`${styles.title} text text_type_main-large`}>
				Лента заказов
			</p>
			<div className={`${styles.body}`}>
				<div className={styles.orders}>
					{orders.orders.map((order, i) => {
						return <OrderItem key={i} order={order} />
					})}
				</div>
				<div className={styles.ordersInfo}>
					<div className={`${styles.statuses} mb-15`}>
						<div className={styles.status}>
							<p className={'text text_type_main-medium mb-6'}>Готовы:</p>
							<ul className={styles.ready}>
								{getFilteredOrders(orders.orders, 'done')}
							</ul>
						</div>
						<div className={styles.status}>
							<p className={'text text_type_main-medium mb-6'}>В работе:</p>
							<ul className={styles.pending}>
								{getFilteredOrders(orders.orders, 'pending')}
							</ul>
						</div>
					</div>
					<p className={'text text_type_main-medium'}>
						Выполнено за все время:
					</p>
					<p className={'text text_type_digits-large mb-15'}>{orders?.total}</p>
					<p className={'text text_type_main-medium'}>Выполнено за сегодня:</p>
					<p className={'text text_type_digits-large'}>{orders?.totalToday}</p>
				</div>
			</div>
		</div>
	) : (
		<Loader></Loader>
	)
}
