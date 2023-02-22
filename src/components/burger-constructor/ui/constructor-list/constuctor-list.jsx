import React from 'react';
import style from './constuctor-list.module.css'
import {useDispatch} from "react-redux";
import {deleteConstructorElement} from "../../../../services/reducers/burger-constructor-slice";
import ConstructorUnit from "../constructor-unit/constructor-unit";

const ConstuctorList = ({data, moveCard}) => {
    const dispatch = useDispatch()
    const handleClose = (index) => {
        dispatch(deleteConstructorElement({index}))
    }
    return (<ul className={style.constructorList}>
            {data && data.length ? data.map((el, i) => {
                return <ConstructorUnit key={el.index} handleClose={handleClose} moveCard={moveCard} index={i}
                                        ingredient={el}/>
            }) : null}
        </ul>
    )
};

export default ConstuctorList;