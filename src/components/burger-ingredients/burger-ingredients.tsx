import React, { createRef, FC, useMemo } from 'react'
import styles from './burger-ingredients.module.css'
import IngredientSection from './ui/ingredient-section/ingredient-section'
import Tabs from './ui/tabs/tabs'
import { processData } from '../../utils/process-data'
import WarnLog from '../ui/warn-log/warn-log'
import { useTypedSelector } from '../../hooks/use-typed-selector'

const BurgerIngredients: FC = () => {
	const { isLoading, isError, ingredients } = useTypedSelector(
		state => state.ingredientsReducer
	)
	const sectionsRef = createRef<HTMLDivElement>()
	const ingredientsData = useMemo(() => processData(ingredients), [ingredients])
	const { bun, main, sauce } = ingredientsData
	const sectionsData = [
		{ title: 'Булки', ref: createRef<HTMLDivElement>(), ingredients: bun },
		{ title: 'Соусы', ref: createRef<HTMLDivElement>(), ingredients: sauce },
		{ title: 'Начинки', ref: createRef<HTMLDivElement>(), ingredients: main }
	]
	return (
		<>
			{isLoading && <WarnLog>Загрузка...</WarnLog>}
			{isError && <WarnLog>Ошибка</WarnLog>}
			{!isError && !isLoading && !!Object.keys(ingredients).length && (
				<div className={styles.container}>
					<p className='text text_type_main-large mt-10 mb-5'>
						Соберите бургер
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
