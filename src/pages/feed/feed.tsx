import React, { FC } from 'react'
import styles from './feed.module.scss'
import { OrderItem } from '../../components/ui/order-item/order-item'

type TFeed = {}

export const Feed: FC<TFeed> = () => {
	return (
		<div>
			<div className={`${styles.title} text text_type_main-large`}>
				Лента заказов
			</div>
			<div className={`${styles.container}`}>
				<div className={styles.orders}>
					<OrderItem />
				</div>
				<div className={styles.ordersInfo}></div>
			</div>
		</div>
	)
}
