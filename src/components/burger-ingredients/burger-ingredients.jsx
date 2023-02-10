import React, {useRef} from 'react';
import styles from './burger-ingredients.module.css'
import IngredientSection from "./ui/ingredient-section/ingredient-section";
import Tabs from "./ui/tabs/tabs";
import {constructorType} from "../../utils/global-prop-types";


const BurgerIngredients = ({data}) => {
    const {bun, main, sauce} = data
    const refBun = useRef()
    const refSouces = useRef()
    const refMain = useRef()
    const names = [{"title": "Булки", "ref": refBun},
                    {"title": "Соусы", "ref": refSouces},
                    {"title": "Начинки", "ref": refMain}]
    return (<div className={styles.container}>
            <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
            <Tabs names={names}/>
            <div className={`${styles.ingredients} mt-10`}>
                <IngredientSection ref={refBun} title={"Булки"} data={bun}/>
                <IngredientSection ref={refSouces} title={"Соусы"} data={sauce}/>
                <IngredientSection ref={refMain} title={"Начинки"} data={main}/>
            </div>
        </div>
    );
}

BurgerIngredients.propTypes = constructorType
export default BurgerIngredients;