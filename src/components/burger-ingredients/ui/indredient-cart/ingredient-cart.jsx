import React from 'react';
import styles from './ingredient-cart.module.css'
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../../../ui/price/price";
import {useDrag} from "react-dnd";
import {useSelector} from "react-redux";

const IngredientCart = React.memo(({ingredient, handleOpen}) => {
    const [_,dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient
    })
    const {constructorElements, bun} = useSelector(state => state.burgerConstructorReducer)
    const elementsInOrder = [...constructorElements.map(el => el.ingredient), bun, bun]
    const count = elementsInOrder.filter(el => el._id === ingredient._id).length
    return (<li key={ingredient._id} ref={dragRef} onClick={() => handleOpen(ingredient)} className={styles.cart}>
                    <Counter count={count} size="default" extraClass="m-1"/>
                    <img alt={`изображение ${ingredient.name}`} src={ingredient.image} className="pr-4 pb-1 pl-4"/>
                    <Price text={ingredient.price} size={"default"}/>
                    <span className={`${styles.description} text text_type_main-small mt-1`}>{ingredient.name}</span>
            </li>
    );
})

export default IngredientCart;