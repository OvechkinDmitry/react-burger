import React from 'react';
import styles from './ingredient-cart.module.css'
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../../../ui/price/price";
import {useDrag} from "react-dnd";

const IngredientCart = ({ingredient, handleOpen}) => {
    const [_,dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient
    })
    return (<li ref={dragRef} onClick={() => handleOpen(ingredient)} className={styles.cart}>
                    <Counter count={0} size="default" extraClass="m-1"/>
                    <img alt={`изображение ${ingredient.name}`} src={ingredient.image} className="pr-4 pb-1 pl-4"/>
                    <Price text={ingredient.price} size={"default"}/>
                    <span className={`${styles.description} text text_type_main-small mt-1`}>{ingredient.name}</span>
            </li>
    );
}
//
// IngredientCart.propTypes = {
//     price: number.isRequired,
//     description: string.isRequired,
//     image: string.isRequired,
//     ingredient: ingredientType.isRequired,
//     handleOpen: func.isRequired,
// }

export default IngredientCart;