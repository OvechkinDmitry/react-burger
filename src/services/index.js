import {combineReducers, configureStore} from "@reduxjs/toolkit";
import ingredientDetailsReducer from "./reducers/ingredient-details-slice";


const rootReducer = combineReducers({
    ingredientDetailsReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}