import React from 'react';
import {Reorder} from "framer-motion";
import style from './constuctor-list.module.css'
import {useDispatch} from "react-redux";
import {deleteConstructorElement, updateConstructorElements} from "../../../../services/reducers/burger-constructor-slice";
import ConstructorUnit from "../constructor-unit/constructor-unit";
import {ingredientArray} from "../../../../utils/global-prop-types";

const ConstuctorList = ({data}) => {
    const dispatch = useDispatch()
    const handleClose = (index) => {
        dispatch(deleteConstructorElement({index}))
    }
    const handleReorder = (elements) => {
        dispatch(updateConstructorElements({'ingredients': elements}))
    }
    return (
        <Reorder.Group  className={style.constructorList} values={data} axys={"y"} onReorder={handleReorder}>
            {data.map((el) =>  <ConstructorUnit key={el.index} handleClose={handleClose} ingredient={el}/>)}
        </Reorder.Group>

    )
};
ConstuctorList.propTypes = {
    data : ingredientArray.isRequired
}
export default ConstuctorList;