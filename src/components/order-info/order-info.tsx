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
import { WS_ALL, WS_USER } from '../../services/middleware/constants'
import { processOrder } from '../../utils/process-orders'

export const OrderInfo: FC = () => {
	const location = useLocation()
	const { id } = useParams()
	const { orders } = useTypedSelector(state => state.websoketReducer)
	const { ingredients } = useTypedSelector(state => state.ingredientsReducer)
	const dispatch = useTypedDispatch()

	const background = location.state?.background

	useEffect(() => {
		if (!background && !orders?.orders?.length) {
			!location.pathname.startsWith('/profile/orders')
				? dispatch(wsStart(WS_ALL))
				: dispatch(wsStart(WS_USER))
		}
		return () => {
			if (!background) dispatch(wsDisconnect())
		}
	}, [dispatch])

	const currentOrder = orders?.orders
		? orders.orders.find((el: any) => el._id === id)
		: null

	const orderPrice = useMemo(
		() =>
			currentOrder
				? currentOrder.ingredients.reduce((acc: number, id: string) => {
						return acc + (ingredients.find(el => el._id === id)?.price || 0)
				  }, 0)
				: 0,
		[currentOrder, ingredients]
	)

	return (
		<div className={background ? styles.bodyModal : styles.bodyPage}>
			<center>
				{!background && (
					<p className={'text text_type_digits-default mb-10'}>
						{currentOrder && `#${currentOrder?.number || '00000'}`}
					</p>
				)}
			</center>
			{currentOrder ? (
				<>
					<p className={`text text_type_main-medium mt-5`}>
						{currentOrder?.name || 'Unknown'}
					</p>
					<p className={`${styles.status} text text_type_main-default mt-4`}>
						Выполнен
					</p>
					<p className='text text_type_main-medium mb-6'>Состав:</p>
					<div className={styles.ingredients}>
						{processOrder(currentOrder?.ingredients).map((ing, i) => (
							<OrderIngredient key={i} id={ing[0]} count={ing[1]} />
						))}
					</div>
					<div className={`${styles.footer} mt-10`}>
						<span className={'text text_type_main-default text_color_inactive'}>
							<FormattedDate date={new Date(currentOrder?.createdAt || '')} />
						</span>
						<Price text={`${orderPrice}`} size={'default'} />
					</div>
				</>
			) : (
				<Loader />
			)}
		</div>
	)
}
