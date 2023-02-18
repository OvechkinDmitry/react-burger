import {combineReducers, configureStore} from "@reduxjs/toolkit";
import ingredientDetailsReducer from "./reducers/ingredient-details-slice";
import orderDetailsReducer from "./reducers/order-details-slice"
import ingredientsReducer from "./reducers/ingredints-slice"
import burgerConstructorReducer from './reducers/burger-constructor-slice'

const rootReducer = combineReducers({
    ingredientsReducer,
    ingredientDetailsReducer,
    orderDetailsReducer,
    burgerConstructorReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}