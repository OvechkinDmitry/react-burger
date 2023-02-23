import React from 'react'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { ingredientType } from '../../../../utils/global-prop-types'
import IngredientPlaceholder from '../../../ui/ingredient-placeholder/ingredient-placeholder'

const Bun = ({ type, data, isLocked }) => {
	const place = type === 'top' ? 'верх' : 'низ'
	const extraClass = type === 'top' ? 'mb-4 mr-4' : 'mt-4 mr-4'
	return Object.keys(data).length ? (
		<ConstructorElement
			extraClass={extraClass}
			type={type}
			isLocked={isLocked}
			text={`${data.name} (${place})`}
			price={data.price}
			thumbnail={data.image}
		/>
	) : (
		<IngredientPlaceholder title={'Место для булки'} position={type} />
	)
}

Bun.propTypes = {
	type: PropTypes.string.isRequired,
	data: PropTypes.oneOfType([ingredientType, PropTypes.object]).isRequired,
	isLocked: PropTypes.bool.isRequired
}

export default Bun
