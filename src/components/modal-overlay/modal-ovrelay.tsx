import React, { FC } from 'react'
import styles from '../modal-overlay/modal-overlay.module.css'

type ModalOverlay = {
	handleClose: () => void
}
const ModalOvrelay: FC<ModalOverlay> = ({ handleClose }) => {
	return <div className={styles.overlay} onClick={handleClose}></div>
}
export default ModalOvrelay
