import React from 'react'
import styles from './order-details.module.css'
import Done from '../ui/done/done'
import Loader from '../ui/loader/loader'
import { useSelector } from 'react-redux'
import WarnLog from '../ui/warn-log/warn-log'

const OrderDetails = () => {
	const { id, isError, isLoading } = useSelector(
		state => state.orderDetailsReducer
	)
	return (
		<>
			{isError && <WarnLog>Ошибка при выполнении заказа</WarnLog>}
			{isLoading && <Loader />}
			{!isError && !isLoading && (
				<p className={`${styles.id} text text_type_digits-large`}>{id}</p>
			)}
			<p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
			<Done extraClass={'mt-15'} />
			<p className='text text_type_main-small mt-15'>
				Ваш заказ начали готовить
			</p>
			<p className='text text_type_main-small text_color_inactive mt-2 pb-30'>
				Дождитесь готовности на орбитальной станции
			</p>
		</>
	)
}

export default OrderDetails
