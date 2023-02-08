import React from 'react';
import styles from './ingredient-cart.module.css'
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../../../ui/price/price";
import {string, number} from "prop-types";

const IngredientCart = ({price, description, count, image}) => {
    return (<li className={styles.cart}>
            <img alt={'ingredient'} src={image} className="pr-4 pb-1 pl-4"/>
            <Counter count={count} size="default" extraClass="m-1"/>
            <Price text={price} size={"default"}/>
            <span className={`${styles.description} text text_type_main-small mt-1`}>{description}</span>
        </li>
    );
};

IngredientCart.propType={
    price: number.isRequired,
    description: string.isRequired,
    count: number.isRequired,
    image: string.isRequired,
}

export default IngredientCart;