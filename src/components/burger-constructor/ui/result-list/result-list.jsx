import React from 'react'
import Bun from '../bun/bun'
import ConstuctorList from '../constructor-list/constuctor-list'
import {
	addBun,
	addConstructorElements,
	calculateTotalPrice
} from '../../../../services/reducers/burger-constructor-slice'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import styles from './result-list.module.css'
import { v1 as uuid } from 'uuid'

const ResultList = () => {
	const dispatch = useDispatch()
	const { constructorElements, bun } = useSelector(
		state => state.burgerConstructorReducer
	)
	const onDropHandler = ingredient => {
		if (ingredient.type !== 'bun')
			dispatch(
				addConstructorElements({ ingredient: { ...ingredient, index: uuid() } })
			)
		else dispatch(addBun({ ingredient: ingredient }))
		dispatch(calculateTotalPrice())
	}

	const [, dropTarget] = useDrop({
		accept: 'ingredient',
		drop(ingredient) {
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
