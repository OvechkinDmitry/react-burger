import React from 'react';
import styles from "./burger-constructor.module.css"
import {ConstructorElement, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstuctorList from "./ui/constructorList/constuctor-list";
import Price from "../ui/price/price";
import {constructorType} from "../../utils/global-prop-types";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";


const BurgerConstructor = ({data, handleOpen, handleClose}) => {
    const {bun, main, sauce} = data
    const modalContent = (<Modal optionalTitle={""} handleClose={handleClose}>
        <IngredientDetails id={'0345232'}/>
    </Modal>)
    return (<div>
        <div className={`${styles.container} mt-25`}>
            <ConstructorElement extraClass={"mb-4 mr-4"}
                                type="top" isLocked={true}
                                text={`${bun[1].name} (верх)`}
                                price={bun[1].price}
                                thumbnail={bun[1].image}/>
            <ConstuctorList data={[...main, ...sauce]}/>
            <ConstructorElement extraClass={"mt-4 mr-4"}
                                type="bottom"
                                isLocked={true}
                                text={`${bun[1].name} (низ)`}
                                price={bun[1].price}
                                thumbnail={bun[1].image}/>
            <div className={`${styles.submit} mt-10 mr-8`}>
                <Price text={610} size={'medium'} extraClass={"mr-10"}/>
                <Button onClick={() => handleOpen(modalContent)} htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
        </div>
    </div>)
}

BurgerConstructor.propTypes = constructorType
export default BurgerConstructor;