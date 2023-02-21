import React from 'react';
import style from './constuctor-list.module.css'
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientArray} from "../../../../utils/global-prop-types";
import {useDispatch} from "react-redux";
import {deleteConstructorElement} from "../../../../services/reducers/burger-constructor-slice";

const ConstuctorList = ({data}) => {
    const dispatch = useDispatch()
    const handleClose = (id) => {
        dispatch(deleteConstructorElement({id}))
    }
    return (<ul className={style.constructorList}>
            {data && data.length ?data.map((el, index) => <li key={el["_id"] + index}>
                    <div className={"ml-4"}>
                        <DragIcon type="primary"/>
                    </div>
                    <ConstructorElement extraClass={`${style.constructorElement} ml-2`}
                                        text={el.name}
                                        price={el.price}
                                        thumbnail={el.image}
                                        handleClose={() => handleClose(el._id)}
                    />
                </li>) : null}
        </ul>
    )
};

ConstuctorList.propTypes = {
    data: ingredientArray.isRequired
}

export default ConstuctorList;