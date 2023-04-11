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

type TFeed = {}

export const Feed: FC<TFeed> = () => {
	const dispatch = useTypedDispatch()
	const { wsConnected, orders } = useTypedSelector(
		state => state.websoketReducer
	)
	const { isLoading } = useTypedSelector(state => state.ingredientsReducer)

	useEffect(() => {
		dispatch(wsStart('wss://norma.nomoreparties.space/orders/all'))
		return () => {
			dispatch(wsDisconnect())
		}
	}, [dispatch])
	return wsConnected && Object.keys(orders).length && !isLoading ? (
		<div className={styles.container}>
			<p className={`${styles.title} text text_type_main-large`}>
				Лента заказов
			</p>
			<div className={`${styles.body}`}>
				<div className={styles.orders}>
					{orders.orders.map((order: any, i: number) => {
						return <OrderItem key={i} order={order} />
					})}
				</div>
				<div className={styles.ordersInfo}>
					<div className={`${styles.statuses} mb-15`}>
						<div className={styles.status}>
							<p className={'text text_type_main-medium mb-6'}>Готовы:</p>
							<ul className={styles.ready}>
								<li className='text text_type_digits-default'>034533</li>
								<li className='text text_type_digits-default'>034533</li>
								<li className='text text_type_digits-default'>034533</li>
								<li className='text text_type_digits-default'>034533</li>
								<li className='text text_type_digits-default'>034533</li>
								<li className='text text_type_digits-default'>034533</li>
								<li className='text text_type_digits-default'>034533</li>
							</ul>
						</div>
						<div className={styles.status}>
							<p className={'text text_type_main-medium mb-6'}>В работе:</p>
							<ul className={styles.pending}>
								<li className='text text_type_digits-default'>034533</li>
								<li className='text text_type_digits-default'>034533</li>
								<li className='text text_type_digits-default'>034533</li>
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
