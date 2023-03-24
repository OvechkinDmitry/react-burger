import React, { FC, useCallback, useState } from 'react'
import styles from '../burger-constructor.module.css'
import Price from '../../ui/price/price'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../../modal/modal'
import OrderDetails from '../../order-details/order-details'
import { postOrder } from '../../../utils/post-order'
import { deleteId } from '../../../services/reducers/order-details/lib/order-details-slice'
import { useNavigate } from 'react-router-dom'
import { useTypedSelector } from '../../../hooks/use-typed-selector'
import { useTypedDispatch } from '../../../hooks/use-typed-dispatch'

type TSubmitOrder = {
	totalPrice: number
	idS: string[]
}

const SubmitOrder: FC<TSubmitOrder> = ({ totalPrice, idS }) => {
	const dispatch = useTypedDispatch()
	const navigate = useNavigate()
	const { user } = useTypedSelector(state => state.authUserReducer)
	const { isLoading } = useTypedSelector(state => state.orderDetailsReducer)
	const [isOpen, setOpen] = useState<boolean>(false)
	const handleClose = useCallback<() => void>(() => {
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
	return (
		<>
			<div className={`${styles.submit} mt-10 mr-8`}>
				<Price text={String(totalPrice)} size={'medium'} extraClass={'mr-10'} />
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
				<Modal optionalTitle={''} handleClose={handleClose}>
					<OrderDetails />
				</Modal>
			)}
		</>
	)
}

export default SubmitOrder
