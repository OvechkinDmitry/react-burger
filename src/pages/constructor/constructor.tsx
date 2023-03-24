import React, { FC } from 'react'
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients'
import styles from './constructor.module.css'
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor'
import GlobalDndProvider from '../../utils/global-dnd-provider'

const Constructor: FC = () => {
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
