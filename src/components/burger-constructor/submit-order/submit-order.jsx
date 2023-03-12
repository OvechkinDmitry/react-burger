import React, { useCallback, useState } from 'react'
import styles from '../burger-constructor.module.css'
import Price from '../../ui/price/price'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../../modal/modal'
import OrderDetails from '../../order-details/order-details'
import { postOrder } from '../../../utils/post-order'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { deleteId } from '../../../services/reducers/order-details-slice'
import { useNavigate } from 'react-router-dom'

const SubmitOrder = ({ totalPrice, idS }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { user } = useSelector(state => state.authUserReducer)
	const { isLoading } = useSelector(state => state.orderDetailsReducer)
	const [isOpen, setOpen] = useState(false)
	const handleClose = useCallback(() => {
		dispatch(deleteId())
		setOpen(false)
	}, [dispatch])
	const handleClick = async () => {
		if (!user.email) {
			navigate('/login')
			return
		}
		setOpen(true)
		dispatch(postOrder(idS))
	}
	//todo:
	return (
		<>
			<div className={`${styles.submit} mt-10 mr-8`}>
				<Price text={totalPrice} size={'medium'} extraClass={'mr-10'} />
				<Button
					disabled={!totalPrice}
					onClick={handleClick}
					htmlType='button'
					type='primary'
					size='medium'
				>
					{isLoading ? 'Загрузка...' : 'Оформить заказ'}
				</Button>
			</div>
			{isOpen && !isLoading && (
				<Modal handleClose={handleClose}>
					<OrderDetails />
				</Modal>
			)}
		</>
	)
}

SubmitOrder.propTypes = {
	totalPrice: PropTypes.number.isRequired,
	idS: PropTypes.arrayOf(PropTypes.string)
}

export default SubmitOrder
