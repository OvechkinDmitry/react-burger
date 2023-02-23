import React, { useMemo } from 'react'
import styles from './burger-constructor.module.css'
import SubmitOreder from './submit-order/submit-oreder'
import { useSelector } from 'react-redux'
import ResultList from './ui/result-list/result-list'

const BurgerConstructor = React.memo(() => {
	const getState = state => state.burgerConstructorReducer
	const { totalPrice, bun, constructorElements } = useSelector(getState)
	const orderElementsIdS = useMemo(
		() => [bun, ...constructorElements].map(el => el._id).filter(el => el),
		[bun, constructorElements]
	)
	return (
		<div className={`${styles.container} mt-25`}>
			<ResultList />
			<SubmitOreder totalPrice={totalPrice} idS={orderElementsIdS} />
		</div>
	)
})

export default BurgerConstructor
