import React, {useCallback} from 'react';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {fetchIngredients} from "../../services/actions/fetch-ingredients";
import {URL_INGREDIENTS} from "../../utils/constants";
import withFetch from "../../hocs/with-fetch/with-fetch";
import GlobalDndProvider from "../../utils/global-dnd-provider";



const Constructor = () => {
    const fetchData = useCallback(() => fetchIngredients(URL_INGREDIENTS), [URL_INGREDIENTS])()
    const WithFetchBurgerIngredients = () => withFetch(BurgerIngredients, fetchData)
    return (<GlobalDndProvider>
                <WithFetchBurgerIngredients/>
                <BurgerConstructor/>
           </GlobalDndProvider>
    );
};

export default Constructor;