import React, { FC } from 'react'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientPlaceholder from '../../../ui/ingredient-placeholder/ingredient-placeholder'
import { TIngredient } from '../../../../utils/types/ingredient-type'

type TBunComponent = {
	type: 'top' | 'bottom'
	data: TIngredient | { [key: string]: any }
	isLocked: boolean
}

const Bun: FC<TBunComponent> = ({ type, data, isLocked }) => {
	const place = type === 'top' ? 'верх' : 'низ'
	const extraClass = type === 'top' ? 'mb-4 mr-4' : 'mt-4 mr-4'
	return Object.keys(data).length ? (
		<ConstructorElement
			extraClass={extraClass}
			type={type}
			isLocked={isLocked}
			text={`${data?.name} (${place})`}
			price={data?.price}
			thumbnail={data?.image}
		/>
	) : (
		<IngredientPlaceholder title={'Место для булки'} position={type} />
	)
}
export default Bun
