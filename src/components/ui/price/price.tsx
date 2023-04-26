import React, { FC } from 'react'
import styles from './price.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

type TPrice = {
	text: string
	size: 'default' | 'medium'
	extraClass?: string
	count?: number
}
const Price: FC<TPrice> = ({ text, size, extraClass, count }) => {
	return (
		<div className={`${styles.price} ${extraClass}`}>
			{count && (
				<span className={`text text_type_digits-${size}`}>{count} X</span>
			)}
			<span data-cy={'order-price'} className={`text text_type_digits-${size}`}>
				{text}
			</span>
			<CurrencyIcon type='primary' />
		</div>
	)
}
export default Price
