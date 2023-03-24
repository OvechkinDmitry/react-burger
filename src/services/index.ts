import { combineReducers, configureStore } from '@reduxjs/toolkit'
import orderDetailsReducer from './reducers/order-details/lib/order-details-slice'
import ingredientsReducer from './reducers/ingredients/lib/ingredints-slice'
import burgerConstructorReducer from './reducers/burger-constructor/lib/burger-constructor-slice'
import authUserReducer from './reducers/auth-user/lib/auth-user-slice'

const rootReducer = combineReducers({
	ingredientsReducer,
	orderDetailsReducer,
	burgerConstructorReducer,
	authUserReducer
})

export const store = configureStore({
	reducer: rootReducer
})

export type TRootState = ReturnType<typeof rootReducer>
export type TRootDispatch = typeof store.dispatch
