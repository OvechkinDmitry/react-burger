import React, {
	createRef,
	useCallback,
	useEffect,
	useMemo,
	useState
} from 'react'
import styles from './burger-ingredients.module.css'
import IngredientSection from './ui/ingredient-section/ingredient-section'
import Tabs from './ui/tabs/tabs'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import { useDispatch, useSelector } from 'react-redux'
import {
	deleteModalData,
	setModalData
} from '../../services/reducers/ingredient-details-slice'
import { processData } from '../../utils/process-data'
import WarnLog from '../ui/warn-log/warn-log'
import { fetchIngredients } from '../../services/actions/fetch-ingredients'
import { URL_INGREDIENTS } from '../../utils/constants'

const BurgerIngredients = () => {
	const dispatch = useDispatch()
	const getState = state => state.ingredientsReducer
	const { isLoading, isError, ingredients } = useSelector(getState)
	const handleClose = useCallback(() => {
		setOpen(false)
		dispatch(deleteModalData())
	}, [dispatch])
	const handleOpen = useCallback(
		info => {
			dispatch(setModalData(info))
			setOpen(true)
		},
		[dispatch]
	)
	const [isOpen, setOpen] = useState(false)
	useEffect(() => {
		dispatch(fetchIngredients(URL_INGREDIENTS))
	}, [dispatch])
	const sectionsRef = createRef()
	const ingredientsData = useMemo(() => processData(ingredients), [ingredients])
	const { bun, main, sauce } = ingredientsData
	const sectionsData = [
		{ title: 'Булки', ref: createRef(), ingredients: bun },
		{ title: 'Соусы', ref: createRef(), ingredients: sauce },
		{ title: 'Начинки', ref: createRef(), ingredients: main }
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
									handleOpen={handleOpen}
								/>
							)
						})}
					</div>
					{isOpen && (
						<Modal
							optionalTitle={'Детали ингредиента'}
							handleClose={handleClose}
						>
							<IngredientDetails />
						</Modal>
					)}
				</div>
			)}
		</>
	)
}

export default BurgerIngredients
