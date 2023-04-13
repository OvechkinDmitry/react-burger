import React, { FC, useEffect, useMemo } from 'react'
import styles from './order-info.module.css'
import Price from '../ui/price/price'
import { OrderIngredient } from './ui/order-ingredient/order-ingredient'
import { useLocation, useParams } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/use-typed-selector'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { useTypedDispatch } from '../../hooks/use-typed-dispatch'
import {
	wsDisconnect,
	wsStart
} from '../../services/actions/wsActions/lib/ws-actions'
import Loader from '../ui/loader/loader'

const processOrder = (order: string[]): [string, number][] => {
	const counted = order.reduce((acc: any, v: string) => {
		return { ...acc, [v]: (acc[v] || 0) + 1 }
	}, {})
	return Object.entries(counted)
}

export const OrderInfo: FC = () => {
	const location = useLocation()
	const { id } = useParams()
	const { wsConnected, orders } = useTypedSelector(
		state => state.websoketReducer
	)
	const dispatch = useTypedDispatch()

	useEffect(() => {
		if (!orders?.orders?.length)
			dispatch(wsStart('wss://norma.nomoreparties.space/orders/all'))
		return () => {
			if (!location.state?.background) dispatch(wsDisconnect())
		}
	}, [dispatch])

	const { ingredients } = useTypedSelector(state => state.ingredientsReducer)

	const currentOrder = orders?.orders
		? orders.orders.find((el: any) => el._id === id)
		: {}

	const orderPrice = currentOrder?.ingredients
		? currentOrder.ingredients.reduce((acc: number, id: string) => {
				return acc + (ingredients.find(el => el._id === id)?.price || 0)
		  }, 0)
		: 0

	const processedOrder = processOrder(currentOrder?.ingredients || [])

	return (
		<div
			className={
				location.state?.background ? styles.bodyModal : styles.bodyPage
			}
		>
			<center>
				{!location.state?.background && (
					<p className={'text text_type_digits-default mb-10'}>
						{currentOrder?.number ? `#${currentOrder?.number}` : '#00000'}
					</p>
				)}
			</center>
			{Object.keys(currentOrder).length ? (
				<>
					<p className={`text text_type_main-medium mt-5`}>
						{currentOrder?.name || 'Unknown'}
					</p>
					<p className={`${styles.status} text text_type_main-default mt-4`}>
						Выполнен
					</p>
					<p className='text text_type_main-medium mb-6'>Состав:</p>
					<div className={styles.ingredients}>
						{processedOrder.map((ing, i) => (
							<OrderIngredient key={i} id={ing[0]} count={ing[1]} />
						))}
					</div>
					<div className={`${styles.footer} mt-10`}>
						<span className={'text text_type_main-default text_color_inactive'}>
							<FormattedDate
								date={
									wsConnected && orders?.orders?.length
										? new Date(currentOrder.createdAt)
										: new Date()
								}
							/>
						</span>
						<Price text={`${orderPrice}`} size={'default'} />
					</div>
				</>
			) : (
				<Loader />
			)}

			{/*<p className={`text text_type_main-medium mt-5`}>*/}
			{/*	{currentOrder?.name || 'Unknown'}*/}
			{/*</p>*/}
			{/*<p className={`${styles.status} text text_type_main-default mt-4`}>*/}
			{/*	Выполнен*/}
			{/*</p>*/}
			{/*<p className='text text_type_main-medium mb-6'>Состав:</p>*/}
			{/*<div className={styles.ingredients}>*/}
			{/*	{processedOrder.map(ing => (*/}
			{/*		<OrderIngredient id={ing[0]} count={ing[1]} />*/}
			{/*	))}*/}
			{/*</div>*/}
			{/*<div className={`${styles.footer} mt-10`}>*/}
			{/*	<span className={'text text_type_main-default text_color_inactive'}>*/}
			{/*		<FormattedDate*/}
			{/*			date={*/}
			{/*				wsConnected && orders?.orders?.length*/}
			{/*					? new Date(currentOrder.createdAt)*/}
			{/*					: new Date()*/}
			{/*			}*/}
			{/*		/>*/}
			{/*	</span>*/}
			{/*	<Price text={`${orderPrice}`} size={'default'} />*/}
			{/*</div>*/}
		</div>
	)
}
