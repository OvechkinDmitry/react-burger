import React from 'react';
import styles from './order-detailes.module.css'
import IngredientInfo from "./ui/ingredient-info/ingredient-info";

function OrderDetailes({title, image, cal, prot, fat, carb}) {
    return (<>
            <img className={'mb-4'} src={"https://code.s3.yandex.net/react/code/meat-01-large.png"}/>
            <p className={"text text_type_main-medium mb-8"}>
                Биокотлета из марсианской Магнолии
            </p>
            <div className={`${styles.info} pb-15`}>
                <IngredientInfo title={"Калории,ккал"} amount={200}/>
                <IngredientInfo title={"Белки, г"} amount={200}/>
                <IngredientInfo title={"Жиры, г"} amount={200}/>
                <IngredientInfo title={"Углеводы, г"} amount={200}/>
            </div>
        </>
    );
}

export default OrderDetailes;