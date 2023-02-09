import React from 'react';
import styles from './order-detailes.module.css'
import IngredientInfo from "./ui/ingredient-info/ingredient-info";
import {ingredientType} from "../../utils/global-prop-types";

function OrderDetailes({data}) {
    const {calories, carbohydrates, fat, name, proteins} = data
    return (<>
            <img className={'mb-4'} src={data["image_large"]}/>
            <p className={`${styles.name} text text_type_main-medium mb-8`}>
                {name}
            </p>
            <div className={`${styles.info} pb-15`}>
                <IngredientInfo title={"Калории,ккал"} amount={calories}/>
                <IngredientInfo title={"Белки, г"} amount={proteins}/>
                <IngredientInfo title={"Жиры, г"} amount={fat}/>
                <IngredientInfo title={"Углеводы, г"} amount={carbohydrates}/>
            </div>
        </>
    );
}

OrderDetailes.propTypes = {
    data: ingredientType.isRequired
}

export default OrderDetailes;