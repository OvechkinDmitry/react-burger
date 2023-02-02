import React from 'react';
import styles from './ingredient-cart.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientCart = () => {
    return (
        <>
            <li className={styles.cart + " "}>
                <img src={"https://code.s3.yandex.net/react/code/bun-02.png"} className="pr-4 pb-1 pl-4"/>
                <Counter count={1} size="default" extraClass="m-1" />
                <span className={styles.price}>
                    <span className="text text_type_digits-default">20</span>
                    <CurrencyIcon type="primary" />
                </span>
                <span className={styles.description + " text text_type_main-small mt-1"}>Краторная булка N-200i</span>
            </li>
        </>
    );
};

export default IngredientCart;