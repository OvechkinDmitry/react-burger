import React, {useMemo} from 'react';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {processData} from "../../utils/process-data";

const Constructor = ({data}) => {
    const ingredientsData = useMemo(() => processData(data), [data])
    return (<>
            <BurgerIngredients data={ingredientsData}/>
            <BurgerConstructor data={ingredientsData}/>
        </>
    );
};

export default Constructor;