import React from 'react';
import Bun from "../bun/bun";
import ConstuctorList from "../constructor-list/constuctor-list";
import WarnLog from "../../../ui/warn-log/warn-log";
import {addBun, addConstructorElements} from "../../../../services/reducers/burger-constructor-slice";
import {useDrop} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import styles from './result-list.module.css'

const ResultList = () => {
    const dispatch = useDispatch()
    const {constructorElements, bun} = useSelector(state => state.burgerConstructorReducer)
    const onDropHandler = (ingredient) => {
        if (ingredient.type !== 'bun')
            dispatch(addConstructorElements({'ingredient': ingredient}))
        else
            dispatch(addBun({'ingredient': ingredient}))
    }

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(ingredient) {
            onDropHandler(ingredient)
        },
    });
    return (<div ref={dropTarget} className={`${styles.resultList}`}>
        {
            Object.keys(bun).length || constructorElements.length ? (
                <>
                    {!!Object.keys(bun).length && <Bun isLocked={true} type={"top"} data={bun}/>}
                    {!!constructorElements.length && <ConstuctorList data={[...constructorElements]}/>}
                    {!!Object.keys(bun).length && <Bun isLocked={true} type={"bottom"} data={bun}/>}
                </>
            ) : <WarnLog>Положите ингредиенты сюда</WarnLog>
        }
    </div>)
};

export default ResultList;