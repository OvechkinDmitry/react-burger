import React from 'react';
import style from './constuctor-list.module.css'
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {deleteConstructorElement} from "../../../../services/reducers/burger-constructor-slice";

const ConstuctorList = ({data}) => {
    const dispatch = useDispatch()
    const handleClose = (index) => {
        dispatch(deleteConstructorElement({index}))
    }
    return (<ul className={style.constructorList}>
            {data && data.length ? data.map((el) => {
                const {ingredient, index} = el
                return <li key={index}>
                            <div className={"ml-4"}>
                                <DragIcon type="primary"/>
                            </div>
                            <ConstructorElement extraClass={`${style.constructorElement} ml-2`}
                                                text={ingredient.name}
                                                price={ingredient.price}
                                                thumbnail={ingredient.image}
                                                handleClose={() => handleClose(index)}
                            />
                        </li>
            }) : null}
        </ul>
    )
};

export default ConstuctorList;