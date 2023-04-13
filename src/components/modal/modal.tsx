import React, { FC, ReactElement, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOvrelay from '../modal-overlay/modal-ovrelay'
import { useParams } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/use-typed-selector'

const portal = document.getElementById('portal') as Element

type TModal = {
	handleClose: () => void
	optionalTitle?: string
	children: ReactElement
}

const Modal: FC<TModal> = ({ handleClose, optionalTitle, children }) => {
	const { id } = useParams()
	const { orders } = useTypedSelector(state => state.websoketReducer)
	const orderNumber = useMemo(
		() =>
			orders
				? `#${
						orders.orders.find((order: any) => order._id === id)?.number ||
						'00000'
				  }`
				: '',
		[id, orders?.orders]
	)

	useEffect(() => {
		const escClosing = (e: KeyboardEvent) =>
			e.key === 'Escape' ? handleClose() : null
		document.body.addEventListener('keydown', escClosing)
		return () => document.body.removeEventListener('keydown', escClosing)
	}, [handleClose])

	return createPortal(
		<div>
			<ModalOvrelay handleClose={handleClose} />
			<div
				className={`${styles.modal} ${
					orders && styles.orderBody
				} pt-10 pl-10 pr-10 pb-10`}
			>
				<div className={styles.header}>
					<p
						className={
							!orders
								? 'text text_type_main-large'
								: 'text text_type_digits-medium'
						}
					>
						{orderNumber || optionalTitle}
					</p>
					<div className={styles.closeBtn}>
						<CloseIcon onClick={handleClose} type='primary' />
					</div>
				</div>
				<div className={`${styles.body}`}>{children}</div>
			</div>
		</div>,
		portal
	)
}

export default Modal
