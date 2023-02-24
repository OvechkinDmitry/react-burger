import React, {useMemo} from 'react';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {processData} from "../../utils/process-data";
import {ingredientArray} from "../../utils/global-prop-types";
import {ConstructorContext} from "../../services/constructor-context";

const Constructor = ({data}) => {
    const ingredientsData = useMemo(() => processData(data), [data])
    
    return (<ConstructorContext.Provider value={ingredientsData}>
                <BurgerIngredients/>
                <BurgerConstructor/>
           </ConstructorContext.Provider>
    );
};

Constructor.propTypes = {
    data: ingredientArray.isRequired
}

export default Constructor;