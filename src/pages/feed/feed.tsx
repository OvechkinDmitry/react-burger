import React, { FC } from 'react'
import styles from './feed.module.css'
import { OrderItem } from '../../components/ui/order-item/order-item'

type TFeed = {}

export const Feed: FC<TFeed> = () => {
	return (
		<div className={styles.container}>
			<p className={`${styles.title} text text_type_main-large`}>
				Лента заказов
			</p>
			<div className={`${styles.body}`}>
				<div className={styles.orders}>
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
					<p className={'text text_type_digits-large mb-15'}>28 752</p>
					<p className={'text text_type_main-medium'}>Выполнено за сегодня:</p>
					<p className={'text text_type_digits-large'}>138</p>
				</div>
			</div>
		</div>
	)
}
