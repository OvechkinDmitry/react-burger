import React, { ForwardedRef, forwardRef } from 'react'
import styles from './ingredient-section.module.css'
import IngredientCart from '../indredient-cart/ingredient-cart'
import { TIngredient } from '../../../../utils/types/ingredient-type'

type TIngredientSection = {
	title: string
	data: TIngredient[]
}
const IngredientSection = forwardRef<HTMLDivElement, TIngredientSection>(
	({ title, data }, ref: ForwardedRef<HTMLDivElement>) => {
		return (
			<section id={title} ref={ref}>
				<p className='text text_type_main-medium mb-6'>{title}</p>
				<ul className={`${styles.listIngredients} pt-6 pl-4 pb-10 pr-4`}>
					{data.map((ing, i) => (
						<IngredientCart key={i} ingredient={ing} />
					))}
				</ul>
			</section>
		)
	}
)
export default IngredientSection
