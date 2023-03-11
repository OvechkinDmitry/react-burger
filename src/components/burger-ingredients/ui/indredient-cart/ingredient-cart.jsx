import React, { useCallback } from 'react'
import styles from './ingredient-cart.module.css'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import Price from '../../../ui/price/price'
import { useDrag } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { ingredientType } from '../../../../utils/global-prop-types'
import PropTypes from 'prop-types'
import { setModalData } from '../../../../services/reducers/ingredient-details-slice'
import { Link, useLocation } from 'react-router-dom'

const IngredientCart = React.memo(({ ingredient }) => {
	const dispatch = useDispatch()
	const location = useLocation()
	const ingredientId = ingredient._id
	const handleOpen = useCallback(
		info => {
			dispatch(setModalData(info))
		},
		[dispatch]
	)
	const [_, dragRef] = useDrag({
		type: 'ingredient',
		item: ingredient
	})
	const getState = state => state.burgerConstructorReducer
	const { constructorElements, bun } = useSelector(getState)
	const elementsInOrder = [...constructorElements, bun, bun]
	const count = elementsInOrder.filter(el => el._id === ingredient._id).length
	return (
		<Link
			key={ingredient._id}
			to={`/ingredients/${ingredientId}`}
			state={{ background: location }}
		>
			<li
				ref={dragRef}
				onClick={() => handleOpen(ingredient)}
				className={styles.cart}
			>
				{count > 0 && <Counter count={count} size='default' extraClass='m-1' />}
				<img
					alt={`изображение ${ingredient.name}`}
					src={ingredient.image}
					className='pr-4 pb-1 pl-4'
				/>
				<Price text={ingredient.price} size={'default'} />
				<span
					className={`${styles.description} text text_type_main-small mt-1`}
				>
					{ingredient.name}
				</span>
			</li>
		</Link>
	)
})

IngredientCart.propTypes = {
	ingredient: ingredientType.isRequired
	// handleOpen: PropTypes.func.isRequired
}
export default IngredientCart
