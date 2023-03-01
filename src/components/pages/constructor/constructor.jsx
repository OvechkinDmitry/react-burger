import React from 'react'
import BurgerIngredients from '../../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../../burger-constructor/burger-constructor'
import styles from './constructor.module.css'
import GlobalDndProvider from '../../../utils/global-dnd-provider'

const Constructor = () => {
	return (
		<GlobalDndProvider>
			<div className={styles.body}>
				<BurgerIngredients />
				<BurgerConstructor />
			</div>
		</GlobalDndProvider>
	)
}

export default Constructor
