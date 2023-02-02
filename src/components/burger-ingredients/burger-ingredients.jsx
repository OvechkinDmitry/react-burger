import React from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients.module.css'
import IngredientCart from "./ui/indredient-cart/ingredient-cart";


const BurgerIngredients = (props) => {
    const rolls = props.rolls
    const sauces = props.sauces

    const [current, setCurrent] = React.useState('one')
    return (
        <>
            <div className={styles.container}>
                <p className="text text_type_main-large mt-10 mb-5">
                    Соберите бургер
                </p>
                <div className={styles.tabs}>
                    <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </div>
                <div className={styles.ingredients + " mt-10"}>
                    <section>
                        <p className="text text_type_main-medium mb-6">
                            Булки
                        </p>
                        <ul className={styles.listIngredients + " pt-6 pl-4 pb-10 pr-4"}>
                            <IngredientCart/>
                            <IngredientCart/>
                        </ul>
                    </section>
                    <section>
                        <p className="text text_type_main-medium mb-6">
                            Соусы
                        </p>
                        <ul className={styles.listIngredients + " pt-6 pl-4 pb-10 pr-4"}>
                            <IngredientCart/>
                            <IngredientCart/>
                            <IngredientCart/>
                            <IngredientCart/>
                            <IngredientCart/>
                            <IngredientCart/>
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );
}

export default BurgerIngredients;