import React from 'react';
import style from './constuctor-list.module.css'
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientArray} from "../../../../utils/global-prop-types";

const ConstuctorList = ({data}) => {
    return (<ul className={style.constructorList}>
        {data.map(el => <li key={el["_id"]}>
            <div className={"ml-4"}>
                <DragIcon type="primary"/>
            </div>
            <ConstructorElement extraClass={`${style.constructorElement} ml-2`} text={el.name} price={el.price}
                                thumbnail={el.image}/>
        </li>)}
    </ul>)
};

ConstuctorList.propType = {
    data : ingredientArray
}

export default ConstuctorList;