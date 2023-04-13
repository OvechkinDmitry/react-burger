import React, { FC, useMemo } from 'react'
import styles from './ingredient-detailes.module.css'
import { useLocation, useParams } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/use-typed-selector'
import { TIngredient } from '../../utils/types/ingredient-type'
import { IngredientInfo } from './ui/ingredient-info/ingredient-info'

export const IngredientDetails: FC = () => {
	const location = useLocation()
	const { ingredientId } = useParams()
	const containerClass = location.state?.background
		? styles.inModal
		: styles.withoutModal
	const { ingredients, isLoading, isError } = useTypedSelector(
		state => state.ingredientsReducer
	)
	const data = useMemo<TIngredient | undefined>(
		() => ingredients.find(el => el._id === ingredientId),
		[ingredients, ingredientId]
	)
	return (
		<>
			{!isLoading && !isError && (
				<div className={containerClass}>
					{!location.state?.background ? (
						<p className={`${styles.name} text text_type_main-large`}>
							{'Детали ингредиента'}
						</p>
					) : null}
					<img
						className={'mb-4'}
						src={data?.['image_large']}
						alt={`изображение ${data?.name}`}
					/>
					<p className={`${styles.name} text text_type_main-medium mb-8`}>
						{data?.name}
					</p>
					<div className={`${styles.info}`}>
						<IngredientInfo
							title={'Калории,ккал'}
							amount={data?.calories || 0}
						/>
						<IngredientInfo title={'Белки, г'} amount={data?.proteins || 0} />
						<IngredientInfo title={'Жиры, г'} amount={data?.fat || 0} />
						<IngredientInfo
							title={'Углеводы, г'}
							amount={data?.carbohydrates || 0}
						/>
					</div>
				</div>
			)}
		</>
	)
}
