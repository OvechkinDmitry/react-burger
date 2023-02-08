import React from 'react';
import styles from "./burger-constructor.module.css"
import {ConstructorElement, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstuctorList from "./ui/constructorList/constuctor-list";
import Price from "../ui/price/price";
import {dataType} from "../../utils/global-prop-types";


const BurgerConstructor = ({data}) => {
    const {bun, main, sauce} = data
    return (<div>
        <div className={`${styles.container} mt-25`}>
            <ConstructorElement extraClass={"mb-4 mr-4"}
                                type="top" isLocked={true}
                                text={`${bun[0].name} (верх)`}
                                price={bun[0].price}
                                thumbnail={bun[0].image}/>
            <ConstuctorList data={[...main, ...sauce]}/>
            <ConstructorElement extraClass={"mt-4 mr-4"}
                                type="bottom"
                                isLocked={true}
                                text={`${bun[1].name} (низ)`}
                                price={bun[1].price}
                                thumbnail={bun[1].image}/>
            <div className={`${styles.submit} mt-10 mr-8`}>
                <Price text={610} size={'medium'} extraClass={"mr-10"}/>
                <Button htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
        </div>
    </div>)
}

BurgerConstructor.propTypes = {
    data: dataType.isRequired
}
export default BurgerConstructor;