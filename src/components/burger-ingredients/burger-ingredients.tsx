import React, { createRef, FC, useMemo } from 'react'
import styles from './burger-ingredients.module.css'
import IngredientSection from './ui/ingredient-section/ingredient-section'
import Tabs from './ui/tabs/tabs'
import { processWithType } from '../../utils/process-with-type'
import WarnLog from '../ui/warn-log/warn-log'
import { useTypedSelector } from '../../hooks/use-typed-selector'
import { TIngredient } from '../../utils/types/ingredient-type'

const BurgerIngredients: FC = () => {
	const { isLoading, isError, ingredients } = useTypedSelector(
		state => state.ingredientsReducer
	)
	const sectionsRef = createRef<HTMLDivElement>()

	const ingredientsData = useMemo<{ [type: string]: TIngredient[] }>(
		() => processWithType(ingredients),
		[ingredients]
	)
	const sectionsData = [
		{
			title: 'Булки',
			ref: createRef<HTMLDivElement>(),
			ingredients: ingredientsData.bun
		},
		{
			title: 'Соусы',
			ref: createRef<HTMLDivElement>(),
			ingredients: ingredientsData.sauce
		},
		{
			title: 'Начинки',
			ref: createRef<HTMLDivElement>(),
			ingredients: ingredientsData.main
		}
	]

	return (
		<>
			{isLoading && <WarnLog>Загрузка...</WarnLog>}
			{isError && <WarnLog>Ошибка</WarnLog>}
			{!isError && !isLoading && !!Object.keys(ingredients).length && (
				<div className={styles.container}>
					<p className='text text_type_main-large mt-10 mb-5'>
						Соберите ваш бургер
					</p>
					<Tabs sectionsData={sectionsData} sectionsRef={sectionsRef} />
					<div ref={sectionsRef} className={`${styles.ingredients} mt-10`}>
						{sectionsData.map(el => {
							return (
								<IngredientSection
									key={el.title}
									ref={el.ref}
									title={el.title}
									data={el.ingredients}
								/>
							)
						})}
					</div>
				</div>
			)}
		</>
	)
}

export default BurgerIngredients
