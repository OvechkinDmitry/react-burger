import { combineReducers, configureStore } from '@reduxjs/toolkit'
import ingredientDetailsReducer from './reducers/ingredient-details-slice'
import orderDetailsReducer from './reducers/order-details-slice'
import ingredientsReducer from './reducers/ingredints-slice'
import burgerConstructorReducer from './reducers/burger-constructor-slice'
import authUserReducer from './reducers/auth-user-slice'

const rootReducer = combineReducers({
	ingredientsReducer,
	ingredientDetailsReducer,
	orderDetailsReducer,
	burgerConstructorReducer,
	authUserReducer
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
	})
}
