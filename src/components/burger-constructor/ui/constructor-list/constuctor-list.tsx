import React, { FC } from 'react'
import { Reorder } from 'framer-motion'
import style from './constuctor-list.module.css'
import {
	calculateTotalPrice,
	deleteConstructorElement,
	updateConstructorElements
} from '../../../../services/reducers/burger-constructor/lib/burger-constructor-slice'
import ConstructorUnit from '../constructor-unit/constructor-unit'
import IngredientPlaceholder from '../../../ui/ingredient-placeholder/ingredient-placeholder'
import { TIngredient } from '../../../../utils/types/ingredient-type'
import { useTypedDispatch } from '../../../../hooks/use-typed-dispatch'

type TConstuctorList = {
	data: Array<TIngredient & { index: string }>
}

const ConstuctorList: FC<TConstuctorList> = ({ data }) => {
	const dispatch = useTypedDispatch()

	const handleClose = (index: string): void => {
		dispatch(deleteConstructorElement({ index }))
		dispatch(calculateTotalPrice())
	}

	const handleReorder = (elements: typeof data): void => {
		dispatch(updateConstructorElements({ ingredients: elements }))
	}

	return (
		<>
			{!!data.length ? (
				<Reorder.Group
					className={style.constructorList}
					values={data}
					onReorder={handleReorder}
				>
					{data.map(el => (
						<ConstructorUnit
							key={el.index}
							handleClose={handleClose}
							ingredient={el}
						/>
					))}
				</Reorder.Group>
			) : (
				<IngredientPlaceholder
					position={'middle'}
					title={'Место для начинки'}
				/>
			)}
		</>
	)
}
export default ConstuctorList
