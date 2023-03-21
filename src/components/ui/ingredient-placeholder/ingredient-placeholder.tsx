import React, { FC } from 'react'
import styles from './ingredient-placeholder.module.css'

const positionClass = (position: string) => {
	switch (position) {
		case 'top':
			return `${styles.topPlaceHolder} mb-4 mr-4`
		case 'bottom':
			return `${styles.bottomPlaceHolder} mt-4 mr-4`
		case 'middle':
			return 'mr-4'
		default:
			return ''
	}
}

type TIngredientPlaceholder = {
	title: string
	position: 'top' | 'bottom' | 'middle'
}

const IngredientPlaceholder: FC<TIngredientPlaceholder> = ({
	title,
	position
}) => {
	const extraClass = positionClass(position)
	return (
		<div className={`${styles.placeHolder} ${extraClass}`}>
			<p className={'text text_type_main-default'}>{title}</p>
		</div>
	)
}

export default IngredientPlaceholder
