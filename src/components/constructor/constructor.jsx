import React from 'react'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import GlobalDndProvider from '../../utils/global-dnd-provider'

const Constructor = () => {
	return (
		<GlobalDndProvider>
			<BurgerIngredients />
			<BurgerConstructor />
		</GlobalDndProvider>
	)
}

export default Constructor
