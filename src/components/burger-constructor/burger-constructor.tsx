import React, { FC, useMemo } from 'react'
import styles from './burger-constructor.module.css'
import SubmitOrder from './submit-order/submit-order'
import ResultList from './ui/result-list/result-list'
import { useTypedSelector } from '../../hooks/use-typed-selector'
import { TIngredient } from '../../utils/types/ingredient-type'

const BurgerConstructor: FC = React.memo(() => {
	const { totalPrice, bun, constructorElements } = useTypedSelector(
		state => state.burgerConstructorReducer
	)
	const orderElementsIdS = useMemo(() => {
		const ingredients = [bun, ...constructorElements] as TIngredient[]
		return ingredients.map(el => el._id).filter(el => el)
	}, [bun, constructorElements])
	return (
		<div className={`${styles.container} mt-25`}>
			<ResultList />
			<SubmitOrder totalPrice={totalPrice} idS={orderElementsIdS} />
		</div>
	)
})

export default BurgerConstructor
