import React, { FC, useEffect } from 'react'
import styles from './profile-orders.module.css'
import { OrderItem } from '../../../components/ui/order-item/order-item'
import { useTypedDispatch } from '../../../hooks/use-typed-dispatch'
import {
	wsDisconnect,
	wsStart
} from '../../../services/actions/wsActions/lib/ws-actions'
import { useTypedSelector } from '../../../hooks/use-typed-selector'
import Loader from '../../../components/ui/loader/loader'

type TProfileOrders = {}

export const ProfileOrders: FC<TProfileOrders> = ({}) => {
	const dispatch = useTypedDispatch()
	const { wsConnected, orders } = useTypedSelector(
		state => state.websoketReducer
	)
	useEffect(() => {
		dispatch(
			wsStart(
				`wss://norma.nomoreparties.space/orders/?token=${localStorage.getItem(
					'accessToken'
				)}`
			)
		)
		return () => {
			dispatch(wsDisconnect())
		}
	}, [])

	console.log(orders)
	return wsConnected ? (
		<div className={`${styles.orders} mt-20`}>
			{orders?.orders?.length
				? orders.orders.map((order: any) => (
						<OrderItem order={order} key={order._id} />
				  ))
				: null}
		</div>
	) : (
		<Loader />
	)
}
