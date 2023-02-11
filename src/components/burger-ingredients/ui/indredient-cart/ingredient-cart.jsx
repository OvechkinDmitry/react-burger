import React from 'react';
import styles from './ingredient-cart.module.css'
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../../../ui/price/price";
import {string, number, func} from "prop-types";
import {ingredientType} from "../../../../utils/global-prop-types";

const IngredientCart = ({price, description, count, image, ing, handleOpen}) => {
    return (<>
                <li onClick={() => handleOpen(ing)} className={styles.cart}>
                    <img alt={`изображение ${description}`} src={image} className="pr-4 pb-1 pl-4"/>
                    <Counter count={count} size="default" extraClass="m-1"/>
                    <Price text={price} size={"default"}/>
                    <span className={`${styles.description} text text_type_main-small mt-1`}>{description}</span>
                </li>
          </>
    );
}

IngredientCart.propTypes = {
    price: number.isRequired,
    description: string.isRequired,
    count: number.isRequired,
    image: string.isRequired,
    ing: ingredientType.isRequired,
    handleOpen: func.isRequired,
}

export default IngredientCart;