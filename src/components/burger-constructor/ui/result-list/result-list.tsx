import React from 'react'
import Bun from '../bun/bun'
import ConstuctorList from '../constructor-list/constuctor-list'
import {
	addBun,
	addConstructorElements,
	calculateTotalPrice
} from '../../../../services/reducers/burger-constructor-slice'
import { useDrop } from 'react-dnd'
import styles from './result-list.module.css'
import { v1 as uuid } from 'uuid'
import { useTypedSelector } from '../../../../hooks/use-typed-selector'
import { useTypedDispatch } from '../../../../hooks/use-typed-dispatch'
import { TIngredient } from '../../../../utils/types/ingredient-type'

const ResultList = () => {
	const dispatch = useTypedDispatch()
	const { constructorElements, bun } = useTypedSelector(
		state => state.burgerConstructorReducer
	)
	const onDropHandler = (ingredient: TIngredient) => {
		if (ingredient.type !== 'bun')
			dispatch(
				addConstructorElements({ ingredient: { ...ingredient, index: uuid() } })
			)
		else dispatch(addBun({ ingredient: ingredient }))
		dispatch(calculateTotalPrice())
	}

	const [, dropTarget] = useDrop({
		accept: 'ingredient',
		drop(ingredient: TIngredient) {
			onDropHandler(ingredient)
		}
	})
	return (
		<div ref={dropTarget} className={`${styles.resultList}`}>
			<Bun isLocked={true} type={'top'} data={bun} />
			<ConstuctorList data={[...constructorElements]} />
			<Bun isLocked={true} type={'bottom'} data={bun} />
		</div>
	)
}

export default ResultList
