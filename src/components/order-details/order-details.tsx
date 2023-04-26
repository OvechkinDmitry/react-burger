import React, { FC } from 'react'
import styles from './order-details.module.css'
import Done from '../ui/done/done'
import Loader from '../ui/loader/loader'
import WarnLog from '../ui/warn-log/warn-log'
import { useTypedSelector } from '../../hooks/use-typed-selector'

const OrderDetails: FC = () => {
	const { id, isError, isLoading } = useTypedSelector(
		state => state.orderDetailsReducer
	)
	return (
		<div data-cy={'order-details'} className={styles.body}>
			{isError && <WarnLog>Ошибка при выполнении заказа</WarnLog>}
			{isLoading && <Loader />}
			{!isError && !isLoading && (
				<p className={`${styles.id} text text_type_digits-large`}>{id}</p>
			)}
			<p className='text text_type_main-medium mt-8'>
				{!isError ? 'идентификатор заказа' : ''}
			</p>
			<Done extraClass={'mt-15'} />
			<p className='text text_type_main-small mt-15'>
				{!isError ? 'Ваш заказ начали готовить' : 'Ошибка'}
			</p>
			<p className='text text_type_main-small text_color_inactive mt-2 pb-25'>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	)
}

export default OrderDetails
