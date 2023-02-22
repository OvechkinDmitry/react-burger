import React from 'react';
import style from './constuctor-list.module.css'
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {deleteConstructorElement} from "../../../../services/reducers/burger-constructor-slice";
import ConstructorUnit from "../constructor-unit/constructor-unit";

const ConstuctorList = ({data, moveCard}) => {
    const dispatch = useDispatch()
    const handleClose = (index) => {
        dispatch(deleteConstructorElement({index}))
    }
    return (<ul className={style.constructorList}>
            {data && data.length ? data.map((el) => {
                const {ingredient, index} = el
                return <ConstructorUnit key={index} handleClose={handleClose} moveCard={moveCard} index={index}
                                        ingredient={ingredient}/>
            }) : null}
        </ul>
    )
};

export default ConstuctorList;