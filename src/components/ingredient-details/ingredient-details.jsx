import React, { useMemo } from 'react'
import styles from './ingredient-detailes.module.css'
import IngredientInfo from './ui/ingredient-info/ingredient-info'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'

function IngredientDetails() {
	const location = useLocation()
	const { ingredientId } = useParams()
	const containerClass = location.state?.background
		? styles.inModal
		: styles.withoutModal
	const { ingredients, isLoading, isError } = useSelector(
		state => state.ingredientsReducer
	)
	const data = useMemo(
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
						src={data['image_large']}
						alt={`изображение ${data.name}`}
					/>
					<p className={`${styles.name} text text_type_main-medium mb-8`}>
						{data.name}
					</p>
					<div className={`${styles.info} pb-15`}>
						<IngredientInfo title={'Калории,ккал'} amount={data.calories} />
						<IngredientInfo title={'Белки, г'} amount={data.proteins} />
						<IngredientInfo title={'Жиры, г'} amount={data.fat} />
						<IngredientInfo title={'Углеводы, г'} amount={data.carbohydrates} />
					</div>
				</div>
			)}
		</>
	)
}

export default IngredientDetails
