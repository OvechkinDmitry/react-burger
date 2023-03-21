import React, { FC, ReactNode } from 'react'
import styles from './warn-log.module.css'

type TWarnLog = {
	children: ReactNode
}

const WarnLog: FC<TWarnLog> = ({ children }) => {
	return (
		<div className={`${styles.warnLog} text_type_main-large`}>{children}</div>
	)
}
export default WarnLog
