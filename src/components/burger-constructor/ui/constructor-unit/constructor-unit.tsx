import React from 'react'
import { Reorder } from 'framer-motion'
import {
	ConstructorElement,
	DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { TIngredient } from '../../../../utils/types/ingredient-type'

type TConstructorUnit = {
	ingredient: TIngredient & { index: string }
	handleClose: (index: string) => void
}
const ConstructorUnit = React.memo<TConstructorUnit>(
	({ ingredient, handleClose }) => {
		return (
			<Reorder.Item
				whileDrag={{
					scale: 1.1
				}}
				value={ingredient}
			>
				<div className={'ml-4'}>
					<DragIcon type='primary' />
				</div>
				<ConstructorElement
					extraClass={`ml-2`}
					text={ingredient.name}
					price={ingredient.price}
					thumbnail={ingredient.image}
					handleClose={() => handleClose(ingredient.index)}
				/>
			</Reorder.Item>
		)
	}
)

export default ConstructorUnit
