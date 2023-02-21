import React from 'react';
import styles from './ingredient-cart.module.css'
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../../../ui/price/price";
import {string, number, func} from "prop-types";
import {useDrag} from "react-dnd";
import {ingredientType} from "../../../../utils/global-prop-types";

const IngredientCart = ({price, description, image, ing, handleOpen}) => {
    const id = ing?.["_id"]
    const [_,dragRef] = useDrag({
        type: 'ingredient',
        item: {id}
    })
    return (<li ref={dragRef} onClick={() => handleOpen(ing)} className={styles.cart}>
                    <Counter count={0} size="default" extraClass="m-1"/>
                    <img alt={`изображение ${description}`} src={image} className="pr-4 pb-1 pl-4"/>
                    <Price text={price} size={"default"}/>
                    <span className={`${styles.description} text text_type_main-small mt-1`}>{description}</span>
            </li>
    );
}

IngredientCart.propTypes = {
    price: number.isRequired,
    description: string.isRequired,
    image: string.isRequired,
    ing: ingredientType.isRequired,
    handleOpen: func.isRequired,
}

export default IngredientCart;