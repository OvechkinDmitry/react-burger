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
import { checkUserWithTokens } from '../../../services/reducers/auth-user-slice'
import { useNavigate } from 'react-router-dom'

const SubmitOreder = ({ totalPrice, idS }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { user, isChecking } = useSelector(state => state.authUserReducer)
	const [isOpen, setOpen] = useState(false)
	const handleClose = useCallback(() => {
		dispatch(deleteId())
		setOpen(false)
	}, [dispatch])
	const handleClick = useCallback(() => {
		if (!user.email) {
			navigate('/login')
			return
		}
		dispatch(checkUserWithTokens())
		setOpen(true)
		dispatch(postOrder(idS))
	}, [idS, dispatch, user.email, navigate])
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
					{isChecking ? 'Загрузка...' : 'Оформить заказ'}
				</Button>
			</div>
			{isOpen && !isChecking && (
				<Modal handleClose={handleClose}>
					<OrderDetails />
				</Modal>
			)}
		</>
	)
}

SubmitOreder.propTypes = {
	totalPrice: PropTypes.number.isRequired,
	idS: PropTypes.arrayOf(PropTypes.string)
}

export default SubmitOreder
