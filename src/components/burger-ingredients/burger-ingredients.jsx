import React from 'react';
import styles from './burger-ingredients.module.css'
import IngredientSection from "./ui/ingredient-section/ingredient-section";
import Tabs from "./ui/tabs/tabs";
import {dataType} from "../../utils/global-prop-types";


const BurgerIngredients = ({data, handleOpen, handleClose}) => {
    const {bun, main, sauce} = data
    return (<div className={styles.container}>
            <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
            <Tabs names={["Булки", "Соусы", "Начинки"]}/>
            <div className={`${styles.ingredients} mt-10`}>
                <IngredientSection title={"Булки"} data={bun} handleOpen={handleOpen} handleClose={handleClose}/>
                <IngredientSection title={"Соусы"} data={sauce} handleOpen={handleOpen} handleClose={handleClose}/>
                <IngredientSection title={"Начинки"} data={main} handleOpen={handleOpen} handleClose={handleClose}/>
            </div>
        </div>
    );
}

BurgerIngredients.propTypes = {
    data: dataType.isRequired
}
export default BurgerIngredients;