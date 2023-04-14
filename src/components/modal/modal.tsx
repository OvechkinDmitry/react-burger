import React, { FC, ReactElement, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOvrelay from '../modal-overlay/modal-ovrelay'

const portal = document.getElementById('portal') as Element

type TModal = {
	handleClose: () => void
	optionalTitle?: string
	children: ReactElement
}

const Modal: FC<TModal> = ({ handleClose, children }) => {
	useEffect(() => {
		const escClosing = (e: KeyboardEvent) =>
			e.key === 'Escape' ? handleClose() : null
		document.body.addEventListener('keydown', escClosing)
		return () => document.body.removeEventListener('keydown', escClosing)
	}, [handleClose])

	return createPortal(
		<div>
			<ModalOvrelay handleClose={handleClose} />
			<div className={`${styles.modal} pt-10 pl-10 pr-10 pb-10`}>
				<div className={styles.closeBtn}>
					<CloseIcon onClick={handleClose} type='primary' />
				</div>
				<div className={`${styles.body}`}>{children}</div>
			</div>
		</div>,
		portal
	)
}

export default Modal
