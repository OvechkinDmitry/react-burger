import React from 'react'
import PropTypes from 'prop-types'
import styles from './ingredient-placeholder.module.css'
const positionClass = position => {
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

const IngredientPlaceholder = ({ title, position }) => {
	const extraClass = positionClass(position)
	return (
		<div className={`${styles.placeHolder} ${extraClass}`}>
			<p className={'text text_type_main-default'}>{title}</p>
		</div>
	)
}

IngredientPlaceholder.propTypes = {
	title: PropTypes.string.isRequired,
	position: PropTypes.string.isRequired
}

export default IngredientPlaceholder
