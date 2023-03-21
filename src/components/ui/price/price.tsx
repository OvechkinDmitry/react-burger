import React, { FC } from 'react'
import styles from './price.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

type TPrice = {
	text: string
	size: 'default' | 'medium'
	extraClass?: string
}
const Price: FC<TPrice> = ({ text, size, extraClass }) => {
	return (
		<div className={`${styles.price} ${extraClass}`}>
			<span className={`text text_type_digits-${size}`}>{text}</span>
			<CurrencyIcon type='primary' />
		</div>
	)
}
export default Price
