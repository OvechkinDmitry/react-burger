import React, {useCallback} from 'react';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {fetchIngredients} from "../../services/actions/fetch-ingredients";
import {URL_INGREDIENTS} from "../../utils/constants";
import withFetch from "../../hocs/with-fetch/with-fetch";



const Constructor = () => {
    const fetchData = useCallback(() => fetchIngredients(URL_INGREDIENTS), [URL_INGREDIENTS])()
    const WithFetchBurgerIngredients = () => withFetch(BurgerIngredients, fetchData)
    return (<>
                <WithFetchBurgerIngredients/>
                <BurgerConstructor/>
           </>
    );
};

export default Constructor;