import React, {useCallback, useState} from 'react';
import styles from './ingredient-cart.module.css'
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../../../ui/price/price";
import {string, number} from "prop-types";
import OrderDetailes from "../../../order-details/order-detailes";
import Modal from "../../../modal/modal";

const IngredientCart = (props) => {
    const {price, description, count, image, ing} = props
    const [isOpen, setOpen] = useState(false)
    const handleClose = useCallback(() => setOpen(false),[])
    const handleOpen = useCallback(() => setOpen(true),[])
    return (<>
            <li onClick={handleOpen} className={styles.cart}>
                <img alt={'ingredient'} src={image} className="pr-4 pb-1 pl-4"/>
                <Counter count={count} size="default" extraClass="m-1"/>
                <Price text={price} size={"default"}/>
                <span className={`${styles.description} text text_type_main-small mt-1`}>{description}</span>
            </li>
            {
                isOpen && (<Modal optionalTitle={"Детали ингредиента"} handleClose={handleClose}>
                    <OrderDetailes data={ing}/>
                </Modal>)
            }
        </>
    );
}

IngredientCart.propType = {
    price: number.isRequired,
    description: string.isRequired,
    count: number.isRequired,
    image: string.isRequired,
}

export default IngredientCart;