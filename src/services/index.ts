import { combineReducers, configureStore } from '@reduxjs/toolkit'
import orderDetailsReducer from './reducers/order-details/lib/order-details-slice'
import ingredientsReducer from './reducers/ingredients/lib/ingredints-slice'
import burgerConstructorReducer from './reducers/burger-constructor/lib/burger-constructor-slice'
import authUserReducer from './reducers/auth-user/lib/auth-user-slice'
import websoketReducer, {
	wsClose,
	wsError,
	wsMessage,
	wsSuccess
} from './reducers/websoket/lib/websoket-slice'
import { websoketMiddleware } from './middleware/lib/websoket-middleware'
import {
	wsDisconnect,
	wsSendMessage,
	wsStart
} from './actions/wsActions/lib/ws-actions'

const rootReducer = combineReducers({
	ingredientsReducer,
	orderDetailsReducer,
	burgerConstructorReducer,
	authUserReducer,
	websoketReducer
})

const wsActions = {
	wsInit: wsStart,
	wsClose: wsDisconnect,
	wsSendMessage: wsSendMessage,
	onClose: wsClose,
	onMessage: wsMessage,
	onOpen: wsSuccess,
	onError: wsError
}

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(websoketMiddleware(wsActions))
})

export type TRootState = ReturnType<typeof rootReducer>
export type TRootDispatch = typeof store.dispatch
